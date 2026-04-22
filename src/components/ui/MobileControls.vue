<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits<{
  move: [direction: { x: number; z: number }]
  jump: []
  attack: []
  look: [delta: { x: number; y: number }]
}>()

const leftTouchId = ref<number | null>(null)
const rightTouchId = ref<number | null>(null)
const leftStartX = ref(0)
const leftStartY = ref(0)
const rightStartX = ref(0)
const rightStartY = ref(0)

const moveAreaRef = ref<HTMLDivElement>()
const actionAreaRef = ref<HTMLDivElement>()

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

function handleRightTouchStart(e: TouchEvent) {
  const touch = e.touches[0]
  rightTouchId.value = touch.identifier
  rightStartX.value = touch.clientX
  rightStartY.value = touch.clientY
}

function handleRightTouchMove(e: TouchEvent) {
  if (rightTouchId.value === null) return

  for (let i = 0; i < e.touches.length; i++) {
    const touch = e.touches[i]
    if (touch.identifier === rightTouchId.value) {
      const deltaX = touch.clientX - rightStartX.value
      const deltaY = touch.clientY - rightStartY.value

      // Only emit look if moved beyond deadzone
      const deadzone = 5
      if (Math.abs(deltaX) > deadzone || Math.abs(deltaY) > deadzone) {
        emit('look', { x: deltaX * 0.01, y: deltaY * 0.01 })
        rightStartX.value = touch.clientX
        rightStartY.value = touch.clientY
      }
      break
    }
  }
}

function handleRightTouchEnd(e: TouchEvent) {
  for (let i = 0; i < e.changedTouches.length; i++) {
    const touch = e.changedTouches[i]
    if (touch.identifier === rightTouchId.value) {
      rightTouchId.value = null
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
  const actionArea = actionAreaRef.value

  if (moveArea) {
    moveArea.addEventListener('touchstart', handleLeftTouchStart, { passive: false })
    moveArea.addEventListener('touchmove', handleLeftTouchMove, { passive: false })
    moveArea.addEventListener('touchend', handleLeftTouchEnd, { passive: false })
    moveArea.addEventListener('touchcancel', handleLeftTouchEnd, { passive: false })
  }

  if (actionArea) {
    actionArea.addEventListener('touchstart', handleRightTouchStart, { passive: false })
    actionArea.addEventListener('touchmove', handleRightTouchMove, { passive: false })
    actionArea.addEventListener('touchend', handleRightTouchEnd, { passive: false })
    actionArea.addEventListener('touchcancel', handleRightTouchEnd, { passive: false })
  }
})

onUnmounted(() => {
  const moveArea = moveAreaRef.value
  const actionArea = actionAreaRef.value

  if (moveArea) {
    moveArea.removeEventListener('touchstart', handleLeftTouchStart)
    moveArea.removeEventListener('touchmove', handleLeftTouchMove)
    moveArea.removeEventListener('touchend', handleLeftTouchEnd)
    moveArea.removeEventListener('touchcancel', handleLeftTouchEnd)
  }

  if (actionArea) {
    actionArea.removeEventListener('touchstart', handleRightTouchStart)
    actionArea.removeEventListener('touchmove', handleRightTouchMove)
    actionArea.removeEventListener('touchend', handleRightTouchEnd)
    actionArea.removeEventListener('touchcancel', handleRightTouchEnd)
  }
})
</script>

<template>
  <div class="mobile-controls">
    <!-- Left side: Movement joystick -->
    <div ref="moveAreaRef" class="move-area">
      <div class="joystick-base">
        <div class="joystick-dot"></div>
      </div>
    </div>

    <!-- Right side: Action buttons -->
    <div ref="actionAreaRef" class="action-area">
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
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  pointer-events: none;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.move-area {
  width: 150px;
  height: 150px;
  pointer-events: auto;
  position: relative;
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
  bottom: 20px;
  left: 20px;
}

.joystick-dot {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.5);
  border: 2px solid rgba(0, 212, 255, 0.8);
}

.action-area {
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