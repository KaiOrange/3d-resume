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
const lookStartX = ref(0)
const lookStartY = ref(0)

const moveAreaRef = ref<HTMLDivElement>()
const lookAreaRef = ref<HTMLDivElement>()

// Ripple animation state
const attackRipple = ref(false)
const jumpRipple = ref(false)

// Joystick state
const joystickDotX = ref(0)
const joystickDotY = ref(0)
const isJoystickActive = ref(false)

const JOYSTICK_BASE_SIZE = 120
const JOYSTICK_DOT_SIZE = 50
const JOYSTICK_MAX_DISTANCE = (JOYSTICK_BASE_SIZE - JOYSTICK_DOT_SIZE) / 2

function handleLeftTouchStart(e: TouchEvent) {
  const touch = e.touches[0]
  const rect = moveAreaRef.value?.getBoundingClientRect()
  if (!rect) return

  // Calculate touch position relative to joystick center
  const touchX = touch.clientX - rect.left - JOYSTICK_BASE_SIZE / 2
  const touchY = touch.clientY - rect.top - JOYSTICK_BASE_SIZE / 2

  leftTouchId.value = touch.identifier
  isJoystickActive.value = true

  // Clamp dot position within joystick base
  const distance = Math.sqrt(touchX * touchX + touchY * touchY)
  if (distance > JOYSTICK_MAX_DISTANCE) {
    const scale = JOYSTICK_MAX_DISTANCE / distance
    joystickDotX.value = touchX * scale
    joystickDotY.value = touchY * scale
  } else {
    joystickDotX.value = touchX
    joystickDotY.value = touchY
  }

  // Emit direction immediately based on touch position
  emitJoystickDirection(touchX, touchY)
  e.preventDefault()
}

function handleLeftTouchMove(e: TouchEvent) {
  if (leftTouchId.value === null) return

  for (let i = 0; i < e.touches.length; i++) {
    const touch = e.touches[i]
    if (touch.identifier === leftTouchId.value) {
      const rect = moveAreaRef.value?.getBoundingClientRect()
      if (!rect) return

      const touchX = touch.clientX - rect.left - JOYSTICK_BASE_SIZE / 2
      const touchY = touch.clientY - rect.top - JOYSTICK_BASE_SIZE / 2

      // Clamp dot position within joystick base
      const distance = Math.sqrt(touchX * touchX + touchY * touchY)
      if (distance > JOYSTICK_MAX_DISTANCE) {
        const scale = JOYSTICK_MAX_DISTANCE / distance
        joystickDotX.value = touchX * scale
        joystickDotY.value = touchY * scale
      } else {
        joystickDotX.value = touchX
        joystickDotY.value = touchY
      }

      emitJoystickDirection(touchX, touchY)
      break
    }
  }
  e.preventDefault()
}

function emitJoystickDirection(touchX: number, touchY: number) {
  const deadzone = 10
  const distance = Math.sqrt(touchX * touchX + touchY * touchY)

  if (distance > deadzone) {
    const normalizedX = touchX / distance
    const normalizedY = touchY / distance
    emit('move', { x: normalizedX, z: -normalizedY })
  } else {
    emit('move', { x: 0, z: 0 })
  }
}

function handleLeftTouchEnd(e: TouchEvent) {
  for (let i = 0; i < e.changedTouches.length; i++) {
    const touch = e.changedTouches[i]
    if (touch.identifier === leftTouchId.value) {
      leftTouchId.value = null
      isJoystickActive.value = false
      joystickDotX.value = 0
      joystickDotY.value = 0
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

  // Prevent default to stop browser swipe/back gestures
  e.preventDefault()
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
  e.preventDefault()
}

function handleLookTouchEnd(e: TouchEvent) {
  for (let i = 0; i < e.changedTouches.length; i++) {
    const touch = e.changedTouches[i]
    if (touch.identifier === lookTouchId.value) {
      lookTouchId.value = null
      break
    }
  }
  e.preventDefault()
}

function handleJump() {
  jumpRipple.value = true
  emit('jump')
  setTimeout(() => { jumpRipple.value = false }, 450)
}

function handleAttack() {
  attackRipple.value = true
  emit('attack')
  setTimeout(() => { attackRipple.value = false }, 450)
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

  // Prevent default touch behaviors on the whole mobile-controls
  document.addEventListener('touchmove', (e) => {
    if (lookTouchId.value !== null) {
      e.preventDefault()
    }
  }, { passive: false })
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
      <div class="joystick-base" :class="{ active: isJoystickActive }">
        <div
          class="joystick-dot"
          :style="{
            transform: `translate(${joystickDotX}px, ${joystickDotY}px)`
          }"
        ></div>
      </div>
    </div>

    <!-- Right side: Action buttons -->
    <div class="action-area">
      <div class="action-buttons">
        <button class="action-btn attack-btn" @touchstart.prevent="handleAttack">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 6l12 12"/>
            <path d="M18 6L6 18"/>
          </svg>
          <span class="ripple" :class="{ active: attackRipple }"></span>
        </button>
        <button class="action-btn jump-btn" @touchstart.prevent="handleJump">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 19V5"/>
            <path d="M5 12l7-7 7 7"/>
          </svg>
          <span class="ripple" :class="{ active: jumpRipple }"></span>
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
  bottom: 30px;
  left: 30px;
  width: 150px;
  height: 150px;
  pointer-events: auto;
}

.joystick-base {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(0, 212, 255, 0.15), rgba(0, 212, 255, 0.05));
  border: 2px solid rgba(0, 212, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  box-shadow:
    0 0 20px rgba(0, 212, 255, 0.15),
    inset 0 0 30px rgba(0, 212, 255, 0.05);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.joystick-base.active {
  border-color: rgba(0, 212, 255, 0.7);
  box-shadow:
    0 0 30px rgba(0, 212, 255, 0.3),
    inset 0 0 30px rgba(0, 212, 255, 0.1);
}

.joystick-dot {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, rgba(0, 212, 255, 0.8), rgba(0, 150, 200, 0.6));
  border: 2px solid rgba(0, 212, 255, 1);
  box-shadow:
    0 0 15px rgba(0, 212, 255, 0.5),
    0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.05s ease-out;
  will-change: transform;
}

.action-area {
  position: fixed;
  bottom: 25px;
  right: 25px;
  pointer-events: auto;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}

.action-buttons {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-btn {
  width: 65px;
  height: 65px;
  border-radius: 50%;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05));
  border: 2px solid rgba(0, 212, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.6rem;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.15s;
  pointer-events: auto;
  box-shadow:
    0 4px 15px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
}

@keyframes ripple-effect {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.7;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
}

.ripple.active {
  animation: ripple-effect 0.45s ease-out forwards;
  pointer-events: none;
}

.jump-btn .ripple {
  background: radial-gradient(circle, rgba(0, 212, 255, 0.9) 0%, transparent 70%);
}

.attack-btn .ripple {
  background: radial-gradient(circle, rgba(255, 80, 80, 0.9) 0%, transparent 70%);
}

.action-btn:active {
  background: rgba(0, 212, 255, 0.35);
  border-color: rgba(0, 212, 255, 0.9);
  transform: scale(0.92);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(0, 212, 255, 0.4);
}

.attack-btn {
  border-color: rgba(255, 120, 120, 0.45);
  box-shadow:
    0 4px 15px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.attack-btn:active {
  background: rgba(255, 80, 80, 0.35);
  border-color: rgba(255, 100, 100, 0.9);
  box-shadow:
    0 2px 8px rgba(0, 0, 0, 0.3),
    0 0 20px rgba(255, 100, 100, 0.4);
}

.btn-icon {
  width: 28px;
  height: 28px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}
</style>