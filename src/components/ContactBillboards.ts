import * as THREE from 'three'
import * as CANNON from 'cannon-es'

interface ContactBillboard {
  mesh: THREE.Group
  poleMesh: THREE.Mesh
  position: THREE.Vector3
  url: string
  name: string
}

export interface ContactInfo {
  name: string
  icon: string
  url: string
}

export class ContactBillboards {
  private scene: THREE.Scene
  private billboards: ContactBillboard[] = []
  private platformSize: number
  private clock: THREE.Clock
  private world: CANNON.World

  constructor(scene: THREE.Scene, world: CANNON.World, platformSize: number) {
    this.scene = scene
    this.world = world
    this.platformSize = platformSize
    this.clock = new THREE.Clock()
  }

  public create(contacts: ContactInfo[]) {
    const halfSize = this.platformSize / 2

    // Tech style signs - square icon area
    const signWidth = 1.2
    const signHeight = 1.2 // Square
    const signDepth = 0.05 // Very thin
    const poleHeight = 2.0
    const spacing = signWidth * 2.0

    // Center on west side
    const totalWidth = (contacts.length - 1) * spacing
    const startZ = -totalWidth / 2
    const x = -halfSize + 4
    const z = 0

    contacts.forEach((contact, index) => {
      const zPos = startZ + index * spacing
      this.createBillboard(contact, x, poleHeight, signWidth, signHeight, signDepth, zPos)
    })
  }

  private createBillboard(
    contact: ContactInfo,
    x: number,
    poleHeight: number,
    signWidth: number,
    signHeight: number,
    signDepth: number,
    z: number
  ) {
    const textureLoader = new THREE.TextureLoader()

    // Load icon texture
    const iconTexture = textureLoader.load(contact.icon)
    iconTexture.colorSpace = THREE.SRGBColorSpace
    iconTexture.magFilter = THREE.LinearFilter
    iconTexture.minFilter = THREE.LinearFilter

    // Tech glow frame material
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      emissive: 0x0088aa,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.9,
      transparent: true,
      opacity: 0.9,
    })

    // Icon material - tech style with glow
    const iconMat = new THREE.MeshStandardMaterial({
      map: iconTexture,
      roughness: 0.1,
      metalness: 0.5,
      emissive: 0x00aaff,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.95,
    })

    // Dark panel material for edges
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x0a1628,
      roughness: 0.3,
      metalness: 0.8,
    })

    // Build sign with square icon in center
    const group = new THREE.Group()

    // Main panel (square icon area)
    const iconPanelGeom = new THREE.PlaneGeometry(signWidth, signHeight)
    const iconPanel = new THREE.Mesh(iconPanelGeom, iconMat)
    iconPanel.position.set(0, 0, signDepth / 2 + 0.001) // Slightly in front
    group.add(iconPanel)

    // Back panel
    const backPanelGeom = new THREE.PlaneGeometry(signWidth, signHeight)
    const backPanel = new THREE.Mesh(backPanelGeom, iconMat.clone())
    backPanel.position.set(0, 0, -signDepth / 2 - 0.001)
    backPanel.rotation.y = Math.PI
    group.add(backPanel)

    // Frame edges (glowing)
    const edgeThickness = 0.05
    const edgeColor = frameMat

    // Top edge
    const topEdge = new THREE.Mesh(
      new THREE.BoxGeometry(signWidth + edgeThickness * 2, edgeThickness, signDepth),
      edgeColor
    )
    topEdge.position.set(0, signHeight / 2 + edgeThickness / 2, 0)
    group.add(topEdge)

    // Bottom edge
    const bottomEdge = new THREE.Mesh(
      new THREE.BoxGeometry(signWidth + edgeThickness * 2, edgeThickness, signDepth),
      edgeColor
    )
    bottomEdge.position.set(0, -signHeight / 2 - edgeThickness / 2, 0)
    group.add(bottomEdge)

    // Left edge
    const leftEdge = new THREE.Mesh(
      new THREE.BoxGeometry(edgeThickness, signHeight, signDepth),
      edgeColor
    )
    leftEdge.position.set(-signWidth / 2 - edgeThickness / 2, 0, 0)
    group.add(leftEdge)

    // Right edge
    const rightEdge = new THREE.Mesh(
      new THREE.BoxGeometry(edgeThickness, signHeight, signDepth),
      edgeColor
    )
    rightEdge.position.set(signWidth / 2 + edgeThickness / 2, 0, 0)
    group.add(rightEdge)

    // Corner accents (brighter)
    const cornerMat = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x00ffff,
      emissiveIntensity: 1.0,
      roughness: 0.1,
      metalness: 1.0,
    })

    const cornerSize = 0.08
    const corners = [
      [signWidth / 2 + edgeThickness, signHeight / 2 + edgeThickness],
      [-signWidth / 2 - edgeThickness, signHeight / 2 + edgeThickness],
      [signWidth / 2 + edgeThickness, -signHeight / 2 - edgeThickness],
      [-signWidth / 2 - edgeThickness, -signHeight / 2 - edgeThickness],
    ]

    corners.forEach(([cx, cy]) => {
      const corner = new THREE.Mesh(
        new THREE.BoxGeometry(cornerSize, cornerSize, signDepth + 0.01),
        cornerMat
      )
      corner.position.set(cx, cy, 0)
      group.add(corner)
    })

    // Position the group
    const signY = poleHeight + signHeight / 2 + edgeThickness
    group.position.set(x, signY, z)
    group.rotation.y = Math.PI / 2 // Face toward platform center
    group.castShadow = true
    group.receiveShadow = true
    this.scene.add(group)

    // Pole - glowing
    const poleGeom = new THREE.CylinderGeometry(0.03, 0.03, poleHeight, 8)
    const pole = new THREE.Mesh(poleGeom, frameMat.clone())
    pole.position.set(x, poleHeight / 2, z)
    pole.castShadow = true
    pole.receiveShadow = true
    this.scene.add(pole)

    // Physics for pole
    const poleShape = new CANNON.Cylinder(0.03, 0.03, poleHeight, 8)
    const poleBody = new CANNON.Body({ mass: 0 })
    poleBody.addShape(poleShape)
    poleBody.position.set(x, poleHeight / 2, z)
    this.world.addBody(poleBody)

    // Label above the sign
    const labelCanvas = document.createElement('canvas')
    labelCanvas.width = 256
    labelCanvas.height = 64
    const ctx = labelCanvas.getContext('2d')!
    ctx.fillStyle = 'rgba(0, 20, 40, 0.85)'
    ctx.fillRect(0, 0, 256, 64)

    // Glowing text effect
    ctx.shadowColor = '#00d4ff'
    ctx.shadowBlur = 10
    ctx.fillStyle = '#00ffff'
    ctx.font = 'bold 28px Microsoft YaHei'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(contact.name, 128, 32)

    const labelTexture = new THREE.CanvasTexture(labelCanvas)
    const labelGeom = new THREE.PlaneGeometry(signWidth, 0.4)
    const labelMat = new THREE.MeshBasicMaterial({
      map: labelTexture,
      transparent: true,
      side: THREE.DoubleSide,
    })

    const label = new THREE.Mesh(labelGeom, labelMat)
    label.position.set(x, signY + signHeight / 2 + 0.5, z)
    label.rotation.y = Math.PI / 2
    this.scene.add(label)

    this.billboards.push({
      mesh: group,
      poleMesh: pole,
      position: new THREE.Vector3(x, signY, z),
      url: contact.url,
      name: contact.name,
    })
  }

  public update(delta: number, robotPosition: THREE.Vector3, isAttacking: boolean) {
    if (isAttacking) {
      for (const billboard of this.billboards) {
        const dist = robotPosition.distanceTo(billboard.position)
        if (dist < 4) {
          if (billboard.url.startsWith('http')) {
            window.open(billboard.url, '_blank')
          } else if (billboard.url.startsWith('mailto:')) {
            window.location.href = billboard.url
          }
          break
        }
      }
    }
  }

  public getBillboards(): ContactBillboard[] {
    return this.billboards
  }

  public dispose() {
    for (const billboard of this.billboards) {
      this.scene.remove(billboard.mesh)
      this.scene.remove(billboard.poleMesh)
    }
    this.billboards = []
  }
}