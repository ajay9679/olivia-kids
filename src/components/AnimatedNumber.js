
'use client';
import { useEffect, useRef, useState } from "react";

export default function AnimatedNumber({ value, duration = 1500, suffix = "" }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef();

  useEffect(() => {
    let start = 0;
    let end = typeof value === "number" ? value : parseFloat(value);
    let startTime = null;
    let animationFrame;

    function animate(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const current = Math.floor(progress * (end - start) + start);
      setDisplay(current);
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplay(end);
      }
    }
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  // Add comma separator for thousands
  const formatted = display.toLocaleString();
  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}
