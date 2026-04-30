import * as THREE from 'three'

const CARPET_WIDTH = 4
const CARPET_LENGTH = 6
const ACCELERATION_FORCE = 20

export class AccelerationCarpet {
  private scene: THREE.Scene
  private mesh!: THREE.Mesh
  private center: THREE.Vector3
  private glowMaterial!: THREE.MeshStandardMaterial
  private time = 0
  private borderMesh!: THREE.LineSegments
  private lockedDirection: number | null = null

  constructor(scene: THREE.Scene, center: THREE.Vector3) {
    this.scene = scene
    this.center = center.clone()
  }

  public create() {
    // Create carpet texture with double-headed arrow
    const texture = this.createArrowTexture()

    // Carpet plane
    const geom = new THREE.PlaneGeometry(CARPET_WIDTH, CARPET_LENGTH)
    this.glowMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.8,
      roughness: 0.3,
      metalness: 0.5,
      side: THREE.DoubleSide,
    })

    this.mesh = new THREE.Mesh(geom, this.glowMaterial)
    this.mesh.rotation.x = -Math.PI / 2 // Lay flat
    this.mesh.position.set(this.center.x, this.center.y, this.center.z)
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)

    // Border frame
    const borderGeom = new THREE.EdgesGeometry(geom)
    const borderMat = new THREE.LineBasicMaterial({ color: 0x00ffff, linewidth: 2 })
    this.borderMesh = new THREE.LineSegments(borderGeom, borderMat)
    this.borderMesh.rotation.x = -Math.PI / 2
    this.borderMesh.position.set(this.center.x, this.center.y + 0.01, this.center.z)
    this.scene.add(this.borderMesh)
  }

  private createArrowTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')!

    // Dark background
    ctx.fillStyle = 'rgba(0, 20, 40, 0.9)'
    ctx.fillRect(0, 0, 256, 256)

    // Draw double-headed arrow (↕)
    ctx.strokeStyle = '#00d4ff'
    ctx.lineWidth = 6
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // Vertical line
    ctx.beginPath()
    ctx.moveTo(128, 60)
    ctx.lineTo(128, 196)
    ctx.stroke()

    // Top arrow head
    ctx.beginPath()
    ctx.moveTo(128, 60)
    ctx.lineTo(108, 90)
    ctx.moveTo(128, 60)
    ctx.lineTo(148, 90)
    ctx.stroke()

    // Bottom arrow head
    ctx.beginPath()
    ctx.moveTo(128, 196)
    ctx.lineTo(108, 166)
    ctx.moveTo(128, 196)
    ctx.lineTo(148, 166)
    ctx.stroke()

    // Speed lines
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.4)'
    ctx.lineWidth = 2
    for (let i = 0; i < 3; i++) {
      const y = 100 + i * 30
      ctx.beginPath()
      ctx.moveTo(70, y)
      ctx.lineTo(90, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(166, y)
      ctx.lineTo(186, y)
      ctx.stroke()
    }

    return new THREE.CanvasTexture(canvas)
  }

  public update(delta: number) {
    this.time += delta
    // Pulsing glow
    this.glowMaterial.emissiveIntensity = 0.3 + Math.sin(this.time * 3) * 0.2
  }

  /**
   * Check if a position is on this carpet and return acceleration direction.
   * Direction locks on entry so robot passes through the center.
   * Returns null if not on carpet.
   */
  public getAccelerationZ(pos: THREE.Vector3): number | null {
    const halfW = CARPET_WIDTH / 2
    const halfL = CARPET_LENGTH / 2
    const dx = pos.x - this.center.x
    const dz = pos.z - this.center.z

    if (Math.abs(dx) > halfW || Math.abs(dz) > halfL) {
      this.lockedDirection = null
      return null
    }

    if (this.lockedDirection === null) {
      // South half -> push north (+Z), north half -> push south (-Z)
      this.lockedDirection = dz > 0 ? -ACCELERATION_FORCE : ACCELERATION_FORCE
    }

    return this.lockedDirection
  }

  public getCenter(): THREE.Vector3 {
    return this.center.clone()
  }

  public getSize(): { width: number; length: number } {
    return { width: CARPET_WIDTH, length: CARPET_LENGTH }
  }

  public dispose() {
    this.scene.remove(this.mesh)
    this.scene.remove(this.borderMesh)
    this.mesh.geometry.dispose()
    this.glowMaterial.map?.dispose()
    this.glowMaterial.dispose()
    this.borderMesh.geometry.dispose()
    ;(this.borderMesh.material as THREE.Material).dispose()
  }
}
