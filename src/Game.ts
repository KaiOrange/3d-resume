import * as THREE from 'three'
import { Character } from './components/Character'
import { Platform } from './components/Platform'
import { PhysicsWorld } from './components/PhysicsWorld'
import { ParticleText } from './components/ParticleText'
import { CameraController } from './components/CameraController'
import { Sun } from './components/Sun'
import { Earth } from './components/Earth'
import { SunGlow } from './components/SunGlow'
import { Nebula } from './components/Nebula'
import { Sky } from './components/Sky'
import { SpecialZones } from './components/SpecialZones'
import { DestructibleBricks } from './components/DestructibleBricks'
import { WindSpiral } from './components/WindSpiral'
import { InfoBillboards } from './components/InfoBillboards'
import { ContactBillboards } from './components/ContactBillboards'
import { ObstacleLadder } from './components/ObstacleLadder'
import { AccelerationCarpet } from './components/AccelerationCarpet'
import { Fireworks } from './components/Fireworks'
import { resumeData } from './data/resumeData'

export class Game {
  private renderer!: THREE.WebGLRenderer
  private scene!: THREE.Scene
  private camera!: THREE.PerspectiveCamera
  private physicsWorld!: PhysicsWorld
  private character!: Character
  private platform!: Platform
  private particleText!: ParticleText
  private cameraController!: CameraController
  private sun!: Sun
  private earth!: Earth
  private sunGlow!: SunGlow
  private nebula!: Nebula
  private sky!: Sky
  private specialZones!: SpecialZones
  private destructibleBricks!: DestructibleBricks
  private windSpiral!: WindSpiral
  private northWindSpiral!: WindSpiral
  private infoBillboards!: InfoBillboards
  private contactBillboards!: ContactBillboards
  private obstacleLadder!: ObstacleLadder
  private eastCarpet!: AccelerationCarpet
  private westCarpet!: AccelerationCarpet
  private fireworks!: Fireworks
  private fireworksCooldown = 0

  private clock: THREE.Clock
  private keys: { [key: string]: boolean } = {}
  private mouseLookDelta = { x: 0, y: 0 }
  private mobileMoveDirection = { x: 0, z: 0 }
  private wasOnZone = false
  private wasOnNorthZone = false

  private isMobile: boolean

  private animationFrameId = 0
  private boundOnResize: () => void
  private boundOnKeyDown: (e: KeyboardEvent) => void
  private boundOnKeyUp: (e: KeyboardEvent) => void
  private boundOnMouseMove: (e: MouseEvent) => void
  private boundOnMouseDown: (e: MouseEvent) => void
  private boundOnMouseUp: (e: MouseEvent) => void
  private boundOnClick: () => void

  constructor(container: HTMLElement) {
    this.clock = new THREE.Clock()
    this.boundOnResize = this.onResize.bind(this)
    this.boundOnKeyDown = this.onKeyDown.bind(this)
    this.boundOnKeyUp = this.onKeyUp.bind(this)
    this.boundOnMouseMove = this.onMouseMove.bind(this)
    this.boundOnMouseDown = this.onMouseDown.bind(this)
    this.boundOnMouseUp = this.onMouseUp.bind(this)
    this.boundOnClick = this.onClick.bind(this)
    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0
    this.initRenderer(container)
    this.initScene()
    // Create Sun, Earth, Sky instances upfront (textures loaded async)
    this.sun = new Sun(this.scene)
    this.earth = new Earth(this.scene, new THREE.Vector3(30, 50, -80))
    this.sky = new Sky(this.scene)
  }

  private initRenderer(container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: !this.isMobile })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(this.isMobile ? 1 : Math.min(window.devicePixelRatio, 2))
    this.renderer.shadowMap.enabled = !this.isMobile
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.2
    this.renderer.setClearColor(0x0a0a1a, 1)
    container.appendChild(this.renderer.domElement)
  }

  private initScene() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000008)

    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000)
    this.camera.position.set(0, 80, 100)
    this.camera.lookAt(0, 0, 0)
  }

  public async preloadTextures(): Promise<void> {
    // Load textures for already-created Sun, Earth, Sky
    await Promise.all([this.sun.loadTexture(), this.earth.loadTexture(), this.sky.loadTexture()])
  }

  public async create(): Promise<void> {
    // Load textures first before creating scene elements
    await this.preloadTextures()

    // Create all scene elements
    this.physicsWorld = new PhysicsWorld()

    // Platform
    this.platform = new Platform(this.scene, this.physicsWorld.world)
    this.platform.create()

    // Sun - use preloaded instance
    this.sun.create()

    // Sun glow effect
    this.sunGlow = new SunGlow(this.scene, this.sun.getPosition())
    this.sunGlow.create()

    // Earth - use preloaded instance
    this.earth.create()

    // Sky - use preloaded instance (textures already loaded)
    this.sky.setCamera(this.camera)
    this.sky.create()

    // Nebula (below platform) - created after sky to render on top
    this.nebula = new Nebula(this.scene, this.isMobile)
    this.nebula.create()

    // Character
    this.character = new Character(this.scene, this.physicsWorld.world, this.platform.getSpawnPoint())

    // Set up contact materials between character and platform objects
    this.platform.setupContactMaterials(this.character.getMaterial())

    // Particle Text System
    this.particleText = new ParticleText(this.scene)
    this.particleText.create()

    // Special Zones (single circle at south edge)
    this.specialZones = new SpecialZones(this.scene, this.platform)
    this.specialZones.create()

    // Wind Spiral for the main zone
    this.windSpiral = new WindSpiral(this.scene)
    this.windSpiral.createSpiralForZone(this.specialZones.getMainZonePosition(), '#00d4ff')

    // Wind Spiral for north zone
    this.northWindSpiral = new WindSpiral(this.scene)
    this.northWindSpiral.createSpiralForZone(this.specialZones.getNorthZonePosition(), '#00d4ff')

    // Info Billboards with resume data
    this.infoBillboards = new InfoBillboards(this.scene, this.platform.getSize())
    this.infoBillboards.create()

    // Contact Billboards with contact info
    this.contactBillboards = new ContactBillboards(this.scene, this.physicsWorld.world, this.platform.getSize())
    this.contactBillboards.create(resumeData.contactInfos)

    // Destructible Bricks - on the east side, away from other objects
    this.destructibleBricks = new DestructibleBricks(this.scene, this.physicsWorld.world, new THREE.Vector3(10, 0, -10))
    this.destructibleBricks.create()
    this.destructibleBricks.setupContactMaterials(this.character.getMaterial())

    // Obstacle Ladder System
    this.obstacleLadder = new ObstacleLadder(this.scene, this.physicsWorld.world)
    this.obstacleLadder.create()

    // Acceleration Carpets
    this.eastCarpet = new AccelerationCarpet(this.scene, new THREE.Vector3(13.5, 0.05, 0))
    this.eastCarpet.create()
    this.westCarpet = new AccelerationCarpet(this.scene, new THREE.Vector3(-13.5, 0.05, 0))
    this.westCarpet.create()

    // Fireworks
    this.fireworks = new Fireworks(this.scene)

    // Camera Controller
    this.cameraController = new CameraController(this.camera, this.character)

    // Input
    this.setupInput()

    // Resize
    window.addEventListener('resize', this.boundOnResize)
  }

  private setupInput() {
    window.addEventListener('keydown', this.boundOnKeyDown)
    window.addEventListener('keyup', this.boundOnKeyUp)
    this.renderer.domElement.addEventListener('click', this.boundOnClick)
    window.addEventListener('mousemove', this.boundOnMouseMove)
    window.addEventListener('mousedown', this.boundOnMouseDown)
    window.addEventListener('mouseup', this.boundOnMouseUp)
  }

  private onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  private onKeyDown(e: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault()
    }
    this.keys[e.code] = true
  }

  private onKeyUp(e: KeyboardEvent) {
    this.keys[e.code] = false
  }

  private onClick() {
    this.renderer.domElement.requestPointerLock()
  }

  private onMouseMove(e: MouseEvent) {
    if (document.pointerLockElement === this.renderer.domElement) {
      this.mouseLookDelta.x += e.movementX * 0.002
      this.mouseLookDelta.y += e.movementY * 0.002
    }
  }

  private onMouseDown(e: MouseEvent) {
    if (e.button === 0 && document.pointerLockElement === this.renderer.domElement) {
      this.keys['KeyJ'] = true
    }
    if (e.button === 2) {
      this.keys['Space'] = true
    }
  }

  private onMouseUp(e: MouseEvent) {
    if (e.button === 0) {
      this.keys['KeyJ'] = false
    }
    if (e.button === 2) {
      this.keys['Space'] = false
    }
  }

  public update() {
    const delta = Math.min(this.clock.getDelta(), 0.1)

    // Cache input state
    const inputEnabled = this.cameraController.isFollowing()

    // Only build input when enabled
    let forward = false,
      backward = false,
      left = false,
      right = false,
      jump = false,
      attack = false
    if (inputEnabled) {
      forward = this.keys['KeyW'] || this.keys['ArrowUp'] || this.mobileMoveDirection.z > 0.3
      backward = this.keys['KeyS'] || this.keys['ArrowDown'] || this.mobileMoveDirection.z < -0.3
      left = this.keys['KeyA'] || this.keys['ArrowLeft'] || this.mobileMoveDirection.x < -0.3
      right = this.keys['KeyD'] || this.keys['ArrowRight'] || this.mobileMoveDirection.x > 0.3
      jump = this.keys['Space'] || this.keys['KeyK']
      attack = this.keys['KeyJ']
    }

    // Update physics
    this.physicsWorld.update(delta)

    // Handle camera mouse look
    if (inputEnabled && !this.cameraController.isInFlyIn()) {
      const dx = this.mouseLookDelta.x
      const dy = this.mouseLookDelta.y
      this.mouseLookDelta.x = 0
      this.mouseLookDelta.y = 0
      if (dx !== 0 || dy !== 0) {
        this.cameraController.handleMouseMove(dx, dy)
      }
    }

    // Update character
    this.character.update(delta, { forward, backward, left, right, jump, attack }, this.platform, this.obstacleLadder)

    // Update platform pushable objects
    this.platform.update(delta, this.character.getPosition(), attack)

    // Check if robot fell off platform - reset to center
    if (this.character.needsReset()) {
      this.character.resetToPosition(this.platform.getSpawnPoint())
    }

    // Update particle text
    this.particleText.update(delta)

    // Check special zone - show profile name when on the circle
    const activeZone = this.specialZones.checkZone(this.character.getPosition())
    const isOnMainZone = activeZone?.id === 'main'
    const isOnNorthZone = activeZone?.id === 'north'
    const isOnZone = isOnMainZone || isOnNorthZone

    // Update character zone state for animation
    this.character.setOnZone(isOnZone)

    // Trigger zone effects
    if (isOnMainZone) {
      // South zone: show name in sky
      if (!this.wasOnZone) {
        const namePos = this.specialZones.getMainZonePosition()
        namePos.z += 2
        // If scatter is happening, force gather particles back immediately
        if (this.particleText.isScatteringState()) {
          this.particleText.gatherLines([resumeData.profile.name], namePos)
        } else if (!this.particleText.hasTextVisible()) {
          this.particleText.gatherLines([resumeData.profile.name], namePos)
        }
      }
      this.wasOnZone = true
      this.wasOnNorthZone = false
    } else if (isOnNorthZone) {
      // North zone: show me.png image
      if (!this.wasOnNorthZone) {
        const northPos = this.specialZones.getNorthZonePosition()
        northPos.y += 18
        northPos.z -= 52
        // If scatter is happening, force gather particles back immediately
        if (this.particleText.isScatteringState()) {
          this.particleText.gatherImage('/images/me.png', northPos)
        } else if (!this.particleText.hasTextVisible()) {
          this.particleText.gatherImage('/images/me.png', northPos)
        }
      }
      this.wasOnNorthZone = true
      this.wasOnZone = false
    } else {
      // Scatter particles when leaving zone
      if (
        (this.wasOnZone || this.wasOnNorthZone) &&
        (this.particleText.isActive() || this.particleText.hasTextVisible())
      ) {
        this.particleText.scatter()
      }
      this.wasOnZone = false
      this.wasOnNorthZone = false
    }

    // Update wind spiral effects - each zone only activates when on THAT specific zone
    this.windSpiral.update(delta, this.character.getPosition(), attack, isOnMainZone)
    this.northWindSpiral.update(delta, this.character.getPosition(), attack, isOnNorthZone)

    // Update special zones visual effects
    this.specialZones.update(delta)

    // Update contact billboards
    this.contactBillboards.update(delta, this.character.getPosition(), attack)

    // Update destructible bricks (pass attack state)
    this.destructibleBricks.update(delta, this.character.getPosition(), attack, this.character.getForwardDirection())

    // Update camera
    this.cameraController.update(delta)

    // Update sun glow
    this.sunGlow.update(this.camera.position, this.cameraController.getLookAt())

    // Update starfield
    this.sky.update(delta)

    // Update earth orbit
    this.earth.update(delta)

    // Update nebula
    this.nebula.update(delta)

    // Update info billboards
    this.infoBillboards.update(delta, this.character.getPosition(), activeZone?.id || null)

    // Update obstacle ladder (#6 oscillation + blink)
    this.obstacleLadder.update(delta)

    // Update carpets (glow pulse)
    this.eastCarpet.update(delta)
    this.westCarpet.update(delta)

    // Check acceleration carpets for robot
    const charPos = this.character.getPosition()
    const eastBoost = this.eastCarpet.getAccelerationZ(charPos)
    const westBoost = this.westCarpet.getAccelerationZ(charPos)
    if (eastBoost !== null) {
      this.character.applyExternalForceZ(eastBoost, delta)
    }
    if (westBoost !== null) {
      this.character.applyExternalForceZ(westBoost, delta)
    }

    // Fireworks: keep launching while on obstacle #8
    if (this.obstacleLadder.isOnObstacle8(charPos)) {
      this.fireworksCooldown -= delta
      if (this.fireworksCooldown <= 0) {
        this.fireworks.launch(new THREE.Vector3(-Math.random() * 17, 0, 50))
        this.fireworksCooldown = 0.8
      }
    } else {
      this.fireworksCooldown = 0
    }

    // Update fireworks
    this.fireworks.update(delta)

    // Render
    this.renderer.render(this.scene, this.camera)
  }

  public setIntroComplete() {
    this.cameraController.setOverlayComplete()
  }

  public setMobileMove(direction: { x: number; z: number }) {
    this.mobileMoveDirection.x = direction.x
    this.mobileMoveDirection.z = direction.z
  }

  public setMobileJump(active: boolean) {
    this.keys['Space'] = active
  }

  public setMobileAttack(active: boolean) {
    this.keys['KeyJ'] = active
  }

  public addMouseLook(delta: { x: number; y: number }) {
    this.mouseLookDelta.x += delta.x
    this.mouseLookDelta.y += delta.y
  }

  public start() {
    this.clock.start()
    const animate = () => {
      this.animationFrameId = requestAnimationFrame(animate)
      this.update()
    }
    animate()
  }

  public dispose() {
    // Stop animation loop
    cancelAnimationFrame(this.animationFrameId)

    // Remove input listeners
    window.removeEventListener('keydown', this.boundOnKeyDown)
    window.removeEventListener('keyup', this.boundOnKeyUp)
    this.renderer.domElement.removeEventListener('click', this.boundOnClick)
    window.removeEventListener('mousemove', this.boundOnMouseMove)
    window.removeEventListener('mousedown', this.boundOnMouseDown)
    window.removeEventListener('mouseup', this.boundOnMouseUp)
    window.removeEventListener('resize', this.boundOnResize)

    // Dispose all components
    this.particleText?.dispose()
    this.nebula?.dispose()
    this.specialZones?.dispose()
    this.destructibleBricks?.dispose()
    this.windSpiral?.dispose()
    this.northWindSpiral?.dispose()
    this.infoBillboards?.dispose()
    this.contactBillboards?.dispose()
    this.platform?.dispose()
    this.sunGlow?.dispose()
    this.earth?.dispose()
    this.sky?.dispose()
    this.sun?.dispose()

    this.obstacleLadder?.dispose()
    this.eastCarpet?.dispose()
    this.westCarpet?.dispose()
    this.fireworks?.dispose()

    // Dispose renderer
    this.renderer.dispose()
  }
}
