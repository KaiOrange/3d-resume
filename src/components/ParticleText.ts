import * as THREE from 'three'

interface Particle {
  position: THREE.Vector3
  startPos: THREE.Vector3
  targetPos: THREE.Vector3 | null
  originalColor: THREE.Color
  color: THREE.Color
  size: number
  isGathered: boolean
  gatherProgress: number
  oscillationOffset: number
  oscillationPhase: number
}

const PARTICLE_COUNT = 3000 // Doubled for more particles
const GATHER_DURATION = 0.8
const SCATTER_DURATION = 0.8

export class ParticleText {
  private points: THREE.Points
  private geometry: THREE.BufferGeometry
  private material: THREE.PointsMaterial
  private particles: Particle[] = []
  private positions: Float32Array
  private colors: Float32Array

  private isGathering = false
  private isScattering = false
  private isShowingText = false
  private gatherStartTime = 0
  private scatterStartTime = 0
  private textTargetPositions: THREE.Vector3[] = []
  private clock: THREE.Clock

  private goldColor = new THREE.Color('#ffd700')
  private whiteColor = new THREE.Color('#ffffff')
  private accentColor = new THREE.Color('#00d4ff')
  private nebulaColor = new THREE.Color('#7b2fff')

  constructor(scene: THREE.Scene) {
    this.clock = new THREE.Clock()
    this.positions = new Float32Array(PARTICLE_COUNT * 3)
    this.colors = new Float32Array(PARTICLE_COUNT * 3)

    this.geometry = new THREE.BufferGeometry()
    this.material = new THREE.PointsMaterial({
      size: 0.25, // Smaller particles
      vertexColors: true,
      transparent: true,
      opacity: 1,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })

    this.points = new THREE.Points(this.geometry, this.material)
    this.points.frustumCulled = false
    scene.add(this.points)

    this.initParticles()
  }

  private initParticles() {
    this.particles = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Spread particles like stars in the sky - high up and far out
      const angle = Math.random() * Math.PI * 2
      const radius = 20 + Math.random() * 50 // 20-70 units from center
      const pos = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.random() * 30 + 10, // 15-45 units high - like stars
        Math.sin(angle) * radius
      )

      // HSL colorful stars - varied hues across the spectrum
      const hue = Math.random()
      const saturation = 0.6 + Math.random() * 0.4 // 0.6-1.0
      const lightness = 0.5 + Math.random() * 0.3 // 0.5-0.8
      const color = new THREE.Color().setHSL(hue, saturation, lightness)

      this.particles.push({
        position: pos.clone(),
        startPos: pos.clone(),
        targetPos: null,
        originalColor: color.clone(),
        color: color.clone(),
        size: 0.05 + Math.random() * 0.1,
        isGathered: false,
        gatherProgress: 0,
        oscillationOffset: Math.random() * Math.PI * 2,
        oscillationPhase: Math.random() * Math.PI * 2,
      })

      const i3 = i * 3
      this.positions[i3] = pos.x
      this.positions[i3 + 1] = pos.y
      this.positions[i3 + 2] = pos.z
      this.colors[i3] = color.r
      this.colors[i3 + 1] = color.g
      this.colors[i3 + 2] = color.b
    }

    this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))
  }

  public create() {
    // Already created in constructor
  }

  public update(delta: number) {
    const elapsed = performance.now() / 1000

    if (this.isGathering) {
      this.updateGathering(elapsed)
    } else if (this.isScattering) {
      this.updateScattering(elapsed)
    } else if (this.isShowingText) {
      this.updateOscillation()
    }

    this.updateBuffers()
  }

  private updateOscillation() {
    const time = this.clock.getElapsedTime()

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = this.particles[i]
      if (p.targetPos && p.isGathered) {
        // Simple harmonic oscillation - small amplitude so text stays readable
        const ampX = 0.08
        const ampY = 0.12
        const ampZ = 0.06
        const freq = 1.5

        const offset = time * freq + p.oscillationOffset
        p.position.x = p.targetPos.x + Math.sin(offset) * ampX
        p.position.y = p.targetPos.y + Math.sin(offset * 1.3 + p.oscillationPhase) * ampY
        p.position.z = p.targetPos.z + Math.cos(offset * 0.8) * ampZ
      }
    }
  }

  private updateGathering(currentTime: number) {
    const elapsed = currentTime - this.gatherStartTime
    const progress = Math.min(elapsed / GATHER_DURATION, 1)
    const t = this.easeOutCubic(progress)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = this.particles[i]

      // Only particles within textTargetPositions count
      if (i < this.textTargetPositions.length && this.textTargetPositions[i]) {
        if (!p.isGathered) {
          p.isGathered = true
          p.startPos.copy(p.position)
          p.targetPos = this.textTargetPositions[i].clone()
        }

        if (p.targetPos) {
          p.position.lerpVectors(p.startPos, p.targetPos, t)
        }
        // Keep original color - no color transition during gathering
      } else {
        // Particles not in text - drift randomly (don't gather)
        p.isGathered = false
        p.targetPos = null
      }
    }

    if (progress >= 1) {
      this.isGathering = false
      this.isShowingText = true
    }
  }

  private updateScattering(currentTime: number) {
    const elapsed = currentTime - this.scatterStartTime
    const progress = Math.min(elapsed / SCATTER_DURATION, 1)
    const t = this.easeOutCubic(progress)

    for (const p of this.particles) {
      if (p.isGathered && p.targetPos) {
        // Return to original start position smoothly
        p.position.lerpVectors(p.targetPos, p.startPos, t)
      }

                  // Keep original color during scatter

      if (progress >= 1) {
        p.isGathered = false
        p.targetPos = null
      }
    }

    if (progress >= 1) {
      this.isScattering = false
      this.isShowingText = false
    }
  }

  private updateBuffers() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = this.particles[i]
      const i3 = i * 3
      this.positions[i3] = p.position.x
      this.positions[i3 + 1] = p.position.y
      this.positions[i3 + 2] = p.position.z
      this.colors[i3] = p.color.r
      this.colors[i3 + 1] = p.color.g
      this.colors[i3 + 2] = p.color.b
    }

    this.geometry.attributes.position.needsUpdate = true
    this.geometry.attributes.color.needsUpdate = true
  }

  private easeOutCubic(t: number): number {
    return 1 - Math.pow(1 - t, 3)
  }

  private generateTextPositions(lines: string[], centerPos: THREE.Vector3) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const lineCount = lines.length

    // Smaller font size for appropriate world scale
    const baseFontSize = 60
    const lineHeight = baseFontSize * 0.8

    canvas.width = 1024
    canvas.height = lineCount * lineHeight + 50

    // Clear with black
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw white text with letter spacing
    ctx.fillStyle = '#ffffff'
    ctx.font = `bold ${baseFontSize}px Microsoft YaHei, Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const textY = canvas.height / 2
    const line = lines[0]
    const charCount = line.length
    const letterSpacing = baseFontSize * 0.3

    // Calculate total text width for centering
    let totalTextWidth = 0
    for (let i = 0; i < charCount; i++) {
      totalTextWidth += ctx.measureText(line[i]).width
      if (i < charCount - 1) totalTextWidth += letterSpacing
    }

    // Draw each character centered
    let currentX = (canvas.width - totalTextWidth) / 2
    for (let i = 0; i < charCount; i++) {
      const charWidth = ctx.measureText(line[i]).width
      ctx.fillText(line[i], currentX + charWidth / 2, textY)
      currentX += charWidth + letterSpacing
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    this.textTargetPositions = []

    // World scale - X wider, Y smaller
    const worldScaleX = 1.5
    const worldScaleY = 0.45
    const textWidthWorld = totalTextWidth * worldScaleX
    const textHeightWorld = canvas.height * worldScaleY

    const sampleStep = 2
    for (let y = 0; y < canvas.height; y += sampleStep) {
      for (let x = 0; x < canvas.width; x += sampleStep) {
        const i = (y * canvas.width + x) * 4
        if (pixels[i] > 200) {
          // Map canvas coords to world coords - properly centered (flipped X for mirror)
          const worldX = -((x - canvas.width / 2) / canvas.width) * textWidthWorld
          const worldY = -((y - canvas.height / 2) / canvas.height) * textHeightWorld

          // Small random jitter for organic look
          const jitterX = (Math.random() - 0.5) * 0.8
          const jitterY = (Math.random() - 0.5) * 0.5

          this.textTargetPositions.push(new THREE.Vector3(
            centerPos.x + worldX + jitterX,
            centerPos.y + worldY + jitterY,
            centerPos.z
          ))
        }
      }
    }

    console.log('Generated text positions:', this.textTargetPositions.length)
  }

  public gatherLines(lines: string[], targetPosition: THREE.Vector3) {
    if (this.isGathering) return

    this.isGathering = true
    this.isScattering = false
    this.gatherStartTime = performance.now() / 1000

    for (const p of this.particles) {
      p.isGathered = false
      p.gatherProgress = 0
      p.targetPos = null
    }

    // Position text at sky level, very far from platform - centered on target
    const textPos = targetPosition.clone()
    textPos.y += 12  // In the sky
    textPos.z += 50 // Very very far ahead

    this.generateTextPositions(lines, textPos)
  }

  public scatter() {
    if (this.isScattering || !this.isShowingText) return
    this.isGathering = false
    this.isScattering = true
    this.scatterStartTime = performance.now() / 1000
  }

  public isActive(): boolean {
    return this.isGathering || this.isScattering
  }

  public hasTextVisible(): boolean {
    return this.isShowingText
  }
}
