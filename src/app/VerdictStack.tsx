"use client";

import { useEffect, useRef } from "react";
import styles from "./landing.module.css";

export function VerdictStack() {
  const stack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = stack.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const { top, height } = element.getBoundingClientRect();
      const travel = window.innerHeight * 0.6 + height;
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.6 - top) / travel));
      element.style.setProperty("--stack-progress", progress.toFixed(3));
    };

    const schedule = () => {
      if (reducedMotion.matches) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        element.style.removeProperty("--stack-progress");
        return;
      }
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reducedMotion.addEventListener("change", schedule);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reducedMotion.removeEventListener("change", schedule);
    };
  }, []);

  return (
    <div ref={stack} className={styles.heroArt} aria-hidden="true">
      <div className={styles.stackBacking} />
      <div className={styles.stackSheet}>
        <span className={styles.kicker}>Sample stack verdict</span>
        <div className={styles.stackRow}><span>Patient texting</span><b>Replace now</b></div>
        <div className={styles.stackRow}><span>Recall and reminders</span><b>Trial first</b></div>
        <div className={styles.stackRow}><span>Practice management</span><b>Keep</b></div>
      </div>
    </div>
  );
}
