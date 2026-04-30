<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

import IntroOverlay from './components/ui/IntroOverlay.vue'
import MobileControls from './components/ui/MobileControls.vue'
import { isMobileDevice } from './utils/device'

const containerRef = ref<HTMLElement>()
const showIntro = ref(true)
const isLoading = ref(false)
const isReady = ref(false)
const isMobile = ref(false)
const introCompleteCalled = ref(false)
const showRotateHint = ref(false)
let game: any = null
let readyCheckTimeout: ReturnType<typeof setTimeout> | null = null

function checkOrientation() {
  let isLandscape = false

  // Check screen orientation API first (most reliable on mobile)
  if (screen.orientation) {
    const angle = screen.orientation.angle
    isLandscape = angle === 90 || angle === -90 || angle === 270
  }

  // Fallback to window dimensions
  if (!isLandscape) {
    isLandscape = window.innerWidth > window.innerHeight
  }

  showRotateHint.value = !isLandscape
}

function setupOrientationListener() {
  if (screen.orientation) {
    screen.orientation.addEventListener('change', () => {
      setTimeout(checkOrientation, 100)
    })
  }
  window.addEventListener('resize', checkOrientation)
  window.addEventListener('orientationchange', checkOrientation)
}

function cleanupOrientationListener() {
  if (screen.orientation) {
    screen.orientation.removeEventListener('change', checkOrientation)
  }
  window.removeEventListener('resize', checkOrientation)
  window.removeEventListener('orientationchange', checkOrientation)
}

onMounted(async () => {
  isMobile.value = isMobileDevice()

  if (isMobile.value) {
    checkOrientation()
    setupOrientationListener()

    // Listen for first user interaction to trigger landscape
    window.addEventListener('landscape-init', checkOrientation)
  }

  if (containerRef.value) {
    const { Game } = await import('./Game')
    game = new Game(containerRef.value)
    isLoading.value = true
    await game.create()
    game.start()
    isLoading.value = false
    isReady.value = true
  }
})

function onIntroComplete() {
  if (introCompleteCalled.value) return
  introCompleteCalled.value = true

  showIntro.value = false
  if (game) {
    if (isReady.value) {
      game.setIntroComplete()
    } else {
      const checkReady = () => {
        if (isReady.value) {
          game?.setIntroComplete()
        } else {
          readyCheckTimeout = setTimeout(checkReady, 50)
        }
      }
      checkReady()
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
  if (readyCheckTimeout) {
    clearTimeout(readyCheckTimeout)
  }
  if (game) {
    game.dispose()
  }
  if (isMobile.value) {
    cleanupOrientationListener()
  }
})
</script>

<template>
  <div class="app-container">
    <div v-if="isMobile && showRotateHint" class="rotate-hint">
      <span>请旋转设备至横屏模式</span>
    </div>
    <IntroOverlay v-if="showIntro" @complete="onIntroComplete" />
    <div ref="containerRef" class="game-container" />
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

.rotate-hint {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: rgba(255, 255, 255, 0.8);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.85rem;
  z-index: 10000;
  backdrop-filter: blur(8px);
}

.game-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
}
</style>
