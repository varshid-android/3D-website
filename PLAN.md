# Implementation Plan: Interactive 3D Website Homepage

> **Project:** NOVA — Interactive 3D Developer Portfolio & Experience  
> **Methodology:** Get Shit Done (GSD)  
> **Status:** Pending User Review & Approval  
> **Target Starting Milestone:** Phases 1–4 (Core Interactive 3D Experience with Mouse-Follow Head Tracking)

---

## 1. Existing Architecture Findings

### 1.1 Codebase & Workspace Inspection
- **Location:** `/Users/varshid_shekhat/Documents/3D_Website`
- **Initial State:** The repository contains the GSD framework configuration (`.gsd/`, `.agent/`, `.agents/`, `.gemini/`, `GSD-STYLE.md`, `PROJECT_RULES.md`). No existing frontend application code or `package.json` was present.
- **Environment:**
  - Node.js version: `v24.15.0`
  - Package manager: `npm 11.12.1`
  - VCS: Initialized empty Git repository (`git version 2.50.1`) with standard `.gitignore` configuration.
  - Platform: macOS Darwin (Apple Silicon).
- **Assets:** No local 3D assets (`.glb` / `.gltf`) were present in the repository prior to analysis.

### 1.2 3D Asset Sourcing & Verification
- Identified high-performance humanoid GLB asset from Three.js distribution (`readyplayer.me.glb`, 1.84 MB).
- **Asset Characteristics:**
  - Standard humanoid skeleton rig (`Hips`, `Spine`, `Spine1`, `Spine2`, `Neck`, `Head`, `LeftEye`, `RightEye`).
  - Native ARKit / Oculus blendshapes and facial morph targets (`eyeBlinkLeft`, `eyeBlinkRight`, `eyeLookInLeft`, `eyeLookOutRight`, etc.).
  - Lightweight payload (1.8 MB), fast load times, and optimized materials for web delivery.

---

## 2. Required Dependencies & Stack Selection

To ensure rock-solid compatibility, avoid peer dependency collisions, and deliver 60fps WebGL performance, the project will use React 18, React Three Fiber v8, and Drei v9:

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.169.0",
    "@react-three/fiber": "^8.17.10",
    "@react-three/drei": "^9.117.0",
    "gsap": "^3.12.5",
    "lucide-react": "^0.453.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@types/three": "^0.169.0",
    "@vitejs/plugin-react": "^4.3.3",
    "typescript": "^5.6.3",
    "vite": "^5.4.10",
    "tailwindcss": "^3.4.14",
    "postcss": "^8.4.47",
    "autoprefixer": "^10.4.20"
  }
}
```

### Architectural Rationale
- **React 18 + R3F v8**: Established stability with Drei's GLTF preloading, shadow shaders, and canvas lifecycle hooks.
- **GSAP 3 + ScrollTrigger**: Industry standard for 60fps micro-interactions, scroll transitions, and hero entrance reveals without blocking the main Three.js render loop.
- **Tailwind CSS**: Rapid utility layout for luxury dark-mode glassmorphism (`backdrop-blur-md`, subtle borders `border-white/10`, radial ambient glow effects).

---

## 3. Component Architecture & Directory Structure

```
src/
├── types/
│   ├── character.ts             # Rig bone mapping, morph targets, pointer coordinates
│   └── navigation.ts            # Navbar items, projects, and work highlights
├── hooks/
│   ├── usePointerTracking.ts    # Normalized [-1, 1] pointer tracking with smooth return-to-center
│   ├── useReducedMotion.ts      # Accessibility hook detecting prefers-reduced-motion
│   └── useModelRig.ts           # Dynamic humanoid bone discovery (Neck, Head, Eyes) & blendshapes
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Glassmorphic top navigation with status indicator & links
│   │   ├── Footer.tsx           # Minimalist studio footer with social links & copyright
│   │   └── CustomCursor.tsx     # Subtle custom interactive cursor reacting to hover states
│   ├── three/
│   │   ├── CharacterScene.tsx   # R3F Canvas container with responsive camera & ErrorBoundary
│   │   ├── CharacterModel.tsx   # GLTF loader, material tuning, shadow casting & bone attachment
│   │   ├── HeadTracking.tsx     # Dual-bone neck/head damped rotational solver with angle limits
│   │   ├── EyeTracking.tsx      # Micro-saccade eye bone/morph target tracking
│   │   ├── FacialBlink.tsx      # Stochastic natural blinking via eyeBlinkLeft/Right morph targets
│   │   ├── IdleBreathing.tsx    # Sinusoidal chest/spine idle breathing motion
│   │   ├── SceneLighting.tsx    # Studio key light, rim backlight, fill light & contact shadow plane
│   │   └── CanvasLoader.tsx     # Radial progress indicator during asset streaming
│   └── sections/
│       ├── Hero.tsx             # Centered hero with bold typography, badges, CTA & 3D canvas
│       ├── About.tsx            # Bento-grid highlighting 3D capabilities, tools, and philosophy
│       ├── Projects.tsx         # Interactive project showcase cards with hover depth
│       ├── Experience.tsx       # Timeline of creative development work
│       └── Contact.tsx          # Glassmorphic inquiry form & direct links
├── styles/
│   └── index.css                # Tailwind directives, custom glass tokens, fonts, keyframes
├── App.tsx                      # Root orchestrator with GSAP section entrance timeline
└── main.tsx                     # Application entry point
public/
└── models/
    └── character.glb            # Optimized rigged humanoid 3D asset
```

---

## 4. 3D Model Requirements & Technical Rigging Specifications

### 4.1 Bone Mapping Strategy
1. **Bone Discovery (`useModelRig.ts`):**
   - Automatically traverse the model's `SkinnedMesh` skeleton hierarchy.
   - Match standard naming conventions:
     - Neck: `Neck`, `mixamorigNeck`, `neck`
     - Head: `Head`, `mixamorigHead`, `head`
     - Left Eye: `LeftEye`, `mixamorigLeftEye`, `eye_L`
     - Right Eye: `RightEye`, `mixamorigRightEye`, `eye_R`
     - Spine: `Spine`, `Spine1`, `Spine2` (for breathing)
2. **Rest Pose Preservation:**
   - Store the initial rest `Quaternion` and `Euler` angles for all target bones upon mount.
   - Apply rotations strictly as **offsets relative to the rest pose** to prevent model distortion or broken neck postures.
3. **Weight Distribution:**
   - Instead of rotating only the Head bone (which looks rigid and mechanical), distribute rotation:
     - **Neck:** 30%–35% of total yaw and pitch.
     - **Head:** 65%–70% of total yaw and pitch.
     - This produces an organic, fluid human neck-shoulder articulation.
4. **Anatomical Rotation Limits (Clamping):**
   - **Horizontal (Yaw - Y axis):** Clamped to `[-45°, +45°]` (`[-0.785 rad, +0.785 rad]`).
   - **Vertical (Pitch - X axis):** Clamped to `[-25°, +25°]` (`[-0.436 rad, +0.436 rad]`).
   - **Roll (Z axis):** Subtle head tilt of `[-6°, +6°]` (`[-0.105 rad, +0.105 rad]`) reacting to horizontal movement for biological realism.
5. **Frame-Rate-Independent Damping:**
   - Use exponential decay damping in `useFrame`:
     $$\text{current} = \text{THREE.MathUtils.damp}(\text{current}, \text{target}, \lambda, \delta)$$
   - Where $\lambda = 4.5$ (responsiveness factor) and $\delta$ is frame delta. This eliminates stuttering or speed variations across 60Hz, 120Hz, and 144Hz displays.
6. **Graceful Degradation:**
   - If eye bones or blendshapes are absent, `useModelRig` sets `hasEyeBones: false` and `hasMorphTargets: false`. The system gracefully falls back to pure head tracking without console errors or runtime crashes.

---

## 5. Step-by-Step Implementation Tasks (Phases 1–8)

### Phase 1: Project Setup & Architecture Foundation (Est: 1–2h)
- [ ] **Task 1.1: Project Scaffolding & Configuration**
  - Initialize Vite React + TypeScript template.
  - Install dependencies: `three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `lucide-react`, `clsx`, `tailwind-merge`, `tailwindcss`, `postcss`, `autoprefixer`.
  - Configure `tailwind.config.js` with dark theme palette, glass tokens, and glowing gradient extensions.
  - Set up `src/styles/index.css` with Google Fonts (`Plus Jakarta Sans` or `Inter`, plus `Outfit` for headings).
  - *Verification:* `npm run build` succeeds; empty dev server serves on local port.
- [ ] **Task 1.2: Project Architecture & Types Setup**
  - Establish directory structure (`components/`, `hooks/`, `types/`, `styles/`, `public/models/`).
  - Create `src/types/character.ts` and `src/types/navigation.ts`.
  - *Verification:* `npx tsc --noEmit` validates without type errors.

---

### Phase 2: Homepage UI & Layout Architecture (Est: 3–4h)
- [ ] **Task 2.1: Navigation Bar & Hero UI Layout**
  - Build `Navbar.tsx`: Sticky glassmorphic bar (`backdrop-blur-xl bg-black/40 border-b border-white/10`), brand logo ("NOVA"), navigation links (About, Projects, Experience, Contact), and availability indicator ("Available for Projects").
  - Build `Hero.tsx` container: Split/layered hero section with typography:
    - Super-title: `CREATIVE TECHNOLOGIST & 3D DEVELOPER`
    - Main heading: `Beyond the ordinary.`
    - Subtitle: `Designing interactive digital experiences that feel alive.`
    - Action buttons: "Explore Work →" (primary glowing gradient) and "Get in Touch" (secondary glass button).
    - Scroll hint: "SCROLL TO EXPLORE ↓".
  - *Verification:* Hero UI renders with responsive typography and premium dark aesthetics.
- [ ] **Task 2.2: Supporting Content Sections & Footer**
  - Build `About.tsx`: Bento grid showcasing interactive 3D, creative coding, shaders, and web architecture.
  - Build `Projects.tsx`: Featured work cards with hover elevation and tech stack tags.
  - Build `Experience.tsx` and `Contact.tsx`: Modern interactive form with direct social links.
  - Build `Footer.tsx`: Clean minimalist footer.
  - *Verification:* Entire landing page scrolls smoothly with consistent design language.

---

### Phase 3: 3D Model Integration & Lighting System (Est: 3–4h)
- [ ] **Task 3.1: Asset Ingestion & Canvas Setup**
  - Download and verify `readyplayer.me.glb` into `public/models/character.glb`.
  - Create `CharacterScene.tsx`: R3F `<Canvas>` with camera config (`fov: 32`, `position: [0, 0, 3.4]`), ACES Filmic tone mapping, and antialiasing.
  - Create `CanvasLoader.tsx`: Sleek circular loading spinner with live percentage.
  - Create `CharacterModel.tsx`: Load model with `useGLTF`, enable shadow casting/receiving on meshes, center model vertically at chest/head level.
  - *Verification:* 3D character renders in resting position inside the hero section.
- [ ] **Task 3.2: Cinematic Studio Lighting & Environment**
  - Create `SceneLighting.tsx`:
    - Key Light: Warm directional light (`#ffffff`, intensity 2.2) angled from upper right.
    - Fill Light: Soft ambient and directional light (`#a5b4fc`, intensity 0.8) from left to soften shadows.
    - Rim Light: Vibrant backlight (`#6366f1` / `#38bdf8`, intensity 3.5) creating edge glow on character's silhouette and hair.
    - Contact Shadow: Soft ground contact shadow plane (`ContactShadows` from Drei) for grounding.
  - *Verification:* Character model exhibits depth, realistic lighting, and premium studio appearance.

---

### Phase 4: Mouse-Follow Head Tracking Engine (Est: 3–4h)
- [ ] **Task 4.1: Pointer Tracking Hook (`usePointerTracking.ts`)**
  - Track pointer coordinates relative to the interactive hero container.
  - Normalize coordinates to range `[-1.0, 1.0]` for both X (horizontal) and Y (vertical).
  - Implement pointer-leave detection: smoothly return target coordinates to `(0, 0)` when pointer exits the hero section or window.
  - Provide fallback for touch/mobile devices.
  - *Verification:* Pointer hook outputs smooth normalized coordinates in `[-1, 1]`.
- [ ] **Task 4.2: Damped Dual-Bone Rotation Engine (`HeadTracking.tsx`)**
  - Extract `Neck` and `Head` bones via `useModelRig.ts`.
  - Record rest pose quaternions.
  - In `useFrame`, compute target yaw, pitch, and roll:
    - Pitch: clamped to `[-25°, +25°]`
    - Yaw: clamped to `[-45°, +45°]`
    - Roll: subtle tilt `[-6°, +6°]` proportional to horizontal cursor speed
  - Distribute 35% rotation to Neck, 65% to Head.
  - Apply frame-rate-independent damping (`damp`).
  - *Verification:* Moving cursor left/right/up/down/diagonal causes head to turn naturally. Cursor exit smoothly returns head to neutral pose.

---

### Phase 5: Advanced Character Animation (Facial & Breathing) (Est: 3–4h)
- [ ] **Task 5.1: Stochastic Facial Blinking (`FacialBlink.tsx`)**
  - Detect `eyeBlinkLeft` and `eyeBlinkRight` morph target indices on the character mesh.
  - Implement Poisson/stochastic interval timer (blinking every 2.5 to 5.5 seconds).
  - Animate blink cycle with smooth 140ms sine curve (rapid close, slightly slower open).
  - *Verification:* Character blinks naturally without robotic periodic cadence.
- [ ] **Task 5.2: Idle Breathing & Eye Tracking (`IdleBreathing.tsx`, `EyeTracking.tsx`)**
  - Apply sinusoidal displacement to Spine/Chest bones ($\approx 0.015$ rad amplitude, 0.4 Hz frequency) to simulate relaxed chest expansion.
  - Implement subtle eye micro-tracking or iris orientation towards pointer target.
  - *Verification:* Character feels alive and natural even when cursor is stationary.

---

### Phase 6: Scroll and UI Animations (GSAP Integration) (Est: 2–3h)
- [ ] **Task 6.1: GSAP Entrance Timeline & ScrollTrigger**
  - Staggered entrance animation for hero badge, headline lines, subtitle, CTA buttons, and 3D canvas reveal.
  - Scroll-triggered fade-ins for About Bento cards and Project showcase items.
  - *Verification:* Page transitions feel fluid and cinematic at 60fps.
- [ ] **Task 6.2: 3D Interactive Card Tilt & Micro-interactions**
  - Implement subtle interactive cursor follower and card tilt on hover.
  - *Verification:* Interactive elements respond with tactile feedback.

---

### Phase 7: Responsive Design & Mobile Optimisation (Est: 2–3h)
- [ ] **Task 7.1: Mobile Responsive Viewport & Touch Gestures**
  - Adapt 3D canvas camera FOV and model vertical position for portrait viewports.
  - On touch devices without hover cursor, provide gentle ambient drifting idle motion or responsive touch-drag tracking.
  - *Verification:* Tested on mobile/tablet viewports; no layout breaks or canvas overflows.
- [ ] **Task 7.2: Performance Tuning & Reduced Motion Support**
  - Hook into `useReducedMotion.ts` (`prefers-reduced-motion` media query).
  - When reduced motion is enabled, disable GSAP slide animations and reduce head tracking amplitude by 85%.
  - Clamp Canvas `dpr` to `Math.min(window.devicePixelRatio, 2)` to avoid GPU strain on high-density displays.
  - *Verification:* Passes reduced-motion toggle check and maintains 60fps on mid-range devices.

---

### Phase 8: Testing, Verification & Production Build (Est: 2h)
- [ ] **Task 8.1: Full Acceptance Matrix Audit**
  - Validate all 12 test scenarios from functional acceptance criteria.
  - Verify error boundary fallback if WebGL is unavailable.
- [ ] **Task 8.2: Production Build & Asset Optimization**
  - Run `npm run build` and verify bundle chunk sizes.
  - Verify zero TypeScript or linting errors.
  - Document operational summary and deployment instructions.

---

## 6. Technical Risks & Mitigations

| Risk | Impact | Mitigation Strategy |
|---|---|---|
| **Bone Rest Pose Corruption** | Head flips backwards or spins uncontrollably on cursor movement | Store rest quaternions at mount (`initialRotation.clone()`). Multiply target rotation delta onto rest quaternion instead of overwriting raw rotation values. |
| **Gimbal Lock & Axis Snapping** | Jerky head snap when crossing zero axis | Compute orientation using `THREE.Euler` in `YXZ` order with strict angle clamping before converting to quaternions. |
| **Frame-rate Stutter (60Hz vs 120Hz)** | Movement is too fast on 120Hz ProMotion screens and sluggish on 60Hz screens | Use `THREE.MathUtils.damp(current, target, lambda, delta)` where `delta` is passed directly from R3F's `useFrame(state, delta)`. |
| **Missing Morph Targets** | Crash if character GLB lacks `eyeBlinkLeft`/`Right` blendshapes | Inspect mesh dictionary in `useModelRig.ts`. If keys are absent, skip facial blinking module silently without console warnings. |
| **WebGL Context Loss on Tab Switch** | Blank canvas when returning to browser tab | Implement WebGL context restore listener on the Canvas renderer and enable `frameloop="always"`. |
| **Mobile Overheating / Battery Drain** | High power consumption from uncapped rendering | Cap DPR to 2 maximum, simplify shadows on screens $<768\text{px}$, and pause heavy animation loops when hero is scrolled out of view. |

---

## 7. Functional Acceptance Criteria Matrix

| Scenario | Trigger / Action | Expected Result | Verification Check |
|---|---|---|---|
| **1. Move Cursor Left** | Cursor moves left across hero | Character's head and neck turn left smoothly | Neck + Head Y-rotation matches negative angle |
| **2. Move Cursor Right** | Cursor moves right across hero | Character's head and neck turn right smoothly | Neck + Head Y-rotation matches positive angle |
| **3. Move Cursor Up** | Cursor moves up | Character tilts head upward naturally | Neck + Head X-rotation pitches up within limits |
| **4. Move Cursor Down** | Cursor moves down | Character tilts head downward | Neck + Head X-rotation pitches down within limits |
| **5. Diagonal Motion** | Fast diagonal sweeping movement | Fluid synchronized yaw + pitch with subtle roll | No axis stuttering or gimbal jumping |
| **6. Pointer Leaves Hero** | Cursor moves outside interactive container | Character smoothly eases back to neutral rest pose | Returns to rest quaternion within 0.8s |
| **7. Rapid Cursor Flick** | Violent or rapid mouse shaking | Damped animation with no overshooting or snapping | Angular acceleration remains smooth |
| **8. Idle State** | Cursor remains stationary | Gentle chest breathing + periodic natural blinks | Sinusoidal displacement active |
| **9. Mobile Viewport** | Screen width $<768\text{px}$ | Camera FOV adjusts, model framed properly | Responsive layout without horizontal overflow |
| **10. Touch Devices** | Touch drag on screen or ambient idle | Character responds to touch drag or auto-sways | Natural mobile interaction |
| **11. Slow Connection** | Simulated network throttling | Clean loading progress indicator displayed | `CanvasLoader` shows percentage |
| **12. Reduced Motion** | `prefers-reduced-motion: reduce` active | Head motion dampened to micro-levels, UI slides disabled | Complies with WCAG 2.2 |

---

## 8. Testing Strategy

1. **Static Analysis & Type Integrity:**
   - Execute `npx tsc --noEmit` after every task.
   - Zero tolerance for `any` escapes in core 3D tracking logic.
2. **Visual & Interactive Verification:**
   - Run Vite development server (`npm run dev`).
   - Use browser automation and visual capture (`browser_subagent`) to record cursor tracking, pointer-leave resets, and responsive layouts.
3. **Rig & Bone Diagnostics:**
   - Add a lightweight debug mode toggle (`Ctrl + Shift + D` or query param `?debug=true`) to display bone names, current Euler angles, and FPS counter in development.
4. **Production Build Validation:**
   - Execute `npm run build` to confirm asset bundling, tree-shaking, and chunk optimization.

---

## 9. Recommended Execution Strategy

Per your recommendation:
1. **Milestone 1 (Phases 1–4):** Build the complete working foundation first (Project Setup → Homepage UI → 3D Model Integration → Mouse-Follow Head Tracking). This delivers a fully functional, interactive 3D hero before adding secondary polish.
2. **Milestone 2 (Phases 5–8):** Layer on advanced facial animation, stochastic blinking, GSAP scroll choreography, mobile optimization, and production hardening.

---

*Plan formulated according to GSD canonical standards. Ready for user review.*
