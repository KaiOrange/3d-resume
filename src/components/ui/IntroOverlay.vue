<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useResumeData } from '@/composables/useResumeData'

const emit = defineEmits<{
  complete: []
}>()

const { data } = useResumeData()
const phase = ref<'title' | 'tunnel' | 'reveal' | 'hidden'>('title')
const showSkip = ref(true)
const canvasRef = ref<HTMLCanvasElement>()

let animationId: number
let ctx: CanvasRenderingContext2D
const stars: Star[] = []
const STAR_COUNT = 200
const SPEED = 8

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

  initStars()

  setTimeout(() => { phase.value = 'tunnel' }, 1500)
  setTimeout(() => { phase.value = 'reveal' }, 4500)
  setTimeout(() => {
    phase.value = 'hidden'
    emit('complete')
  }, 7000)

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
  phase.value = 'hidden'
  emit('complete')
}
</script>

<template>
  <Transition name="fade">
    <div v-if="phase !== 'hidden'" class="intro-overlay">
      <canvas ref="canvasRef" class="star-canvas"></canvas>

      <!-- Title text -->
      <Transition name="slide-up">
        <div v-if="phase === 'title'" class="title-container">
          <div class="name-text">{{ data.profile.name }}</div>
          <div class="title-label">我的简历</div>
          <div class="subtitle-text">{{ data.profile.title }}</div>
        </div>
      </Transition>

      <!-- Reveal hint -->
      <Transition name="slide-up">
        <div v-if="phase === 'reveal'" class="hint-container">
          <div class="explore-ring"></div>
          <p class="hint-text">点击探索我的宇宙</p>
        </div>
      </Transition>

      <!-- Skip button -->
      <button v-if="showSkip" class="skip-btn" @click="skip">跳过</button>
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
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  overflow: hidden;
}

.star-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.title-container {
  text-align: center;
  z-index: 1;
  position: relative;
}

.name-text {
  font-size: 4rem;
  font-weight: bold;
  color: #fff;
  text-shadow:
    0 0 30px rgba(0, 212, 255, 0.8),
    0 0 60px rgba(0, 212, 255, 0.5),
    0 0 100px rgba(0, 212, 255, 0.3);
  letter-spacing: 0.1em;
  animation: glow-pulse 2s ease-in-out infinite;
}

.title-label {
  font-size: 1.2rem;
  color: var(--accent);
  letter-spacing: 0.5em;
  text-transform: uppercase;
  margin-top: 16px;
  opacity: 0.9;
}

.subtitle-text {
  font-size: 1.1rem;
  color: var(--text-dim);
  margin-top: 12px;
  letter-spacing: 0.05em;
}

@media (max-width: 768px) {
  .name-text {
    font-size: 2.5rem;
  }
  .title-label {
    font-size: 0.9rem;
    letter-spacing: 0.3em;
  }
  .subtitle-text {
    font-size: 0.9rem;
  }
}

@keyframes glow-pulse {
  0%, 100% {
    text-shadow:
      0 0 30px rgba(0, 212, 255, 0.8),
      0 0 60px rgba(0, 212, 255, 0.5),
      0 0 100px rgba(0, 212, 255, 0.3);
  }
  50% {
    text-shadow:
      0 0 40px rgba(0, 212, 255, 1),
      0 0 80px rgba(0, 212, 255, 0.7),
      0 0 120px rgba(0, 212, 255, 0.5);
  }
}

.hint-container {
  text-align: center;
  z-index: 1;
  position: relative;
}

.explore-ring {
  width: 120px;
  height: 120px;
  border: 2px solid var(--accent);
  border-radius: 50%;
  margin: 0 auto 24px;
  animation: ring-expand 2s ease-out infinite;
  box-shadow:
    0 0 20px rgba(0, 212, 255, 0.4),
    inset 0 0 20px rgba(0, 212, 255, 0.1);
}

@keyframes ring-expand {
  0% {
    transform: scale(0.8);
    opacity: 1;
    box-shadow:
      0 0 20px rgba(0, 212, 255, 0.4),
      inset 0 0 20px rgba(0, 212, 255, 0.1);
  }
  100% {
    transform: scale(1.3);
    opacity: 0;
    box-shadow:
      0 0 40px rgba(0, 212, 255, 0),
      inset 0 0 40px rgba(0, 212, 255, 0);
  }
}

.hint-text {
  font-size: 1rem;
  color: var(--text);
  opacity: 0.9;
  animation: fade-in-out 2s ease-in-out infinite;
  letter-spacing: 0.1em;
}

@keyframes fade-in-out {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.skip-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-dim);
  padding: 10px 24px;
  border-radius: 24px;
  cursor: pointer;
  font-size: 0.85rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
  z-index: 10;
  letter-spacing: 0.05em;
}

.skip-btn:hover {
  background: rgba(0, 212, 255, 0.15);
  border-color: rgba(0, 212, 255, 0.5);
  color: var(--accent);
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.6s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
</style>
