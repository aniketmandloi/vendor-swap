"use client";

import { useState, type CSSProperties } from "react";
import styles from "./landing.module.css";

const steps = [
  {
    name: "Share your bills",
    about: "Paste your vendor list or upload your software bills. Only the vendor lines you confirm are kept.",
    fragment: (
      <div className={styles.fragment}>
        <p className={styles.caseMeta}>Pasted bill</p>
        <p className={styles.fragmentTitle}>Chairtext Plus</p>
        <dl>
          <div><dt>Patient texting, 1 location</dt><dd>$189.00 / mo</dd></div>
          <div><dt>Renews</dt><dd>Jan 15, 2027</dd></div>
        </dl>
      </div>
    ),
  },
  {
    name: "Map your workflow",
    about: "Answer a few questions about what your practice depends on, so every verdict fits how you work.",
    fragment: (
      <div className={styles.fragment}>
        <p className={styles.caseMeta}>Workflow question</p>
        <p className={styles.fragmentTitle}>Who answers calls after hours?</p>
        <ul className={styles.choices}>
          <li data-picked>An answering service</li>
          <li>Voicemail</li>
          <li>The dentist</li>
        </ul>
      </div>
    ),
  },
  {
    name: "Get a verdict",
    about: "Review a one-page report with savings after setup and training, plus what to confirm before cancelling.",
    fragment: (
      <div className={styles.fragment}>
        <p className={styles.caseMeta}>Verdict</p>
        <p className={styles.fragmentTitle}>Nightdesk Answering</p>
        <b className={styles.chip} data-kind="replace_with_caveats">Replace with caveats</b>
        <p>Send after-hours calls to Callmoss for two weeks before switching fully.</p>
      </div>
    ),
  },
];

const last = steps.length - 1;

export function HowItWorks() {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.stages}>
      <div className={styles.stageClauseField}>
        <div className={styles.swap}>
          {steps.map(({ name }, index) => (
            <p key={name} className={styles.clause} data-active={index === active}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {name}
            </p>
          ))}
        </div>
        <div className={`${styles.swap} ${styles.stageAbout}`}>
          {steps.map(({ name, about }, index) => (
            <p key={name} data-active={index === active}>{about}</p>
          ))}
        </div>
      </div>

      <div className={styles.stageFragmentField} aria-hidden="true">
        <div className={styles.swap}>
          {steps.map(({ name, fragment }, index) => (
            <div key={name} className={styles.fragmentState} data-active={index === active}>
              {fragment}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.slider} style={{ "--p": active / last } as CSSProperties}>
        <div className={styles.sliderTrack}>
          <span className={styles.track}><span className={styles.trackFill} /></span>
          <input
            type="range"
            className={styles.range}
            min={0}
            max={last}
            step={1}
            value={active}
            aria-label="Step"
            aria-valuetext={steps[active].name}
            onChange={(event) => setActive(Number(event.target.value))}
          />
        </div>
        <ul className={styles.stageNames}>
          {steps.map(({ name }, index) => (
            <li key={name}>
              <button
                type="button"
                className={styles.stageName}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
