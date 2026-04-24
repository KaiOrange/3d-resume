<script setup lang="ts">
import { computed } from 'vue'
import { useResumeData } from '@/composables/useResumeData'

const emit = defineEmits<{
  click: [index: number]
}>()

const { data } = useResumeData()

const categoryColors: Record<string, string> = {
  frontend: '#00d4ff',
  backend: '#00ff88',
  fullstack: '#bf5af2',
}

const starPositions = computed(() => {
  return data.projects.map((_, i) => {
    const angle = (i / data.projects.length) * Math.PI * 0.8 + Math.PI * 0.6
    const radius = 15
    const height = 4 + i * 2
    return {
      x: Math.cos(angle) * radius,
      y: height,
      z: Math.sin(angle) * radius - 5,
    }
  })
})
</script>

<template>
  <TresGroup>
    <TresPointLight
      v-for="(project, i) in data.projects"
      :key="'light-' + i"
      :position="[starPositions[i].x, starPositions[i].y, starPositions[i].z]"
      :color="categoryColors[project.category]"
      :intensity="2"
      :distance="8"
    />

    <TresMesh
      v-for="(project, i) in data.projects"
      :key="'star-' + i"
      :position="[starPositions[i].x, starPositions[i].y, starPositions[i].z]"
      @click="emit('click', i)"
    >
      <TresSphereGeometry :args="[0.5, 32, 32]" />
      <TresMeshStandardMaterial
        :color="categoryColors[project.category]"
        :emissive="categoryColors[project.category]"
        :emissive-intensity="0.8"
      />
    </TresMesh>
  </TresGroup>
</template>
