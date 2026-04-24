import * as THREE from 'three'
import * as CANNON from 'cannon-es'

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
  private isInitialized = false
  private initTimer = 0
  private readonly INIT_DELAY = 0.5  // Seconds before bricks become dynamic
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
    const startY = this.wallPosition.y + this.brickHeight / 2 + 0.01
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

    // Cannon-es body
    const shape = new CANNON.Box(new CANNON.Vec3(this.brickWidth / 2, this.brickHeight / 2, this.brickDepth / 2))
    const body = new CANNON.Body({
      mass: 2,
      material: this.brickMaterial,
      linearDamping: 0.3,
      angularDamping: 0.5,
    })
    body.addShape(shape)
    body.position.set(x, y, z)
    body.type = CANNON.Body.STATIC  // Start as static
    this.world.addBody(body)

    this.bricks.push({
      mesh,
      body,
      originalPosition: new THREE.Vector3(x, y, z),
      respawnTimer: 0,
    })
  }

  public update(delta: number, robotPosition: THREE.Vector3, isAttacking: boolean) {
    const attackRadius = 4.0

    // Initialize bricks after a short delay - make them dynamic
    if (!this.isInitialized) {
      this.initTimer += delta
      if (this.initTimer >= this.INIT_DELAY) {
        for (const brick of this.bricks) {
          brick.body.type = CANNON.Body.DYNAMIC
          brick.body.mass = 2
          brick.body.updateMassProperties()
          brick.body.wakeUp()
        }
        this.isInitialized = true
      }
    }

    // Cooldown between attack impulses
    if (this.attackCooldown > 0) {
      this.attackCooldown -= delta
    }

    for (const brick of this.bricks) {
      // Sync mesh with physics body
      brick.mesh.position.copy(brick.body.position as unknown as THREE.Vector3)
      brick.mesh.quaternion.copy(brick.body.quaternion as unknown as THREE.Quaternion)

      // Check if brick fell off platform
      if (brick.body.position.y < -10) {
        brick.respawnTimer += delta
        if (brick.respawnTimer > this.respawnDelay) {
          this.respawnBrick(brick)
        }
      }

      // Apply attack impulse when robot attacks nearby (only once per attack)
      if (isAttacking && this.attackCooldown <= 0) {
        const dx = brick.body.position.x - robotPosition.x
        const dz = brick.body.position.z - robotPosition.z
        const distance = Math.sqrt(dx * dx + dz * dz)

        if (distance < attackRadius) {
          // Reduced force - just enough to nudge the brick
          const force = 8 / Math.max(distance, 1)
          const impulse = new CANNON.Vec3(dx * force, force * 0.3, dz * force)
          brick.body.applyImpulse(impulse, brick.body.position)
          brick.body.wakeUp()
          this.attackCooldown = 0.3 // Only apply once per 0.3 seconds
        }
      }
    }
  }

  private respawnBrick(brick: Brick) {
    brick.body.position.copy(brick.originalPosition as unknown as CANNON.Vec3)
    brick.body.velocity.set(0, 0, 0)
    brick.body.angularVelocity.set(0, 0, 0)
    brick.body.quaternion.set(0, 0, 0, 1)
    brick.respawnTimer = 0
    brick.body.wakeUp()
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
