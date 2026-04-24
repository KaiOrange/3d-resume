import * as THREE from 'three'
import { resumeData } from '../data/resumeData'
import { createProfileTexture, createExperienceTexture, createProjectTexture } from '../utils/textureGenerator'

interface BillboardPanel {
  mesh: THREE.Mesh
  targetPosition: THREE.Vector3
  originalOpacity: number
}

export class InfoBillboards {
  private scene: THREE.Scene
  private billboards: BillboardPanel[] = []
  private platformSize: number
  private clock: THREE.Clock

  constructor(scene: THREE.Scene, platformSize: number) {
    this.scene = scene
    this.platformSize = platformSize
    this.clock = new THREE.Clock()
  }

  public create() {
    // Project billboards on east side
    this.createProjectBillboards()
    // Experience billboards on west side
    this.createExperienceBillboards()
  }

  private createProjectBillboards() {
    const halfSize = this.platformSize / 2
    const count = resumeData.projects.length
    const billboardWidth = 10
    const availableSpace = this.platformSize
    const startZ = -availableSpace / 2 + billboardWidth / 2

    resumeData.projects.forEach((project, index) => {
      const texture = createProjectTexture(project)
      texture.colorSpace = THREE.SRGBColorSpace

      const geometry = new THREE.PlaneGeometry(10, 4.5)
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      })

      const mesh = new THREE.Mesh(geometry, material)

      // CSS space-around layout: position = start + (index + 0.5) * (availableSpace / count)
      const zPos = startZ + (index + 0.5) * (availableSpace / count)
      const yPos = 5

      // Position on the east side, parallel to platform (facing toward platform center -X)
      mesh.position.set(halfSize + 8, yPos, zPos)
      mesh.rotation.y = -Math.PI / 2 // Face toward platform center, flipped
      this.scene.add(mesh)

      this.billboards.push({
        mesh,
        targetPosition: mesh.position.clone(),
        originalOpacity: 1,
      })
    })
  }

  private createExperienceBillboards() {
    const halfSize = this.platformSize / 2
    const count = resumeData.experience.length
    const billboardWidth = 6
    const availableSpace = this.platformSize
    const startZ = -availableSpace / 2 + billboardWidth / 2

    resumeData.experience.forEach((exp, index) => {
      const texture = createExperienceTexture(exp, exp.icon)
      texture.colorSpace = THREE.SRGBColorSpace

      // Updated billboard size to match new texture 600x240
      const geometry = new THREE.PlaneGeometry(6, 2.4)
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      })

      const mesh = new THREE.Mesh(geometry, material)

      // CSS space-around layout
      const zPos = startZ + (index + 0.5) * (availableSpace / count)
      const yPos = 4

      // Position on the west side, parallel to platform
      mesh.position.set(-halfSize - 8, yPos, zPos)
      mesh.rotation.y = Math.PI / 2
      this.scene.add(mesh)

      this.billboards.push({
        mesh,
        targetPosition: mesh.position.clone(),
        originalOpacity: 1,
      })
    })
  }

  public update(delta: number, playerPosition: THREE.Vector3, activeZoneId: string | null) {
    const time = this.clock.getElapsedTime()

    for (const billboard of this.billboards) {
      const distance = playerPosition.distanceTo(billboard.targetPosition)
      const viewDistance = 35

      // Fade based on distance
      let targetOpacity = 1
      if (distance > viewDistance) {
        targetOpacity = Math.max(0, 1 - (distance - viewDistance) / 20)
      }

      // Animate opacity for billboard
      const material = billboard.mesh.material as THREE.MeshBasicMaterial
      material.opacity += (targetOpacity - material.opacity) * delta * 3

      // Subtle floating animation
      const baseY = billboard.targetPosition.y
      const floatOffset = Math.sin(time * 0.5 + billboard.targetPosition.x) * 0.1
      billboard.mesh.position.y = baseY + floatOffset
    }
  }

  public getBillboards(): BillboardPanel[] {
    return this.billboards
  }

  public dispose() {
    for (const billboard of this.billboards) {
      this.scene.remove(billboard.mesh)
      billboard.mesh.geometry.dispose()
      const material = billboard.mesh.material as THREE.MeshBasicMaterial
      if (material.map) {
        material.map.dispose()
      }
      material.dispose()
    }
    this.billboards = []
  }
}
