# Cosmic 3D Interactive Resume Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an interactive 3D resume with cosmic universe theme, fly-in animation, and clickable celestial objects — driven by a JSON config file, responsive for desktop and mobile.

**Architecture:** Vue 3 + TresJS (Three.js Vue wrapper) with Composition API `<script setup lang="ts">`. Components are split into scene (3D objects), ui (HTML overlays), effects (animations), and composables (logic). Resume data flows from a single `resume.json`.

**Tech Stack:** Vite, Vue 3, TypeScript, TresJS (@tresjs/core), @tresjs/post-processing, @tresjs/cientos (OrbitControls, etc.)

---

## File Structure

```
3d-resume/
├── public/
│   └── textures/
├── src/
│   ├── assets/
│   │   ├── resume.json
│   │   └── main.css
│   ├── components/
│   │   ├── scene/
│   │   │   ├── UniverseScene.vue
│   │   │   ├── StarField.vue
│   │   │   ├── NebulaCloud.vue
│   │   │   ├── InfoPlanet.vue
│   │   │   ├── TimelineAsteroid.vue
│   │   │   └── ProjectStar.vue
│   │   ├── ui/
│   │   │   ├── IntroOverlay.vue
│   │   │   ├── InfoPanel.vue
│   │   │   ├── Navigation.vue
│   │   │   └── MobileControls.vue
│   │   └── effects/
│   │       └── CameraFlyIn.vue
│   ├── composables/
│   │   ├── useResumeData.ts
│   │   ├── useCameraAnimation.ts
│   │   ├── useInteraction.ts
│   │   └── useResponsive.ts
│   ├── types/
│   │   └── resume.ts
│   ├── App.vue
│   └── main.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

### Task 1: Scaffold Vite + Vue 3 + TypeScript project

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `src/main.ts`
- Create: `src/App.vue`
- Create: `src/assets/main.css`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "cosmic-3d-resume",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.5.0",
    "@tresjs/core": "^4.3.0",
    "@tresjs/cientos": "^4.1.0",
    "@tresjs/post-processing": "^0.7.0",
    "three": "^0.170.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.0",
    "typescript": "^5.7.0",
    "vite": "^6.0.0",
    "vue-tsc": "^2.2.0"
  }
}
```

- [ ] **Step 2: Create vite.config.ts**

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { templateCompilerOptions } from '@tresjs/core'

export default defineConfig({
  plugins: [
    vue({
      ...templateCompilerOptions,
    }),
  ],
})
```

- [ ] **Step 3: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "preserve",
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 4: Create tsconfig.node.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "noEmit": true,
    "strict": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Cosmic Resume</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body, #app { width: 100%; height: 100%; overflow: hidden; }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 6: Create src/main.ts**

```ts
import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

createApp(App).mount('#app')
```

- [ ] **Step 7: Create src/assets/main.css**

```css
:root {
  --theme-bg: #0a0e27;
  --accent: #00d4ff;
  --nebula: #7b2fff;
  --text: #e0e6ff;
  --text-dim: #6b7db3;
  --panel-bg: rgba(10, 14, 39, 0.85);
  --panel-border: rgba(0, 212, 255, 0.3);
}

body {
  font-family: 'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;
  background: var(--theme-bg);
  color: var(--text);
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 8: Create minimal App.vue**

```vue
<script setup lang="ts">
</script>

<template>
  <div>3D Resume - Scaffold Ready</div>
</template>
```

- [ ] **Step 9: Install dependencies and verify**

Run: `cd D:/test/3d-resume && npm install`
Then: `npm run dev`
Expected: Dev server starts, browser shows "3D Resume - Scaffold Ready"

- [ ] **Step 10: Initialize git and commit**

```bash
cd D:/test/3d-resume
git init
git add -A
git commit -m "chore: scaffold Vite + Vue 3 + TypeScript project"
```

---

### Task 2: Create TypeScript types and resume.json mock data

**Files:**
- Create: `src/types/resume.ts`
- Create: `src/assets/resume.json`

- [ ] **Step 1: Create src/types/resume.ts**

```ts
export interface Social {
  platform: string
  url: string
  icon: string
}

export interface Profile {
  name: string
  title: string
  avatar: string
  email: string
  phone: string
  location: string
  socials: Social[]
  bio: string
}

export interface Experience {
  company: string
  role: string
  period: string
  color: string
  highlights: string[]
}

export interface Project {
  name: string
  tech: string[]
  category: 'frontend' | 'backend' | 'fullstack'
  description: string
  link: string
}

export interface SceneConfig {
  themeColor: string
  accentColor: string
  nebulaColor: string
  starCount: number
}

export interface ResumeData {
  profile: Profile
  experience: Experience[]
  projects: Project[]
  scene: SceneConfig
}
```

- [ ] **Step 2: Create src/assets/resume.json**

```json
{
  "profile": {
    "name": "张三",
    "title": "全栈开发工程师",
    "avatar": "",
    "email": "zhangsan@example.com",
    "phone": "138-0000-0000",
    "location": "北京",
    "socials": [
      { "platform": "GitHub", "url": "https://github.com/example", "icon": "github" },
      { "platform": "LinkedIn", "url": "https://linkedin.com/in/example", "icon": "linkedin" }
    ],
    "bio": "5年全栈开发经验，热爱3D可视化和交互设计，精通 Vue、React、Three.js"
  },
  "experience": [
    {
      "company": "字节跳动",
      "role": "前端工程师",
      "period": "2022.03 - 至今",
      "color": "#00d4ff",
      "highlights": [
        "主导公司内部3D可视化平台开发",
        "性能优化使首屏加载减少40%",
        "搭建前端自动化测试体系"
      ]
    },
    {
      "company": "腾讯",
      "role": "全栈工程师",
      "period": "2020.07 - 2022.02",
      "color": "#00ff88",
      "highlights": [
        "负责微信小程序核心模块开发",
        "设计并实现微服务网关",
        "团队代码规范与CI/CD流程建设"
      ]
    },
    {
      "company": "创业公司",
      "role": "全栈工程师",
      "period": "2019.03 - 2020.06",
      "color": "#ff6b35",
      "highlights": [
        "从0到1搭建SaaS平台",
        "独立完成后端API和前端UI开发"
      ]
    }
  ],
  "projects": [
    {
      "name": "宇宙简历",
      "tech": ["Vue 3", "Three.js", "TresJS", "TypeScript"],
      "category": "frontend",
      "description": "3D交互式个人简历，宇宙主题，支持桌面和移动端",
      "link": "https://github.com/example/cosmic-resume"
    },
    {
      "name": "数据可视化平台",
      "tech": ["React", "D3.js", "Node.js", "PostgreSQL"],
      "category": "fullstack",
      "description": "企业级数据可视化平台，支持自定义图表和实时数据流",
      "link": "https://github.com/example/data-viz"
    }
  ],
  "scene": {
    "themeColor": "#0a0e27",
    "accentColor": "#00d4ff",
    "nebulaColor": "#7b2fff",
    "starCount": 100000
  }
}
```

- [ ] **Step 3: Create src/composables/useResumeData.ts**

```ts
import type { ResumeData } from '@/types/resume'
import resumeJson from '@/assets/resume.json'

export function useResumeData() {
  const data = resumeJson as ResumeData
  return { data }
}
```

- [ ] **Step 4: Commit**

```bash
git add src/types/resume.ts src/assets/resume.json src/composables/useResumeData.ts
git commit -m "feat: add resume types and mock data"
```

---

### Task 3: Create useResponsive composable and useInteraction composable

**Files:**
- Create: `src/composables/useResponsive.ts`
- Create: `src/composables/useInteraction.ts`

- [ ] **Step 1: Create src/composables/useResponsive.ts**

```ts
import { ref, onMounted, onUnmounted, computed } from 'vue'

const MOBILE_BREAKPOINT = 768

export function useResponsive() {
  const windowWidth = ref(window.innerWidth)

  function onResize() {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => window.addEventListener('resize', onResize))
  onUnmounted(() => window.removeEventListener('resize', onResize))

  const isMobile = computed(() => windowWidth.value < MOBILE_BREAKPOINT)
  const isDesktop = computed(() => !isMobile.value)

  const starCount = computed(() => isMobile.value ? 30000 : 100000)
  const pixelRatio = computed(() =>
    Math.min(isMobile.value ? 1 : window.devicePixelRatio, 2)
  )

  return { isMobile, isDesktop, starCount, pixelRatio, windowWidth }
}
```

- [ ] **Step 2: Create src/composables/useInteraction.ts**

```ts
import { ref } from 'vue'

export type InteractableType = 'planet' | 'asteroid' | 'star' | null

export interface InteractableData {
  type: InteractableType
  index: number
  data: unknown
}

export function useInteraction() {
  const selected = ref<InteractableData | null>(null)
  const hovered = ref<InteractableData | null>(null)

  function select(item: InteractableData) {
    selected.value = item
  }

  function clearSelection() {
    selected.value = null
  }

  function setHovered(item: InteractableData | null) {
    hovered.value = item
  }

  return { selected, hovered, select, clearSelection, setHovered }
}
```

- [ ] **Step 3: Commit**

```bash
git add src/composables/useResponsive.ts src/composables/useInteraction.ts
git commit -m "feat: add responsive and interaction composables"
```

---

### Task 4: Build UniverseScene - main 3D scene container with TresCanvas

**Files:**
- Create: `src/components/scene/UniverseScene.vue`
- Modify: `src/App.vue`

- [ ] **Step 1: Create src/components/scene/UniverseScene.vue**

```vue
<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls } from '@tresjs/cientos'
import { useResponsive } from '@/composables/useResponsive'
import { useResumeData } from '@/composables/useResumeData'
import StarField from './StarField.vue'

const { pixelRatio } = useResponsive()
const { data } = useResumeData()
</script>

<template>
  <TresCanvas
    :clear-color="data.scene.themeColor"
    :pixel-ratio="pixelRatio"
    window-size
  >
    <TresPerspectiveCamera :position="[0, 5, 20]" />
    <OrbitControls
      :enable-damping="true"
      :damping-factor="0.05"
      :min-distance="5"
      :max-distance="50"
      :enable-pan="false"
    />

    <StarField />

    <TresAmbientLight :intensity="0.3" />
    <TresPointLight :position="[0, 10, 0]" :intensity="1" :color="data.scene.accentColor" />
  </TresCanvas>
</template>
```

- [ ] **Step 2: Update src/App.vue**

```vue
<script setup lang="ts">
import UniverseScene from '@/components/scene/UniverseScene.vue'
</script>

<template>
  <div id="cosmic-resume">
    <UniverseScene />
  </div>
</template>

<style scoped>
#cosmic-resume {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
```

- [ ] **Step 3: Verify scene renders**

Run: `npm run dev`
Expected: Browser shows dark background with 3D scene, orbit controls working

- [ ] **Step 4: Commit**

```bash
git add src/components/scene/UniverseScene.vue src/App.vue
git commit -m "feat: add UniverseScene with TresCanvas and OrbitControls"
```

---

### Task 5: Build StarField - 100K star particles background

**Files:**
- Create: `src/components/scene/StarField.vue`

- [ ] **Step 1: Create src/components/scene/StarField.vue**

```vue
<script setup lang="ts">
import { shallowRef, onMounted } from 'vue'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import * as THREE from 'three'
import { useResponsive } from '@/composables/useResponsive'
import { useResumeData } from '@/composables/useResumeData'

const { starCount } = useResponsive()
const { data } = useResumeData()

const pointsRef = shallowRef<THREE.Points>()
const { onLoop } = useRenderLoop()

const geometry = new THREE.BufferGeometry()
const count = starCount.value
const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)
const sizes = new Float32Array(count)

const accentColor = new THREE.Color(data.scene.accentColor)
const nebulaColor = new THREE.Color(data.scene.nebulaColor)
const whiteColor = new THREE.Color('#ffffff')

for (let i = 0; i < count; i++) {
  const i3 = i * 3
  positions[i3] = (Math.random() - 0.5) * 200
  positions[i3 + 1] = (Math.random() - 0.5) * 200
  positions[i3 + 2] = (Math.random() - 0.5) * 200

  const colorChoice = Math.random()
  const color = colorChoice < 0.6 ? whiteColor
    : colorChoice < 0.8 ? accentColor
    : nebulaColor

  colors[i3] = color.r
  colors[i3 + 1] = color.g
  colors[i3 + 2] = color.b

  sizes[i] = Math.random() * 2 + 0.5
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

const material = new THREE.PointsMaterial({
  size: 0.15,
  vertexColors: true,
  transparent: true,
  opacity: 0.8,
  sizeAttenuation: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
})

onLoop(({ delta }) => {
  if (pointsRef.value) {
    pointsRef.value.rotation.y += delta * 0.005
    pointsRef.value.rotation.x += delta * 0.002
  }
})
</script>

<template>
  <TresPoints ref="pointsRef" :geometry="geometry" :material="material" />
</template>
```

- [ ] **Step 2: Verify star field renders**

Run: `npm run dev`
Expected: Dark scene filled with slowly rotating multi-colored star particles

- [ ] **Step 3: Commit**

```bash
git add src/components/scene/StarField.vue
git commit -m "feat: add StarField with 100K animated star particles"
```

---

### Task 6: Build InfoPlanet - interactive profile planet

**Files:**
- Create: `src/components/scene/InfoPlanet.vue`

- [ ] **Step 1: Create src/components/scene/InfoPlanet.vue**

```vue
<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'
import { useResumeData } from '@/composables/useResumeData'

const emit = defineEmits<{
  click: []
}>()

const { data } = useResumeData()
const meshRef = shallowRef<THREE.Mesh>()
const glowRef = shallowRef<THREE.Mesh>()
const hovered = ref(false)

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  if (meshRef.value) {
    meshRef.value.rotation.y += delta * 0.2
  }
  if (glowRef.value) {
    glowRef.value.rotation.y -= delta * 0.1
    const scale = hovered.value ? 1.15 : 1.08
    glowRef.value.scale.setScalar(scale)
  }
})

function onPointerEnter() {
  hovered.value = true
  document.body.style.cursor = 'pointer'
}

function onPointerLeave() {
  hovered.value = false
  document.body.style.cursor = 'default'
}
</script>

<template>
  <TresGroup :position="[0, 0, 0]">
    <TresMesh
      ref="meshRef"
      @click="emit('click')"
      @pointer-enter="onPointerEnter"
      @pointer-leave="onPointerLeave"
    >
      <TresSphereGeometry :args="[2, 64, 64]" />
      <TresMeshStandardMaterial
        :color="data.scene.accentColor"
        :emissive="data.scene.accentColor"
        :emissive-intensity="0.3"
        :roughness="0.4"
        :metalness="0.6"
      />
    </TresMesh>

    <TresMesh ref="glowRef">
      <TresSphereGeometry :args="[2.3, 32, 32]" />
      <TresMeshBasicMaterial
        :color="data.scene.accentColor"
        :transparent="true"
        :opacity="0.1"
        :side="THREE.BackSide"
      />
    </TresMesh>
  </TresGroup>
</template>
```

- [ ] **Step 2: Add InfoPlanet to UniverseScene**

Add to `src/components/scene/UniverseScene.vue`:
- Import and register `<InfoPlanet />` inside the `<TresCanvas>`
- Wire up click event

- [ ] **Step 3: Commit**

```bash
git add src/components/scene/InfoPlanet.vue src/components/scene/UniverseScene.vue
git commit -m "feat: add InfoPlanet with glow and hover effects"
```

---

### Task 7: Build TimelineAsteroid - work experience asteroid belt

**Files:**
- Create: `src/components/scene/TimelineAsteroid.vue`

- [ ] **Step 1: Create src/components/scene/TimelineAsteroid.vue**

```vue
<script setup lang="ts">
import { shallowRef, computed } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'
import { useResumeData } from '@/composables/useResumeData'

const emit = defineEmits<{
  click: [index: number]
}>()

const { data } = useResumeData()
const groupRef = shallowRef<THREE.Group>()
const asteroidRefs = shallowRef<THREE.Mesh[]>([])

const { onLoop } = useRenderLoop()

const asteroidPositions = computed(() => {
  const count = data.experience.length
  return data.experience.map((_, i) => {
    const angle = (i / count) * Math.PI * 2
    const radius = 8
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle * 0.5) * 1.5,
      z: Math.sin(angle) * radius,
    }
  })
})

onLoop(({ elapsed }) => {
  if (groupRef.value) {
    groupRef.value.rotation.y = elapsed * 0.03
  }
})
</script>

<template>
  <TresGroup ref="groupRef">
    <TresMesh
      v-for="(exp, i) in data.experience"
      :key="i"
      :position="[asteroidPositions[i].x, asteroidPositions[i].y, asteroidPositions[i].z]"
      @click="emit('click', i)"
    >
      <TresDodecahedronGeometry :args="[0.8, 0]" />
      <TresMeshStandardMaterial
        :color="exp.color"
        :emissive="exp.color"
        :emissive-intensity="0.2"
        :roughness="0.6"
        :metalness="0.4"
        :flat-shading="true"
      />
    </TresMesh>

    <!-- Timeline line connecting asteroids -->
    <TresLine
      v-for="(_, i) in data.experience"
      :key="'line-' + i"
    >
      <TresBufferGeometry>
        <TresBufferAttribute
          attach="attributes-position"
          :array="new Float32Array([
            asteroidPositions[i].x, asteroidPositions[i].y, asteroidPositions[i].z,
            asteroidPositions[(i + 1) % data.experience.length].x,
            asteroidPositions[(i + 1) % data.experience.length].y,
            asteroidPositions[(i + 1) % data.experience.length].z,
          ])"
          :item-size="3"
        />
      </TresBufferGeometry>
      <TresLineBasicMaterial
        :color="data.scene.accentColor"
        :transparent="true"
        :opacity="0.3"
      />
    </TresLine>
  </TresGroup>
</template>
```

- [ ] **Step 2: Add TimelineAsteroid to UniverseScene**

Import and place `<TimelineAsteroid>` in `UniverseScene.vue` with click handler.

- [ ] **Step 3: Commit**

```bash
git add src/components/scene/TimelineAsteroid.vue src/components/scene/UniverseScene.vue
git commit -m "feat: add TimelineAsteroid belt with connected timeline"
```

---

### Task 8: Build ProjectStar - project showcase stars

**Files:**
- Create: `src/components/scene/ProjectStar.vue`

- [ ] **Step 1: Create src/components/scene/ProjectStar.vue**

```vue
<script setup lang="ts">
import { shallowRef, computed } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'
import { useResumeData } from '@/composables/useResumeData'

const emit = defineEmits<{
  click: [index: number]
}>()

const { data } = useResumeData()

const categoryColors: Record<string, string> = {
  frontend: '#00d4ff',
  backend: '#00ff88',
  fullstack: '#bf5af2',
}

const starPositions = computed(() => {
  return data.projects.map((_, i) => {
    const angle = (i / data.projects.length) * Math.PI * 0.8 + Math.PI * 0.6
    const radius = 15
    const height = 4 + i * 2
    return {
      x: Math.cos(angle) * radius,
      y: height,
      z: Math.sin(angle) * radius - 5,
    }
  })
})

const { onLoop } = useRenderLoop()

onLoop(({ elapsed }) => {
  // Subtle floating motion handled by TresJS animation
})
</script>

<template>
  <TresGroup>
    <TresPointLight
      v-for="(project, i) in data.projects"
      :key="'light-' + i"
      :position="[starPositions[i].x, starPositions[i].y, starPositions[i].z]"
      :color="categoryColors[project.category]"
      :intensity="2"
      :distance="8"
    />

    <TresMesh
      v-for="(project, i) in data.projects"
      :key="'star-' + i"
      :position="[starPositions[i].x, starPositions[i].y, starPositions[i].z]"
      @click="emit('click', i)"
    >
      <TresSphereGeometry :args="[0.5, 32, 32]" />
      <TresMeshStandardMaterial
        :color="categoryColors[project.category]"
        :emissive="categoryColors[project.category]"
        :emissive-intensity="0.8"
      />
    </TresMesh>
  </TresGroup>
</template>
```

- [ ] **Step 2: Add ProjectStar to UniverseScene**

Import and place `<ProjectStar>` in `UniverseScene.vue` with click handler.

- [ ] **Step 3: Commit**

```bash
git add src/components/scene/ProjectStar.vue src/components/scene/UniverseScene.vue
git commit -m "feat: add ProjectStar with colored halos by category"
```

---

### Task 9: Build NebulaCloud - atmospheric nebula clouds

**Files:**
- Create: `src/components/scene/NebulaCloud.vue`

- [ ] **Step 1: Create src/components/scene/NebulaCloud.vue**

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import { useRenderLoop } from '@tresjs/core'
import * as THREE from 'three'
import { useResumeData } from '@/composables/useResumeData'

const { data } = useResumeData()

const cloudPositions = [
  { x: -20, y: 5, z: -30, scale: 15 },
  { x: 15, y: -3, z: -25, scale: 10 },
  { x: 5, y: 8, z: -35, scale: 12 },
]

const cloudRefs = shallowRef<THREE.Mesh[]>([])

const { onLoop } = useRenderLoop()

onLoop(({ delta }) => {
  cloudRefs.value.forEach((cloud, i) => {
    if (cloud) {
      cloud.rotation.z += delta * 0.01 * (i % 2 === 0 ? 1 : -1)
    }
  })
})
</script>

<template>
  <TresMesh
    v-for="(pos, i) in cloudPositions"
    :key="i"
    ref="cloudRefs"
    :position="[pos.x, pos.y, pos.z]"
    :scale="[pos.scale, pos.scale, 1]"
  >
    <TresPlaneGeometry :args="[1, 1]" />
    <TresMeshBasicMaterial
      :color="data.scene.nebulaColor"
      :transparent="true"
      :opacity="0.06"
      :side="THREE.DoubleSide"
      :depth-write="false"
      :blending="THREE.AdditiveBlending"
    />
  </TresMesh>
</template>
```

- [ ] **Step 2: Add NebulaCloud to UniverseScene**

- [ ] **Step 3: Commit**

```bash
git add src/components/scene/NebulaCloud.vue src/components/scene/UniverseScene.vue
git commit -m "feat: add NebulaCloud with additive blending"
```

---

### Task 10: Build InfoPanel - glassmorphism info popup

**Files:**
- Create: `src/components/ui/InfoPanel.vue`

- [ ] **Step 1: Create src/components/ui/InfoPanel.vue**

```vue
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
```

- [ ] **Step 2: Integrate InfoPanel in App.vue**

Update `src/App.vue` to import InfoPanel and wire it to the interaction state:

```vue
<script setup lang="ts">
import UniverseScene from '@/components/scene/UniverseScene.vue'
import InfoPanel from '@/components/ui/InfoPanel.vue'
import { useInteraction } from '@/composables/useInteraction'

const { selected, clearSelection } = useInteraction()
</script>

<template>
  <div id="cosmic-resume">
    <UniverseScene />
    <InfoPanel :item="selected" @close="clearSelection()" />
  </div>
</template>

<style scoped>
#cosmic-resume {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
```

- [ ] **Step 3: Pass useInteraction to UniverseScene and wire click events**

Update `UniverseScene.vue` to receive the interaction state via provide/inject or props, and wire InfoPlanet click, TimelineAsteroid click, ProjectStar click to `select()`.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/InfoPanel.vue src/App.vue src/components/scene/UniverseScene.vue
git commit -m "feat: add InfoPanel with glassmorphism and responsive layout"
```

---

### Task 11: Build IntroOverlay - opening animation UI

**Files:**
- Create: `src/components/ui/IntroOverlay.vue`

- [ ] **Step 1: Create src/components/ui/IntroOverlay.vue**

```vue
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
```

- [ ] **Step 2: Integrate IntroOverlay in App.vue**

Add `<IntroOverlay>` before `<UniverseScene>` with `@complete` handler to toggle scene visibility.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/IntroOverlay.vue src/App.vue
git commit -m "feat: add IntroOverlay with fly-in animation and skip button"
```

---

### Task 12: Build Navigation and MobileControls UI

**Files:**
- Create: `src/components/ui/Navigation.vue`
- Create: `src/components/ui/MobileControls.vue`

- [ ] **Step 1: Create src/components/ui/Navigation.vue**

```vue
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
```

- [ ] **Step 2: Create src/components/ui/MobileControls.vue**

```vue
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
```

- [ ] **Step 3: Integrate Navigation and MobileControls in App.vue**

Add both components to `App.vue` with navigation handlers that trigger camera animation.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/Navigation.vue src/components/ui/MobileControls.vue src/App.vue
git commit -m "feat: add Navigation and MobileControls with responsive layout"
```

---

### Task 13: Build CameraFlyIn effect and useCameraAnimation composable

**Files:**
- Create: `src/composables/useCameraAnimation.ts`
- Create: `src/components/effects/CameraFlyIn.vue`

- [ ] **Step 1: Create src/composables/useCameraAnimation.ts**

```ts
import { ref } from 'vue'
import * as THREE from 'three'

export type CameraTarget = 'overview' | 'planet' | 'asteroids' | 'stars'

const targetPositions: Record<CameraTarget, THREE.Vector3> = {
  overview: new THREE.Vector3(0, 5, 20),
  planet: new THREE.Vector3(0, 2, 8),
  asteroids: new THREE.Vector3(8, 4, 12),
  stars: new THREE.Vector3(12, 8, 10),
}

export function useCameraAnimation() {
  const currentTarget = ref<CameraTarget>('overview')
  const isAnimating = ref(false)

  function animateTo(target: CameraTarget) {
    currentTarget.value = target
    isAnimating.value = true
  }

  function getTargetPosition(target: CameraTarget): THREE.Vector3 {
    return targetPositions[target].clone()
  }

  return { currentTarget, isAnimating, animateTo, getTargetPosition }
}
```

- [ ] **Step 2: Create src/components/effects/CameraFlyIn.vue**

```vue
<script setup lang="ts">
import { watch } from 'vue'
import { useRenderLoop, useTresContext } from '@tresjs/core'
import * as THREE from 'three'

const props = defineProps<{
  target: THREE.Vector3
  active: boolean
}>()

const emit = defineEmits<{
  complete: []
}>()

const { camera } = useTresContext()
const { onLoop } = useRenderLoop()

const startPos = new THREE.Vector3(0, 5, 20)
let progress = 0
const duration = 1.5

onLoop(({ delta }) => {
  if (!props.active || !camera.value) return

  progress += delta / duration
  if (progress >= 1) {
    progress = 1
    emit('complete')
  }

  const t = easeInOutCubic(progress)
  camera.value.position.lerpVectors(startPos, props.target, t)
  camera.value.lookAt(0, 0, 0)
})

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

watch(() => props.active, (active) => {
  if (active) {
    progress = 0
    if (camera.value) {
      startPos.copy(camera.value.position)
    }
  }
})
</script>

<template>
  <!-- No visual element, purely controls camera -->
</template>
```

- [ ] **Step 3: Wire camera animation into UniverseScene**

Update `UniverseScene.vue` to accept a `cameraTarget` prop and use CameraFlyIn to animate transitions.

- [ ] **Step 4: Commit**

```bash
git add src/composables/useCameraAnimation.ts src/components/effects/CameraFlyIn.vue src/components/scene/UniverseScene.vue
git commit -m "feat: add camera fly-in animation and navigation transitions"
```

---

### Task 14: Wire everything together in App.vue

**Files:**
- Modify: `src/App.vue`

- [ ] **Step 1: Finalize App.vue integration**

The final `App.vue` ties all pieces together:

```vue
<script setup lang="ts">
import { ref, provide } from 'vue'
import UniverseScene from '@/components/scene/UniverseScene.vue'
import IntroOverlay from '@/components/ui/IntroOverlay.vue'
import InfoPanel from '@/components/ui/InfoPanel.vue'
import Navigation from '@/components/ui/Navigation.vue'
import MobileControls from '@/components/ui/MobileControls.vue'
import { useInteraction, type InteractableData } from '@/composables/useInteraction'
import { useResumeData } from '@/composables/useResumeData'

const introComplete = ref(false)
const { selected, clearSelection } = useInteraction()
const { data } = useResumeData()

provide('interaction', useInteraction())
provide('resumeData', data)

function handleSectionClick(section: 'planet' | 'asteroids' | 'stars') {
  if (section === 'planet') {
    selected.value = { type: 'planet', index: 0, data: data.profile }
  } else if (section === 'asteroids') {
    selected.value = { type: 'asteroid', index: 0, data: data.experience[0] }
  } else if (section === 'stars') {
    selected.value = { type: 'star', index: 0, data: data.projects[0] }
  }
}
</script>

<template>
  <div id="cosmic-resume">
    <IntroOverlay v-if="!introComplete" @complete="introComplete = true" />
    <UniverseScene v-show="introComplete" />
    <Navigation
      v-if="introComplete"
      @navigate="handleSectionClick"
    />
    <MobileControls
      v-if="introComplete"
      @navigate="handleSectionClick"
    />
    <InfoPanel
      :item="selected"
      @close="clearSelection()"
    />
  </div>
</template>

<style scoped>
#cosmic-resume {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
</style>
```

- [ ] **Step 2: Update UniverseScene to use inject for interaction**

Update `UniverseScene.vue` to `inject('interaction')` and wire click events on InfoPlanet, TimelineAsteroid, and ProjectStar to `select()`.

- [ ] **Step 3: Final end-to-end test**

Run: `npm run dev`
Test:
1. Opening animation plays with title + skip button
2. After animation, 3D scene is visible with stars, planet, asteroids, and project stars
3. Click planet → profile panel slides in from right (desktop) or bottom (mobile)
4. Click asteroid → experience panel shows
5. Click star → project panel shows
6. Close panel by clicking X or background
7. Navigation buttons work
8. Orbit controls (drag to rotate, scroll to zoom)
9. Resize browser to mobile width → layout adapts

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete cosmic 3D resume with all components integrated"
```

---

## Summary

| Task | Component | Key Files |
|------|-----------|-----------|
| 1 | Project scaffold | package.json, vite.config.ts, tsconfig.json, main.ts |
| 2 | Data layer | resume.json, types/resume.ts, useResumeData.ts |
| 3 | Composables | useResponsive.ts, useInteraction.ts |
| 4 | Scene container | UniverseScene.vue (TresCanvas) |
| 5 | Star background | StarField.vue (100K particles) |
| 6 | Profile planet | InfoPlanet.vue (sphere + glow) |
| 7 | Experience belt | TimelineAsteroid.vue (dodecahedrons + lines) |
| 8 | Project stars | ProjectStar.vue (spheres + point lights) |
| 9 | Nebula clouds | NebulaCloud.vue (additive blending planes) |
| 10 | Info popup | InfoPanel.vue (glassmorphism panel) |
| 11 | Opening animation | IntroOverlay.vue (CSS-driven fly-in) |
| 12 | Navigation UI | Navigation.vue + MobileControls.vue |
| 13 | Camera animation | CameraFlyIn.vue + useCameraAnimation.ts |
| 14 | Integration | App.vue (wiring everything together) |
