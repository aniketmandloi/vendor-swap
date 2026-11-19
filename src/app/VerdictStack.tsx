"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { sampleReport } from "../report/sample";
import { reportTotals } from "../report/savings";
import { FUNCTION_LABELS, VERDICT_TITLES, money } from "../report/VerdictReport";
import styles from "./landing.module.css";

const totals = reportTotals(sampleReport).overall;

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
        <div className={styles.sheetBar}>
          <span>Stack Verdict Report</span>
          <span>{sampleReport.practiceName}</span>
        </div>
        {sampleReport.lines.map((line, index) => (
          <div
            key={line.vendor}
            className={styles.stackRow}
            style={{ "--i": index } as CSSProperties}
          >
            <span>
              {line.vendor}
              <small>{FUNCTION_LABELS[line.function]}</small>
            </span>
            <b data-kind={line.verdict.kind}>{VERDICT_TITLES[line.verdict.kind]}</b>
          </div>
        ))}
        <div className={styles.sheetTotal}>
          <span>Net first-year savings</span>
          <strong>{money(totals.netFirstYearSavings)}</strong>
        </div>
      </div>
    </div>
  );
}
