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

      // Position on the east side, facing platform center (south)
      mesh.position.set(halfSize + 8, 5 + index * 1, -10 + index * 8)
      mesh.rotation.y = Math.PI // Face toward platform center (-Z)
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

    resumeData.experience.forEach((exp, index) => {
      const texture = createExperienceTexture(exp)
      texture.colorSpace = THREE.SRGBColorSpace

      const geometry = new THREE.PlaneGeometry(8, 3)
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        side: THREE.DoubleSide,
      })

      const mesh = new THREE.Mesh(geometry, material)

      // Position on the west side, facing platform center (south)
      mesh.position.set(-halfSize - 8, 4 + index * 1, -8 + index * 7)
      mesh.rotation.y = 0 // Face toward platform center (-Z)
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

      // Animate opacity
      const material = billboard.mesh.material as THREE.MeshBasicMaterial
      material.opacity += (targetOpacity - material.opacity) * delta * 3

      // Billboard always faces camera
      billboard.mesh.lookAt(billboard.mesh.position)

      // Subtle floating animation
      const baseY = billboard.targetPosition.y
      billboard.mesh.position.y = baseY + Math.sin(time * 0.5 + billboard.targetPosition.x) * 0.1
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
