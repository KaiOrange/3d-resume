import * as THREE from 'three'
import { Platform } from './Platform'

export interface ZoneData {
  id: string
  localPosition: THREE.Vector3
  worldPosition: THREE.Vector3
  radius: number
  color: string
  mesh?: THREE.Mesh
  glowMesh?: THREE.Mesh
  outerRing?: THREE.Mesh
  innerRing?: THREE.Mesh
  isActive?: boolean
  hueOffset?: number
}

export class SpecialZones {
  private scene: THREE.Scene
  private platform: Platform
  private zones: ZoneData[] = []
  private platformSize: number
  private clock: THREE.Clock

  constructor(scene: THREE.Scene, platform: Platform) {
    this.scene = scene
    this.platform = platform
    this.platformSize = platform.getSize()
    this.clock = new THREE.Clock()
  }

  public create() {
    const halfSize = this.platformSize / 2

    // Single zone at south center, slightly toward center
    this.createZone({
      id: 'main',
      localPosition: new THREE.Vector3(0, 0.02, halfSize - 8),
      radius: 2.5,
      color: '#ff1744',
    })
  }

  private createZone(zone: Omit<ZoneData, 'worldPosition' | 'mesh' | 'glowMesh' | 'outerRing' | 'innerRing' | 'isActive' | 'hueOffset'>) {
    // Random hue offset for variety
    const hueOffset = Math.random() * 0.1

    // Inner filled circle - glowing core
    const innerCircleGeom = new THREE.CircleGeometry(zone.radius * 0.4, 32)
    const innerCircleMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.95 + hueOffset, 0.9, 0.6), // pink-red
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    })
    const innerCircle = new THREE.Mesh(innerCircleGeom, innerCircleMat)
    innerCircle.rotation.x = -Math.PI / 2
    innerCircle.position.copy(zone.localPosition)
    innerCircle.position.y += 0.05
    this.scene.add(innerCircle)

    // Middle ring
    const ringGeom = new THREE.RingGeometry(zone.radius * 0.5, zone.radius * 0.8, 32)
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.95 + hueOffset, 0.85, 0.5),
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    })
    const ring = new THREE.Mesh(ringGeom, ringMat)
    ring.rotation.x = -Math.PI / 2
    ring.position.copy(zone.localPosition)
    ring.position.y += 0.04
    this.scene.add(ring)

    // Outer ring
    const outerRingGeom = new THREE.RingGeometry(zone.radius * 0.9, zone.radius, 32)
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.9 + hueOffset, 0.8, 0.5),
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    })
    const outerRing = new THREE.Mesh(outerRingGeom, outerRingMat)
    outerRing.rotation.x = -Math.PI / 2
    outerRing.position.copy(zone.localPosition)
    outerRing.position.y += 0.03
    this.scene.add(outerRing)

    // Second outer ring - faint glow
    const outerRing2Geom = new THREE.RingGeometry(zone.radius, zone.radius * 1.3, 32)
    const outerRing2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.92 + hueOffset, 0.7, 0.4),
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    })
    const outerRing2 = new THREE.Mesh(outerRing2Geom, outerRing2Mat)
    outerRing2.rotation.x = -Math.PI / 2
    outerRing2.position.copy(zone.localPosition)
    outerRing2.position.y += 0.02
    this.scene.add(outerRing2)

    // Large glow plane underneath
    const glowGeom = new THREE.CircleGeometry(zone.radius * 2, 32)
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.95 + hueOffset, 0.6, 0.3),
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    })
    const glow = new THREE.Mesh(glowGeom, glowMat)
    glow.rotation.x = -Math.PI / 2
    glow.position.copy(zone.localPosition)
    glow.position.y += 0.01
    this.scene.add(glow)

    const zoneData: ZoneData = {
      ...zone,
      worldPosition: zone.localPosition.clone(),
      mesh: innerCircle,
      glowMesh: glow,
      outerRing: outerRing,
      innerRing: innerCircle,
      isActive: false,
      hueOffset,
    }

    this.zones.push(zoneData)
  }

  public update(delta: number) {
    const time = this.clock.getElapsedTime()

    for (const zone of this.zones) {
      if (!zone.hueOffset) zone.hueOffset = 0

      // Breathing effect for rings
      if (zone.outerRing) {
        const mat = zone.outerRing.material as THREE.MeshBasicMaterial
        const breathe = Math.sin(time * 3) * 0.15 + 0.7
        mat.opacity = breathe

        // Subtle hue shift
        mat.color.setHSL(0.9 + zone.hueOffset + Math.sin(time * 0.5) * 0.03, 0.8, 0.5)
      }

      // Pulsing inner circle
      if (zone.innerRing) {
        const mat = zone.innerRing.material as THREE.MeshBasicMaterial
        const pulse = Math.sin(time * 4) * 0.15 + 0.75
        mat.opacity = pulse
        mat.color.setHSL(0.95 + zone.hueOffset + Math.sin(time * 0.7) * 0.05, 0.9, 0.55 + Math.sin(time * 2) * 0.1)
      }
    }
  }

  public checkZone(playerPosition: THREE.Vector3): ZoneData | null {
    for (const zone of this.zones) {
      const dist = playerPosition.distanceTo(zone.worldPosition)

      // Update visual feedback
      if (zone.glowMesh) {
        const isNear = dist < zone.radius * 2
        const isOn = dist < zone.radius
        const material = zone.glowMesh.material as THREE.MeshBasicMaterial

        if (isOn) {
          // Strong glow when on zone
          const breathe = Math.sin(Date.now() * 0.005) * 0.1 + 0.5
          material.opacity = breathe
          zone.isActive = true
        } else if (isNear) {
          // Gentle pulse when near
          const pulse = Math.sin(Date.now() * 0.003) * 0.08 + 0.15
          material.opacity = pulse
          zone.isActive = false
        } else {
          material.opacity = 0.05
          zone.isActive = false
        }
      }

      if (dist < zone.radius) {
        return zone
      }
    }
    return null
  }

  public getZone(id: string): ZoneData | undefined {
    return this.zones.find(z => z.id === id)
  }

  public getZones(): ZoneData[] {
    return this.zones
  }

  public getMainZonePosition(): THREE.Vector3 {
    return this.zones[0]?.worldPosition.clone() || new THREE.Vector3(0, 0, 20)
  }
}