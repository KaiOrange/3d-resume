import * as THREE from 'three'
import { galaxyVertexShader, galaxyFragmentShader } from './shaders/galaxy'

export class Nebula {
  private galaxyPoints!: THREE.Points
  private galaxyMaterial!: THREE.ShaderMaterial
  private scene: THREE.Scene
  private galaxyClock: THREE.Clock
  private isMobile: boolean

  constructor(scene: THREE.Scene, isMobile: boolean = false) {
    this.scene = scene
    this.galaxyClock = new THREE.Clock()
    this.isMobile = isMobile
  }

  public create() {
    const parameters = {
      count: this.isMobile ? 3000 : 8000, // Reduced from 20000
      size: 0.02,
      radius: 60,
      branches: 3,
      spin: 1,
      randomnessPower: 3,
      insideColor: '#ff6030',
      outsideColor: '#1b3984',
      randomness: 0.2,
    }

    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(parameters.count * 3)
    const randomness = new Float32Array(parameters.count * 3)
    const colors = new Float32Array(parameters.count * 3)
    const scales = new Float32Array(parameters.count)

    const insideColor = new THREE.Color(parameters.insideColor)
    const outsideColor = new THREE.Color(parameters.outsideColor)

    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3

      const radius = Math.random() * parameters.radius
      const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1) *
          parameters.randomness *
          radius -
        50

      positions[i3] = Math.cos(branchAngle) * radius
      positions[i3 + 1] = 0
      positions[i3 + 2] = Math.sin(branchAngle) * radius

      randomness[i3] = randomX
      randomness[i3 + 1] = randomY
      randomness[i3 + 2] = randomZ

      const mixedColor = insideColor.clone()
      mixedColor.lerp(outsideColor, radius / parameters.radius)

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b

      scales[i] = Math.random()
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))

    this.galaxyMaterial = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader: galaxyVertexShader,
      fragmentShader: galaxyFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 30.0 },
      },
    })

    this.galaxyPoints = new THREE.Points(geometry, this.galaxyMaterial)
    this.galaxyPoints.position.y = -50
    this.scene.add(this.galaxyPoints)
  }

  public update(delta: number) {
    if (this.galaxyMaterial && this.galaxyPoints) {
      this.galaxyMaterial.uniforms.uTime.value = this.galaxyClock.getElapsedTime() * 2
      this.galaxyPoints.rotation.z += delta * 0.02
    }
  }

  public dispose() {
    if (this.galaxyPoints) {
      this.scene.remove(this.galaxyPoints)
      this.galaxyPoints.geometry.dispose()
      this.galaxyMaterial.dispose()
    }
  }
}
