import * as THREE from 'three'

export class Sky {
  private skySphere!: THREE.Mesh
  private scene: THREE.Scene
  private skyTexture: THREE.Texture | null = null
  private camera: THREE.Camera | null = null

  constructor(scene: THREE.Scene) {
    this.scene = scene
  }

  public setCamera(camera: THREE.Camera) {
    this.camera = camera
  }

  public loadTexture(): Promise<void> {
    return new Promise((resolve) => {
      const loader = new THREE.TextureLoader()
      loader.load('/textures/2k_stars_milky_way.jpg', (texture) => {
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        this.skyTexture = texture
        resolve()
      })
    })
  }

  public create() {
    // Sky dome that follows camera - large enough to not block nebula
    const skyGeom = new THREE.SphereGeometry(10000, 32, 32)
    const skyMat = new THREE.MeshBasicMaterial({
      map: this.skyTexture || undefined,
      side: THREE.BackSide,
      depthWrite: false,
    })

    this.skySphere = new THREE.Mesh(skyGeom, skyMat)
    this.skySphere.renderOrder = 0
    this.scene.add(this.skySphere)
  }

  public update(delta: number) {
    // Sky follows camera exactly - no lag
    if (this.camera) {
      const camPos = this.camera.position
      this.skySphere.position.set(camPos.x, camPos.y, camPos.z)
    }
  }
}
