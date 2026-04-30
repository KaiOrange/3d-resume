import * as THREE from 'three'

const EXPLOSION_PARTICLE_COUNT = 120
const RISE_DURATION = 1.2
const EXPLOSION_DURATION = 2.5
const MAX_FIREWORKS = 5

interface FireworkInstance {
  phase: 'rising' | 'exploding'
  elapsed: number
  trailMesh: THREE.Mesh | null
  trailStart: THREE.Vector3
  trailEnd: THREE.Vector3
  explosionPoints: THREE.Points | null
  explosionPositions: Float32Array | null
  explosionColors: Float32Array | null
  explosionVelocities: Float32Array | null
}

export class Fireworks {
  private static particleTexture: THREE.Texture | null = null
  private scene: THREE.Scene
  private fireworks: FireworkInstance[] = []

  constructor(scene: THREE.Scene) {
    this.scene = scene
    if (!Fireworks.particleTexture) {
      Fireworks.particleTexture = Fireworks.createParticleTexture()
    }
  }

  private static createParticleTexture(): THREE.CanvasTexture {
    const size = 64
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')!
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    gradient.addColorStop(0, 'rgba(255,255,255,1)')
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.8)')
    gradient.addColorStop(0.7, 'rgba(255,255,255,0.2)')
    gradient.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, size, size)
    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }

  public launch(position: THREE.Vector3) {
    if (this.fireworks.length >= MAX_FIREWORKS) return

    const instance: FireworkInstance = {
      phase: 'rising',
      elapsed: 0,
      trailMesh: null,
      trailStart: new THREE.Vector3(),
      trailEnd: new THREE.Vector3(),
      explosionPoints: null,
      explosionPositions: null,
      explosionColors: null,
      explosionVelocities: null,
    }

    // Launch from specified position with some randomness
    const startX = position.x + (Math.random() - 0.5) * 10
    const startZ = position.z + (Math.random() - 0.5) * 10
    instance.trailStart.set(startX, position.y, startZ)

    // Apex point in the sky
    const apexX = startX + (Math.random() - 0.5) * 6
    const apexZ = startZ + Math.random() * 5
    instance.trailEnd.set(apexX, 17 + Math.random() * 7, apexZ)

    // Rising trail particle
    const geometry = new THREE.SphereGeometry(0.2, 8, 8)
    const material = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      transparent: true,
      opacity: 1,
    })
    instance.trailMesh = new THREE.Mesh(geometry, material)
    instance.trailMesh.position.copy(instance.trailStart)
    this.scene.add(instance.trailMesh)

    this.fireworks.push(instance)
  }

  public update(delta: number) {
    for (let i = this.fireworks.length - 1; i >= 0; i--) {
      const fw = this.fireworks[i]
      fw.elapsed += delta

      if (fw.phase === 'rising') {
        this.updateRising(fw)
      } else if (fw.phase === 'exploding') {
        this.updateExplosion(fw, delta)
      }

      // Remove finished fireworks
      if (fw.phase === 'exploding' && fw.elapsed >= EXPLOSION_DURATION) {
        this.disposeInstance(fw)
        this.fireworks.splice(i, 1)
      }
    }
  }

  private updateRising(fw: FireworkInstance) {
    if (!fw.trailMesh) return

    const t = Math.min(fw.elapsed / RISE_DURATION, 1)
    const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

    fw.trailMesh.position.lerpVectors(fw.trailStart, fw.trailEnd, ease)

    const scale = 0.5 + Math.sin(fw.elapsed * 15) * 0.3
    fw.trailMesh.scale.setScalar(scale)

    if (t >= 1) {
      this.startExplosion(fw)
    }
  }

  private startExplosion(fw: FireworkInstance) {
    if (fw.trailMesh) {
      this.scene.remove(fw.trailMesh)
      fw.trailMesh.geometry.dispose()
      ;(fw.trailMesh.material as THREE.MeshBasicMaterial).dispose()
      fw.trailMesh = null
    }

    fw.phase = 'exploding'
    fw.elapsed = 0

    const apex = fw.trailEnd

    fw.explosionPositions = new Float32Array(EXPLOSION_PARTICLE_COUNT * 3)
    fw.explosionColors = new Float32Array(EXPLOSION_PARTICLE_COUNT * 3)
    fw.explosionVelocities = new Float32Array(EXPLOSION_PARTICLE_COUNT * 3)

    const colorPalette = [
      new THREE.Color(0x00d4ff),
      new THREE.Color(0x7b2fff),
      new THREE.Color(0xff6b35),
      new THREE.Color(0xffffff),
      new THREE.Color(0xff4081),
      new THREE.Color(0xffd700),
    ]

    const colorCount = 2 + Math.floor(Math.random() * 2)
    const selectedColors: THREE.Color[] = []
    for (let i = 0; i < colorCount; i++) {
      const c = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      if (!selectedColors.find((sc) => sc.equals(c))) selectedColors.push(c)
    }

    for (let i = 0; i < EXPLOSION_PARTICLE_COUNT; i++) {
      const i3 = i * 3

      fw.explosionPositions[i3] = apex.x
      fw.explosionPositions[i3 + 1] = apex.y
      fw.explosionPositions[i3 + 2] = apex.z

      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const speed = 5 + Math.random() * 12
      fw.explosionVelocities[i3] = Math.sin(phi) * Math.cos(theta) * speed
      fw.explosionVelocities[i3 + 1] = Math.sin(phi) * Math.sin(theta) * speed * 0.8
      fw.explosionVelocities[i3 + 2] = Math.cos(phi) * speed

      const color = selectedColors[Math.floor(Math.random() * selectedColors.length)]
      fw.explosionColors[i3] = color.r
      fw.explosionColors[i3 + 1] = color.g
      fw.explosionColors[i3 + 2] = color.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(fw.explosionPositions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(fw.explosionColors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      map: Fireworks.particleTexture,
      alphaTest: 0.01,
    })

    fw.explosionPoints = new THREE.Points(geometry, material)
    fw.explosionPoints.frustumCulled = false
    this.scene.add(fw.explosionPoints)
  }

  private updateExplosion(fw: FireworkInstance, delta: number) {
    if (!fw.explosionPositions || !fw.explosionVelocities || !fw.explosionPoints) return

    const progress = fw.elapsed / EXPLOSION_DURATION
    const material = fw.explosionPoints.material as THREE.PointsMaterial
    material.opacity = Math.max(0, 1 - progress * progress)

    const gravity = 8
    const drag = 0.97

    for (let i = 0; i < EXPLOSION_PARTICLE_COUNT; i++) {
      const i3 = i * 3

      fw.explosionPositions[i3] += fw.explosionVelocities[i3] * delta
      fw.explosionPositions[i3 + 1] += fw.explosionVelocities[i3 + 1] * delta
      fw.explosionPositions[i3 + 2] += fw.explosionVelocities[i3 + 2] * delta

      fw.explosionVelocities[i3 + 1] -= gravity * delta
      fw.explosionVelocities[i3] *= drag
      fw.explosionVelocities[i3 + 1] *= drag
      fw.explosionVelocities[i3 + 2] *= drag
    }

    fw.explosionPoints.geometry.attributes.position.needsUpdate = true
  }

  private disposeInstance(fw: FireworkInstance) {
    if (fw.trailMesh) {
      this.scene.remove(fw.trailMesh)
      fw.trailMesh.geometry.dispose()
      ;(fw.trailMesh.material as THREE.MeshBasicMaterial).dispose()
      fw.trailMesh = null
    }
    if (fw.explosionPoints) {
      this.scene.remove(fw.explosionPoints)
      fw.explosionPoints.geometry.dispose()
      ;(fw.explosionPoints.material as THREE.PointsMaterial).dispose()
      fw.explosionPoints = null
    }
    fw.explosionPositions = null
    fw.explosionColors = null
    fw.explosionVelocities = null
  }

  public isActive(): boolean {
    return this.fireworks.length > 0
  }

  public dispose() {
    for (const fw of this.fireworks) {
      this.disposeInstance(fw)
    }
    this.fireworks = []
  }
}
