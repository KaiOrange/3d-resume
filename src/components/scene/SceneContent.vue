<script setup lang="ts">
import { inject, ref } from 'vue'
import { useTresContext, useRenderLoop } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import StarField from './StarField.vue'
import InfoPlanet from './InfoPlanet.vue'
import TimelineAsteroid from './TimelineAsteroid.vue'
import ProjectStar from './ProjectStar.vue'
import NebulaCloud from './NebulaCloud.vue'
import type { useInteraction } from '@/composables/useInteraction'
import type { useCameraAnimation } from '@/composables/useCameraAnimation'
import { useResumeData } from '@/composables/useResumeData'

const { data } = useResumeData()

const interaction = inject<ReturnType<typeof useInteraction>>('interaction')
const cameraAnimation = inject<ReturnType<typeof useCameraAnimation>>('cameraAnimation')

const { camera } = useTresContext()
const controlsRef = ref()

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (!camera.value) return
  const cam = camera.value

  if (cameraAnimation?.isAnimating.value && cameraAnimation.animTarget.value) {
    const target = cameraAnimation.animTarget.value
    const speed = 3.0
    cam.position.lerp(target, delta * speed)

    if (controlsRef.value?.enabled) {
      controlsRef.value.enabled = false
    }

    const dist = cam.position.distanceTo(target)
    if (dist < 0.1) {
      cam.position.copy(target)
      cameraAnimation.setAnimating(false)
      if (controlsRef.value) {
        controlsRef.value.enabled = true
      }
    }
  }

  cameraAnimation?.setCameraPosition(cam.position)
})

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
  <TresPerspectiveCamera :position="[0, 5, 20]" />
  <OrbitControls
    ref="controlsRef"
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
</template>
