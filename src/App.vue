<script setup lang="ts">
import { ref, provide } from 'vue'
import UniverseScene from '@/components/scene/UniverseScene.vue'
import LabelsOverlay from '@/components/scene/LabelsOverlay.vue'
import InfoPanel from '@/components/ui/InfoPanel.vue'
import IntroOverlay from '@/components/ui/IntroOverlay.vue'
import Navigation from '@/components/ui/Navigation.vue'
import MobileControls from '@/components/ui/MobileControls.vue'
import { useInteraction } from '@/composables/useInteraction'
import { useResumeData } from '@/composables/useResumeData'
import { useCameraAnimation } from '@/composables/useCameraAnimation'

const interaction = useInteraction()
const { data } = useResumeData()
const introComplete = ref(false)
const cameraAnimation = useCameraAnimation()

provide('interaction', interaction)
provide('resumeData', data)
provide('cameraAnimation', cameraAnimation)

function handleSectionClick(section: 'planet' | 'asteroids' | 'stars') {
  const targetMap = {
    planet: 'planet' as const,
    asteroids: 'asteroids' as const,
    stars: 'stars' as const,
  }
  cameraAnimation.animateTo(targetMap[section])
  if (section === 'planet') {
    interaction.select({ type: 'planet', index: 0, data: data.profile })
  } else if (section === 'asteroids') {
    interaction.select({ type: 'asteroid', index: 0, data: data.experience[0] })
  } else if (section === 'stars') {
    interaction.select({ type: 'star', index: 0, data: data.projects[0] })
  }
}
</script>

<template>
  <div id="cosmic-resume">
    <IntroOverlay v-if="!introComplete" @complete="introComplete = true" />
    <UniverseScene v-show="introComplete" />
    <LabelsOverlay v-show="introComplete" />
    <Navigation v-if="introComplete" @navigate="handleSectionClick" />
    <MobileControls v-if="introComplete" @navigate="handleSectionClick" />
    <InfoPanel :item="interaction.selected.value" @close="interaction.clearSelection()" />
  </div>
</template>

<style scoped>
#cosmic-resume {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
