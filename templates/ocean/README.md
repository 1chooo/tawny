# Ocean

A scroll-driven WebGL landing page for an ocean storytelling studio. A particle whale, sea turtle, jellyfish, and manta ray morph into one another as you scroll, with ocean currents, bioluminescent shimmer, rising bubbles, and a cursor ripple layered on top.

Design by [Hugo Lin](https://1chooo.com), inspired by the particle storytelling of [usta.agency](https://usta.agency).

## Quick start

### Option A — create-next-app (recommended)

```bash
npx create-next-app@latest my-ocean-studio \
  --example "https://github.com/1chooo/tawny" \
  --example-path "templates/ocean"
```

### Option B — create-tawny CLI (interactive prompts)

```bash
npx create-tawny@latest ocean my-ocean-studio
```

Then:

```bash
cd my-ocean-studio
pnpm install   # or npm / yarn / bun
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

1. `lib/particles/sample-models.ts` loads each glTF model from `public/models/`, bakes its `rotation`, centers and scales it to `size`, then samples the same number of points on every surface with Three.js `MeshSurfaceSampler`.
2. `lib/particles/scene.ts` stores the four point sets as `position`, `aPos1`, `aPos2`, and `aPos3` on one `BufferGeometry`, plus per-particle scatter and random attributes.
3. `lib/particles/shaders.ts` morphs between neighbouring shapes based on `uProgress`, loosening the cloud mid-morph like a school of fish, and adds swimming undulation, a jellyfish bell pulse, currents, shimmer, and the cursor ripple.
4. `components/ocean-experience.tsx` maps each section's `data-creature` to scroll progress with GSAP ScrollTrigger, and runs Lenis smooth scrolling and SplitText title reveals.

With `prefers-reduced-motion`, currents, text reveals, and smooth scrolling are off, and each section snaps straight to its creature. Rendering pauses whenever the tab is hidden, and the pixel ratio is capped at 2.

## Customize these files

| File | What to change |
|------|----------------|
| `lib/content.ts` | Studio name, copy, email, nav, credits, and each creature's model, rotation, size, and per-breakpoint pose |
| `components/ocean-sections.tsx` | Section layout; each section's `data-creature` picks the creature shown while it is on screen |
| `lib/particles/scene.ts` | Particle counts, colors, point size, camera |
| `app/globals.css` | Background gradient, color tokens, section spacing |

### Placeholders

Search for `{{AUTHOR_EMAIL}}` across the project and replace it, or use Option B which does this automatically.

### Using your own models

Drop any `.glb` into `public/models/` and point a creature's `model` at it. Only vertex positions are used, so materials, textures, and animations are ignored. Every bundled model faces +Z with +Y up. Tune `rotation` until the shape reads well from the camera, and `pose` to place it beside your copy.

Optionally strip and compress a model first. The loader already supports meshopt:

```bash
npx @gltf-transform/cli optimize input.glb public/models/output.glb --compress meshopt --texture-compress false
```

## Model credits

| Model | Author | License |
|-------|--------|---------|
| Whale | [Quaternius](https://poly.pizza/m/JGFwp6xWgk) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Manta ray | [Quaternius](https://poly.pizza/m/yzD8b7ZHZm) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| Sea turtle | [Poly by Google](https://poly.pizza/m/fklSEvGm1Q8) | [CC-BY 3.0](https://creativecommons.org/licenses/by/3.0/) — keep the attribution in the footer |
| Jellyfish | [Gobkit Free Animal Pack](https://gobkit.itch.io/gobkit-free-animal-pack) | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |

All four were reduced to position-only meshes (skins baked to their bind pose, textures and animations removed) and compressed with meshopt.

## Stack

- Next.js 16 App Router & React
- Three.js (custom `ShaderMaterial` points)
- GSAP ScrollTrigger + SplitText, Lenis
- Tailwind CSS v4

## License

Code is MIT — see [LICENSE](./LICENSE). Models keep the licenses listed above.
