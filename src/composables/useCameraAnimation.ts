import { ref } from 'vue'
import * as THREE from 'three'

export type CameraTarget = 'overview' | 'planet' | 'asteroids' | 'stars'

const targetPositions: Record<CameraTarget, THREE.Vector3> = {
  overview: new THREE.Vector3(0, 5, 20),
  planet: new THREE.Vector3(0, 2, 8),
  asteroids: new THREE.Vector3(8, 4, 12),
  stars: new THREE.Vector3(12, 8, 10),
}

export function useCameraAnimation() {
  const currentTarget = ref<CameraTarget>('overview')
  const isAnimating = ref(false)

  function animateTo(target: CameraTarget) {
    currentTarget.value = target
    isAnimating.value = true
  }

  function getTargetPosition(target: CameraTarget): THREE.Vector3 {
    return targetPositions[target].clone()
  }

  return { currentTarget, isAnimating, animateTo, getTargetPosition }
}
