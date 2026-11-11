"use client";

import { useEffect, useRef } from "react";

/** Counts up once when scrolled into view. Final value is rendered in the
 *  HTML first, so the number is correct with no JS at all. */
export default function CountUp({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          const from = value > 100 ? value - 24 : 0;
          let start: number | null = null;
          const step = (ts: number) => {
            if (!start) start = ts;
            const p = Math.min((ts - start) / 1300, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            const current = from + (value - from) * eased;
            el.textContent = `${decimals ? current.toFixed(decimals) : Math.round(current)}${suffix}`;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix, decimals]);

  return (
    <span ref={ref}>
      {decimals ? value.toFixed(decimals) : value}
      {suffix}
    </span>
  );
}
