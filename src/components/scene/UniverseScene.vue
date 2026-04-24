<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { useResponsive } from '@/composables/useResponsive'
import { useResumeData } from '@/composables/useResumeData'
import StarField from './StarField.vue'
import InfoPlanet from './InfoPlanet.vue'
import TimelineAsteroid from './TimelineAsteroid.vue'
import ProjectStar from './ProjectStar.vue'
import NebulaCloud from './NebulaCloud.vue'
import { inject } from 'vue'
import type { useInteraction } from '@/composables/useInteraction'

const { pixelRatio } = useResponsive()
const { data } = useResumeData()

const interaction = inject<ReturnType<typeof useInteraction>>('interaction')

function onPlanetClick() {
  interaction?.select({ type: 'planet', index: 0, data: data.profile })
}

function onAsteroidClick(index: number) {
  interaction?.select({ type: 'asteroid', index, data: data.experience[index] })
}

function onStarClick(index: number) {
  interaction?.select({ type: 'star', index, data: data.projects[index] })
}
</script>

<template>
  <TresCanvas
    :clear-color="data.scene.themeColor"
    :pixel-ratio="pixelRatio"
    window-size
  >
    <TresPerspectiveCamera :position="[0, 5, 20]" />
    <OrbitControls
      :enable-damping="true"
      :damping-factor="0.05"
      :min-distance="5"
      :max-distance="50"
      :enable-pan="false"
    />

    <StarField />
    <NebulaCloud />
    <InfoPlanet @click="onPlanetClick" />
    <TimelineAsteroid @click="onAsteroidClick" />
    <ProjectStar @click="onStarClick" />

    <TresAmbientLight :intensity="0.3" />
    <TresPointLight :position="[0, 10, 0]" :intensity="1" :color="data.scene.accentColor" />
  </TresCanvas>
</template>
