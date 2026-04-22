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
}

const PARTICLE_COUNT = 2000
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

  private goldColor = new THREE.Color('#ffd700')
  private whiteColor = new THREE.Color('#ffffff')
  private accentColor = new THREE.Color('#00d4ff')
  private nebulaColor = new THREE.Color('#7b2fff')

  constructor(scene: THREE.Scene) {
    this.positions = new Float32Array(PARTICLE_COUNT * 3)
    this.colors = new Float32Array(PARTICLE_COUNT * 3)

    this.geometry = new THREE.BufferGeometry()
    this.material = new THREE.PointsMaterial({
      size: 0.15,
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
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        Math.random() * 20 + 5,
        (Math.random() - 0.5) * 50
      )

      const colorChoice = Math.random()
      const color = colorChoice < 0.4
        ? this.whiteColor.clone()
        : colorChoice < 0.7
          ? this.accentColor.clone()
          : this.nebulaColor.clone()

      this.particles.push({
        position: pos.clone(),
        startPos: pos.clone(),
        targetPos: null,
        originalColor: color.clone(),
        color: color.clone(),
        size: 0.05 + Math.random() * 0.1,
        isGathered: false,
        gatherProgress: 0,
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
    }

    this.updateBuffers()
  }

  private updateGathering(currentTime: number) {
    const elapsed = currentTime - this.gatherStartTime
    const progress = Math.min(elapsed / GATHER_DURATION, 1)
    const t = this.easeOutCubic(progress)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = this.particles[i]

      if (i < this.textTargetPositions.length && this.textTargetPositions[i]) {
        if (!p.isGathered) {
          p.isGathered = true
          p.startPos.copy(p.position)
          p.targetPos = this.textTargetPositions[i].clone()
        }

        if (p.targetPos) {
          p.position.lerpVectors(p.startPos, p.targetPos, t)
        }

        // Color: gold to white
        if (progress < 0.5) {
          p.color.lerpColors(p.originalColor, this.goldColor, progress * 2)
        } else {
          p.color.lerpColors(this.goldColor, this.whiteColor, (progress - 0.5) * 2)
        }
      } else if (p.targetPos) {
        // Particles not in text - scatter near center
        const center = new THREE.Vector3(0, 8, 0)
        const randomOffset = center.clone().add(new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 10
        ))
        p.position.lerpVectors(p.position, randomOffset, t * 0.2)
      }
    }

    if (progress >= 1) {
      this.isGathering = false
      this.isShowingText = true
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const p = this.particles[i]
        if (p.targetPos) {
          p.position.copy(p.targetPos)
        }
      }
    }
  }

  private updateScattering(currentTime: number) {
    const elapsed = currentTime - this.scatterStartTime
    const progress = Math.min(elapsed / SCATTER_DURATION, 1)

    for (const p of this.particles) {
      if (progress < 0.4 && p.isGathered) {
        // Explosive scatter
        const scatterDir = p.position.clone().normalize()
        if (scatterDir.length() < 0.1) {
          scatterDir.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()
        }
        const scatterSpeed = (1 - progress / 0.4) * 30
        p.position.add(scatterDir.multiplyScalar(scatterSpeed * 0.016))
      }

      // Color transition back
      if (progress > 0.3) {
        const colorT = (progress - 0.3) / 0.7
        p.color.lerpColors(this.whiteColor, p.originalColor, colorT)
      }

      if (progress >= 1) {
        p.isGathered = false
        p.targetPos = null
        p.isGathered = false
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

    const baseFontSize = lineCount <= 2 ? 90 : lineCount <= 3 ? 70 : lineCount <= 4 ? 55 : 45
    const lineHeight = baseFontSize * 1.4

    canvas.width = 1400
    canvas.height = lineCount * lineHeight + 60

    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#ffffff'
    ctx.font = `bold ${baseFontSize}px Microsoft YaHei, Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    lines.forEach((line, index) => {
      const y = canvas.height / 2 + (index - (lines.length - 1) / 2) * lineHeight
      ctx.fillText(line, canvas.width / 2, y)
    })

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data
    this.textTargetPositions = []

    const sampleStep = 3
    for (let y = 0; y < canvas.height; y += sampleStep) {
      for (let x = 0; x < canvas.width; x += sampleStep) {
        const i = (y * canvas.width + x) * 4
        if (pixels[i] > 200) {
          const worldX = ((x / canvas.width) - 0.5) * 25
          const worldY = -((y / canvas.height) - 0.5) * (lineCount * 3 + 3)
          this.textTargetPositions.push(new THREE.Vector3(
            centerPos.x + worldX,
            centerPos.y + worldY,
            centerPos.z
          ))
        }
      }
    }

    // Fallback if no text found
    if (this.textTargetPositions.length < 50) {
      lines.forEach((line, lineIdx) => {
        for (let charIdx = 0; charIdx < line.length; charIdx++) {
          this.textTargetPositions.push(new THREE.Vector3(
            centerPos.x + (charIdx - line.length / 2) * 1.5,
            centerPos.y + (lineIdx - lines.length / 2) * 3,
            centerPos.z
          ))
        }
      })
    }

    // Fill remaining particles
    const avgX = this.textTargetPositions.reduce((sum, p) => sum + p.x, 0) / Math.max(this.textTargetPositions.length, 1)
    const avgY = this.textTargetPositions.reduce((sum, p) => sum + p.y, 0) / Math.max(this.textTargetPositions.length, 1)
    const avgZ = this.textTargetPositions.reduce((sum, p) => sum + p.z, 0) / Math.max(this.textTargetPositions.length, 1)
    const center = new THREE.Vector3(avgX, avgY, avgZ)

    while (this.textTargetPositions.length < PARTICLE_COUNT) {
      this.textTargetPositions.push(center.clone().add(new THREE.Vector3(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * (lineCount * 3),
        (Math.random() - 0.5) * 20
      )))
    }

    this.textTargetPositions = this.textTargetPositions.slice(0, PARTICLE_COUNT)
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

    // Position text floating in air above the target position
    const textPos = targetPosition.clone()
    textPos.y += 12  // Float higher in the air
    textPos.z += 8   // Move forward

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
