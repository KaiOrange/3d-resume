<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  move: [direction: { x: number; z: number }]
  jump: []
  attack: []
  look: [delta: { x: number; y: number }]
}>()

const leftTouchId = ref<number | null>(null)
const lookTouchId = ref<number | null>(null)
const leftStartX = ref(0)
const leftStartY = ref(0)
const lookStartX = ref(0)
const lookStartY = ref(0)

const moveAreaRef = ref<HTMLDivElement>()
const lookAreaRef = ref<HTMLDivElement>()

function handleLeftTouchStart(e: TouchEvent) {
  const touch = e.touches[0]
  leftTouchId.value = touch.identifier
  leftStartX.value = touch.clientX
  leftStartY.value = touch.clientY
}

function handleLeftTouchMove(e: TouchEvent) {
  if (leftTouchId.value === null) return

  for (let i = 0; i < e.touches.length; i++) {
    const touch = e.touches[i]
    if (touch.identifier === leftTouchId.value) {
      const deltaX = touch.clientX - leftStartX.value
      const deltaY = touch.clientY - leftStartY.value

      const deadzone = 15
      if (Math.abs(deltaX) > deadzone || Math.abs(deltaY) > deadzone) {
        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
        const normalizedX = deltaX / length
        const normalizedY = deltaY / length

        // Up is negative Y in screen coords, but we want forward (-Z)
        emit('move', { x: normalizedX, z: -normalizedY })
      }
      break
    }
  }
}

function handleLeftTouchEnd(e: TouchEvent) {
  for (let i = 0; i < e.changedTouches.length; i++) {
    const touch = e.changedTouches[i]
    if (touch.identifier === leftTouchId.value) {
      leftTouchId.value = null
      emit('move', { x: 0, z: 0 })
      break
    }
  }
}

// Look controls - works anywhere on the screen except on buttons
function handleLookTouchStart(e: TouchEvent) {
  // Ignore if touch started on move area (left bottom)
  const touch = e.touches[0]
  const moveArea = moveAreaRef.value
  if (moveArea) {
    const rect = moveArea.getBoundingClientRect()
    if (touch.clientX >= rect.left && touch.clientX <= rect.right &&
        touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
      return // Ignore touch on move area
    }
  }

  // Ignore if touch started on buttons
  const target = e.target as HTMLElement
  if (target.closest('.action-btn')) {
    return // Ignore touch on buttons
  }

  lookTouchId.value = touch.identifier
  lookStartX.value = touch.clientX
  lookStartY.value = touch.clientY
}

function handleLookTouchMove(e: TouchEvent) {
  if (lookTouchId.value === null) return

  for (let i = 0; i < e.touches.length; i++) {
    const touch = e.touches[i]
    if (touch.identifier === lookTouchId.value) {
      const deltaX = touch.clientX - lookStartX.value
      const deltaY = touch.clientY - lookStartY.value

      // Only emit look if moved beyond deadzone
      const deadzone = 5
      if (Math.abs(deltaX) > deadzone || Math.abs(deltaY) > deadzone) {
        emit('look', { x: deltaX * 0.01, y: deltaY * 0.01 })
        lookStartX.value = touch.clientX
        lookStartY.value = touch.clientY
      }
      break
    }
  }
}

function handleLookTouchEnd(e: TouchEvent) {
  for (let i = 0; i < e.changedTouches.length; i++) {
    const touch = e.changedTouches[i]
    if (touch.identifier === lookTouchId.value) {
      lookTouchId.value = null
      break
    }
  }
}

function handleJump() {
  emit('jump')
}

function handleAttack() {
  emit('attack')
}

onMounted(() => {
  const moveArea = moveAreaRef.value
  const lookArea = lookAreaRef.value

  if (moveArea) {
    moveArea.addEventListener('touchstart', handleLeftTouchStart, { passive: false })
    moveArea.addEventListener('touchmove', handleLeftTouchMove, { passive: false })
    moveArea.addEventListener('touchend', handleLeftTouchEnd, { passive: false })
    moveArea.addEventListener('touchcancel', handleLeftTouchEnd, { passive: false })
  }

  // Look area covers the entire screen (except move area and buttons)
  if (lookArea) {
    lookArea.addEventListener('touchstart', handleLookTouchStart, { passive: false })
    lookArea.addEventListener('touchmove', handleLookTouchMove, { passive: false })
    lookArea.addEventListener('touchend', handleLookTouchEnd, { passive: false })
    lookArea.addEventListener('touchcancel', handleLookTouchEnd, { passive: false })
  }
})

onUnmounted(() => {
  const moveArea = moveAreaRef.value
  const lookArea = lookAreaRef.value

  if (moveArea) {
    moveArea.removeEventListener('touchstart', handleLeftTouchStart)
    moveArea.removeEventListener('touchmove', handleLeftTouchMove)
    moveArea.removeEventListener('touchend', handleLeftTouchEnd)
    moveArea.removeEventListener('touchcancel', handleLeftTouchEnd)
  }

  if (lookArea) {
    lookArea.removeEventListener('touchstart', handleLookTouchStart)
    lookArea.removeEventListener('touchmove', handleLookTouchMove)
    lookArea.removeEventListener('touchend', handleLookTouchEnd)
    lookArea.removeEventListener('touchcancel', handleLookTouchEnd)
  }
})
</script>

<template>
  <div class="mobile-controls">
    <!-- Full screen look area (catches swipes for camera rotation) -->
    <div ref="lookAreaRef" class="look-area"></div>

    <!-- Left side: Movement joystick -->
    <div ref="moveAreaRef" class="move-area">
      <div class="joystick-base">
        <div class="joystick-dot"></div>
      </div>
    </div>

    <!-- Right side: Action buttons -->
    <div class="action-area">
      <div class="action-buttons">
        <button class="action-btn attack-btn" @touchstart.prevent="handleAttack">
          <span class="btn-icon">⚔</span>
        </button>
        <button class="action-btn jump-btn" @touchstart.prevent="handleJump">
          <span class="btn-icon">⬆</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mobile-controls {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 50;
}

.look-area {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: auto;
}

.move-area {
  position: fixed;
  bottom: 20px;
  left: 20px;
  width: 150px;
  height: 150px;
  pointer-events: auto;
}

.joystick-base {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(0, 212, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
}

.joystick-dot {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.5);
  border: 2px solid rgba(0, 212, 255, 0.8);
}

.action-area {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 150px;
  height: 150px;
  pointer-events: auto;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
}

.action-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(0, 212, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  transition: all 0.15s;
  pointer-events: auto;
}

.action-btn:active {
  background: rgba(0, 212, 255, 0.3);
  border-color: rgba(0, 212, 255, 0.8);
  transform: scale(0.95);
}

.attack-btn {
  border-color: rgba(255, 100, 100, 0.5);
}

.attack-btn:active {
  background: rgba(255, 100, 100, 0.3);
  border-color: rgba(255, 100, 100, 0.8);
}

.btn-icon {
  text-shadow: 0 0 10px currentColor;
}
</style>