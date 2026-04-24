<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'
import { useResponsive } from '@/composables/useResponsive'
import { useResumeData } from '@/composables/useResumeData'

const { starCount } = useResponsive()
const { data } = useResumeData()

const pointsRef = shallowRef<THREE.Points>()
const { onLoop } = useRenderLoop()

const geometry = new THREE.BufferGeometry()
const count = starCount.value
const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)
const sizes = new Float32Array(count)

const accentColor = new THREE.Color(data.scene.accentColor)
const nebulaColor = new THREE.Color(data.scene.nebulaColor)
const whiteColor = new THREE.Color('#ffffff')

for (let i = 0; i < count; i++) {
  const i3 = i * 3
  positions[i3] = (Math.random() - 0.5) * 200
  positions[i3 + 1] = (Math.random() - 0.5) * 200
  positions[i3 + 2] = (Math.random() - 0.5) * 200

  const colorChoice = Math.random()
  const color = colorChoice < 0.6 ? whiteColor
    : colorChoice < 0.8 ? accentColor
    : nebulaColor

  colors[i3] = color.r
  colors[i3 + 1] = color.g
  colors[i3 + 2] = color.b

  sizes[i] = Math.random() * 2 + 0.5
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

const material = new THREE.PointsMaterial({
  size: 0.15,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  sizeAttenuation: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
})

onLoop(({ delta }) => {
  if (pointsRef.value) {
    pointsRef.value.rotation.y += delta * 0.005
    pointsRef.value.rotation.x += delta * 0.002
  }
})
</script>

<template>
  <TresPoints ref="pointsRef" :geometry="geometry" :material="material" />
</template>
