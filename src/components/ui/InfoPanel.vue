<script setup lang="ts">
import type { InteractableData } from '@/composables/useInteraction'
import type { Profile, Experience, Project } from '@/types/resume'

defineProps<{
  item: InteractableData | null
}>()

const emit = defineEmits<{
  close: []
}>()

function isProfile(data: unknown): data is Profile {
  return typeof data === 'object' && data !== null && 'name' in data
}

function isExperience(data: unknown): data is Experience {
  return typeof data === 'object' && data !== null && 'company' in data
}

function isProject(data: unknown): data is Project {
  return typeof data === 'object' && data !== null && 'tech' in data
}
</script>

<template>
  <Transition name="panel">
    <div v-if="item" class="info-panel" @click.self="emit('close')">
      <div class="panel-content">
        <button class="close-btn" @click="emit('close')">&times;</button>

        <!-- Profile -->
        <template v-if="item.type === 'planet' && isProfile(item.data)">
          <h2 class="neon-text">{{ item.data.name }}</h2>
          <p class="subtitle">{{ item.data.title }}</p>
          <div class="divider"></div>
          <p class="bio">{{ item.data.bio }}</p>
          <div class="contact-list">
            <div class="contact-item">
              <span class="label">Email</span>
              <span>{{ item.data.email }}</span>
            </div>
            <div class="contact-item">
              <span class="label">Phone</span>
              <span>{{ item.data.phone }}</span>
            </div>
            <div class="contact-item">
              <span class="label">Location</span>
              <span>{{ item.data.location }}</span>
            </div>
          </div>
          <div class="socials">
            <a
              v-for="s in item.data.socials"
              :key="s.platform"
              :href="s.url"
              target="_blank"
              class="social-link"
            >
              {{ s.platform }}
            </a>
          </div>
        </template>

        <!-- Experience -->
        <template v-else-if="item.type === 'asteroid' && isExperience(item.data)">
          <h2 class="neon-text">{{ item.data.company }}</h2>
          <p class="subtitle">{{ item.data.role }} | {{ item.data.period }}</p>
          <div class="divider"></div>
          <ul class="highlights">
            <li v-for="(h, i) in item.data.highlights" :key="i">{{ h }}</li>
          </ul>
        </template>

        <!-- Project -->
        <template v-else-if="item.type === 'star' && isProject(item.data)">
          <h2 class="neon-text">{{ item.data.name }}</h2>
          <p class="subtitle">{{ item.data.description }}</p>
          <div class="divider"></div>
          <div class="tech-tags">
            <span v-for="t in item.data.tech" :key="t" class="tech-tag">{{ t }}</span>
          </div>
          <a
            v-if="item.data.link"
            :href="item.data.link"
            target="_blank"
            class="project-link"
          >
            View Project &rarr;
          </a>
        </template>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.info-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  min-width: 320px;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  pointer-events: auto;
}

@media (max-width: 768px) {
  .info-panel {
    top: auto;
    bottom: 0;
    width: 100%;
    height: 70vh;
    border-radius: 24px 24px 0 0;
  }
}

.panel-content {
  background: rgba(10, 14, 39, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 16px;
  padding: 32px;
  width: 80%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

@media (max-width: 768px) {
  .panel-content {
    width: 100%;
    border-radius: 24px 24px 0 0;
    max-height: 100%;
  }
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: var(--text-dim);
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
  padding: 4px 8px;
}

.close-btn:hover {
  color: var(--accent);
}

.neon-text {
  font-size: 1.8rem;
  color: var(--accent);
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  margin-bottom: 4px;
}

.subtitle {
  color: var(--text-dim);
  font-size: 0.9rem;
}

.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--accent), transparent);
  margin: 16px 0;
  opacity: 0.4;
}

.bio {
  line-height: 1.6;
  margin-bottom: 16px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.contact-item {
  display: flex;
  gap: 12px;
  font-size: 0.85rem;
}

.contact-item .label {
  color: var(--text-dim);
  min-width: 70px;
}

.socials {
  display: flex;
  gap: 12px;
}

.social-link {
  padding: 6px 14px;
  border: 1px solid var(--panel-border);
  border-radius: 20px;
  color: var(--accent);
  text-decoration: none;
  font-size: 0.8rem;
  transition: all 0.3s;
}

.social-link:hover {
  background: rgba(0, 212, 255, 0.1);
}

.highlights {
  list-style: none;
  padding: 0;
}

.highlights li {
  padding: 8px 0;
  padding-left: 16px;
  position: relative;
  font-size: 0.9rem;
  line-height: 1.5;
}

.highlights li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 14px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 6px var(--accent);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tech-tag {
  padding: 4px 12px;
  border: 1px solid var(--panel-border);
  border-radius: 12px;
  font-size: 0.75rem;
  color: var(--text-dim);
}

.project-link {
  display: inline-block;
  color: var(--accent);
  text-decoration: none;
  font-size: 0.9rem;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}

.project-link:hover {
  border-bottom-color: var(--accent);
}

.panel-enter-active,
.panel-leave-active {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.panel-enter-from,
.panel-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@media (max-width: 768px) {
  .panel-enter-from,
  .panel-leave-to {
    transform: translateY(100%);
  }
}
</style>
