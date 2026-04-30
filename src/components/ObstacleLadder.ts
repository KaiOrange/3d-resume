import * as THREE from 'three'
import * as CANNON from 'cannon-es'

interface Obstacle {
  mesh: THREE.Mesh
  body: CANNON.Body
  position: THREE.Vector3
  size: THREE.Vector3
}

export class ObstacleLadder {
  private scene: THREE.Scene
  private world: CANNON.World
  private obstacles: Obstacle[] = []
  private obstacle6Mesh!: THREE.Mesh
  private obstacle6Body!: CANNON.Body
  private obstacle6BaseY = 5
  private obstacle7Mesh!: THREE.Mesh
  private obstacle7Body!: CANNON.Body
  private obstacle7Visible = true
  private blinkTimer = 0
  private readonly BLINK_INTERVAL = 2.5

  constructor(scene: THREE.Scene, world: CANNON.World) {
    this.scene = scene
    this.world = world
  }

  public create() {
    const stoneTexture = new THREE.TextureLoader().load('/textures/stone.png')
    stoneTexture.wrapS = THREE.RepeatWrapping
    stoneTexture.wrapT = THREE.RepeatWrapping

    const stoneMat = new THREE.MeshStandardMaterial({
      map: stoneTexture,
      roughness: 0.8,
      metalness: 0.2,
    })

    const obstacleMat = new CANNON.Material('obstacle')

    const defs: { pos: [number, number, number]; size: [number, number, number] }[] = [
      { pos: [-9, 4, 6], size: [2, 1.5, 2] },
      { pos: [-13, 5, 6], size: [2, 1.5, 2] },
      { pos: [-17, 7, 8], size: [2, 1.5, 6] },
      { pos: [-17, 7, 14], size: [2, 1.5, 2] },
      { pos: [-17, 8, 18], size: [4, 1.5, 2] },
      { pos: [-17, 10, 23], size: [4, 1.5, 4] },
    ]

    defs.forEach((def, index) => {
      const geom = new THREE.BoxGeometry(def.size[0], def.size[1], def.size[2])
      const mesh = new THREE.Mesh(geom, stoneMat.clone())
      mesh.position.set(def.pos[0], def.pos[1], def.pos[2])
      mesh.castShadow = false
      mesh.receiveShadow = false
      this.scene.add(mesh)

      const halfW = def.size[0] / 2
      const halfH = def.size[1] / 2
      const halfD = def.size[2] / 2

      // Sensor body (group 8): no physics collision with character
      const body = new CANNON.Body({ mass: 0, material: obstacleMat, collisionFilterGroup: 8 })
      body.addShape(new CANNON.Box(new CANNON.Vec3(halfW, halfH, halfD)))
      body.position.set(def.pos[0], def.pos[1], def.pos[2])
      this.world.addBody(body)

      const obstacle: Obstacle = {
        mesh,
        body,
        position: new THREE.Vector3(def.pos[0], def.pos[1], def.pos[2]),
        size: new THREE.Vector3(def.size[0], def.size[1], def.size[2]),
      }
      this.obstacles.push(obstacle)

      if (index === 3) {
        this.obstacle6Mesh = mesh
        this.obstacle6Body = body
        this.obstacle6BaseY = def.pos[1]
      }
      if (index === 4) {
        this.obstacle7Mesh = mesh
        this.obstacle7Body = body
      }
    })
  }

  public update(delta: number) {
    const time = performance.now() / 1000

    // #6: oscillation (SHM)
    const newY = this.obstacle6BaseY + 1.5 * Math.sin(time * 2.5)
    this.obstacle6Mesh.position.y = newY
    this.obstacle6Body.position.y = newY

    // #7: blink
    this.blinkTimer += delta
    if (this.blinkTimer >= this.BLINK_INTERVAL) {
      this.blinkTimer = 0
      this.obstacle7Visible = !this.obstacle7Visible
    }
    this.obstacle7Mesh.visible = this.obstacle7Visible
    this.obstacle7Body.collisionResponse = this.obstacle7Visible
  }

  public isOnObstacle8(robotPos: THREE.Vector3): boolean {
    const obs = this.obstacles[5]
    const dx = Math.abs(robotPos.x - obs.position.x)
    const dz = Math.abs(robotPos.z - obs.position.z)
    const halfW = obs.size.x / 2
    const halfD = obs.size.z / 2
    const topY = obs.position.y + obs.size.y / 2
    return dx < halfW + 0.5 && dz < halfD + 0.5 && robotPos.y >= topY - 0.2 && robotPos.y < topY + 2
  }

  public isObstacle7Visible(): boolean {
    return this.obstacle7Visible
  }

  public getObstacle6Y(): number {
    return this.obstacle6Mesh.position.y
  }

  /** Check if position is above any obstacle. Returns top Y or null. */
  public getSurfaceY(pos: THREE.Vector3): number | null {
    for (const obs of this.obstacles) {
      if (!obs.mesh.visible) continue
      const halfW = obs.size.x / 2
      const halfH = obs.size.y / 2
      const halfD = obs.size.z / 2
      const topY = obs.mesh.position.y + halfH
      const dx = Math.abs(pos.x - obs.mesh.position.x)
      const dz = Math.abs(pos.z - obs.mesh.position.z)
      // Horizontal: must be within obstacle bounds
      // Vertical: feet must be near or slightly above surface
      if (dx < halfW && dz < halfD && pos.y >= topY - 0.4 && pos.y <= topY + 0.5) {
        return topY
      }
    }
    return null
  }

  public dispose() {
    for (const obs of this.obstacles) {
      this.scene.remove(obs.mesh)
      obs.mesh.geometry.dispose()
      if (obs.mesh.material instanceof THREE.Material) {
        obs.mesh.material.dispose()
      }
      this.world.removeBody(obs.body)
    }
    this.obstacles = []
  }
}
