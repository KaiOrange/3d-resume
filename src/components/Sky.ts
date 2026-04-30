import * as THREE from 'three'
import { isMobileDevice } from '../utils/device'

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
      const texturePath = isMobileDevice() ? '/textures/2k_stars_milky_way.jpg' : '/textures/8k_stars_milky_way.jpg'
      loader.load(texturePath, (texture) => {
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        this.skyTexture = texture
        resolve()
      })
    })
  }

  public create() {
    // Sky dome that follows camera - large enough to not block nebula
    const skyGeom = new THREE.SphereGeometry(500, 64, 64)
    const skyMat = new THREE.MeshBasicMaterial({
      map: this.skyTexture || undefined,
      side: THREE.BackSide,
      depthWrite: false,
    })

    this.skySphere = new THREE.Mesh(skyGeom, skyMat)
    this.skySphere.renderOrder = 0
    this.scene.add(this.skySphere)
  }

  public update(_delta: number) {
    // Sky follows camera exactly - no lag
    if (this.camera) {
      const camPos = this.camera.position
      this.skySphere.position.set(camPos.x, camPos.y, camPos.z)
    }
  }

  public dispose() {
    this.scene.remove(this.skySphere)
    this.skySphere.geometry.dispose()
    ;(this.skySphere.material as THREE.MeshBasicMaterial).map?.dispose()
    ;(this.skySphere.material as THREE.MeshBasicMaterial).dispose()
  }
}
