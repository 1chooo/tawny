import {
  Box3,
  BufferAttribute,
  BufferGeometry,
  Euler,
  Matrix4,
  Mesh,
  Vector3,
} from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js'
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js'
import type { Creature } from '@/lib/content'

/** Flattens every mesh in the glTF scene into one non-indexed float geometry in scene space. */
function toSceneGeometry(root: { traverse: (cb: (o: unknown) => void) => void }) {
  const chunks: Float32Array[] = []
  root.traverse((obj) => {
    if (!(obj instanceof Mesh)) return
    obj.updateWorldMatrix(true, false)
    const geo = obj.geometry as BufferGeometry
    const src = geo.getAttribute('position')
    const index = geo.getIndex()
    const count = index ? index.count : src.count
    const out = new Float32Array(count * 3)
    const v = new Vector3()
    for (let i = 0; i < count; i++) {
      v.fromBufferAttribute(src, index ? index.getX(i) : i)
      v.applyMatrix4(obj.matrixWorld)
      out.set([v.x, v.y, v.z], i * 3)
    }
    chunks.push(out)
  })
  const merged = new Float32Array(chunks.reduce((n, c) => n + c.length, 0))
  let offset = 0
  for (const c of chunks) {
    merged.set(c, offset)
    offset += c.length
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(merged, 3))
  return geometry
}

function addTentacles(
  out: Float32Array,
  from: number,
  box: Box3,
  { strands, length }: NonNullable<Creature['tentacles']>,
) {
  const width = box.max.x - box.min.x
  const rim = box.min.y + (box.max.y - box.min.y) * 0.35
  for (let n = from; n < out.length / 3; n++) {
    const strand = n % strands
    const angle = (strand / strands) * Math.PI * 2
    const oralArm = strand % 4 === 0
    const s = Math.random()
    const radius = width * (oralArm ? 0.1 : 0.34) * (1 - s * 0.35)
    const sway = s * s * 0.4
    const spread = oralArm ? 0.06 : 0.015
    out.set(
      [
        Math.cos(angle) * radius + Math.sin(s * 5 + angle) * sway + (Math.random() - 0.5) * spread,
        rim - s * length * (oralArm ? 0.65 : 1),
        Math.sin(angle) * radius + Math.cos(s * 4 + angle) * sway + (Math.random() - 0.5) * spread,
      ],
      n * 3,
    )
  }
  // Re-center vertically so bell plus strands sit on the creature's pose
  for (let i = 1; i < out.length; i += 3) out[i] += length * 0.4
}

function normalize(geometry: BufferGeometry, creature: Creature) {
  const [rx, ry, rz] = creature.rotation
  geometry.applyMatrix4(new Matrix4().makeRotationFromEuler(new Euler(rx, ry, rz)))
  const box = new Box3().setFromBufferAttribute(
    geometry.getAttribute('position') as BufferAttribute,
  )
  const center = box.getCenter(new Vector3())
  const size = box.getSize(new Vector3())
  const scale = creature.size / Math.max(size.x, size.y, size.z)
  geometry.translate(-center.x, -center.y, -center.z)
  geometry.scale(scale, scale, scale)
}

export async function sampleCreatures(
  creatures: Creature[],
  baseUrl: string,
  count: number,
): Promise<Float32Array[]> {
  const loader = new GLTFLoader()
  loader.setMeshoptDecoder(MeshoptDecoder)
  const gltfs = await Promise.all(
    creatures.map((c) => loader.loadAsync(`${baseUrl}/${c.model}`)),
  )

  return gltfs.map((gltf, i) => {
    const creature = creatures[i]
    const geometry = toSceneGeometry(gltf.scene)
    normalize(geometry, creature)
    const sampler = new MeshSurfaceSampler(new Mesh(geometry)).build()
    const out = new Float32Array(count * 3)
    const surfaceCount = creature.tentacles
      ? Math.round(count * (1 - creature.tentacles.share))
      : count
    const p = new Vector3()
    for (let n = 0; n < surfaceCount; n++) {
      sampler.sample(p)
      out.set([p.x, p.y, p.z], n * 3)
    }
    if (creature.tentacles) {
      geometry.computeBoundingBox()
      addTentacles(out, surfaceCount, geometry.boundingBox!, creature.tentacles)
    }
    geometry.dispose()
    return out
  })
}
