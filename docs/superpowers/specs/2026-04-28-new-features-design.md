# New Features Design Spec

## Overview

Four new features for the Cosmic 3D Resume: sky background fix, obstacle ladder system, acceleration carpets, and geometry overlap prevention.

## Feature 1: Sky Background Fix

### Problem

Sky sphere radius is 10,000 but camera far plane is 1,000. The 2K equirectangular texture is mapped across ~1.26 billion square units of surface. The visible portion experiences extreme UV stretching, making the sky appear blurry and low-quality.

### Solution

In `src/components/Sky.ts`:
- Reduce `SphereGeometry` radius from `10000` to `500`
- Increase segments from `32` to `64` for smoother curvature
- No texture change needed — same 2K texture at 500 radius gives ~400x higher texel density

### Files Modified

- `src/components/Sky.ts` — change geometry parameters

---

## Feature 2: Obstacle Ladder System (天梯)

### Concept

A Super Mario-style vertical obstacle course on the platform. 7 floating brick platforms arranged north-to-south, increasing in height. The robot must navigate from #1 to #7 using jumps and timing.

### Layout

All obstacles use `stone.png` texture (same as DestructibleBricks). Each obstacle is a static `BoxGeometry` with `mass: 0`.

| # | Position (x, y, z) | Size (w×h×d) | Notes |
|---|---|---|---|
| 1 | (0, 4, -20) | 4×1×4 | First step. Requires pushing a cube nearby to reach. |
| 2 | (0, 7, -14) | 4×1×4 | Jump from #1 to #2. |
| 3-5 | (0, 7, -4) | 12×1×4 | One long platform. Same height as #2. |
| 6 | (8, 9, 2) | 4×1×4 | Oscillates + blinks. See mechanics below. |
| 7 | (0, 10, 8) | 4×1×4 | Final platform. Triggers fireworks on arrival. |

### Obstacle 6 Mechanics

- **Vertical oscillation (SHM):** `y = 9 + 2 * sin(time * 1.5)` — range [7, 11]
- **Visibility blink:** visible 2s → invisible 2s → repeating
- **Strategy:** Jump from #5 when #6 is at lowest point (~y=7) AND visible. Then quickly jump to #7 before #6 disappears.
- **Implementation:** Update mesh position and visibility in `update(delta)`. Use a timer for blink state.

### Firework System

Triggered when robot lands on obstacle #7 (check Y position near obstacle 7, within 2 units horizontal).

- **Position:** `(0, 30, 30)` — south of platform, elevated
- **Particles:** 200 particles, random colors (cyan, purple, orange, white)
- **Physics:** Explosive radial velocity upward, gravity decay
- **Lifetime:** 3 seconds, then auto-dispose
- **Implementation:** New class `Fireworks` with `THREE.Points`, `BufferGeometry`, `PointsMaterial` (additive blending)

### Geometry Relocation

Move existing objects that block the obstacle path:

| Object | Current Position | New Position |
|---|---|---|
| sphere (orange) | (-8, 2, 8) | (-18, 2, 18) |
| sphere (orange) | (8, 2, 8) | (18, 2, 18) |
| cube (wood) | (-15, 1, 15) | (-20, 1, 20) |

### Files

- Create: `src/components/ObstacleLadder.ts` — new class
- Create: `src/components/Fireworks.ts` — new class
- Modify: `src/components/Platform.ts` — relocate 3 objects
- Modify: `src/Game.ts` — instantiate ObstacleLadder and Fireworks, add to update loop

---

## Feature 3: Acceleration Carpets

### Concept

Two 4×4 glowing carpets on east `(18, 0.05, 0)` and west `(-18, 0.05, 0)` sides of the platform. When the robot (or pushable objects) stands on a carpet, they get accelerated in a direction based on which half they're on.

### Direction Logic

- Robot on **south half** of carpet → accelerate **north** (positive Z)
- Robot on **north half** of carpet → accelerate **south** (negative Z)
- Same logic for pushable objects

### Acceleration Force

```
direction = robotZ > carpetZ ? -1 : 1
robotVelocity.z += direction * 20 * delta
```

Clamped to max speed of 15.

### Visual Design

- **Base:** 4×4 `PlaneGeometry` at y=0.05, cyan glow material
- **Arrow:** Canvas-generated texture with double-headed arrow (↕) indicating bidirectional direction
- **Glow:** Emissive material with pulsing intensity (sin wave)
- **Border:** Thin glowing edge frame

### Detection

Use simple AABB check: if robot position is within carpet bounds (±2 on X, ±2 on Z from carpet center), apply acceleration.

### Files

- Create: `src/components/AccelerationCarpet.ts` — new class
- Modify: `src/Game.ts` — instantiate 2 carpets, add to update loop, pass robot position

---

## Feature 4: Ensure No Geometry Overlap

### Problem

Existing pushable objects may block the obstacle path or sit on carpet positions.

### Solution

Relocate the following objects in `Platform.ts` `createPlatformObjects()`:

| Object | Current | New |
|---|---|---|
| sphere 0 | (-8, 2, 8) | (-18, 2, 18) |
| sphere 1 | (8, 2, 8) | (18, 2, 18) |
| cube 2 | (-15, 1, 15) | (-20, 1, 20) |

All other objects are far enough from obstacles and carpets.

### Files Modified

- `src/components/Platform.ts` — change 3 position values in `createPlatformObjects()`

---

## Integration with Game.ts

### New imports

```typescript
import { ObstacleLadder } from './components/ObstacleLadder'
import { AccelerationCarpet } from './components/AccelerationCarpet'
import { Fireworks } from './components/Fireworks'
```

### New fields

```typescript
private obstacleLadder!: ObstacleLadder
private eastCarpet!: AccelerationCarpet
private westCarpet!: AccelerationCarpet
private fireworks!: Fireworks
private onObstacle7 = false
```

### In create()

```typescript
this.obstacleLadder = new ObstacleLadder(this.scene)
this.obstacleLadder.create()

this.eastCarpet = new AccelerationCarpet(this.scene, new THREE.Vector3(18, 0.05, 0))
this.eastCarpet.create()
this.westCarpet = new AccelerationCarpet(this.scene, new THREE.Vector3(-18, 0.05, 0))
this.westCarpet.create()

this.fireworks = new Fireworks(this.scene)
```

### In update()

```typescript
// Update obstacle ladder (handles #6 oscillation + blink)
this.obstacleLadder.update(delta)

// Check acceleration carpets
const charPos = this.character.getPosition()
this.eastCarpet.checkAcceleration(charPos, this.character)
this.westCarpet.checkAcceleration(charPos, this.character)

// Also check pushable objects on carpets
this.platform.applyCarpetAcceleration(this.eastCarpet, this.westCarpet, delta)

// Check if robot reached obstacle 7
if (!this.onObstacle7 && this.obstacleLadder.isOnObstacle7(charPos)) {
  this.onObstacle7 = true
  this.fireworks.launch(new THREE.Vector3(0, 30, 30))
}

// Update fireworks
this.fireworks.update(delta)
```

### In dispose()

```typescript
this.obstacleLadder?.dispose()
this.eastCarpet?.dispose()
this.westCarpet?.dispose()
this.fireworks?.dispose()
```
