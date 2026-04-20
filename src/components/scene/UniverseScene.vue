<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import SceneContent from './SceneContent.vue'
import { useResumeData } from '@/composables/useResumeData'

const { data } = useResumeData()
</script>

<template>
  <TresCanvas
    :clear-color="data.scene.themeColor"
    :pixel-ratio="1.5"
    window-size
  >
    <SceneContent />
  </TresCanvas>
</template>
