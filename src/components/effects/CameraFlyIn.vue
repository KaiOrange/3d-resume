<script setup lang="ts">
import { watch, onMounted } from 'vue'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import * as THREE from 'three'

const props = defineProps<{
  target: THREE.Vector3
  active: boolean
}>()

const emit = defineEmits<{
  complete: []
}>()

const { camera } = useTresContext()
const { onLoop } = useRenderLoop()

const startPos = new THREE.Vector3(0, 5, 20)
let progress = 0
const duration = 1.5

onMounted(() => {
  if (!camera.value) {
    console.warn('Camera not available in CameraFlyIn')
  }
})

onLoop(({ delta }) => {
  if (!props.active || !camera.value) return

  progress += delta / duration
  if (progress >= 1) {
    progress = 1
    emit('complete')
  }

  const t = easeInOutCubic(progress)
  const cam = camera.value
  if (cam && cam.position && cam.lookAt) {
    cam.position.lerpVectors(startPos, props.target, t)
    cam.lookAt(0, 0, 0)
  }
})

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

watch(() => props.active, (active) => {
  if (active) {
    progress = 0
    if (camera.value?.position) {
      startPos.copy(camera.value.position)
    }
  }
})
</script>

<template>
  <!-- No visual element, purely controls camera -->
</template>
