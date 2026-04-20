<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject, computed } from 'vue'
import type { useCameraAnimation } from '@/composables/useCameraAnimation'
import * as THREE from 'three'

const cameraAnimation = inject<ReturnType<typeof useCameraAnimation>>('cameraAnimation')

// Label positions in world space
const worldPositions = {
  profile: new THREE.Vector3(0, 3.5, 0),
  experience: new THREE.Vector3(9, 3, 0),
  projects: new THREE.Vector3(12, 8, -5),
}

// Map section to CSS position (percentage of viewport)
const labelScreens = computed(() => {
  const cam = cameraAnimation?.cameraPosition.value
  if (!cam) return { profile: { x: 50, y: 25 }, experience: { x: 75, y: 40 }, projects: { x: 80, y: 30 } }

  // Simple perspective-based positioning
  // Just use fixed positions since exact projection needs camera matrix
  return {
    profile: { x: 50, y: 25 },
    experience: { x: 75, y: 45 },
    projects: { x: 80, y: 30 },
  }
})

const visible = ref(true)
</script>

<template>
  <div v-if="visible" class="labels-overlay">
    <div
      class="scene-label label-profile"
      :style="{
        left: `${labelScreens.profile.x}%`,
        top: `${labelScreens.profile.y}%`,
      }"
    >
      <span class="label-cn">个人资料</span>
      <span class="label-en">PROFILE</span>
    </div>

    <div
      class="scene-label label-experience"
      :style="{
        left: `${labelScreens.experience.x}%`,
        top: `${labelScreens.experience.y}%`,
      }"
    >
      <span class="label-cn">工作经历</span>
      <span class="label-en">EXPERIENCE</span>
    </div>

    <div
      class="scene-label label-projects"
      :style="{
        left: `${labelScreens.projects.x}%`,
        top: `${labelScreens.projects.y}%`,
      }"
    >
      <span class="label-cn">项目作品</span>
      <span class="label-en">PROJECTS</span>
    </div>
  </div>
</template>

<style scoped>
.labels-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

.scene-label {
  position: absolute;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 8px 16px;
  background: rgba(10, 14, 39, 0.7);
  backdrop-filter: blur(8px);
  border-radius: 8px;
  border: 1px solid rgba(0, 212, 255, 0.3);
  white-space: nowrap;
  transition: opacity 0.3s;
}

.label-cn {
  display: block;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.label-en {
  display: block;
  font-size: 10px;
  color: var(--accent);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-top: 2px;
}

.label-profile {
  border-color: rgba(0, 212, 255, 0.5);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
}

.label-experience {
  border-color: rgba(0, 255, 136, 0.5);
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
}

.label-experience .label-en {
  color: #00ff88;
}

.label-projects {
  border-color: rgba(191, 90, 242, 0.5);
  box-shadow: 0 0 20px rgba(191, 90, 242, 0.2);
}

.label-projects .label-en {
  color: #bf5af2;
}
</style>
