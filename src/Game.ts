import * as THREE from 'three'
import * as CANNON from 'cannon-es'
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
import { SpecialZones, ZoneData } from './components/SpecialZones'
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

  private clock: THREE.Clock
  private keys: { [key: string]: boolean } = {}
  private mouseLookDelta = { x: 0, y: 0 }
  private mobileMove = { x: 0, z: 0 }
  private texturesLoaded = false

  constructor(container: HTMLElement) {
    this.clock = new THREE.Clock()
    this.initRenderer(container)
    this.initScene()
    // Create Sun, Earth, Sky instances upfront (textures loaded async)
    this.sun = new Sun(this.scene)
    this.earth = new Earth(this.scene, new THREE.Vector3(30, 50, -80))
    this.sky = new Sky(this.scene)
  }

  private initRenderer(container: HTMLElement) {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.shadowMap.enabled = true
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
    await Promise.all([
      this.sun.loadTexture(),
      this.earth.loadTexture(),
      this.sky.loadTexture(),
    ])

    this.texturesLoaded = true
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
    this.nebula = new Nebula(this.scene)
    this.nebula.create()

    // Character
    this.character = new Character(this.scene, this.physicsWorld.world, this.platform.getSpawnPoint())

    // Particle Text System
    this.particleText = new ParticleText(this.scene)
    this.particleText.create()

    // Special Zones
    this.specialZones = new SpecialZones(this.scene, this.platform)
    this.specialZones.create(resumeData)

    // Camera Controller
    this.cameraController = new CameraController(this.camera, this.character)

    // Input
    this.setupInput()

    // Resize
    window.addEventListener('resize', this.onResize.bind(this))
  }

  private setupInput() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true
    })
    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false
    })

    // Mouse look (FPS style) - click to lock pointer
    this.renderer.domElement.addEventListener('click', () => {
      this.renderer.domElement.requestPointerLock()
    })

    window.addEventListener('mousemove', (e) => {
      if (document.pointerLockElement === this.renderer.domElement) {
        this.mouseLookDelta.x += e.movementX * 0.002
        this.mouseLookDelta.y += e.movementY * 0.002
      }
    })

    // Mouse attack on left click - only when pointer is already locked
    window.addEventListener('mousedown', (e) => {
      if (e.button === 0 && document.pointerLockElement === this.renderer.domElement) {
        this.keys['KeyJ'] = true
      }
    })
    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        this.keys['KeyJ'] = false
      }
    })
  }

  private onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  public update() {
    const delta = Math.min(this.clock.getDelta(), 0.1)

    // Cache input state
    const inputEnabled = this.cameraController.isFollowing()

    // Only build input when enabled
    let forward = false, backward = false, left = false, right = false, jump = false, attack = false
    if (inputEnabled) {
      forward = this.keys['KeyW'] || this.keys['ArrowUp']
      backward = this.keys['KeyS'] || this.keys['ArrowDown']
      left = this.keys['KeyA'] || this.keys['ArrowLeft']
      right = this.keys['KeyD'] || this.keys['ArrowRight']
      jump = this.keys['Space']
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
    this.character.update(delta, { forward, backward, left, right, jump, attack }, this.platform)

    // Update particle text
    this.particleText.update(delta)

    // Check special zones
    const activeZone = this.specialZones.checkZone(this.character.getPosition())
    if (activeZone) {
      if (!this.particleText.isActive()) {
        this.particleText.gatherLines(activeZone.lines, activeZone.worldPosition)
      }
    } else {
      if (this.particleText.hasTextVisible()) {
        this.particleText.scatter()
      }
    }

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

    // Render
    this.renderer.render(this.scene, this.camera)
  }

  public setIntroComplete() {
    this.cameraController.setOverlayComplete()
  }

  public setMobileMove(direction: { x: number; z: number }) {
    this.mobileMove = direction
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
      requestAnimationFrame(animate)
      this.update()
    }
    animate()
  }

  public dispose() {
    this.renderer.dispose()
    window.removeEventListener('resize', this.onResize.bind(this))
  }
}