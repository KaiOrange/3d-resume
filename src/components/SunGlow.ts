import * as THREE from 'three'

export class SunGlow {
  private sprite!: THREE.Sprite
  private scene: THREE.Scene
  private sunPosition: THREE.Vector3

  constructor(scene: THREE.Scene, sunPosition: THREE.Vector3) {
    this.scene = scene
    this.sunPosition = sunPosition.clone()
  }

  public create() {
    // Create a soft glow texture
    const glowTexture = this.createGlowTexture()
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      color: 0xffdd44,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })

    this.sprite = new THREE.Sprite(glowMaterial)
    this.sprite.position.copy(this.sunPosition)
    this.sprite.scale.set(50, 50, 1)
    this.scene.add(this.sprite)
  }

  private createGlowTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')!

    // Soft radial gradient for glow
    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.1, 'rgba(255, 240, 200, 0.9)')
    gradient.addColorStop(0.3, 'rgba(255, 200, 100, 0.5)')
    gradient.addColorStop(0.6, 'rgba(255, 150, 50, 0.2)')
    gradient.addColorStop(1, 'rgba(255, 100, 0, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)

    return new THREE.CanvasTexture(canvas)
  }

  public update(cameraPosition: THREE.Vector3, cameraLookAt: THREE.Vector3) {
    // Make glow visible when looking toward sun
    const toSun = this.sunPosition.clone().sub(cameraPosition).normalize()
    const cameraDir = cameraLookAt.clone().sub(cameraPosition).normalize()
    const dot = toSun.dot(cameraDir)

    // Fade in when looking toward sun
    const opacity = Math.max(0, dot) * 0.6
    ;(this.sprite.material as THREE.SpriteMaterial).opacity = opacity

    // Scale based on distance
    const distance = this.sunPosition.distanceTo(cameraPosition)
    const scale = (distance / 100) * 40
    this.sprite.scale.set(scale, scale, 1)
  }

  public dispose() {
    this.scene.remove(this.sprite)
    ;(this.sprite.material as THREE.SpriteMaterial).map?.dispose()
    ;(this.sprite.material as THREE.SpriteMaterial).dispose()
  }
}
