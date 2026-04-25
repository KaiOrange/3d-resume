import * as THREE from 'three'

interface Particle {
  position: THREE.Vector3
  startPos: THREE.Vector3
  targetPos: THREE.Vector3 | null
  originalColor: THREE.Color
  color: THREE.Color
  startColor?: THREE.Color
  targetColor?: THREE.Color | null
  size: number
  isGathered: boolean
  gatherProgress: number
  oscillationOffset: number
  oscillationPhase: number
  isVisible: boolean
  isPooled: boolean
  spawnPosition: THREE.Vector3
}

const PARTICLE_COUNT = 1000
const MAX_PARTICLES = 2000
const GATHER_RATIO = 0.3
const GATHER_DURATION = 0.8
const SCATTER_DURATION = 0.8

export class ParticleText {
  private points: THREE.Points
  private geometry: THREE.BufferGeometry
  private material: THREE.PointsMaterial
  private particles: Particle[] = []
  private positions: Float32Array
  private colors: Float32Array
  private activeParticleCount: number = PARTICLE_COUNT

  private isGathering = false
  private isScattering = false
  private isShowingText = false
  private gatherStartTime = 0
  private scatterStartTime = 0
  private textTargetPositions: THREE.Vector3[] = []
  private textTargetColors: THREE.Color[] = []
  private gatherParticleCount = 0
  private clock: THREE.Clock

  constructor(scene: THREE.Scene) {
    this.clock = new THREE.Clock()
    this.positions = new Float32Array(MAX_PARTICLES * 3)
    this.colors = new Float32Array(MAX_PARTICLES * 3)

    this.geometry = new THREE.BufferGeometry()
    this.material = new THREE.PointsMaterial({
      size: 0.25,
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
      const angle = Math.random() * Math.PI * 2
      const radius = 20 + Math.random() * 50
      const pos = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.random() * 30 + 10,
        Math.sin(angle) * radius
      )

      const hue = Math.random()
      const saturation = 0.6 + Math.random() * 0.4
      const lightness = 0.5 + Math.random() * 0.3
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
        isVisible: true,
        isPooled: false,
        spawnPosition: pos.clone(),
      })

      const i3 = i * 3
      this.positions[i3] = pos.x
      this.positions[i3 + 1] = pos.y
      this.positions[i3 + 2] = pos.z
      this.colors[i3] = color.r
      this.colors[i3 + 1] = color.g
      this.colors[i3 + 2] = color.b
    }

    this.activeParticleCount = PARTICLE_COUNT
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

  public forceGatherAtCurrentPosition(position: THREE.Vector3, lines: string[]) {
    // Force stop scatter and restart gather at current position
    this.isScattering = false
    this.isShowingText = false

    // Reset particles to gathered state at current position
    for (let i = 0; i < this.activeParticleCount; i++) {
      const p = this.particles[i]
      p.isGathered = true
      p.startPos.copy(p.position)
      p.targetPos = null
    }

    // Restart gather
    this.gatherLines(lines, position)
  }

  private updateOscillation() {
    const time = this.clock.getElapsedTime()

    for (let i = 0; i < this.activeParticleCount; i++) {
      const p = this.particles[i]
      if (!p.isVisible) continue
      if (p.targetPos && p.isGathered) {
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

    for (let i = 0; i < this.activeParticleCount; i++) {
      const p = this.particles[i]
      if (!p.isVisible) continue

      if (i < this.gatherParticleCount && i < this.textTargetPositions.length && this.textTargetPositions[i]) {
        if (!p.isGathered) {
          p.isGathered = true
          p.startPos.copy(p.position)
          p.startColor = p.color.clone()
          p.targetPos = this.textTargetPositions[i].clone()

          // Set target color from image if available
          if (i < this.textTargetColors.length && this.textTargetColors[i]) {
            p.targetColor = this.textTargetColors[i].clone()
          }
        }

        if (p.targetPos) {
          p.position.lerpVectors(p.startPos, p.targetPos, t)
        }

        // Lerp color to target color
        if (p.targetColor) {
          p.color.lerpColors(p.startColor || p.originalColor, p.targetColor, t)
        }
      } else {
        p.isGathered = false
        p.targetPos = null
        p.targetColor = null
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

    for (let i = 0; i < this.activeParticleCount; i++) {
      const p = this.particles[i]
      if (!p.isVisible) continue

      if (p.isGathered && p.targetPos) {
        p.position.lerpVectors(p.targetPos, p.startPos, t)
        // Also lerp color back to original
        if (p.targetColor) {
          p.color.lerpColors(p.targetColor, p.originalColor, t)
        }
      }

      if (progress >= 1) {
        p.isGathered = false
        p.targetPos = null
        p.targetColor = null
        // Reset position and color completely
        p.position.copy(p.startPos)
        p.color.copy(p.originalColor)
      }
    }

    if (progress >= 1) {
      this.isScattering = false
      this.isShowingText = false

      // Hide pooled particles after scatter completes
      for (let i = PARTICLE_COUNT; i < this.activeParticleCount; i++) {
        const p = this.particles[i]
        if (p.isPooled) {
          p.isVisible = false
        }
      }
    }
  }

  private updateBuffers() {
    for (let i = 0; i < this.activeParticleCount; i++) {
      const p = this.particles[i]
      const i3 = i * 3

      if (p.isVisible) {
        this.positions[i3] = p.position.x
        this.positions[i3 + 1] = p.position.y
        this.positions[i3 + 2] = p.position.z
      } else {
        this.positions[i3] = 99999
        this.positions[i3 + 1] = 99999
        this.positions[i3 + 2] = 99999
      }

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

    const baseFontSize = 60
    const lineHeight = baseFontSize * 0.8

    canvas.width = 1024
    canvas.height = lineCount * lineHeight + 50

    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#ffffff'
    ctx.font = `bold ${baseFontSize}px Microsoft YaHei, Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const textY = canvas.height / 2
    const line = lines[0]
    const charCount = line.length
    const letterSpacing = baseFontSize * 0.3

    let totalTextWidth = 0
    for (let i = 0; i < charCount; i++) {
      totalTextWidth += ctx.measureText(line[i]).width
      if (i < charCount - 1) totalTextWidth += letterSpacing
    }

    let currentX = (canvas.width - totalTextWidth) / 2
    for (let i = 0; i < charCount; i++) {
      const charWidth = ctx.measureText(line[i]).width
      ctx.fillText(line[i], currentX + charWidth / 2, textY)
      currentX += charWidth + letterSpacing
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    this.textTargetPositions = []

    const worldScaleX = 1.5
    const worldScaleY = 0.45
    const textWidthWorld = totalTextWidth * worldScaleX
    const textHeightWorld = canvas.height * worldScaleY

    const sampleStep = 2
    for (let y = 0; y < canvas.height; y += sampleStep) {
      for (let x = 0; x < canvas.width; x += sampleStep) {
        const i = (y * canvas.width + x) * 4
        if (pixels[i] > 200) {
          const worldX = -((x - canvas.width / 2) / canvas.width) * textWidthWorld
          const worldY = -((y - canvas.height / 2) / canvas.height) * textHeightWorld

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

  public prepareGather() {
    // Show all particles including pooled ones
    for (let i = 0; i < this.activeParticleCount; i++) {
      const p = this.particles[i]
      if (p.isPooled && !p.isVisible) {
        p.isVisible = true
        p.position.copy(p.spawnPosition)
      }
    }
  }

  public gatherLines(lines: string[], targetPosition: THREE.Vector3) {
    // Force stop any ongoing scatter and restart gather
    this.isGathering = true
    this.isScattering = false
    this.isShowingText = false
    this.gatherStartTime = performance.now() / 1000

    // Generate text positions first
    const textPos = targetPosition.clone()
    textPos.y += 12
    textPos.z += 50
    this.generateTextPositions(lines, textPos)

    const textPosCount = this.textTargetPositions.length
    const baseGatherCount = Math.floor(PARTICLE_COUNT * GATHER_RATIO)

    // If text needs more particles, create pooled particles
    if (textPosCount > baseGatherCount && this.activeParticleCount < MAX_PARTICLES) {
      const deficit = Math.min(textPosCount - baseGatherCount, MAX_PARTICLES - this.activeParticleCount)

      for (let i = 0; i < deficit; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = 20 + Math.random() * 50
        const spawnPos = new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.random() * 30 + 10,
          Math.sin(angle) * radius
        )

        const hue = Math.random()
        const saturation = 0.6 + Math.random() * 0.4
        const lightness = 0.5 + Math.random() * 0.3
        const color = new THREE.Color().setHSL(hue, saturation, lightness)

        const pooledParticle: Particle = {
          position: spawnPos.clone(),
          startPos: spawnPos.clone(),
          targetPos: null,
          originalColor: color.clone(),
          color: color.clone(),
          size: 0.05 + Math.random() * 0.1,
          isGathered: false,
          gatherProgress: 0,
          oscillationOffset: Math.random() * Math.PI * 2,
          oscillationPhase: Math.random() * Math.PI * 2,
          isVisible: true,
          isPooled: true,
          spawnPosition: spawnPos.clone(),
        }

        this.particles.push(pooledParticle)
        this.activeParticleCount++
      }
    }

    // Set gather count
    this.gatherParticleCount = Math.min(this.activeParticleCount, textPosCount)

    // Reset all particles first
    for (let i = 0; i < this.activeParticleCount; i++) {
      const p = this.particles[i]
      p.isGathered = false
      p.gatherProgress = 0
      p.targetPos = null
      p.isVisible = true
    }

    console.log(`Gathering with ${this.gatherParticleCount} particles (base: ${baseGatherCount}, pooled added: ${this.activeParticleCount - PARTICLE_COUNT})`)
  }

  public scatter() {
    if (this.isScattering) return
    this.isGathering = false
    this.isScattering = true
    this.scatterStartTime = performance.now() / 1000
  }

  public isActive(): boolean {
    return this.isGathering || this.isScattering
  }

  public isScatteringState(): boolean {
    return this.isScattering
  }

  public hasTextVisible(): boolean {
    return this.isShowingText
  }

  public reset() {
    // Called when leaving zone - reset state for re-entry
    this.isGathering = false
    this.isScattering = false
    this.isShowingText = false
    this.textTargetPositions = []
    this.textTargetColors = []
    this.gatherParticleCount = 0
  }

  public gatherImage(imagePath: string, targetPosition: THREE.Vector3) {
    // Force stop any ongoing scatter and restart gather
    this.isGathering = true
    this.isScattering = false
    this.isShowingText = false
    this.gatherStartTime = performance.now() / 1000

    console.log('Loading image:', imagePath)

    // Load image and generate positions with colors
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      console.log('Image loaded, size:', img.width, img.height)
      this.generateImagePositions(img, targetPosition)
      this.prepareGatherForImage()
      // Now start the gather animation
      this.isGathering = true
      this.gatherStartTime = performance.now() / 1000
    }
    img.onerror = (e) => {
      console.error('Failed to load image:', imagePath, e)
      this.isGathering = false
    }
    img.src = imagePath
  }

  private generateImagePositions(img: HTMLImageElement, centerPos: THREE.Vector3) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.width = img.width
    canvas.height = img.height

    ctx.drawImage(img, 0, 0)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    this.textTargetPositions = []
    this.textTargetColors = []

    // World scale - image will appear in front of north platform, smaller like south text
    const worldScale = 0.1
    const imgWidthWorld = img.width * worldScale
    const imgHeightWorld = img.height * worldScale

    // Sample step - sample every pixel for full coverage
    const sampleStep = 1

    // Collect all valid pixels
    const validPixels: { x: number; y: number; r: number; g: number; b: number }[] = []

    for (let y = 0; y < canvas.height; y += sampleStep) {
      for (let x = 0; x < canvas.width; x += sampleStep) {
        const i = (y * canvas.width + x) * 4
        const alpha = pixels[i + 3]

        // Skip fully transparent pixels
        if (alpha < 50) continue

        const r = pixels[i] / 255
        const g = pixels[i + 1] / 255
        const b = pixels[i + 2] / 255

        // Skip very dark/black pixels
        const brightness = (r + g + b) / 3
        if (brightness < 0.15) continue

        validPixels.push({ x, y, r, g, b })
      }
    }

    // Use only 80% of particles for the image (randomly sample)
    const PARTICIPATION_RATIO = 0.5
    const targetParticleCount = Math.floor(validPixels.length * PARTICIPATION_RATIO)
    const shuffled = validPixels.sort(() => Math.random() - 0.5)
    const sampledPixels = shuffled.slice(0, Math.min(targetParticleCount, shuffled.length))

    // Sort pixels by brightness/color to create more cohesive regions
    sampledPixels.sort((a, b) => {
      const brightnessA = (a.r + a.g + a.b) / 3
      const brightnessB = (b.r + b.g + b.b) / 3
      return brightnessA - brightnessB
    })

    for (const pixel of sampledPixels) {
      // Map pixel to world position (no mirror)
      const worldX = ((pixel.x - canvas.width / 2) / canvas.width) * imgWidthWorld
      const worldY = ((canvas.height / 2 - pixel.y) / canvas.height) * imgHeightWorld

      // Small jitter to break grid pattern
      const jitterX = (Math.random() - 0.5) * 0.15
      const jitterY = (Math.random() - 0.5) * 0.15

      this.textTargetPositions.push(new THREE.Vector3(
        centerPos.x + worldX + jitterX,
        centerPos.y + worldY + jitterY,
        centerPos.z
      ))
      this.textTargetColors.push(new THREE.Color(pixel.r, pixel.g, pixel.b))
    }

    console.log('Generated image positions:', this.textTargetPositions.length, '(from', validPixels.length, 'valid pixels, using 80%)')
  }

  private prepareGatherForImage() {
    const textPosCount = this.textTargetPositions.length
    const PARTICIPATION_RATIO = 0.9

    // Calculate how many particles should participate (80% of active particles)
    const targetParticipatingCount = Math.floor(this.activeParticleCount * PARTICIPATION_RATIO)

    // Only generate particles if 80% of current particles is less than textPosCount
    // (meaning we need more particles to have enough 80% to cover the image)
    const minParticlesNeeded = Math.max(textPosCount, targetParticipatingCount)

    if (minParticlesNeeded > this.activeParticleCount && this.activeParticleCount < MAX_PARTICLES) {
      const deficit = Math.min(minParticlesNeeded - this.activeParticleCount, MAX_PARTICLES - this.activeParticleCount)

      for (let i = 0; i < deficit; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = 20 + Math.random() * 50
        const spawnPos = new THREE.Vector3(
          Math.cos(angle) * radius,
          Math.random() * 30 + 10,
          Math.sin(angle) * radius
        )

        // Use random color from image's color palette
        const randomIndex = Math.floor(Math.random() * this.textTargetColors.length)
        const color = this.textTargetColors[randomIndex].clone()

        const pooledParticle: Particle = {
          position: spawnPos.clone(),
          startPos: spawnPos.clone(),
          targetPos: null,
          originalColor: color.clone(),
          color: color.clone(),
          size: 0.05 + Math.random() * 0.1,
          isGathered: false,
          gatherProgress: 0,
          oscillationOffset: Math.random() * Math.PI * 2,
          oscillationPhase: Math.random() * Math.PI * 2,
          isVisible: true,
          isPooled: true,
          spawnPosition: spawnPos.clone(),
        }

        this.particles.push(pooledParticle)
        this.activeParticleCount++
      }
    }

    // Only 80% of particles participate in forming the image
    this.gatherParticleCount = Math.min(targetParticipatingCount, textPosCount)

    for (let i = 0; i < this.activeParticleCount; i++) {
      const p = this.particles[i]
      p.isGathered = false
      p.gatherProgress = 0
      p.targetPos = null
      p.targetColor = null
      p.isVisible = true
      // Reset pooled particles to spawn position
      if (p.isPooled) {
        p.position.copy(p.spawnPosition)
        p.startPos.copy(p.spawnPosition)
        p.color.copy(p.originalColor)
      }
    }

    console.log(`Gathering image with ${this.gatherParticleCount} particles`)
  }
}
