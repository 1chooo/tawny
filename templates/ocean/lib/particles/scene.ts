import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three'
import type { Creature, Pose } from '@/lib/content'
import { sampleCreatures } from './sample-models'
import {
  bubbleFragment,
  bubbleVertex,
  particleFragment,
  particleVertex,
} from './shaders'

const MOBILE_BREAKPOINT = 768
/** Aspect ratios the poses are tuned for; narrower viewports shrink the creature to fit */
const DESKTOP_ASPECT = 1.6
const MOBILE_ASPECT = 0.5
const MAX_PIXEL_RATIO = 2
const INTRO_SECONDS = 3.2

export interface OceanSceneOptions {
  /** The scene appends (and later removes) its own canvas here */
  container: HTMLElement
  creatures: Creature[]
  modelBaseUrl: string
  reducedMotion: boolean
  onReady?: () => void
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const smooth = (t: number) => t * t * (3 - 2 * t)
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4)

function randomInSphere() {
  const u = Math.random()
  const v = Math.random()
  const theta = u * Math.PI * 2
  const phi = Math.acos(2 * v - 1)
  const r = Math.cbrt(Math.random())
  return [
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
    r * Math.cos(phi),
  ]
}

export class OceanScene {
  private readonly canvas: HTMLCanvasElement
  private readonly creatures: Creature[]
  private readonly reducedMotion: boolean
  private readonly renderer: WebGLRenderer
  private readonly scene = new Scene()
  private readonly camera = new PerspectiveCamera(35, 1, 0.1, 100)
  private readonly group = new Group()
  private readonly particleUniforms = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uIntro: { value: 0 },
    uMotion: { value: 1 },
    uSize: { value: 52 },
    uPixelRatio: { value: 1 },
    uCursor: { value: new Vector2(10, 10) },
    uCursorStrength: { value: 0 },
    uAspect: { value: 1 },
    uColorDeep: { value: new Color('#1d4ed8') },
    uColorMid: { value: new Color('#2dd4bf') },
    uColorGlow: { value: new Color('#e0fffb') },
    uOpacity: { value: 1 },
  }
  private readonly bubbleUniforms = {
    uTime: { value: 0 },
    uMotion: { value: 1 },
    uSize: { value: 90 },
    uPixelRatio: { value: 1 },
    uHeight: { value: 14 },
    uColor: { value: new Color('#bff7ff') },
    uOpacity: { value: 0.55 },
  }

  private particles?: Points<BufferGeometry, ShaderMaterial>
  private bubbles?: Points<BufferGeometry, ShaderMaterial>
  private resizeObserver?: ResizeObserver
  private raf = 0
  private running = false
  private lastFrame = 0
  private loaded = false
  private disposed = false
  private inView = true
  private pageVisible = true
  private mobile = false
  private introElapsed = 0
  private progressTarget = 0
  private cursorTarget = new Vector2(10, 10)
  private cursorActive = false

  constructor(private readonly options: OceanSceneOptions) {
    this.creatures = options.creatures
    this.reducedMotion = options.reducedMotion

    this.canvas = document.createElement('canvas')
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    })
    options.container.appendChild(this.canvas)
    this.renderer.setClearColor(0x000000, 0)

    this.camera.position.set(0, 0, 11)
    this.scene.add(this.group)

    const motion = this.reducedMotion ? 0 : 1
    this.particleUniforms.uMotion.value = motion
    this.bubbleUniforms.uMotion.value = motion

    this.mobile = this.canvas.clientWidth < MOBILE_BREAKPOINT
    this.resize()
    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(this.canvas)

    this.pageVisible = document.visibilityState === 'visible'
    document.addEventListener('visibilitychange', this.onVisibilityChange)
  }

  async load() {
    const count = this.mobile ? 9000 : 22000
    const shapes = await sampleCreatures(
      this.creatures,
      this.options.modelBaseUrl,
      count,
    )
    if (this.disposed) return

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(shapes[0], 3))
    geometry.setAttribute('aPos1', new BufferAttribute(shapes[1], 3))
    geometry.setAttribute('aPos2', new BufferAttribute(shapes[2], 3))
    geometry.setAttribute('aPos3', new BufferAttribute(shapes[3], 3))

    const scatter = new Float32Array(count * 3)
    const random = new Float32Array(count * 4)
    for (let i = 0; i < count; i++) {
      scatter.set(randomInSphere(), i * 3)
      random.set(
        [
          0.35 + Math.pow(Math.random(), 3) * 1.1,
          Math.random(),
          0.4 + Math.random() * 0.6,
          Math.random(),
        ],
        i * 4,
      )
    }
    geometry.setAttribute('aScatter', new BufferAttribute(scatter, 3))
    geometry.setAttribute('aRandom', new BufferAttribute(random, 4))
    // Morph targets move points far outside the first shape's bounds
    geometry.boundingSphere = null
    geometry.computeBoundingSphere()
    geometry.boundingSphere!.radius += 6

    this.particles = new Points(
      geometry,
      new ShaderMaterial({
        vertexShader: particleVertex,
        fragmentShader: particleFragment,
        uniforms: this.particleUniforms,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    )
    this.group.add(this.particles)
    this.bubbles = this.createBubbles(this.mobile ? 90 : 220)
    this.scene.add(this.bubbles)

    if (this.reducedMotion) this.particleUniforms.uIntro.value = 1
    this.applyPose(this.particleUniforms.uProgress.value)
    this.loaded = true
    this.options.onReady?.()
    this.updateLoop()
  }

  /** Scroll progress across creatures: 0 = first, creatures.length - 1 = last. */
  setProgress(value: number) {
    this.progressTarget = Math.min(Math.max(value, 0), this.creatures.length - 1)
  }

  setPointer(clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    this.cursorTarget.set(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1,
    )
    this.cursorActive = true
  }

  clearPointer() {
    this.cursorActive = false
  }

  setInView(inView: boolean) {
    this.inView = inView
    this.updateLoop()
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    this.resizeObserver?.disconnect()
    document.removeEventListener('visibilitychange', this.onVisibilityChange)
    for (const points of [this.particles, this.bubbles]) {
      points?.geometry.dispose()
      points?.material.dispose()
    }
    this.renderer.dispose()
    this.renderer.forceContextLoss()
    this.canvas.remove()
  }

  private createBubbles(count: number) {
    const positions = new Float32Array(count * 3)
    const random = new Float32Array(count * 3)
    const height = this.bubbleUniforms.uHeight.value
    for (let i = 0; i < count; i++) {
      positions.set(
        [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * height,
          -8 + Math.random() * 11,
        ],
        i * 3,
      )
      random.set(
        [
          0.3 + Math.pow(Math.random(), 4) * 1.4,
          0.15 + Math.random() * 0.45,
          Math.random(),
        ],
        i * 3,
      )
    }
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('aRandom', new BufferAttribute(random, 3))
    return new Points(
      geometry,
      new ShaderMaterial({
        vertexShader: bubbleVertex,
        fragmentShader: bubbleFragment,
        uniforms: this.bubbleUniforms,
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
      }),
    )
  }

  private onVisibilityChange = () => {
    this.pageVisible = document.visibilityState === 'visible'
    this.updateLoop()
  }

  private get shouldRun() {
    return this.loaded && !this.disposed && this.inView && this.pageVisible
  }

  private updateLoop() {
    if (this.shouldRun) {
      if (!this.running) {
        this.running = true
        this.lastFrame = performance.now()
        this.raf = requestAnimationFrame(this.tick)
      }
    } else if (this.running) {
      this.running = false
      cancelAnimationFrame(this.raf)
    }
  }

  private resize() {
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
    if (!width || !height) return
    const pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO)
    this.renderer.setPixelRatio(pixelRatio)
    this.renderer.setSize(width, height, false)
    this.camera.aspect = width / height
    this.camera.updateProjectionMatrix()
    this.particleUniforms.uPixelRatio.value = pixelRatio
    this.particleUniforms.uAspect.value = width / height
    this.bubbleUniforms.uPixelRatio.value = pixelRatio
    this.mobile = width < MOBILE_BREAKPOINT
    if (this.loaded) {
      this.applyPose(this.particleUniforms.uProgress.value)
      if (!this.running) this.renderer.render(this.scene, this.camera)
    }
  }

  private poseAt(index: number): Pose {
    const creature = this.creatures[index]
    return this.mobile ? creature.pose.mobile : creature.pose.desktop
  }

  private applyPose(progress: number) {
    const i = Math.min(Math.floor(progress), this.creatures.length - 2)
    const t = smooth(Math.min(Math.max(progress - i, 0), 1))
    const a = this.poseAt(i)
    const b = this.poseAt(i + 1)
    const halfHeight =
      Math.tan((this.camera.fov * Math.PI) / 360) * this.camera.position.z
    const halfWidth = halfHeight * this.camera.aspect
    const fit = Math.min(
      1,
      this.camera.aspect / (this.mobile ? MOBILE_ASPECT : DESKTOP_ASPECT),
    )
    this.group.position.set(
      lerp(a.x, b.x, t) * halfWidth,
      lerp(a.y, b.y, t) * halfHeight,
      0,
    )
    this.group.scale.setScalar(lerp(a.scale, b.scale, t) * fit)
  }

  private tick = (now: number) => {
    if (!this.shouldRun) return
    this.raf = requestAnimationFrame(this.tick)

    const delta = Math.min(Math.max((now - this.lastFrame) / 1000, 0), 1 / 20)
    this.lastFrame = now
    const u = this.particleUniforms
    u.uTime.value += delta
    this.bubbleUniforms.uTime.value = u.uTime.value

    if (u.uIntro.value < 1) {
      this.introElapsed += delta
      u.uIntro.value = easeOutQuart(Math.min(this.introElapsed / INTRO_SECONDS, 1))
    }

    if (this.reducedMotion) {
      u.uProgress.value = Math.round(this.progressTarget)
    } else {
      u.uProgress.value = lerp(
        u.uProgress.value,
        this.progressTarget,
        1 - Math.exp(-delta * 4),
      )
    }
    this.applyPose(u.uProgress.value)

    const follow = 1 - Math.exp(-delta * 6)
    if (this.cursorActive) {
      u.uCursor.value.lerp(this.cursorTarget, follow)
    }
    const strengthTarget = this.cursorActive && !this.reducedMotion ? 1 : 0
    u.uCursorStrength.value = lerp(u.uCursorStrength.value, strengthTarget, follow * 0.5)

    const t = u.uTime.value * u.uMotion.value
    const parallaxX = this.cursorActive ? u.uCursor.value.x : 0
    const parallaxY = this.cursorActive ? u.uCursor.value.y : 0
    this.group.rotation.y = lerp(
      this.group.rotation.y,
      Math.sin(t * 0.18) * 0.18 + parallaxX * 0.12 * u.uMotion.value,
      follow * 0.3,
    )
    this.group.rotation.x = lerp(
      this.group.rotation.x,
      Math.sin(t * 0.13) * 0.06 - parallaxY * 0.08 * u.uMotion.value,
      follow * 0.3,
    )
    this.group.position.y += Math.sin(t * 0.5) * 0.08

    this.renderer.render(this.scene, this.camera)
  }
}
