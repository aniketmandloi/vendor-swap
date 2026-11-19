import styles from "./landing.module.css";

export function SwapMark() {
  return (
    <span className={styles.mark} aria-hidden="true">
      <svg viewBox="0 0 16 16" width="16" height="16">
        <path
          d="M2.5 5.5h10.5M10 2.5l3 3-3 3M13.5 10.5H3M6 7.5l-3 3 3 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
