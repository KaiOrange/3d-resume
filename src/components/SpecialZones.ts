import * as THREE from 'three'
import { Platform } from './Platform'

export interface ZoneData {
  id: string
  face: number
  localPosition: THREE.Vector3
  worldPosition: THREE.Vector3
  radius: number
  lines: string[]
  color: string
  mesh?: THREE.Mesh
  isActive?: boolean
}

export interface ResumeData {
  profile: {
    name: string
    title: string
    email: string
    phone: string
    location: string
  }
  experience: Array<{
    company: string
    role: string
    period: string
  }>
  projects: Array<{
    name: string
    tech: string[]
    description: string
  }>
}

export class SpecialZones {
  private scene: THREE.Scene
  private platform: Platform
  private zones: ZoneData[] = []
  private platformSize: number

  constructor(scene: THREE.Scene, platform: Platform) {
    this.scene = scene
    this.platform = platform
    this.platformSize = platform.getSize()
  }

  public create(resumeData: ResumeData) {
    const halfSize = this.platformSize / 2
    const zoneRadius = 2.5

    // Face 0: Profile (North face, z = -halfSize) - front of platform
    this.createZone({
      id: 'profile',
      face: 0,
      localPosition: new THREE.Vector3(0, 0.02, -halfSize + 4),
      radius: zoneRadius,
      lines: [
        resumeData.profile.name,
        resumeData.profile.title,
        resumeData.profile.email,
        resumeData.profile.phone,
        resumeData.profile.location,
      ],
      color: '#00d4ff',
    })

    // Face 1: Experience (East face, x = halfSize) - right side of platform
    // Create 3 zones for 3 experiences
    const expPositions = [
      new THREE.Vector3(halfSize - 4, 0.02, -4),
      new THREE.Vector3(halfSize - 4, 0.02, 0),
      new THREE.Vector3(halfSize - 4, 0.02, 4),
    ]
    resumeData.experience.forEach((exp, idx) => {
      if (expPositions[idx]) {
        this.createZone({
          id: `experience-${idx}`,
          face: 1,
          localPosition: expPositions[idx],
          radius: zoneRadius - 0.4,
          lines: [exp.company, exp.role, exp.period],
          color: '#00ff88',
        })
      }
    })

    // Face 2: Projects (South face, z = halfSize) - back of platform
    resumeData.projects.forEach((proj, idx) => {
      const projZ = halfSize - 4 - idx * 4
      this.createZone({
        id: `project-${idx}`,
        face: 2,
        localPosition: new THREE.Vector3(0, 0.02, projZ),
        radius: zoneRadius,
        lines: [proj.name, proj.tech.join(' | '), proj.description],
        color: '#bf5af2',
      })
    })

    // Face 3: West face - Welcome / instructions
    this.createZone({
      id: 'west',
      face: 3,
      localPosition: new THREE.Vector3(-halfSize + 4, 0.02, 0),
      radius: zoneRadius,
      lines: ['Welcome', 'WASD move', 'SPACE jump'],
      color: '#ffd700',
    })
  }

  private createZone(zone: Omit<ZoneData, 'worldPosition' | 'mesh' | 'isActive'>) {
    const zoneColor = new THREE.Color(zone.color)

    // Outer ring - animated pulsing
    const ringGeom = new THREE.RingGeometry(zone.radius * 0.8, zone.radius, 32)
    const ringMat = new THREE.MeshBasicMaterial({
      color: zoneColor,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    })
    const ring = new THREE.Mesh(ringGeom, ringMat)
    ring.rotation.x = -Math.PI / 2
    ring.position.copy(zone.localPosition)
    ring.position.y += 0.02
    this.scene.add(ring)

    // Inner filled circle
    const circleGeom = new THREE.CircleGeometry(zone.radius * 0.75, 32)
    const circleMat = new THREE.MeshBasicMaterial({
      color: zoneColor,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    })
    const circle = new THREE.Mesh(circleGeom, circleMat)
    circle.rotation.x = -Math.PI / 2
    circle.position.copy(zone.localPosition)
    circle.position.y += 0.03
    this.scene.add(circle)

    // Second outer ring
    const outerRingGeom = new THREE.RingGeometry(zone.radius, zone.radius * 1.15, 32)
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: zoneColor,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
    })
    const outerRing = new THREE.Mesh(outerRingGeom, outerRingMat)
    outerRing.rotation.x = -Math.PI / 2
    outerRing.position.copy(zone.localPosition)
    outerRing.position.y += 0.02
    this.scene.add(outerRing)

    // Glow plane
    const glowGeom = new THREE.CircleGeometry(zone.radius * 1.5, 32)
    const glowMat = new THREE.MeshBasicMaterial({
      color: zoneColor,
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
      mesh: glow,
      isActive: false,
    }

    this.zones.push(zoneData)
  }

  public checkZone(playerPosition: THREE.Vector3): ZoneData | null {
    let closestZone: ZoneData | null = null
    let closestDist = Infinity

    for (const zone of this.zones) {
      const dist = playerPosition.distanceTo(zone.worldPosition)

      // Update visual feedback - glow when player is near
      if (zone.mesh) {
        const isNear = dist < zone.radius * 2
        const isOn = dist < zone.radius
        const targetOpacity = isOn ? 0.4 : isNear ? 0.15 + Math.sin(Date.now() * 0.005) * 0.1 : 0.05
        const material = zone.mesh.material as THREE.MeshBasicMaterial
        material.opacity = THREE.MathUtils.lerp(material.opacity, targetOpacity, 0.1)
      }

      if (dist < zone.radius && dist < closestDist) {
        closestDist = dist
        closestZone = zone
      }
    }

    return closestZone
  }

  public getZones(): ZoneData[] {
    return this.zones
  }
}
