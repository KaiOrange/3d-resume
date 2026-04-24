<script setup lang="ts">
import { ref, onMounted } from 'vue'

const emit = defineEmits<{
  complete: []
}>()

const phase = ref<'title' | 'tunnel' | 'reveal' | 'hidden'>('title')
const showSkip = ref(true)

onMounted(() => {
  setTimeout(() => { phase.value = 'tunnel' }, 2000)
  setTimeout(() => { phase.value = 'reveal' }, 5000)
  setTimeout(() => {
    phase.value = 'hidden'
    emit('complete')
  }, 7500)
})

function skip() {
  phase.value = 'hidden'
  emit('complete')
}
</script>

<template>
  <Transition name="fade">
    <div v-if="phase !== 'hidden'" class="intro-overlay">
      <!-- Star streak effect during tunnel -->
      <div class="star-streaks" :class="{ active: phase === 'tunnel' }">
        <div v-for="i in 20" :key="i" class="streak" :style="{
          '--delay': `${Math.random() * 2}s`,
          '--x': `${Math.random() * 100}%`,
          '--angle': `${Math.random() * 30 - 15}deg`,
        }"></div>
      </div>

      <!-- Title text -->
      <Transition name="slide-up">
        <div v-if="phase === 'title'" class="title-container">
          <h1 class="title-text">Welcome to My Universe</h1>
        </div>
      </Transition>

      <!-- Reveal hint -->
      <Transition name="slide-up">
        <div v-if="phase === 'reveal'" class="hint-container">
          <p class="hint-text">Click to Explore</p>
          <div class="hint-pulse"></div>
        </div>
      </Transition>

      <!-- Skip button -->
      <button v-if="showSkip" class="skip-btn" @click="skip">Skip</button>
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
}

.star-streaks {
  position: absolute;
  inset: 0;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.5s;
}

.star-streaks.active {
  opacity: 1;
}

.streak {
  position: absolute;
  left: var(--x);
  top: -20%;
  width: 2px;
  height: 0;
  background: linear-gradient(to bottom, transparent, var(--accent), transparent);
  transform: rotate(var(--angle));
  animation: none;
}

.star-streaks.active .streak {
  animation: streak-fly 1s var(--delay) ease-in infinite;
}

@keyframes streak-fly {
  0% {
    height: 0;
    top: -20%;
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    height: 120%;
    top: 100%;
    opacity: 0;
  }
}

.title-container {
  text-align: center;
  z-index: 1;
}

.title-text {
  font-size: 3rem;
  color: var(--accent);
  text-shadow:
    0 0 20px rgba(0, 212, 255, 0.6),
    0 0 60px rgba(0, 212, 255, 0.3);
  letter-spacing: 0.05em;
  animation: glow-pulse 2s ease-in-out infinite;
}

@media (max-width: 768px) {
  .title-text {
    font-size: 1.8rem;
  }
}

@keyframes glow-pulse {
  0%, 100% { text-shadow: 0 0 20px rgba(0, 212, 255, 0.6), 0 0 60px rgba(0, 212, 255, 0.3); }
  50% { text-shadow: 0 0 30px rgba(0, 212, 255, 0.8), 0 0 80px rgba(0, 212, 255, 0.5); }
}

.hint-container {
  text-align: center;
  z-index: 1;
  position: relative;
}

.hint-text {
  font-size: 1.2rem;
  color: var(--text);
  opacity: 0.8;
  animation: fade-in-out 2s ease-in-out infinite;
}

.hint-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 1px solid var(--accent);
  opacity: 0;
  animation: pulse-ring 2s ease-out infinite;
}

@keyframes pulse-ring {
  0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
}

@keyframes fade-in-out {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.skip-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-dim);
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
  border-color: var(--accent);
  color: var(--accent);
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
