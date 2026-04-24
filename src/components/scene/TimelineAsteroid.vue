<script setup lang="ts">
import { shallowRef, computed } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'
import { useResumeData } from '@/composables/useResumeData'

const emit = defineEmits<{
  click: [index: number]
}>()

const { data } = useResumeData()
const groupRef = shallowRef<THREE.Group>()

const { onLoop } = useRenderLoop()

const asteroidPositions = computed(() => {
  const count = data.experience.length
  return data.experience.map((_, i) => {
    const angle = (i / count) * Math.PI * 2
    const radius = 8
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle * 0.5) * 1.5,
      z: Math.sin(angle) * radius,
    }
  })
})

// Generate connecting line positions as Float32Array
const lineArrays = computed(() => {
  return data.experience.map((_, i) => {
    const next = (i + 1) % data.experience.length
    return new Float32Array([
      asteroidPositions.value[i].x, asteroidPositions.value[i].y, asteroidPositions.value[i].z,
      asteroidPositions.value[next].x, asteroidPositions.value[next].y, asteroidPositions.value[next].z,
    ])
  })
})

onLoop(({ elapsed }) => {
  if (groupRef.value) {
    groupRef.value.rotation.y = elapsed * 0.03
  }
})
</script>

<template>
  <TresGroup ref="groupRef">
    <TresMesh
      v-for="(exp, i) in data.experience"
      :key="'asteroid-' + i"
      :position="[asteroidPositions[i].x, asteroidPositions[i].y, asteroidPositions[i].z]"
      @click="emit('click', i)"
    >
      <TresDodecahedronGeometry :args="[0.8, 0]" />
      <TresMeshStandardMaterial
        :color="exp.color"
        :emissive="exp.color"
        :emissive-intensity="0.2"
        :roughness="0.6"
        :metalness="0.4"
        :flat-shading="true"
      />
    </TresMesh>

    <TresLine
      v-for="(_, i) in data.experience"
      :key="'line-' + i"
    >
      <TresBufferGeometry>
        <TresBufferAttribute
          attach="attributes-position"
          :array="lineArrays[i]"
          :item-size="3"
        />
      </TresBufferGeometry>
      <TresLineBasicMaterial
        :color="data.scene.accentColor"
        :transparent="true"
        :opacity="0.3"
      />
    </TresLine>
  </TresGroup>
</template>
