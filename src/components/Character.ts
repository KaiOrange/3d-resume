import * as THREE from 'three'
import * as CANNON from 'cannon-es'
import { Platform } from './Platform'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

interface CharacterInput {
  forward: boolean
  backward: boolean
  left: boolean
  right: boolean
  jump: boolean
  attack: boolean
}

export class Character {
  private mesh: THREE.Group
  private body: CANNON.Body
  private world: CANNON.World
  private moveSpeed = 6
  private jumpForce = 15
  private isGrounded = false
  private groundY = 1.0

  // Robot rotation around Y axis (controlled by mouse X)
  // rotationY = 0: robot faces +Z (toward camera)
  // rotationY = Math.PI: robot faces -Z (away from camera = back view)
  private rotationY = Math.PI

  // Animation
  private mixer: THREE.AnimationMixer | null = null
  private animations: { [name: string]: THREE.AnimationClip } = {}
  private currentAction: THREE.AnimationAction | null = null
  private punchAction: THREE.AnimationAction | null = null
  private model: THREE.Object3D | null = null
  private animationLoaded = false
  private attackCooldown = 0
  private isAttacking = false // Track if we're in attack animation

  constructor(scene: THREE.Scene, world: CANNON.World, spawnPoint: THREE.Vector3) {
    this.world = world

    this.mesh = new THREE.Group()
    this.mesh.position.copy(spawnPoint)
    scene.add(this.mesh)

    const loader = new GLTFLoader()
    loader.load('/modals/RobotExpressive.glb', (gltf) => {
      this.model = gltf.scene
      this.model.scale.set(0.5, 0.5, 0.5)
      this.mesh.add(this.model)

      this.mixer = new THREE.AnimationMixer(this.model)

      gltf.animations.forEach((clip) => {
        this.animations[clip.name] = clip
      })

      this.animationLoaded = true
      this.playAnimation('Idle')
    })

    const bodyShape = new CANNON.Cylinder(0.4, 0.4, 2.2, 8)
    const charMaterial = new CANNON.Material('character')

    this.body = new CANNON.Body({
      mass: 20,
      material: charMaterial,
      linearDamping: 0.4,
      angularDamping: 0.99,
    })
    this.body.addShape(bodyShape, new CANNON.Vec3(0, 1.1, 0))
    this.body.position.set(spawnPoint.x, spawnPoint.y, spawnPoint.z)
    this.body.angularFactor = new CANNON.Vec3(0, 1, 0)

    this.world.addBody(this.body)
  }

  private playAnimation(name: string, fadeTime = 0.2) {
    if (!this.mixer || !this.animationLoaded) return

    const clip = this.animations[name]
    if (!clip) {
      console.log('No clip found for:', name)
      return
    }

    const newAction = this.mixer.clipAction(clip)

    if (this.currentAction === newAction) return

    if (this.currentAction) {
      this.currentAction.fadeOut(fadeTime)
    }

    newAction.reset().fadeIn(fadeTime).play()

    // Only Punch animation plays once, others loop
    if (name === 'Punch') {
      newAction.setLoop(THREE.LoopOnce, 1)
      newAction.clampWhenFinished = true
    } else {
      newAction.setLoop(THREE.LoopRepeat, Infinity)
    }

    this.currentAction = newAction

    // Save reference to punch action
    if (name === 'Punch') {
      this.punchAction = newAction
    }
  }

  public update(delta: number, input: CharacterInput, platform: Platform) {
    const clampedDelta = Math.min(delta, 0.1)

    if (this.mixer && this.animationLoaded) {
      this.mixer.update(clampedDelta)
    }

    // Update cooldown
    if (this.attackCooldown > 0) {
      this.attackCooldown -= clampedDelta
    }

    // Apply platform level constraint FIRST to ensure consistent physics state
    const platformLevel = 0.5
    if (this.body.position.y < platformLevel) {
      this.body.position.y = platformLevel
      this.body.velocity.y = 0
      // Wake up body when landing
      this.body.wakeUp()
    }

    const charY = this.body.position.y
    const verticalVelocity = this.body.velocity.y
    // isGrounded when character is at platform level and mostly settled
    // Small velocity tolerance handles physics jitter during landing
    this.isGrounded = charY < 2.0 && Math.abs(verticalVelocity) < 2

    const isMoving = input.forward || input.backward || input.left || input.right

    // Handle attack input - only trigger on new press, not while held
    if (input.attack && this.attackCooldown <= 0 && !this.isAttacking) {
      this.playAnimation('Punch')
      this.attackCooldown = 1.0
      this.isAttacking = true
    }

    // Check if punch animation finished
    if (this.isAttacking && this.punchAction && !this.punchAction.isRunning()) {
      this.isAttacking = false
    }

    // Animation state machine - don't interrupt attack
    if (this.animationLoaded && !this.isAttacking) {
      if (!this.isGrounded) {
        this.playAnimation(isMoving ? 'WalkJump' : 'Jump')
      } else if (isMoving) {
        this.playAnimation('Walking')
      } else {
        this.playAnimation('Idle')
      }
    }

    // Movement - CS style
    const moveDirection = new THREE.Vector3()
    if (input.forward) moveDirection.z -= 1
    if (input.backward) moveDirection.z += 1
    if (input.left) moveDirection.x -= 1
    if (input.right) moveDirection.x += 1

    if (moveDirection.length() > 0) {
      moveDirection.normalize()

      // Movement only based on yaw (horizontal rotation), pitch doesn't affect movement
      // forward: rotationY=0 faces +Z, rotationY=PI faces -Z
      // right: perpendicular to forward
      const forward = new THREE.Vector3(Math.sin(this.rotationY), 0, Math.cos(this.rotationY))
      const right = new THREE.Vector3(-Math.cos(this.rotationY), 0, Math.sin(this.rotationY))

      const velocity = new THREE.Vector3()
      velocity.x = forward.x * (-moveDirection.z) + right.x * moveDirection.x
      velocity.z = forward.z * (-moveDirection.z) + right.z * moveDirection.x

      this.body.velocity.x = THREE.MathUtils.lerp(this.body.velocity.x, velocity.x * this.moveSpeed, 0.1)
      this.body.velocity.z = THREE.MathUtils.lerp(this.body.velocity.z, velocity.z * this.moveSpeed, 0.1)
    } else {
      this.body.velocity.x *= 0.9
      this.body.velocity.z *= 0.9
    }

    // Jump
    if (input.jump && this.isGrounded) {
      this.body.velocity.y = this.jumpForce
      this.isGrounded = false
    }

    // Gravity
    if (!this.isGrounded && this.body.velocity.y > -20) {
      this.body.velocity.y -= 15 * clampedDelta
    }

    this.mesh.position.set(
      this.body.position.x,
      this.body.position.y,
      this.body.position.z
    )

    // Mesh rotation tracks rotationY
    this.mesh.rotation.y = this.rotationY
    this.body.quaternion.setFromEuler(0, this.rotationY, 0)

    const halfSize = platform.getSize() / 2 - 1
    this.body.position.x = THREE.MathUtils.clamp(this.body.position.x, -halfSize, halfSize)
    this.body.position.z = THREE.MathUtils.clamp(this.body.position.z, -halfSize, halfSize)
  }

  // Rotate robot based on mouse delta
  public rotate(delta: number) {
    this.rotationY -= delta
  }

  // Set robot rotation directly from yaw
  public setRotationY(yaw: number) {
    this.rotationY = yaw
  }

  public getPosition(): THREE.Vector3 {
    return new THREE.Vector3(this.body.position.x, this.body.position.y, this.body.position.z)
  }

  public getRotationY(): number {
    return this.rotationY
  }

  // Returns the direction robot is facing
  public getForwardDirection(): THREE.Vector3 {
    return new THREE.Vector3(
      Math.sin(this.rotationY),
      0,
      Math.cos(this.rotationY)
    )
  }
}
