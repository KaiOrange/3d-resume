import * as THREE from 'three'
import { TextureLoader } from 'three'

export class Sun {
  private sun!: THREE.Mesh
  private light!: THREE.DirectionalLight
  private scene: THREE.Scene
  private sunTexture: THREE.Texture | null = null

  constructor(scene: THREE.Scene) {
    this.scene = scene
  }

  public loadTexture(): Promise<void> {
    return new Promise((resolve) => {
      const loader = new TextureLoader()
      loader.load('/textures/2k_sun.jpg', (texture) => {
        texture.minFilter = THREE.LinearFilter
        texture.magFilter = THREE.LinearFilter
        this.sunTexture = texture
        resolve()
      })
    })
  }

  public create() {
    // Main sun sphere with texture
    const sunGeom = new THREE.SphereGeometry(8, 64, 64)
    const sunMat = new THREE.MeshBasicMaterial({
      map: this.sunTexture || undefined,
    })

    this.sun = new THREE.Mesh(sunGeom, sunMat)
    this.sun.position.set(60, 110, -100)
    this.scene.add(this.sun)

    // Create simple glow sprite using canvas texture
    const glowTexture = this.createGlowTexture()
    const glowMat = new THREE.SpriteMaterial({
      map: glowTexture,
      color: 0xffffee,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    })

    const glow = new THREE.Sprite(glowMat)
    glow.position.copy(this.sun.position)
    glow.scale.set(60, 60, 1)
    this.scene.add(glow)

    // Point light at sun
    const sunLight = new THREE.PointLight(0xfff4e0, 3, 500)
    sunLight.position.copy(this.sun.position)
    this.scene.add(sunLight)

    // Main directional light for shadows
    this.light = new THREE.DirectionalLight(0xfff4e0, 2.0)
    this.light.position.copy(this.sun.position)
    this.light.castShadow = true
    this.light.shadow.mapSize.width = 1024
    this.light.shadow.mapSize.height = 1024
    this.light.shadow.camera.near = 10
    this.light.shadow.camera.far = 600
    this.light.shadow.camera.left = -50
    this.light.shadow.camera.right = 50
    this.light.shadow.camera.top = 50
    this.light.shadow.camera.bottom = -50
    this.light.shadow.bias = -0.001
    this.scene.add(this.light)

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x607090, 0.8)
    this.scene.add(ambientLight)

    // Hemisphere light
    const hemiLight = new THREE.HemisphereLight(0x87ceeb, 0x2a2a4e, 0.6)
    this.scene.add(hemiLight)
  }

  private createGlowTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')!

    // Create radial gradient for sun glow
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.1, 'rgba(255, 255, 200, 0.9)')
    gradient.addColorStop(0.3, 'rgba(255, 220, 100, 0.5)')
    gradient.addColorStop(0.6, 'rgba(255, 150, 50, 0.2)')
    gradient.addColorStop(1, 'rgba(255, 100, 0, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)

    return new THREE.CanvasTexture(canvas)
  }

  public getPosition(): THREE.Vector3 {
    return this.sun.position.clone()
  }

  public getLightDirection(): THREE.Vector3 {
    return this.sun.position.clone().normalize()
  }

  public dispose() {
    this.scene.remove(this.sun)
    this.sun.geometry.dispose()
    ;(this.sun.material as THREE.MeshBasicMaterial).map?.dispose()
    ;(this.sun.material as THREE.MeshBasicMaterial).dispose()
  }
}
