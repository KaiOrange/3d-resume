<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import { useResumeData } from '@/composables/useResumeData'

const emit = defineEmits<{
  click: []
}>()

const { data } = useResumeData()
const groupRef = shallowRef()
const hovered = ref(false)

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (groupRef.value) {
    const obj = groupRef.value
    // TresJS refs may expose .instance or be the raw object
    const target = obj.instance || obj
    if (target.rotation) {
      target.rotation.y += delta * 0.2
    }
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
  <TresGroup ref="groupRef" :position="[0, 0, 0]">
    <TresMesh
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

    <TresMesh :scale="hovered ? 1.15 : 1.08">
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
