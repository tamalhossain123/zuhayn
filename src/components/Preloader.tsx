"use client";

import { useEffect, useState } from "react";

/** Brief brand preloader in the reference style: the wordmark
 *  letters rise one by one, then the veil fades away. */
export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1050);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`preloader${done ? " done" : ""}`} aria-hidden="true">
      <div className="pre-word">
        {"ZUHAYN".split("").map((ch, i) => (
          <span key={i}>{ch}</span>
        ))}
      </div>
    </div>
  );
}
