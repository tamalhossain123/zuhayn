"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Plays the original design's chart animations (bars grow, line draws,
 * donut settles) once when a [data-chart] card scrolls into view.
 * Same behaviour as the single-file design's script; the authored
 * final state is what renders first, so charts are correct with no JS.
 */
export default function ChartAnimator({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const ease = "cubic-bezier(.22,.8,.3,1)";
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          const card = en.target as HTMLElement;
          card.querySelectorAll<HTMLElement>(".bar-anim").forEach((el, i) => {
            el.animate(
              [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
              { duration: 900, delay: i * 90, easing: ease, fill: "backwards" }
            );
          });
          const line = card.querySelector<SVGPathElement>(".line-anim");
          if (line) {
            const len = line.getTotalLength();
            line.style.strokeDasharray = `${len} ${len}`;
            line.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], {
              duration: 1400,
              easing: ease,
              fill: "backwards",
            });
            const area = card.querySelector<HTMLElement>(".area-anim");
            if (area)
              area.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 1100,
                delay: 300,
                easing: "ease-out",
                fill: "backwards",
              });
            card.querySelectorAll<HTMLElement>(".dot-anim").forEach((el, i) => {
              el.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 350,
                delay: 450 + i * 150,
                easing: "ease-out",
                fill: "backwards",
              });
            });
          }
          const donut = card.querySelector<HTMLElement>(".donut-anim");
          if (donut)
            donut.animate(
              [
                { opacity: 0, transform: "scale(.88) rotate(-12deg)" },
                { opacity: 1, transform: "scale(1) rotate(0deg)" },
              ],
              { duration: 1000, easing: ease, fill: "backwards" }
            );
        });
      },
      { threshold: 0.3 }
    );
    root.querySelectorAll("[data-chart]").forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{children}</div>;
}
