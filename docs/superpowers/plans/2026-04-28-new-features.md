# New Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix blurry sky, add obstacle ladder system, add acceleration carpets, relocate overlapping geometry.

**Architecture:** Three new component classes (ObstacleLadder, AccelerationCarpet, Fireworks) following existing `create()/update()/dispose()` pattern. Integration via Game.ts update loop.

**Tech Stack:** Three.js, cannon-es, TypeScript, Vue 3

---

### Task 1: Fix blurry sky background

**Files:**
- Modify: `src/components/Sky.ts:31`

- [ ] **Step 1: Reduce sky sphere radius and increase segments**

In `src/components/Sky.ts`, line 31, change:
```typescript
// Before:
const skyGeom = new THREE.SphereGeometry(10000, 32, 32)
// After:
const skyGeom = new THREE.SphereGeometry(500, 64, 64)
```

- [ ] **Step 2: Verify build**

```bash
cd "d:/test/3d-resume" && npx vue-tsc --noEmit && npm run build
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Sky.ts
git commit -m "fix: reduce sky sphere radius from 10000 to 500 to fix blurry texture"
```

---

### Task 2: Relocate overlapping geometry objects

**Files:**
- Modify: `src/components/Platform.ts:134-214`

- [ ] **Step 1: Move sphere and cube positions**

In `src/components/Platform.ts`, update the position arrays in `createPlatformObjects()`:

Change cube positions (line 134-139):
```typescript
// Before:
const cubePositions = [
  new THREE.Vector3(-15, 1.5, -15),
  new THREE.Vector3(15, 1.5, 15),
  new THREE.Vector3(-15, 1, 15),
  new THREE.Vector3(18, 1, -18),
]
// After:
const cubePositions = [
  new THREE.Vector3(-15, 1.5, -15),
  new THREE.Vector3(15, 1.5, 15),
  new THREE.Vector3(-20, 1, 20),   // moved from (-15, 1, 15)
  new THREE.Vector3(18, 1, -18),
]
```

Change sphere positions (line 214):
```typescript
// Before:
const spherePositions = [new THREE.Vector3(-8, 2, 8), new THREE.Vector3(8, 2, 8), new THREE.Vector3(8, 2, -8)]
// After:
const spherePositions = [new THREE.Vector3(-18, 2, 18), new THREE.Vector3(18, 2, 18), new THREE.Vector3(8, 2, -8)]
```

- [ ] **Step 2: Verify build**

```bash
cd "d:/test/3d-resume" && npx vue-tsc --noEmit && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Platform.ts
git commit -m "feat: relocate platform objects to avoid obstacle ladder and carpet areas"
```

---

### Task 3: Create ObstacleLadder component

**Files:**
- Create: `src/components/ObstacleLadder.ts`

- [ ] **Step 1: Create ObstacleLadder class**

Create `src/components/ObstacleLadder.ts`:

```typescript
import * as THREE from 'three'

interface Obstacle {
  mesh: THREE.Mesh
  position: THREE.Vector3
  size: THREE.Vector3
}

export class ObstacleLadder {
  private scene: THREE.Scene
  private obstacles: Obstacle[] = []
  private obstacle6Mesh!: THREE.Mesh
  private obstacle6BaseY = 9
  private obstacle6Visible = true
  private blinkTimer = 0
  private readonly BLINK_INTERVAL = 2.0

  constructor(scene: THREE.Scene) {
    this.scene = scene
  }

  public create() {
    const stoneTexture = new THREE.TextureLoader().load('/textures/stone.png')
    stoneTexture.wrapS = THREE.RepeatWrapping
    stoneTexture.wrapT = THREE.RepeatWrapping

    const stoneMat = new THREE.MeshStandardMaterial({
      map: stoneTexture,
      roughness: 0.8,
      metalness: 0.2,
    })

    // Obstacle definitions: [position, size]
    const defs: { pos: [number, number, number]; size: [number, number, number] }[] = [
      // #1: First step (north) - requires pushing a cube to reach
      { pos: [0, 4, -20], size: [4, 1, 4] },
      // #2: Second step - jump from #1
      { pos: [0, 7, -14], size: [4, 1, 4] },
      // #3-5: One long platform - same height as #2
      { pos: [0, 7, -4], size: [12, 1, 4] },
      // #6: Oscillating + blinking (handled separately)
      { pos: [8, 9, 2], size: [4, 1, 4] },
      // #7: Final platform - triggers fireworks
      { pos: [0, 10, 8], size: [4, 1, 4] },
    ]

    defs.forEach((def, index) => {
      const geom = new THREE.BoxGeometry(def.size[0], def.size[1], def.size[2])
      const mesh = new THREE.Mesh(geom, stoneMat.clone())
      mesh.position.set(def.pos[0], def.pos[1], def.pos[2])
      mesh.castShadow = true
      mesh.receiveShadow = true
      this.scene.add(mesh)

      const obstacle: Obstacle = {
        mesh,
        position: new THREE.Vector3(def.pos[0], def.pos[1], def.pos[2]),
        size: new THREE.Vector3(def.size[0], def.size[1], def.size[2]),
      }
      this.obstacles.push(obstacle)

      // Track obstacle #6 (index 3) for special behavior
      if (index === 3) {
        this.obstacle6Mesh = mesh
        this.obstacle6BaseY = def.pos[1]
      }
    })
  }

  public update(delta: number) {
    // Obstacle #6: simple harmonic motion
    const time = performance.now() / 1000
    const newY = this.obstacle6BaseY + 2 * Math.sin(time * 1.5)
    this.obstacle6Mesh.position.y = newY

    // Obstacle #6: blink visibility
    this.blinkTimer += delta
    if (this.blinkTimer >= this.BLINK_INTERVAL) {
      this.blinkTimer = 0
      this.obstacle6Visible = !this.obstacle6Visible
    }
    this.obstacle6Mesh.visible = this.obstacle6Visible
  }

  /** Check if robot is standing on obstacle #7 (within 2 units horizontal, above mesh top) */
  public isOnObstacle7(robotPos: THREE.Vector3): boolean {
    const obs = this.obstacles[4] // #7 is index 4
    const dx = Math.abs(robotPos.x - obs.position.x)
    const dz = Math.abs(robotPos.z - obs.position.z)
    const halfW = obs.size.x / 2
    const halfD = obs.size.z / 2
    const topY = obs.position.y + obs.size.y / 2
    return dx < halfW + 1 && dz < halfD + 1 && robotPos.y > topY && robotPos.y < topY + 3
  }

  /** Check if obstacle #6 is currently visible */
  public isObstacle6Visible(): boolean {
    return this.obstacle6Visible
  }

  /** Get obstacle #6 current Y position */
  public getObstacle6Y(): number {
    return this.obstacle6Mesh.position.y
  }

  public dispose() {
    for (const obs of this.obstacles) {
      this.scene.remove(obs.mesh)
      obs.mesh.geometry.dispose()
      if (obs.mesh.material instanceof THREE.Material) {
        obs.mesh.material.dispose()
      }
    }
    this.obstacles = []
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd "d:/test/3d-resume" && npx vue-tsc --noEmit
```

Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ObstacleLadder.ts
git commit -m "feat: add ObstacleLadder component with 7 platforms, SHM oscillation, and blink"
```

---

### Task 4: Create Fireworks component

**Files:**
- Create: `src/components/Fireworks.ts`

- [ ] **Step 1: Create Fireworks class**

Create `src/components/Fireworks.ts`:

```typescript
import * as THREE from 'three'

const PARTICLE_COUNT = 200
const FIREWORK_DURATION = 3.0

export class Fireworks {
  private scene: THREE.Scene
  private points: THREE.Points | null = null
  private positions: Float32Array | null = null
  private colors: Float32Array | null = null
  private velocities: Float32Array | null = null
  private active = false
  private elapsed = 0
  private origin = new THREE.Vector3()

  constructor(scene: THREE.Scene) {
    this.scene = scene
  }

  public launch(position: THREE.Vector3) {
    this.dispose() // Clean up any previous firework
    this.origin.copy(position)
    this.elapsed = 0
    this.active = true

    this.positions = new Float32Array(PARTICLE_COUNT * 3)
    this.colors = new Float32Array(PARTICLE_COUNT * 3)
    this.velocities = new Float32Array(PARTICLE_COUNT * 3)

    const colorPalette = [
      new THREE.Color(0x00d4ff), // cyan
      new THREE.Color(0x7b2fff), // purple
      new THREE.Color(0xff6b35), // orange
      new THREE.Color(0xffffff), // white
      new THREE.Color(0xff4081), // pink
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      // Start at origin
      this.positions[i3] = position.x
      this.positions[i3 + 1] = position.y
      this.positions[i3 + 2] = position.z

      // Random explosive velocity
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.6 // mostly upward
      const speed = 8 + Math.random() * 15
      this.velocities[i3] = Math.sin(phi) * Math.cos(theta) * speed
      this.velocities[i3 + 1] = Math.cos(phi) * speed * 1.5 + 5
      this.velocities[i3 + 2] = Math.sin(phi) * Math.sin(theta) * speed

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      this.colors[i3] = color.r
      this.colors[i3 + 1] = color.g
      this.colors[i3 + 2] = color.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    this.points = new THREE.Points(geometry, material)
    this.points.frustumCulled = false
    this.scene.add(this.points)
  }

  public update(delta: number) {
    if (!this.active || !this.positions || !this.velocities || !this.points) return

    this.elapsed += delta

    // Fade out over duration
    const material = this.points.material as THREE.PointsMaterial
    material.opacity = Math.max(0, 1 - this.elapsed / FIREWORK_DURATION)

    const gravity = 10
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      // Apply velocity
      this.positions[i3] += this.velocities[i3] * delta
      this.positions[i3 + 1] += this.velocities[i3 + 1] * delta
      this.positions[i3 + 2] += this.velocities[i3 + 2] * delta

      // Gravity
      this.velocities[i3 + 1] -= gravity * delta
    }

    this.points.geometry.attributes.position.needsUpdate = true

    // Remove after duration
    if (this.elapsed >= FIREWORK_DURATION) {
      this.dispose()
    }
  }

  public isActive(): boolean {
    return this.active
  }

  public dispose() {
    if (this.points) {
      this.scene.remove(this.points)
      this.points.geometry.dispose()
      ;(this.points.material as THREE.PointsMaterial).dispose()
      this.points = null
    }
    this.positions = null
    this.colors = null
    this.velocities = null
    this.active = false
    this.elapsed = 0
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd "d:/test/3d-resume" && npx vue-tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Fireworks.ts
git commit -m "feat: add Fireworks component with 200-particle explosion effect"
```

---

### Task 5: Create AccelerationCarpet component

**Files:**
- Create: `src/components/AccelerationCarpet.ts`

- [ ] **Step 1: Create AccelerationCarpet class**

Create `src/components/AccelerationCarpet.ts`:

```typescript
import * as THREE from 'three'

const CARPET_SIZE = 4
const ACCELERATION_FORCE = 20
const MAX_SPEED = 15

export class AccelerationCarpet {
  private scene: THREE.Scene
  private mesh!: THREE.Mesh
  private center: THREE.Vector3
  private glowMaterial!: THREE.MeshStandardMaterial
  private time = 0

  constructor(scene: THREE.Scene, center: THREE.Vector3) {
    this.scene = scene
    this.center = center.clone()
  }

  public create() {
    // Create carpet texture with double-headed arrow
    const texture = this.createArrowTexture()

    // Carpet plane
    const geom = new THREE.PlaneGeometry(CARPET_SIZE, CARPET_SIZE)
    this.glowMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      color: 0x00d4ff,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.8,
      roughness: 0.3,
      metalness: 0.5,
      side: THREE.DoubleSide,
    })

    this.mesh = new THREE.Mesh(geom, this.glowMaterial)
    this.mesh.rotation.x = -Math.PI / 2 // Lay flat
    this.mesh.position.set(this.center.x, this.center.y, this.center.z)
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)

    // Border frame
    const borderGeom = new THREE.EdgesGeometry(geom)
    const borderMat = new THREE.LineBasicMaterial({ color: 0x00ffff, linewidth: 2 })
    const border = new THREE.LineSegments(borderGeom, borderMat)
    border.rotation.x = -Math.PI / 2
    border.position.set(this.center.x, this.center.y + 0.01, this.center.z)
    this.scene.add(border)
  }

  private createArrowTexture(): THREE.CanvasTexture {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')!

    // Dark background
    ctx.fillStyle = 'rgba(0, 20, 40, 0.9)'
    ctx.fillRect(0, 0, 256, 256)

    // Draw double-headed arrow (↕)
    ctx.strokeStyle = '#00d4ff'
    ctx.lineWidth = 6
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    // Vertical line
    ctx.beginPath()
    ctx.moveTo(128, 60)
    ctx.lineTo(128, 196)
    ctx.stroke()

    // Top arrow head
    ctx.beginPath()
    ctx.moveTo(128, 60)
    ctx.lineTo(108, 90)
    ctx.moveTo(128, 60)
    ctx.lineTo(148, 90)
    ctx.stroke()

    // Bottom arrow head
    ctx.beginPath()
    ctx.moveTo(128, 196)
    ctx.lineTo(108, 166)
    ctx.moveTo(128, 196)
    ctx.lineTo(148, 166)
    ctx.stroke()

    // Speed lines
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.4)'
    ctx.lineWidth = 2
    for (let i = 0; i < 3; i++) {
      const y = 100 + i * 30
      ctx.beginPath()
      ctx.moveTo(70, y)
      ctx.lineTo(90, y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(166, y)
      ctx.lineTo(186, y)
      ctx.stroke()
    }

    return new THREE.CanvasTexture(canvas)
  }

  public update(delta: number) {
    this.time += delta
    // Pulsing glow
    this.glowMaterial.emissiveIntensity = 0.3 + Math.sin(this.time * 3) * 0.2
  }

  /**
   * Check if a position is on this carpet and return acceleration direction.
   * Returns null if not on carpet.
   */
  public getAccelerationZ(pos: THREE.Vector3): number | null {
    const half = CARPET_SIZE / 2
    const dx = pos.x - this.center.x
    const dz = pos.z - this.center.z

    if (Math.abs(dx) > half || Math.abs(dz) > half) return null

    // South half → push north (+Z), north half → push south (-Z)
    return dz > 0 ? -ACCELERATION_FORCE : ACCELERATION_FORCE
  }

  public getCenter(): THREE.Vector3 {
    return this.center.clone()
  }

  public getSize(): number {
    return CARPET_SIZE
  }

  public dispose() {
    this.scene.remove(this.mesh)
    this.mesh.geometry.dispose()
    this.glowMaterial.map?.dispose()
    this.glowMaterial.dispose()
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd "d:/test/3d-resume" && npx vue-tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/components/AccelerationCarpet.ts
git commit -m "feat: add AccelerationCarpet component with bidirectional boost and arrow texture"
```

---

### Task 6: Integrate all new features into Game.ts

**Files:**
- Modify: `src/Game.ts`

- [ ] **Step 1: Add imports**

Add after the existing imports (line 17):

```typescript
import { ObstacleLadder } from './components/ObstacleLadder'
import { AccelerationCarpet } from './components/AccelerationCarpet'
import { Fireworks } from './components/Fireworks'
```

- [ ] **Step 2: Add private fields**

Add after the existing fields (around line 38):

```typescript
private obstacleLadder!: ObstacleLadder
private eastCarpet!: AccelerationCarpet
private westCarpet!: AccelerationCarpet
private fireworks!: Fireworks
private onObstacle7 = false
```

- [ ] **Step 3: Add creation in create()**

Add after the DestructibleBricks section (after line 167), before CameraController:

```typescript
// Obstacle Ladder System
this.obstacleLadder = new ObstacleLadder(this.scene)
this.obstacleLadder.create()

// Acceleration Carpets
this.eastCarpet = new AccelerationCarpet(this.scene, new THREE.Vector3(18, 0.05, 0))
this.eastCarpet.create()
this.westCarpet = new AccelerationCarpet(this.scene, new THREE.Vector3(-18, 0.05, 0))
this.westCarpet.create()

// Fireworks (lazy - only created on trigger)
this.fireworks = new Fireworks(this.scene)
```

- [ ] **Step 4: Add update logic**

Add in `update()` before the final render call (before `this.renderer.render(...)`), after the destructible bricks update:

```typescript
// Update obstacle ladder (#6 oscillation + blink)
this.obstacleLadder.update(delta)

// Update carpets (glow pulse)
this.eastCarpet.update(delta)
this.westCarpet.update(delta)

// Check acceleration carpets for robot
const charPos = this.character.getPosition()
const eastBoost = this.eastCarpet.getAccelerationZ(charPos)
const westBoost = this.westCarpet.getAccelerationZ(charPos)
if (eastBoost !== null) {
  this.character.applyExternalForceZ(eastBoost, delta)
}
if (westBoost !== null) {
  this.character.applyExternalForceZ(westBoost, delta)
}

// Check if robot reached obstacle #7
if (!this.onObstacle7 && this.obstacleLadder.isOnObstacle7(charPos)) {
  this.onObstacle7 = true
  this.fireworks.launch(new THREE.Vector3(0, 30, 30))
}

// Update fireworks
this.fireworks.update(delta)
```

- [ ] **Step 5: Add dispose calls**

In `dispose()`, add before `this.renderer.dispose()`:

```typescript
this.obstacleLadder?.dispose()
this.eastCarpet?.dispose()
this.westCarpet?.dispose()
this.fireworks?.dispose()
```

- [ ] **Step 6: Verify TypeScript compiles**

```bash
cd "d:/test/3d-resume" && npx vue-tsc --noEmit
```

Expected: Error — `applyExternalForceZ` does not exist on Character yet. This is expected; Task 7 adds it.

- [ ] **Step 7: Commit**

```bash
git add src/Game.ts
git commit -m "feat: integrate obstacle ladder, acceleration carpets, and fireworks into Game"
```

---

### Task 7: Add applyExternalForceZ to Character

**Files:**
- Modify: `src/components/Character.ts`

- [ ] **Step 1: Add the method**

Add after the `resetToPosition` method (around line 274):

```typescript
public applyExternalForceZ(force: number, delta: number) {
  this.body.velocity.z += force * delta
  this.body.velocity.z = THREE.MathUtils.clamp(this.body.velocity.z, -15, 15)
  this.body.wakeUp()
}
```

- [ ] **Step 2: Verify build**

```bash
cd "d:/test/3d-resume" && npx vue-tsc --noEmit && npm run build
```

Expected: Clean build.

- [ ] **Step 3: Commit**

```bash
git add src/components/Character.ts
git commit -m "feat: add applyExternalForceZ to Character for acceleration carpets"
```

---

### Task 8: Final verification

- [ ] **Step 1: Run full build**

```bash
cd "d:/test/3d-resume" && npm run build
```

Expected: Clean build, no errors.

- [ ] **Step 2: Run lint**

```bash
cd "d:/test/3d-resume" && npm run lint
```

Expected: No errors (warnings acceptable).

- [ ] **Step 3: Run dev server and test**

```bash
cd "d:/test/3d-resume" && npm run dev
```

Manual test checklist:
- Sky background looks sharp (not blurry)
- Obstacle ladder: 7 platforms visible, obstacle #6 oscillates and blinks
- Acceleration carpets: visible on east/west, robot gets boosted when walking on them
- Pushable objects are not blocking obstacle path or carpet positions
- Walking on south half of carpet pushes north, north half pushes south
- Reaching obstacle #7 triggers firework particles at (0, 30, 30)
- Game still runs smoothly, no console errors

- [ ] **Step 4: Final commit if needed**

```bash
git add -A
git commit -m "fix: final adjustments from verification"
```
