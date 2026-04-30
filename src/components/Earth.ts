import * as THREE from 'three'

export class Earth {
  private earth!: THREE.Mesh
  private clouds!: THREE.Mesh
  private scene: THREE.Scene
  private orbitRadius = 40
  private orbitSpeed = 0.08
  private angle = Math.random() * Math.PI * 2
  private earthTexture: THREE.Texture | null = null

  constructor(scene: THREE.Scene, _sunPosition: THREE.Vector3) {
    this.scene = scene
  }

  public loadTexture(): Promise<void> {
    return new Promise((resolve) => {
      const loader = new THREE.TextureLoader()
      loader.load('/textures/2k_earth_daymap.jpg', (texture) => {
        this.earthTexture = texture
        resolve()
      })
    })
  }

  public create() {
    const earthGeom = new THREE.SphereGeometry(2, 64, 64)

    const earthMat = new THREE.MeshStandardMaterial({
      map: this.earthTexture || undefined,
      roughness: 0.8,
      metalness: 0.1,
    })

    this.earth = new THREE.Mesh(earthGeom, earthMat)
    this.earth.castShadow = true
    this.earth.receiveShadow = true
    this.scene.add(this.earth)

    // Clouds layer
    const cloudsGeom = new THREE.SphereGeometry(2.05, 64, 64)
    const cloudsMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.25,
      roughness: 1,
    })
    this.clouds = new THREE.Mesh(cloudsGeom, cloudsMat)
    this.scene.add(this.clouds)

    this.updateOrbit()
  }

  public update(delta: number) {
    this.angle += this.orbitSpeed * delta
    this.updateOrbit()

    this.earth.rotation.y += delta * 0.3
    this.clouds.rotation.y += delta * 0.35
  }

  private updateOrbit() {
    const x = Math.cos(this.angle) * this.orbitRadius
    const z = Math.sin(this.angle) * this.orbitRadius

    this.earth.position.set(x, 20, z)
    this.clouds.position.set(x, 20, z)
  }

  public getPosition(): THREE.Vector3 {
    return this.earth.position.clone()
  }

  public dispose() {
    this.scene.remove(this.earth)
    this.scene.remove(this.clouds)
    this.earth.geometry.dispose()
    ;(this.earth.material as THREE.MeshStandardMaterial).map?.dispose()
    ;(this.earth.material as THREE.MeshStandardMaterial).dispose()
    this.clouds.geometry.dispose()
    ;(this.clouds.material as THREE.MeshStandardMaterial).dispose()
  }
}
