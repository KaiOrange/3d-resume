<script setup lang="ts">
import { useResumeData } from '@/composables/useResumeData'

const { data } = useResumeData()

const emit = defineEmits<{
  navigate: [section: 'planet' | 'asteroids' | 'stars']
}>()
</script>

<template>
  <nav class="top-nav">
    <div class="nav-brand">{{ data.profile.name }}</div>
    <div class="nav-links">
      <button @click="emit('navigate', 'planet')">Profile</button>
      <button @click="emit('navigate', 'asteroids')">Experience</button>
      <button @click="emit('navigate', 'stars')">Projects</button>
    </div>
  </nav>
</template>

<style scoped>
.top-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  z-index: 50;
  background: rgba(10, 14, 39, 0.5);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 212, 255, 0.1);
}

@media (max-width: 768px) {
  .top-nav {
    display: none;
  }
}

.nav-brand {
  font-size: 1rem;
  color: var(--accent);
  text-shadow: 0 0 8px rgba(0, 212, 255, 0.4);
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-links button {
  background: none;
  border: 1px solid transparent;
  color: var(--text-dim);
  padding: 6px 16px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 0.85rem;
  font-family: inherit;
  transition: all 0.3s;
}

.nav-links button:hover {
  color: var(--accent);
  border-color: var(--panel-border);
  background: rgba(0, 212, 255, 0.05);
}
</style>
