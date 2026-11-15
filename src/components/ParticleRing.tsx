"use client";

import { useEffect, useRef } from "react";

/**
 * ParticleRing: a slowly rotating ring of glowing particles floating in
 * 3D around the hero shape. Original canvas implementation: particles sit
 * in a tilted ring band, are rotated around the Y axis, projected with a
 * simple perspective, and shaded by depth. No libraries, no assets.
 */

type P = {
  angle: number; // position around the ring
  radius: number; // distance from centre, as a factor of R
  y: number; // vertical jitter inside the band thickness
  size: number; // base dot size
  tint: number; // 0 white, 1 sky, 2 violet, 3 teal
  speed: number; // individual drift multiplier
};

const TINTS = [
  "255,255,255",
  "147,214,245",
  "196,181,253",
  "153,246,228",
];

export default function ParticleRing() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    let visible = true;
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Build the particle set once: a band between 0.8R and 1.05R with a
    // slight vertical thickness, denser toward the middle of the band.
    const COUNT = 1500;
    const parts: P[] = [];
    for (let i = 0; i < COUNT; i++) {
      const band = Math.pow(Math.random(), 0.7);
      parts.push({
        angle: Math.random() * Math.PI * 2,
        radius: 0.8 + band * 0.25,
        y: (Math.random() - 0.5) * 0.045,
        size: 0.7 + Math.random() * 1.5,
        tint: Math.random() < 0.62 ? 0 : 1 + Math.floor(Math.random() * 3),
        speed: 0.85 + Math.random() * 0.3,
      });
    }

    const onMouse = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const TILT = 1.12; // ring tilt in radians (~64 degrees)
    let last = performance.now();

    const draw = (now: number) => {
      const t = now / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w * 0.46, h * 0.54);
      const tiltX = TILT + mouse.y * 0.1;
      const drift = mouse.x * 0.12;
      const cosT = Math.cos(tiltX);
      const sinT = Math.sin(tiltX);

      ctx.clearRect(0, 0, w, h);

      // Back half first, then front half, so depth reads correctly.
      const sorted = parts
        .map((p) => {
          const a = p.angle + t * 0.05 * p.speed + drift;
          const rx = Math.cos(a) * p.radius * R;
          const rz = Math.sin(a) * p.radius * R;
          const ry = p.y * R;
          // rotate around X axis for the tilt
          const y2 = ry * cosT - rz * sinT;
          const z2 = ry * sinT + rz * cosT;
          const scale = 900 / (900 + z2);
          return {
            x: cx + rx * scale,
            y: cy + y2 * scale,
            z: z2,
            scale,
            size: p.size,
            tint: p.tint,
          };
        })
        .sort((a, b) => a.z - b.z);

      for (const d of sorted) {
        const depth = (d.z / R + 1) / 2; // 0 back, 1 front
        const alpha = 0.16 + depth * 0.62;
        const r = Math.max(0.4, d.size * d.scale * (0.7 + depth * 0.5));
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TINTS[d.tint]},${alpha.toFixed(3)})`;
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!running || !visible) {
        last = now;
        return;
      }
      if (now - last > 12) {
        draw(now);
        last = now;
      }
    };

    if (reduced) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onVis = () => {
      running = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} className="particle-ring" aria-hidden="true" />;
}
