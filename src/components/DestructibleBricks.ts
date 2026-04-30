import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { copyVec3, copyQuat } from '../utils/sync'

interface Brick {
  mesh: THREE.Mesh
  body: CANNON.Body
  originalPosition: THREE.Vector3
  respawnTimer: number
}

export class DestructibleBricks {
  private scene: THREE.Scene
  private world: CANNON.World
  private bricks: Brick[] = []
  private brickWidth = 1.5
  private brickHeight = 0.8
  private brickDepth = 0.8
  private wallPosition: THREE.Vector3
  private respawnDelay = 5.0
  private attackCooldown = 0
  private isActivated = false // Bricks stay static until something touches them
  private brickMaterial: CANNON.Material

  constructor(scene: THREE.Scene, world: CANNON.World, position: THREE.Vector3) {
    this.scene = scene
    this.world = world
    this.wallPosition = position.clone()
    this.brickMaterial = new CANNON.Material('brick')
  }

  public setupContactMaterials(charMaterial: CANNON.Material) {
    // Create contact material for character-brick collision
    const charBrickContact = new CANNON.ContactMaterial(charMaterial, this.brickMaterial, {
      friction: 0.6,
      restitution: 0.0,
    })
    this.world.addContactMaterial(charBrickContact)
  }

  public create() {
    this.createBrickWall()
  }

  private createBrickWall() {
    const rowsHigh = 6
    const bricksPerRow = 5
    // Center the wall properly
    const totalWidth = bricksPerRow * this.brickWidth
    const startX = this.wallPosition.x - totalWidth / 2 + this.brickWidth / 2
    const startY = this.wallPosition.y + this.brickHeight / 2
    const startZ = this.wallPosition.z

    // Load stone texture
    const textureLoader = new THREE.TextureLoader()
    const stoneTexture = textureLoader.load('/textures/stone.png')
    stoneTexture.wrapS = THREE.RepeatWrapping
    stoneTexture.wrapT = THREE.RepeatWrapping
    stoneTexture.repeat.set(1, 1)

    const stoneMaterial = new THREE.MeshStandardMaterial({
      map: stoneTexture,
      roughness: 0.8,
      metalness: 0.2,
    })

    // Create a proper rectangular wall (all rows same brick count)
    for (let row = 0; row < rowsHigh; row++) {
      for (let i = 0; i < bricksPerRow; i++) {
        const posX = startX + i * this.brickWidth
        const posY = startY + row * this.brickHeight
        const posZ = startZ

        this.createBrick(posX, posY, posZ, stoneMaterial)
      }
    }
  }

  private createBrick(x: number, y: number, z: number, material: THREE.Material) {
    // Three.js mesh
    const geometry = new THREE.BoxGeometry(this.brickWidth, this.brickHeight, this.brickDepth)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, z)
    mesh.castShadow = true
    mesh.receiveShadow = true
    this.scene.add(mesh)

    // Cannon-es body - start with mass 0 (static)
    const shape = new CANNON.Box(new CANNON.Vec3(this.brickWidth / 2, this.brickHeight / 2, this.brickDepth / 2))
    const body = new CANNON.Body({
      mass: 0, // Static initially
      material: this.brickMaterial,
      linearDamping: 0.5,
      angularDamping: 0.6,
    })
    body.addShape(shape)
    body.position.set(x, y, z)
    body.type = CANNON.Body.STATIC
    this.world.addBody(body)

    this.bricks.push({
      mesh,
      body,
      originalPosition: new THREE.Vector3(x, y, z),
      respawnTimer: 0,
    })
  }

  public update(delta: number, robotPosition: THREE.Vector3, isAttacking: boolean, robotForward: THREE.Vector3) {
    const attackRadius = 2.5

    // Check if player is close to the wall - activate bricks on collision
    if (!this.isActivated) {
      const dx = robotPosition.x - this.wallPosition.x
      const dz = robotPosition.z - this.wallPosition.z
      const distanceToWall = Math.sqrt(dx * dx + dz * dz)

      // Activate when player gets within 5 units of the wall center
      if (distanceToWall < 5) {
        this.isActivated = true
        for (const brick of this.bricks) {
          brick.body.type = CANNON.Body.DYNAMIC
          brick.body.mass = 2
          brick.body.updateMassProperties()
          brick.body.wakeUp()
        }
      }
    }

    // Cooldown between attack impulses
    if (this.attackCooldown > 0) {
      this.attackCooldown -= delta
    }

    for (const brick of this.bricks) {
      // Sync mesh with physics body
      copyVec3(brick.mesh.position, brick.body.position)
      copyQuat(brick.mesh.quaternion, brick.body.quaternion)

      // Check if brick fell off platform
      if (brick.body.position.y < -10) {
        brick.respawnTimer += delta
        if (brick.respawnTimer > this.respawnDelay) {
          this.respawnBrick(brick)
        }
      }

      // Apply attack impulse when robot attacks nearby (only once per attack)
      if (isAttacking && this.attackCooldown <= 0) {
        const bx = brick.body.position.x - robotPosition.x
        const bz = brick.body.position.z - robotPosition.z
        const distance = Math.sqrt(bx * bx + bz * bz)

        // Check if brick is in front of robot (dot product > 0)
        const toBrick = new THREE.Vector3(bx, 0, bz).normalize()
        const dot = toBrick.dot(robotForward)

        if (distance < attackRadius && dot > 0) {
          const force = 8 / Math.max(distance, 1)
          const impulse = new CANNON.Vec3(bx * force, force * 0.3, bz * force)
          brick.body.applyImpulse(impulse, brick.body.position)
          brick.body.wakeUp()
          this.attackCooldown = 0.3
        }
      }
    }
  }

  private respawnBrick(brick: Brick) {
    brick.body.position.set(brick.originalPosition.x, brick.originalPosition.y, brick.originalPosition.z)
    brick.body.velocity.set(0, 0, 0)
    brick.body.angularVelocity.set(0, 0, 0)
    brick.body.quaternion.set(0, 0, 0, 1)
    brick.respawnTimer = 0
    brick.body.wakeUp()

    // Sync mesh immediately after respawn
    copyVec3(brick.mesh.position, brick.body.position)
    copyQuat(brick.mesh.quaternion, brick.body.quaternion)
  }

  public getBricks(): Brick[] {
    return this.bricks
  }

  public dispose() {
    for (const brick of this.bricks) {
      this.scene.remove(brick.mesh)
      this.world.removeBody(brick.body)
      brick.mesh.geometry.dispose()
    }
    this.bricks = []
  }
}
