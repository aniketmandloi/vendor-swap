"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./landing.module.css";

export function MotionPage({ children }: { children: ReactNode }) {
  const page = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!page.current || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.setAttribute("data-arrived", "");
        } else if (entry.boundingClientRect.top > 0) {
          entry.target.removeAttribute("data-arrived");
        }
      }
    });
    page.current.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return <div ref={page} className={styles.page}>{children}</div>;
}
