<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'
import { useResumeData } from '@/composables/useResumeData'

const emit = defineEmits<{
  click: []
}>()

const { data } = useResumeData()
const meshRef = shallowRef<THREE.Mesh>()
const glowRef = shallowRef<THREE.Mesh>()
const hovered = ref(false)

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (meshRef.value) {
    meshRef.value.rotation.y += delta * 0.2
  }
  if (glowRef.value) {
    glowRef.value.rotation.y -= delta * 0.1
    const scale = hovered.value ? 1.15 : 1.08
    glowRef.value.scale.setScalar(scale)
  }
})

function onPointerEnter() {
  hovered.value = true
  document.body.style.cursor = 'pointer'
}

function onPointerLeave() {
  hovered.value = false
  document.body.style.cursor = 'default'
}
</script>

<template>
  <TresGroup :position="[0, 0, 0]">
    <TresMesh
      ref="meshRef"
      @click="emit('click')"
      @pointer-enter="onPointerEnter"
      @pointer-leave="onPointerLeave"
    >
      <TresSphereGeometry :args="[2, 64, 64]" />
      <TresMeshStandardMaterial
        :color="data.scene.accentColor"
        :emissive="data.scene.accentColor"
        :emissive-intensity="0.3"
        :roughness="0.4"
        :metalness="0.6"
      />
    </TresMesh>

    <TresMesh ref="glowRef">
      <TresSphereGeometry :args="[2.3, 32, 32]" />
      <TresMeshBasicMaterial
        :color="data.scene.accentColor"
        :transparent="true"
        :opacity="0.1"
        :side="2"
      />
    </TresMesh>
  </TresGroup>
</template>
