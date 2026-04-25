<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { resumeData } from '@/data/resumeData'
import { isMobileDevice } from '@/utils/device'

const emit = defineEmits<{
  complete: []
}>()

const profile = resumeData.profile
const phase = ref<'title' | 'hidden'>('title')
const emitCalled = ref(false)
const canvasRef = ref<HTMLCanvasElement>()
const isMobile = ref(false)

let animationId: number
let ctx: CanvasRenderingContext2D
const stars: Star[] = []
const STAR_COUNT = 250

interface Star {
  x: number
  y: number
  z: number
  color: string
}

const accentColor = '#00d4ff'
const nebulaColor = '#7b2fff'

onMounted(() => {
  if (!canvasRef.value) return
  ctx = canvasRef.value.getContext('2d')!
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  isMobile.value = isMobileDevice()

  initStars()

  setTimeout(() => {
    callComplete()
  }, 5000)

  animate()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (animationId) cancelAnimationFrame(animationId)
})

function resizeCanvas() {
  if (!canvasRef.value) return
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
}

function initStars() {
  stars.length = 0
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(createStar())
  }
}

function createStar(): Star {
  const colors = [accentColor, nebulaColor, '#ffffff']
  return {
    x: (Math.random() - 0.5) * 4,
    y: (Math.random() - 0.5) * 4,
    z: Math.random() * 3 + 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }
}

function animate() {
  if (!ctx || !canvasRef.value) return

  const { width, height } = canvasRef.value

  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'
  ctx.fillRect(0, 0, width, height)

  stars.forEach((star, i) => {
    star.z -= 0.02

    if (star.z <= 0) {
      stars[i] = createStar()
      stars[i].z = 2
      return
    }

    const factor = 1 / star.z
    const sx = (star.x * factor + 1) * 0.5 * width
    const sy = (star.y * factor + 1) * 0.5 * height
    const size = Math.max(0.5, (1 - star.z) * 3)
    const opacity = Math.min(1, (2 - star.z) * 0.8)

    ctx.beginPath()
    ctx.arc(sx, sy, size, 0, Math.PI * 2)
    ctx.fillStyle = star.color
    ctx.globalAlpha = opacity
    ctx.fill()

    if (size > 1.5) {
      ctx.beginPath()
      ctx.arc(sx, sy, size * 2, 0, Math.PI * 2)
      const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 2)
      gradient.addColorStop(0, star.color)
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.globalAlpha = opacity * 0.3
      ctx.fill()
    }
  })

  ctx.globalAlpha = 1
  animationId = requestAnimationFrame(animate)
}

function skip() {
  callComplete()
}

function callComplete() {
  if (emitCalled.value) return
  emitCalled.value = true
  phase.value = 'hidden'
  emit('complete')
}
</script>

<template>
  <Transition name="fade">
    <div v-if="phase !== 'hidden'" class="intro-overlay" :class="{ mobile: isMobile }">
      <canvas ref="canvasRef" class="star-canvas"></canvas>

      <div class="title-container">
        <div class="name-text">{{ profile.name }}</div>
        <div class="title-label">个人简历</div>
        <div class="subtitle-text">{{ profile.title }}</div>
      </div>

      <div class="controls-hint" :class="{ mobile: isMobile }">
        <div class="controls-title">操作说明</div>
        <div class="controls-grid" v-if="!isMobile">
          <div class="control-item">
            <div class="wasd-keys">
              <div class="key-row">
                <span class="key">W</span>
              </div>
              <div class="key-row">
                <span class="key">A</span>
                <span class="key">S</span>
                <span class="key">D</span>
              </div>
            </div>
            <div class="control-label">移动</div>
          </div>
          <div class="control-item">
            <div class="space-key">鼠标左键</div>
            <div class="control-label">攻击</div>
          </div>
          <div class="control-item">
            <div class="space-key">空格</div>
            <div class="control-label">跳跃</div>
          </div>
        </div>
        <div class="controls-grid mobile" v-else>
          <div class="control-item">
            <div class="control-icon joystick">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="9"/>
                <circle cx="12" cy="12" r="4"/>
              </svg>
            </div>
            <div class="control-label">左侧摇杆<br/>移动</div>
          </div>
          <div class="control-item">
            <div class="control-icon attack">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 6l12 12M18 6L6 18"/>
              </svg>
            </div>
            <div class="control-label">×<br/>攻击</div>
          </div>
          <div class="control-item">
            <div class="control-icon jump">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </div>
            <div class="control-label">↑<br/>跳跃</div>
          </div>
        </div>
      </div>

      <button class="skip-btn" @click="skip">跳过</button>
    </div>
  </Transition>
</template>

<style scoped>
.intro-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 200;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 60px;
}

.intro-overlay.mobile {
  gap: 30px;
}

.star-canvas {
  position: absolute;
  inset: 0;
}

.title-container {
  text-align: center;
  z-index: 1;
}

.name-text {
  font-size: 4rem;
  font-weight: bold;
  color: var(--accent, #00d4ff);
  text-shadow:
    0 0 30px rgba(0, 212, 255, 0.8),
    0 0 60px rgba(0, 212, 255, 0.4);
  letter-spacing: 0.1em;
  animation: glow-pulse 2s ease-in-out infinite;
}

.title-label {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.6);
  margin-top: 0.5rem;
  letter-spacing: 0.3em;
}

.subtitle-text {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 1rem;
}

.controls-hint {
  background: rgba(0, 20, 40, 0.7);
  border: 1px solid rgba(0, 212, 255, 0.25);
  border-radius: 16px;
  padding: 16px 28px;
  backdrop-filter: blur(12px);
  z-index: 10;
  min-width: 340px;
}

.controls-title {
  font-size: 0.75rem;
  color: rgba(0, 212, 255, 0.6);
  margin-bottom: 16px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-align: center;
}

.controls-grid {
  display: flex;
  justify-content: center;
  gap: 36px;
  align-items: flex-end;
}

.controls-grid.mobile {
  gap: 16px;
}

.control-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.wasd-keys {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.key-row {
  display: flex;
  gap: 4px;
}

.wasd-keys .key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 34px;
  padding: 0 6px;
  background: rgba(0, 212, 255, 0.12);
  border: 1px solid rgba(0, 212, 255, 0.4);
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  box-shadow:
    0 3px 0 rgba(0, 150, 200, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.space-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 72px;
  height: 34px;
  padding: 0 14px;
  background: rgba(0, 212, 255, 0.12);
  border: 1px solid rgba(0, 212, 255, 0.4);
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  box-shadow:
    0 3px 0 rgba(0, 150, 200, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.control-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 212, 255, 0.9);
}

.control-icon svg {
  width: 22px;
  height: 22px;
}

.control-icon.mouse {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
}

.control-icon.joystick {
  color: rgba(0, 212, 255, 0.9);
}

.control-icon.attack {
  background: rgba(255, 100, 100, 0.12);
  border-color: rgba(255, 100, 100, 0.35);
  color: #ff6464;
}

.control-icon.jump {
  background: rgba(0, 212, 255, 0.1);
  border-color: rgba(0, 212, 255, 0.35);
  color: #00d4ff;
}

.control-label {
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.65);
  text-align: center;
  line-height: 1.4;
}

.controls-hint.mobile .control-icon {
  width: 44px;
  height: 44px;
}

.controls-hint.mobile .control-icon.attack {
  background: rgba(255, 100, 100, 0.15);
  border-color: rgba(255, 100, 100, 0.4);
}

@keyframes glow-pulse {
  0%, 100% { text-shadow: 0 0 30px rgba(0, 212, 255, 0.8), 0 0 60px rgba(0, 212, 255, 0.4); }
  50% { text-shadow: 0 0 50px rgba(0, 212, 255, 1), 0 0 100px rgba(0, 212, 255, 0.6); }
}

.skip-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
  z-index: 10;
}

.skip-btn:hover {
  background: rgba(0, 212, 255, 0.15);
  border-color: #00d4ff;
  color: #00d4ff;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
