"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import type * as THREE from "three";
import { pointsInner, pointsOuter, type RingPoint } from "./particlePoints";

/**
 * The 3D particle ring Tamal chose for the hero (code supplied by him,
 * typed and fitted to the hero): a rotating ring of glowing spheres in an
 * indigo to violet gradient. Adaptations for the hero only: the canvas
 * fills the hero shape layer instead of 100vh, the demo heading is left
 * out (the hero has its own title), the background stays transparent over
 * the hero's black, and orbit control is drag-rotate only, active on
 * mouse pointers, so page scrolling is never trapped on touch screens.
 */
export default function ParticleRing() {
  const [canDrag, setCanDrag] = useState(false);

  useEffect(() => {
    setCanDrag(window.matchMedia("(pointer: fine)").matches);
  }, []);

  return (
    <div className="particle-ring">
      <Canvas
        camera={{
          position: [10, -7.5, -5],
        }}
        style={{ height: "100%", width: "100%" }}
        gl={{ alpha: true, antialias: true }}
      >
        <OrbitControls
          enabled={canDrag}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.6}
          maxDistance={20}
          minDistance={10}
        />
        <directionalLight />
        <pointLight position={[-30, 0, -30]} power={10.0} />
        <PointCircle />
      </Canvas>
    </div>
  );
}

const PointCircle = () => {
  const ref = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (ref.current?.rotation) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={ref}>
      {pointsInner.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
      {pointsOuter.map((point) => (
        <Point key={point.idx} position={point.position} color={point.color} />
      ))}
    </group>
  );
};

const Point = ({
  position,
  color,
}: Pick<RingPoint, "position" | "color">) => {
  return (
    <Sphere position={position} args={[0.1, 10, 10]}>
      <meshStandardMaterial
        emissive={color}
        emissiveIntensity={0.5}
        roughness={0.5}
        color={color}
      />
    </Sphere>
  );
};
