<script setup lang="ts">
import { useResumeData } from '@/composables/useResumeData'

const { data } = useResumeData()

const emit = defineEmits<{
  navigate: [section: 'planet' | 'asteroids' | 'stars']
}>()
</script>

<template>
  <div class="mobile-controls">
    <button class="control-btn" @click="emit('navigate', 'planet')">
      <span class="dot" :style="{ background: data.scene.accentColor }"></span>
      Profile
    </button>
    <button class="control-btn" @click="emit('navigate', 'asteroids')">
      <span class="dot" style="background: #00ff88"></span>
      Experience
    </button>
    <button class="control-btn" @click="emit('navigate', 'stars')">
      <span class="dot" style="background: #bf5af2"></span>
      Projects
    </button>
  </div>
</template>

<style scoped>
.mobile-controls {
  display: none;
}

@media (max-width: 768px) {
  .mobile-controls {
    display: flex;
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    gap: 8px;
    z-index: 50;
    background: rgba(10, 14, 39, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(0, 212, 255, 0.2);
    border-radius: 28px;
    padding: 6px;
  }
}

.control-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: none;
  color: var(--text-dim);
  padding: 10px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.75rem;
  font-family: inherit;
  transition: all 0.3s;
  min-height: 44px;
}

.control-btn:active {
  background: rgba(0, 212, 255, 0.1);
  color: var(--accent);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>
