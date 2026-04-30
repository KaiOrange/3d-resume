import * as THREE from 'three'
import { Character } from './Character'

export class CameraController {
  private camera: THREE.PerspectiveCamera
  private character: Character

  private phase: 'overlay' | 'flyin' | 'follow' = 'overlay'
  private flyInProgress = 0
  private flyInDuration = 3.0

  private currentCameraPos = new THREE.Vector3()
  private currentLookAt = new THREE.Vector3()
  private startCameraPos = new THREE.Vector3()
  private startLookAt = new THREE.Vector3()

  // Camera orbit parameters
  private yaw = Math.PI // Start behind robot (robot faces -Z, camera at +Z)
  private pitch = 0.3 // Slightly looking down
  private readonly distance = 12
  private readonly minPitch = -0.6
  private readonly maxPitch = 0.8

  private flyInStarted = false

  constructor(camera: THREE.PerspectiveCamera, character: Character) {
    this.camera = camera
    this.character = character

    this.camera.position.set(0, 80, 100)
    this.currentCameraPos.copy(this.camera.position)
    this.startCameraPos.copy(this.camera.position)
    this.currentLookAt.set(0, 0, 0)
    this.startLookAt.set(0, 0, 0)
  }

  public setOverlayComplete() {
    if (this.flyInStarted) return
    this.flyInStarted = true

    this.phase = 'flyin'
    this.startCameraPos.copy(this.camera.position)
    this.startLookAt.copy(this.currentLookAt)
    this.flyInProgress = 0
  }

  public update(delta: number) {
    if (this.phase === 'flyin') {
      this.updateFlyIn(delta)
    } else if (this.phase === 'follow') {
      this.updateFollow(delta)
    }
  }

  // Mouse movement: deltaX/deltaY from mousemove event
  public handleMouseMove(deltaX: number, deltaY: number) {
    if (this.phase !== 'follow') return

    // Mouse sensitivity
    const sensitivity = 0.4

    // Mouse X: control yaw (horizontal rotation)
    this.yaw -= deltaX * sensitivity

    // Mouse Y: control pitch (vertical angle)
    // Mouse up = look up = pitch decreases
    // Mouse down = look down = pitch increases
    this.pitch += deltaY * sensitivity
    this.pitch = Math.max(this.minPitch, Math.min(this.maxPitch, this.pitch))

    // Robot rotation should match yaw (robot faces camera-relative direction)
    this.character.setRotationY(this.yaw)
  }

  private updateFlyIn(delta: number) {
    this.flyInProgress += delta / this.flyInDuration

    const robotPos = this.character.getPosition()

    // Calculate target camera position - always behind robot based on initial yaw
    const horizontalDist = this.distance * Math.cos(this.pitch)
    const verticalDist = this.distance * Math.sin(this.pitch)

    const behindRobot = robotPos.clone()
    behindRobot.x -= Math.sin(this.yaw) * horizontalDist
    behindRobot.z -= Math.cos(this.yaw) * horizontalDist
    behindRobot.y = robotPos.y + verticalDist + 2

    const lookTarget = robotPos.clone()
    lookTarget.y += 2

    if (this.flyInProgress >= 1) {
      this.flyInProgress = 1
      // Ensure exact match with follow phase initial position
      this.camera.position.copy(behindRobot)
      this.currentCameraPos.copy(behindRobot)
      this.currentLookAt.copy(lookTarget)
      this.camera.lookAt(this.currentLookAt)
      this.phase = 'follow'
      return
    }

    const t = this.easeOutQuint(this.flyInProgress)

    this.camera.position.lerpVectors(this.startCameraPos, behindRobot, t)
    this.currentLookAt.lerpVectors(this.startLookAt, lookTarget, t)
    this.camera.lookAt(this.currentLookAt)
  }

  private updateFollow(_delta: number) {
    const robotPos = this.character.getPosition()

    // Calculate camera position on sphere surface
    const horizontalDist = this.distance * Math.cos(this.pitch)
    const verticalDist = this.distance * Math.sin(this.pitch)

    const idealCameraPos = robotPos.clone()
    idealCameraPos.x -= Math.sin(this.yaw) * horizontalDist
    idealCameraPos.z -= Math.cos(this.yaw) * horizontalDist
    idealCameraPos.y = robotPos.y + verticalDist + 2

    // Smooth camera follow - use fixed lerp to avoid micro-differences
    this.currentCameraPos.lerp(idealCameraPos, 0.15)
    this.camera.position.copy(this.currentCameraPos)

    // Look at robot center
    const lookTarget = robotPos.clone()
    lookTarget.y += 2

    this.currentLookAt.lerp(lookTarget, 0.15)
    this.camera.lookAt(this.currentLookAt)
  }

  private easeOutQuint(t: number): number {
    return 1 - Math.pow(1 - t, 5)
  }

  public isFollowing(): boolean {
    return this.phase === 'follow'
  }

  public isInFlyIn(): boolean {
    return this.phase === 'flyin'
  }

  public getLookAt(): THREE.Vector3 {
    return this.currentLookAt.clone()
  }
}
