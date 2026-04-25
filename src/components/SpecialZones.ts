import * as THREE from 'three'
import { Platform } from './Platform'

export interface ZoneData {
  id: string
  localPosition: THREE.Vector3
  worldPosition: THREE.Vector3
  radius: number
  color: string
  beamMesh?: THREE.Mesh
  baseGlow?: THREE.Mesh
  outerRing?: THREE.Mesh
  innerCore?: THREE.Mesh
  rotatingRing?: THREE.Mesh
  isActive?: boolean
  hueOffset?: number
  transitionProgress?: number  // 0 = normal, 1 = fully faded
  wasActive?: boolean
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

    // South zone - GTA mission style
    this.createZone({
      id: 'main',
      localPosition: new THREE.Vector3(0, 0.02, halfSize - 8),
      radius: 2.5,
      color: '#ff6600', // Orange mission marker color
    })

    // North zone - symmetric to south, orange color
    this.createZone({
      id: 'north',
      localPosition: new THREE.Vector3(0, 0.02, -halfSize + 8),
      radius: 2.5,
      color: '#ff6600', // Orange color
    })
  }

  private createZone(zone: Omit<ZoneData, 'worldPosition' | 'beamMesh' | 'baseGlow' | 'outerRing' | 'innerCore' | 'rotatingRing' | 'isActive' | 'hueOffset'>) {
    const hueOffset = Math.random() * 0.1

    // Create glowing beam extending upward (like GTA mission column)
    const beamHeight = 15
    const beamRadius = zone.radius * 0.6

    // Beam geometry - cylinder with gradient effect using custom shader
    const beamGeom = new THREE.CylinderGeometry(beamRadius * 0.3, beamRadius, beamHeight, 32, 1, true)

    // Beam material - additive blending for glow effect
    const beamMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color().setHSL(0.08 + hueOffset, 0.9, 0.5) },
        uOpacity: { value: 0.4 },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vY;
        void main() {
          vUv = uv;
          vY = position.y;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uOpacity;
        varying vec2 vUv;
        varying float vY;

        void main() {
          // Gradient from bottom to top - brighter at bottom
          float gradient = 1.0 - vUv.y;
          gradient = pow(gradient, 0.8);

          // Horizontal gradient - brighter at edges for glow effect
          float horizontal = abs(vUv.x - 0.5) * 2.0;
          horizontal = 1.0 - horizontal;
          horizontal = pow(horizontal, 2.0);

          // Pulsing effect
          float pulse = sin(uTime * 3.0 + vUv.y * 5.0) * 0.15 + 0.85;

          // Combine
          float alpha = gradient * horizontal * pulse * uOpacity;

          // Add some noise/grain for organic look
          float noise = fract(sin(dot(vUv * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
          alpha *= 0.95 + noise * 0.1;

          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    })

    const beamMesh = new THREE.Mesh(beamGeom, beamMat)
    beamMesh.position.copy(zone.localPosition)
    beamMesh.position.y += beamHeight / 2
    this.scene.add(beamMesh)

    // Base glow circle - the ground marker
    const baseGlowGeom = new THREE.CircleGeometry(zone.radius * 1.5, 32)
    const baseGlowMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color().setHSL(0.08 + hueOffset, 0.95, 0.6) },
        uOpacity: { value: 0.6 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uOpacity;
        varying vec2 vUv;

        void main() {
          // Distance from center
          float dist = length(vUv - 0.5) * 2.0;

          // Radial gradient
          float glow = 1.0 - smoothstep(0.0, 1.0, dist);
          glow = pow(glow, 1.5);

          // Pulsing
          float pulse = sin(uTime * 2.0) * 0.2 + 0.8;

          // Rotating highlight rays
          float angle = atan(vUv.y - 0.5, vUv.x - 0.5);
          float rays = sin(angle * 6.0 + uTime * 2.0) * 0.5 + 0.5;
          rays *= (1.0 - dist) * 0.3;

          float alpha = (glow + rays) * pulse * uOpacity;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    })

    const baseGlow = new THREE.Mesh(baseGlowGeom, baseGlowMat)
    baseGlow.rotation.x = -Math.PI / 2
    baseGlow.position.copy(zone.localPosition)
    baseGlow.position.y += 0.02
    this.scene.add(baseGlow)

    // Inner core - bright center
    const coreGeom = new THREE.CircleGeometry(zone.radius * 0.3, 32)
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.1 + hueOffset, 1.0, 0.7),
      transparent: true,
      opacity: 0.9,
    })
    const innerCore = new THREE.Mesh(coreGeom, coreMat)
    innerCore.rotation.x = -Math.PI / 2
    innerCore.position.copy(zone.localPosition)
    innerCore.position.y += 0.05
    this.scene.add(innerCore)

    // Rotating outer ring
    const ringGeom = new THREE.RingGeometry(zone.radius * 0.85, zone.radius, 32)
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.08 + hueOffset, 0.9, 0.55),
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    })
    const rotatingRing = new THREE.Mesh(ringGeom, ringMat)
    rotatingRing.rotation.x = -Math.PI / 2
    rotatingRing.position.copy(zone.localPosition)
    rotatingRing.position.y += 0.04
    this.scene.add(rotatingRing)

    // Second ring - counter rotating
    const ring2Geom = new THREE.RingGeometry(zone.radius * 0.6, zone.radius * 0.7, 32)
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.06 + hueOffset, 0.85, 0.5),
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    })
    const outerRing = new THREE.Mesh(ring2Geom, ring2Mat)
    outerRing.rotation.x = -Math.PI / 2
    outerRing.position.copy(zone.localPosition)
    outerRing.position.y += 0.03
    this.scene.add(outerRing)

    const zoneData: ZoneData = {
      ...zone,
      worldPosition: zone.localPosition.clone(),
      beamMesh,
      baseGlow,
      outerRing,
      innerCore,
      rotatingRing,
      isActive: false,
      hueOffset,
    }

    this.zones.push(zoneData)
  }

  public update(delta: number) {
    const time = this.clock.getElapsedTime()

    for (const zone of this.zones) {
      if (zone.transitionProgress === undefined) zone.transitionProgress = 0
      if (!zone.hueOffset) zone.hueOffset = 0

      // Animate transition when entering/leaving zone
      const targetTransition = zone.isActive ? 1 : 0
      if (zone.transitionProgress !== targetTransition) {
        const speed = zone.isActive ? 3.0 : 2.0  // Fade out faster than fade in
        zone.transitionProgress += (targetTransition - zone.transitionProgress) * delta * speed
        if (Math.abs(zone.transitionProgress - targetTransition) < 0.01) {
          zone.transitionProgress = targetTransition
        }
      }

      const t = zone.transitionProgress  // 0 = normal, 1 = fully faded

      // Update beam shader
      if (zone.beamMesh) {
        const mat = zone.beamMesh.material as THREE.ShaderMaterial
        mat.uniforms.uTime.value = time
        // Fade out beam and shrink
        mat.uniforms.uOpacity.value = (1 - t) * 0.25
        zone.beamMesh.scale.y = 1 - t * 0.8
      }

      // Update base glow shader
      if (zone.baseGlow) {
        const mat = zone.baseGlow.material as THREE.ShaderMaterial
        mat.uniforms.uTime.value = time
        // Glow brighter when player on zone
        mat.uniforms.uOpacity.value = 0.6 + t * 0.4
        const scale = 1 + t * 0.3
        zone.baseGlow.scale.set(scale, scale, 1)
      }

      // Pulse inner core
      if (zone.innerCore) {
        const mat = zone.innerCore.material as THREE.MeshBasicMaterial
        const pulse = Math.sin(time * 4) * 0.2 + 0.8
        mat.opacity = (0.3 + t * 0.6) * pulse
      }

      // Rotate the outer ring
      if (zone.rotatingRing) {
        zone.rotatingRing.rotation.z = time * (0.5 + t * 2.0)
        const mat = zone.rotatingRing.material as THREE.MeshBasicMaterial
        mat.opacity = 0.8 - t * 0.5
      }

      // Counter rotate the inner ring
      if (zone.outerRing) {
        zone.outerRing.rotation.z = -time * 0.3
        const mat = zone.outerRing.material as THREE.MeshBasicMaterial
        mat.opacity = 0.6 - t * 0.4
      }
    }
  }

  public checkZone(playerPosition: THREE.Vector3): ZoneData | null {
    for (const zone of this.zones) {
      const dist = playerPosition.distanceTo(zone.worldPosition)
      const isNear = dist < zone.radius * 2
      const isOn = dist < zone.radius

      // Track state change for animation trigger
      if (isOn && !zone.wasActive) {
        zone.transitionProgress = 0
      } else if (!isOn && zone.wasActive) {
        zone.transitionProgress = 0
      }
      zone.wasActive = isOn

      if (dist < zone.radius) {
        zone.isActive = true
        return zone
      } else {
        zone.isActive = false
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

  public getNorthZonePosition(): THREE.Vector3 {
    return this.zones[1]?.worldPosition.clone() || new THREE.Vector3(0, 0, -20)
  }
}
