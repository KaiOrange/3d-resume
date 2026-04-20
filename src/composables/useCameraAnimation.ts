import { ref, shallowRef } from 'vue'
import * as THREE from 'three'

export type CameraTarget = 'overview' | 'planet' | 'asteroids' | 'stars'

const targetPositions: Record<CameraTarget, THREE.Vector3> = {
  overview: new THREE.Vector3(0, 5, 20),
  planet: new THREE.Vector3(0, 2, 8),
  asteroids: new THREE.Vector3(10, 5, 12),
  stars: new THREE.Vector3(15, 8, 10),
}

export function useCameraAnimation() {
  const currentTarget = ref<CameraTarget>('overview')
  const isAnimating = ref(false)
  const animTarget = shallowRef(new THREE.Vector3())
  const cameraPosition = shallowRef(new THREE.Vector3(0, 5, 20))

  function animateTo(target: CameraTarget) {
    if (currentTarget.value === target && !isAnimating.value) return
    currentTarget.value = target
    animTarget.value = targetPositions[target].clone()
    isAnimating.value = true
  }

  function getTargetPosition(target: CameraTarget): THREE.Vector3 {
    return targetPositions[target].clone()
  }

  function setAnimating(val: boolean) {
    isAnimating.value = val
  }

  function setAnimTarget(pos: THREE.Vector3) {
    animTarget.value.copy(pos)
  }

  function setCameraPosition(pos: THREE.Vector3) {
    cameraPosition.value.copy(pos)
  }

  return { currentTarget, isAnimating, animTarget, cameraPosition, animateTo, getTargetPosition, setAnimating, setAnimTarget, setCameraPosition }
}
