import { useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export type HeroPointer = { x: number; y: number; active: boolean };

const COMPACT_BREAKPOINT = 768;
const DEFORM_RADIUS = 1.3;
const DEFORM_STRENGTH = 0.22;

type SculptureProps = {
  pointerRef: MutableRefObject<HeroPointer>;
  compact: boolean;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function createCoreGeometry(detail: number) {
  const geometry = new THREE.IcosahedronGeometry(1.2, detail);
  geometry.deleteAttribute('normal');
  geometry.deleteAttribute('uv');
  const merged = mergeVertices(geometry);
  geometry.dispose();
  merged.computeVertexNormals();
  return merged;
}

function Sculpture({ pointerRef, compact }: SculptureProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const viewport = useThree((state) => state.viewport);
  const geometry = useMemo(() => createCoreGeometry(compact ? 4 : 6), [compact]);
  const restPositions = useMemo(() => Float32Array.from(geometry.attributes.position.array), [geometry]);
  const smoothed = useRef({ rx: 0, ry: 0, scale: 0, y: 0, presence: 0 });

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const core = coreRef.current;
    const shell = shellRef.current;
    if (!group || !core || !shell) return;

    const pointer = pointerRef.current;
    const time = state.clock.elapsedTime;
    const intro = easeOutCubic(clamp(time / 1.8, 0, 1));
    const progress = clamp(window.scrollY / window.innerHeight, 0, 1);
    const ease = 1 - Math.exp(-delta * 4);
    const current = smoothed.current;

    const targetRy = time * 0.12 + pointer.x * 0.9 + progress * 2.2;
    const targetRx = pointer.y * 0.5 + progress * 0.8;
    const targetScale = (compact ? 0.72 : 1) * (0.35 + 0.65 * intro) * (1 - progress * 0.35);
    const targetY = -progress * 0.8;
    const targetPresence = pointer.active ? 1 : 0;

    current.ry += (targetRy - current.ry) * ease;
    current.rx += (targetRx - current.rx) * ease;
    current.scale += (targetScale - current.scale) * ease;
    current.y += (targetY - current.y) * ease;
    current.presence += (targetPresence - current.presence) * ease;

    group.rotation.set(current.rx, current.ry, 0);
    group.scale.setScalar(current.scale);
    group.position.set(pointer.x * 0.25, current.y, 0);
    group.updateMatrixWorld(true);

    shell.rotation.set(time * 0.05, -time * 0.08, 0);

    if (compact) return;

    const pointerWorld = new THREE.Vector3(pointer.x * viewport.width, pointer.y * viewport.height, 1.5);
    const local = core.worldToLocal(pointerWorld);
    const position = geometry.attributes.position as THREE.BufferAttribute;
    const array = position.array as Float32Array;
    for (let index = 0; index < array.length; index += 3) {
      const ox = restPositions[index];
      const oy = restPositions[index + 1];
      const oz = restPositions[index + 2];
      const dx = ox - local.x;
      const dy = oy - local.y;
      const dz = oz - local.z;
      const influence = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy + dz * dz) / DEFORM_RADIUS);
      const push = 1 + influence * influence * DEFORM_STRENGTH * current.presence;
      array[index] = ox * push;
      array[index + 1] = oy * push;
      array[index + 2] = oz * push;
    }
    position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#F3EDE1" />
      <pointLight position={[-3, -2, 3]} intensity={24} color="#35B5A3" />
      <group ref={groupRef}>
        <mesh ref={coreRef} geometry={geometry}>
          <meshStandardMaterial color="#007F73" metalness={0.65} roughness={0.22} />
        </mesh>
        <mesh ref={shellRef} scale={1.3}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshBasicMaterial color="#35B5A3" wireframe transparent opacity={0.28} />
        </mesh>
      </group>
    </>
  );
}

export default function HeroScene({ pointerRef }: { pointerRef: MutableRefObject<HeroPointer> }) {
  const [compact] = useState(() => window.innerWidth < COMPACT_BREAKPOINT);

  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0, 7], fov: 38 }} gl={{ antialias: true, alpha: true }}>
      <Sculpture pointerRef={pointerRef} compact={compact} />
    </Canvas>
  );
}
