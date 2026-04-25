<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Game } from './Game'
import IntroOverlay from './components/ui/IntroOverlay.vue'
import MobileControls from './components/ui/MobileControls.vue'
import { isMobileDevice } from './utils/device'

const containerRef = ref<HTMLElement>()
const showIntro = ref(true)
const isLoading = ref(false)
const isReady = ref(false)
const isMobile = ref(false)
const introCompleteCalled = ref(false)
let game: Game | null = null

onMounted(async () => {
  isMobile.value = isMobileDevice()

  if (containerRef.value) {
    game = new Game(containerRef.value)
    isLoading.value = true
    await game.create()
    game.start()
    isLoading.value = false
    isReady.value = true
  }
})

function onIntroComplete() {
  // Guard: only allow intro complete to be called once
  if (introCompleteCalled.value) return
  introCompleteCalled.value = true

  showIntro.value = false
  if (game) {
    // Wait for textures if still loading, otherwise proceed immediately
    if (isReady.value) {
      game.setIntroComplete()
    } else {
      // Textures still loading, wait for them
      const checkReady = setInterval(() => {
        if (isReady.value) {
          clearInterval(checkReady)
          game?.setIntroComplete()
        }
      }, 50)
    }
  }
}

// Mobile controls handlers
function onMove(direction: { x: number; z: number }) {
  if (game) {
    game.setMobileMove(direction)
  }
}

function onJump() {
  if (game) {
    game.setMobileJump(true)
    setTimeout(() => game?.setMobileJump(false), 100)
  }
}

function onAttack() {
  if (game) {
    game.setMobileAttack(true)
    setTimeout(() => game?.setMobileAttack(false), 100)
  }
}

function onLook(delta: { x: number; y: number }) {
  if (game) {
    game.addMouseLook(delta)
  }
}

onUnmounted(() => {
  if (game) {
    game.dispose()
  }
})
</script>

<template>
  <div class="app-container">
    <IntroOverlay v-if="showIntro" @complete="onIntroComplete" />
    <div ref="containerRef" class="game-container"></div>
    <MobileControls v-if="!showIntro && isMobile" @move="onMove" @jump="onJump" @attack="onAttack" @look="onLook" />
  </div>
</template>

<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.game-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}
</style>