<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'
import { useResumeData } from '@/composables/useResumeData'

const { data } = useResumeData()

const cloudPositions = [
  { x: -20, y: 5, z: -30, scale: 15 },
  { x: 15, y: -3, z: -25, scale: 10 },
  { x: 5, y: 8, z: -35, scale: 12 },
]

const cloudRefs = shallowRef<THREE.Mesh[]>([])

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  cloudRefs.value.forEach((cloud, i) => {
    if (cloud) {
      cloud.rotation.z += delta * 0.01 * (i % 2 === 0 ? 1 : -1)
    }
  })
})
</script>

<template>
  <TresMesh
    v-for="(pos, i) in cloudPositions"
    :key="i"
    ref="cloudRefs"
    :position="[pos.x, pos.y, pos.z]"
    :scale="[pos.scale, pos.scale, 1]"
  >
    <TresPlaneGeometry :args="[1, 1]" />
    <TresMeshBasicMaterial
      :color="data.scene.nebulaColor"
      :transparent="true"
      :opacity="0.06"
      :side="2"
      :depth-write="false"
      :blending="2"
    />
  </TresMesh>
</template>
