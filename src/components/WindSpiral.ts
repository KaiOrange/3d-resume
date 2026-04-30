import * as THREE from 'three'

interface SpiralSprite {
  sprite: THREE.Sprite
  startPosition: THREE.Vector3
  randomness: number
  baseColor: THREE.Color
}

export class WindSpiral {
  private scene: THREE.Scene
  private spriteGroup: THREE.Group | null = null
  private sprites: SpiralSprite[] = []
  private zonePosition: THREE.Vector3 = new THREE.Vector3()
  private intensity: number = 0
  private clock: THREE.Clock
  private particleTexture: THREE.Texture | null = null

  // GTA-style colors: red-purple-pink gradient
  private colorPalette = [
    new THREE.Color('#ff1744'), // bright red
    new THREE.Color('#e91e63'), // pink
    new THREE.Color('#ff4081'), // accent pink
    new THREE.Color('#ff5252'), // red
    new THREE.Color('#d500f9'), // purple
    new THREE.Color('#ff0080'), // hot pink
  ]

  constructor(scene: THREE.Scene) {
    this.scene = scene
    this.clock = new THREE.Clock()
  }

  private createSparkTexture(): THREE.Texture {
    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32
    const ctx = canvas.getContext('2d')!

    // Sharp center with quick falloff
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)')
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.1)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 32, 32)

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.LinearMipmapLinearFilter
    return texture
  }

  public createSpiralForZone(zonePosition: THREE.Vector3, _color: string = '#ff1744') {
    this.zonePosition = zonePosition.clone()

    // Create spark texture programmatically (no black edges)
    this.particleTexture = this.createSparkTexture()

    // Create sprite group - higher position
    this.spriteGroup = new THREE.Group()
    this.spriteGroup.position.copy(zonePosition)
    this.spriteGroup.position.y += 2 // Higher starting position
    this.spriteGroup.visible = false
    this.scene.add(this.spriteGroup)

    // Create multicolor glowing particles
    const totalParticles = 60
    const radiusRange = 4

    for (let i = 0; i < totalParticles; i++) {
      // Pick random color from palette
      const baseColor = this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)]

      const spriteMaterial = new THREE.SpriteMaterial({
        map: this.particleTexture,
        color: baseColor.clone(),
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })

      const sprite = new THREE.Sprite(spriteMaterial)
      sprite.scale.set(0.25, 0.25, 1.0)

      // Spiral pattern - more vertical spread
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.6 // Less vertical constraint
      const r = radiusRange * (0.3 + Math.random() * 0.7)

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.cos(phi) * 1.5 // More vertical spread
      const z = r * Math.sin(phi) * Math.sin(theta)

      sprite.position.set(x, y, z)

      this.spriteGroup.add(sprite)

      this.sprites.push({
        sprite,
        startPosition: sprite.position.clone(),
        randomness: Math.random(),
        baseColor: baseColor.clone(),
      })
    }
  }

  public update(delta: number, playerPosition: THREE.Vector3, _isAttacking: boolean, isOnZone: boolean) {
    if (!this.spriteGroup) return

    const time = this.clock.getElapsedTime()

    // Calculate distance to player
    const dist = playerPosition.distanceTo(this.zonePosition)
    const activationRadius = 16 // Doubled from 8 to 16

    // Always show some particles when near, full intensity when on zone
    let targetIntensity = 0.0
    if (isOnZone) {
      targetIntensity = 1.0
    } else if (dist < activationRadius) {
      targetIntensity = 0.25 + (1 - dist / activationRadius) * 0.25
    }

    // Smooth intensity transition
    this.intensity += (targetIntensity - this.intensity) * delta * 5
    this.intensity = Math.max(0, Math.min(1.0, this.intensity))

    // Only visible when has intensity
    this.spriteGroup.visible = this.intensity > 0.05

    if (this.intensity > 0.05) {
      // Speed up significantly when on zone
      const speedMult = isOnZone ? 4.0 : 1.0

      for (const sp of this.sprites) {
        // Pulsing effect
        const a = sp.randomness + 0.75
        const pulseFactor = Math.sin(a * time * speedMult) * 0.2 + 0.85

        sp.sprite.position.x = sp.startPosition.x * pulseFactor
        sp.sprite.position.y = sp.startPosition.y * pulseFactor
        sp.sprite.position.z = sp.startPosition.z * pulseFactor

        // Update opacity based on intensity
        const mat = sp.sprite.material as THREE.SpriteMaterial
        mat.opacity = this.intensity * 0.85

        // Subtle color pulsing
        const hueShift = Math.sin(time * 2 + sp.randomness * 10) * 0.05
        mat.color.copy(sp.baseColor).offsetHSL(hueShift, 0, 0)
      }

      // Rotate the entire group - faster when on zone
      this.spriteGroup.rotation.y = time * 1.5 * speedMult * this.intensity
    }
  }

  public setActive(active: boolean) {
    this.intensity = active ? 1 : 0
  }

  public dispose() {
    if (this.spriteGroup) {
      this.scene.remove(this.spriteGroup)
      for (const sp of this.sprites) {
        sp.sprite.geometry.dispose()
        ;(sp.sprite.material as THREE.Material).dispose()
      }
      if (this.particleTexture) {
        this.particleTexture.dispose()
      }
      this.sprites = []
      this.spriteGroup = null
    }
  }
}
