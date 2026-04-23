import * as THREE from 'three'
import * as CANNON from 'cannon-es'

export class Platform {
  private scene: THREE.Scene
  private world: CANNON.World
  private platformSize = 50
  private wallHeight = 2
  private spawnPoint = new THREE.Vector3(0, 1.5, 0)

  constructor(scene: THREE.Scene, world: CANNON.World) {
    this.scene = scene
    this.world = world
  }

  public getSpawnPoint(): THREE.Vector3 {
    return this.spawnPoint.clone()
  }

  public getSize(): number {
    return this.platformSize
  }

  public create() {
    // Main platform - simplified glass material
    const platformGeometry = new THREE.BoxGeometry(this.platformSize, 0.5, this.platformSize)
    const platformMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x88ddff,
      transparent: true,
      opacity: 0.2,
      roughness: 0.05,
      metalness: 0.0,
      transmission: 0.9,
      thickness: 0.2,
      side: THREE.DoubleSide,
    })
    const platform = new THREE.Mesh(platformGeometry, platformMaterial)
    platform.position.y = -0.25
    platform.receiveShadow = true
    platform.castShadow = true
    this.scene.add(platform)

    // Platform physics
    const platformShape = new CANNON.Box(new CANNON.Vec3(this.platformSize / 2, 0.25, this.platformSize / 2))
    const platformBody = new CANNON.Body({ mass: 0, material: new CANNON.Material('glass') })
    platformBody.addShape(platformShape)
    platformBody.position.set(0, -0.25, 0)
    this.world.addBody(platformBody)

    // Grid lines on platform
    const gridDivisions = Math.floor(this.platformSize / 2)
    const gridHelper = new THREE.GridHelper(this.platformSize, gridDivisions, 0x00d4ff, 0x004466)
    gridHelper.position.y = 0.01
    this.scene.add(gridHelper)

    // Create walls around platform edges
    this.createWalls()

    // Create some platform objects (cubes, cylinders, spheres)
    this.createPlatformObjects()
  }

  private createWalls() {
    const wallMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.15,
      roughness: 0.2,
      metalness: 0.8,
      side: THREE.DoubleSide,
    })

    const halfSize = this.platformSize / 2
    const wallPositions = [
      { pos: [0, this.wallHeight / 2, -halfSize], rot: [0, 0, 0], size: [this.platformSize, this.wallHeight, 0.1] },
      { pos: [0, this.wallHeight / 2, halfSize], rot: [0, 0, 0], size: [this.platformSize, this.wallHeight, 0.1] },
      { pos: [-halfSize, this.wallHeight / 2, 0], rot: [0, Math.PI / 2, 0], size: [this.platformSize, this.wallHeight, 0.1] },
      { pos: [halfSize, this.wallHeight / 2, 0], rot: [0, Math.PI / 2, 0], size: [this.platformSize, this.wallHeight, 0.1] },
    ]

    wallPositions.forEach(({ pos, rot, size }) => {
      const wallGeom = new THREE.BoxGeometry(size[0], size[1], size[2])
      const wall = new THREE.Mesh(wallGeom, wallMaterial)
      wall.position.set(pos[0], pos[1], pos[2])
      wall.rotation.set(rot[0], rot[1], rot[2])
      wall.castShadow = true
      wall.receiveShadow = true
      this.scene.add(wall)

      // Wall physics
      const wallShape = new CANNON.Box(new CANNON.Vec3(size[0] / 2, size[1] / 2, size[2] / 2))
      const wallBody = new CANNON.Body({ mass: 0 })
      wallBody.addShape(wallShape)
      wallBody.position.set(pos[0], pos[1], pos[2])
      wallBody.quaternion.setFromEuler(rot[0], rot[1], rot[2])
      this.world.addBody(wallBody)
    })
  }

  private createPlatformObjects() {
    // Load wood texture
    const textureLoader = new THREE.TextureLoader()
    const woodTexture = textureLoader.load('/textures/wood.jpg')
    woodTexture.wrapS = THREE.RepeatWrapping
    woodTexture.wrapT = THREE.RepeatWrapping

    // Cubes - some with wood, some with cyan glow
    const cubePositions = [
      new THREE.Vector3(-15, 1.5, -15),
      new THREE.Vector3(12, 1.5, 10),
      new THREE.Vector3(-10, 1, 18),
      new THREE.Vector3(18, 1, -8),
    ]

    cubePositions.forEach((pos, idx) => {
      const cubeGeom = new THREE.BoxGeometry(2, 2, 2)
      let cubeMat: THREE.Material

      if (idx === 0 || idx === 2) {
        // Wood texture for some cubes
        cubeMat = new THREE.MeshStandardMaterial({
          map: woodTexture,
          roughness: 0.7,
          metalness: 0.1,
        })
      } else {
        // Cyan glowing cubes
        cubeMat = new THREE.MeshStandardMaterial({
          color: 0x00d4ff,
          emissive: 0x00d4ff,
          emissiveIntensity: 0.2,
          roughness: 0.3,
          metalness: 0.7,
        })
      }

      const cube = new THREE.Mesh(cubeGeom, cubeMat)
      cube.position.copy(pos)
      cube.castShadow = false
      cube.receiveShadow = false
      this.scene.add(cube)

      // Physics - lower mass so robot can push them
      const cubeShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1))
      const cubeBody = new CANNON.Body({ mass: 2, material: new CANNON.Material('ice') })
      cubeBody.addShape(cubeShape)
      cubeBody.position.set(pos.x, pos.y, pos.z)
      cubeBody.linearDamping = 0.5
      cubeBody.angularDamping = 0.5
      this.world.addBody(cubeBody)
    })

    // Cylinders
    const cylinderPositions = [
      new THREE.Vector3(15, 1.5, -12),
      new THREE.Vector3(-15, 1, 8),
      new THREE.Vector3(8, 1, -18),
    ]

    cylinderPositions.forEach(pos => {
      const cylGeom = new THREE.CylinderGeometry(1, 1, 3, 16)
      const cylMat = new THREE.MeshStandardMaterial({
        color: 0x7b2fff,
        emissive: 0x7b2fff,
        emissiveIntensity: 0.2,
        roughness: 0.3,
        metalness: 0.7,
      })
      const cylinder = new THREE.Mesh(cylGeom, cylMat)
      cylinder.position.copy(pos)
      cylinder.castShadow = false
      cylinder.receiveShadow = false
      this.scene.add(cylinder)

      // Physics - lower mass, proper cylinder orientation
      const cylShape = new CANNON.Cylinder(1, 1, 3, 16)
      const cylBody = new CANNON.Body({ mass: 2, material: new CANNON.Material('ice') })
      cylBody.addShape(cylShape)
      cylBody.position.set(pos.x, pos.y, pos.z)
      cylBody.linearDamping = 0.5
      cylBody.angularDamping = 0.5
      this.world.addBody(cylBody)
    })

    // Spheres (with high friction to stop eventually)
    const spherePositions = [
      new THREE.Vector3(6, 2, -6),
      new THREE.Vector3(-6, 2, 12),
      new THREE.Vector3(10, 2, 15),
    ]

    // Create shared high-friction material
    const sphereMaterial = new CANNON.Material('highFriction')
    sphereMaterial.friction = 0.8
    sphereMaterial.restitution = 0.2

    spherePositions.forEach(pos => {
      const sphereGeom = new THREE.SphereGeometry(1, 32, 32)
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xff6b35,
        emissive: 0xff6b35,
        emissiveIntensity: 0.4,
        roughness: 0.6,
        metalness: 0.4,
      })
      const sphere = new THREE.Mesh(sphereGeom, sphereMat)
      sphere.position.copy(pos)
      sphere.castShadow = false
      sphere.receiveShadow = false
      this.scene.add(sphere)

      // Physics - high friction and damping so sphere eventually stops
      const sphereShape = new CANNON.Sphere(1)
      const sphereBody = new CANNON.Body({
        mass: 2,
        material: sphereMaterial,
        linearDamping: 0.8,
        angularDamping: 0.9,
      })
      sphereBody.addShape(sphereShape)
      sphereBody.position.set(pos.x, pos.y, pos.z)
      this.world.addBody(sphereBody)
    })
  }
}
