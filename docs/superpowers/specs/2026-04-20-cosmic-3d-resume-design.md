# Cosmic 3D Interactive Resume

## Overview

An interactive 3D resume built with Vue 3 + TresJS (Three.js for Vue), featuring a cosmic universe theme. Users experience a cinematic fly-in animation then freely explore a starfield to discover resume content on celestial objects. Resume data is driven by a single `resume.json` config file.

**Tech Stack:** Vite + Vue 3 + TypeScript + TresJS + @tresjs/post-processing

## Architecture

```
3d-resume/
├── public/
│   └── textures/          # Star textures, nebula images
├── src/
│   ├── assets/
│   │   └── resume.json    # Resume mock data config
│   ├── components/
│   │   ├── scene/
│   │   │   ├── UniverseScene.vue       # Main scene container
│   │   │   ├── StarField.vue           # Star particle background
│   │   │   ├── NebulaCloud.vue         # Nebula effect
│   │   │   ├── InfoPlanet.vue          # Profile info planet
│   │   │   ├── TimelineAsteroid.vue    # Work experience asteroids
│   │   │   └── ProjectStar.vue         # Project showcase stars
│   │   ├── ui/
│   │   │   ├── IntroOverlay.vue        # Opening animation overlay
│   │   │   ├── InfoPanel.vue           # Resume info popup panel
│   │   │   ├── Navigation.vue          # Desktop top nav
│   │   │   └── MobileControls.vue      # Mobile touch controls
│   │   └── effects/
│   │       ├── CameraFlyIn.vue         # Opening fly animation
│   │       └── ParticleTrail.vue       # Particle trail effect
│   ├── composables/
│   │   ├── useResumeData.ts            # Read resume.json
│   │   ├── useCameraAnimation.ts       # Camera animation control
│   │   ├── useInteraction.ts           # Click/touch interaction
│   │   └── useResponsive.ts            # Desktop/mobile adaptation
│   ├── App.vue
│   └── main.ts
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Opening Animation (5-8s)

1. **0-2s** — Black screen, faint distant star twinkle, title "Welcome to My Universe" fades in
2. **2-5s** — Camera accelerates through a nebula tunnel (cyberpunk neon glow lines + deep space nebula), strong sense of speed, particles streak past
3. **5-7s** — Exit nebula, decelerate, reveal full starfield: center planet (profile), orbiting asteroid belt (experience), distant bright stars (projects)
4. **7-8s** — Title fades out, "Click to Explore" hint appears at bottom, user begins free interaction

A "Skip" button is always visible to jump straight into interactive mode.

## Interactive Scene

### 1. Center Planet — Profile Info (InfoPlanet)

- Medium-sized planet with slow-rotating atmospheric glow effect
- Click to expand a translucent info panel (InfoPanel) with glassmorphism + neon border
- Displays: name, title, contact info, social links, bio
- Color: accent color from `resume.json`

### 2. Asteroid Belt — Work Experience (TimelineAsteroid)

- 5-7 irregularly shaped asteroids drifting along elliptical orbits
- Each represents a work experience, company name and period etched on surface
- Click to show detail card: company, role, period, highlights
- Glowing energy lines connect asteroids forming a "star lane" timeline
- Color per experience entry from `resume.json`

### 3. Distant Stars — Projects (ProjectStar)

- 2-4 flickering stars sized by project scale
- Stars have colored halos distinguishing tech category (frontend=blue, backend=green, fullstack=purple)
- Click to show project detail: name, tech stack, description, link
- Hover/pinch increases brightness with pulse wave effect

### Background Environment

- 100K+ star particles (StarField) slowly rotating
- 2-3 semi-transparent nebula clouds (NebulaCloud) drifting
- Desktop: mouse drag to rotate view, scroll to zoom
- Mobile: single finger drag to rotate, pinch to zoom
- OrbitControls with damping for smooth feel

## Mobile Adaptation

### Interaction

| Feature | Desktop | Mobile |
|---------|---------|--------|
| Rotate view | Mouse drag | Single finger drag |
| Zoom | Scroll wheel | Pinch |
| Select object | Click | Tap |
| Navigation | Top nav bar | Bottom capsule button group |

- Mobile: floating direction disk (MobileControls) for quick jump to sections
- Minimum touch target: 44px

### Performance

| Setting | Desktop | Mobile |
|---------|---------|--------|
| Star particles | 100,000 | 30,000 |
| Post-processing | Full (bloom + chromatic aberration) | Simplified (bloom only) |
| Shadow quality | High | Disabled |
| Render pixel ratio | devicePixelRatio (max 2) | Capped at 1 |

Device detection via `navigator.userAgent`, dynamically adjust particle count and render quality.

### Layout

- Desktop: info panel on right side (40% width)
- Mobile: info panel slides up from bottom, full width, scrollable
- Desktop nav: top bar; Mobile nav: bottom capsule button group

## Resume Data Config

`src/assets/resume.json`:

```json
{
  "profile": {
    "name": "Your Name",
    "title": "Full Stack Developer",
    "avatar": "/textures/avatar.png",
    "email": "you@example.com",
    "phone": "138-xxxx-xxxx",
    "location": "Beijing",
    "socials": [
      { "platform": "GitHub", "url": "https://github.com/xxx", "icon": "github" },
      { "platform": "LinkedIn", "url": "https://linkedin.com/in/xxx", "icon": "linkedin" }
    ],
    "bio": "5 years full-stack experience, passionate about 3D visualization"
  },
  "experience": [
    {
      "company": "ByteDance",
      "role": "Frontend Engineer",
      "period": "2022.03 - Present",
      "color": "#00d4ff",
      "highlights": [
        "Led internal 3D visualization platform development",
        "Performance optimization reducing first paint by 40%"
      ]
    }
  ],
  "projects": [
    {
      "name": "Cosmic Resume",
      "tech": ["Vue 3", "Three.js", "TresJS"],
      "category": "frontend",
      "description": "3D interactive personal resume",
      "link": "https://github.com/xxx/cosmic-resume"
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

- `scene` section controls visual theme (background, accent, nebula colors)
- User only edits `resume.json` to update all content and colors
- `starCount` is overridden to 30000 on mobile automatically

## Visual Style

Fusion of deep-space nebula and cyberpunk aesthetics:
- **Background:** Deep navy/purple (#0a0e27) gradient
- **Accent:** Cyan neon (#00d4ff) for highlights, borders, energy lines
- **Nebula:** Purple/magenta (#7b2fff) glowing clouds
- **Typography:** Monospace + clean sans-serif hybrid, neon glow on headings
- **UI Panels:** Glassmorphism (backdrop-blur) + thin neon border
- **Animations:** Smooth easing, subtle pulse/glow effects on interactive elements
