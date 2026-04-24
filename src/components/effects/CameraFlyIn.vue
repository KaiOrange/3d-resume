<script setup lang="ts">
import { watch } from 'vue'
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

onLoop(({ delta }) => {
  if (!props.active || !camera.value) return

  progress += delta / duration
  if (progress >= 1) {
    progress = 1
    emit('complete')
  }

  const t = easeInOutCubic(progress)
  camera.value.position.lerpVectors(startPos, props.target, t)
  camera.value.lookAt(0, 0, 0)
})

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

watch(() => props.active, (active) => {
  if (active) {
    progress = 0
    if (camera.value) {
      startPos.copy(camera.value.position)
    }
  }
})
</script>

<template>
  <!-- No visual element, purely controls camera -->
</template>
