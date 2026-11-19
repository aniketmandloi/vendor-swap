"use client";

import { useState } from "react";
import type { VerdictKind } from "../report/model";
import { sampleReport } from "../report/sample";
import { annualCost, netFirstYearSavings } from "../report/savings";
import { ComplianceNote, FUNCTION_LABELS, VERDICT_TITLES, money } from "../report/VerdictReport";
import styles from "./landing.module.css";

const verdicts: { kind: VerdictKind; about: string }[] = [
  { kind: "replace_now", about: "A low-risk switch with a named alternative." },
  { kind: "replace_with_caveats", about: "A viable swap. Run a trial or overlap before cancelling." },
  { kind: "keep", about: "Stay with the current vendor when switching costs or risks outweigh the savings." },
];

const cases = verdicts.flatMap(({ kind, about }) => {
  const line = sampleReport.lines.find((item) => item.verdict.kind === kind);
  return line ? [{ kind, about, line }] : [];
});

export function VerdictExplorer() {
  const [active, setActive] = useState(0);

  return (
    <>
      <div className={styles.outputsText}>
        <div role="tablist" aria-label="Verdicts" className={styles.outputsList}>
          {cases.map(({ kind }, index) => (
            <button
              key={kind}
              id={`verdict-tab-${kind}`}
              role="tab"
              type="button"
              aria-selected={index === active}
              aria-controls={`verdict-panel-${kind}`}
              className={styles.outputName}
              onClick={() => setActive(index)}
            >
              {VERDICT_TITLES[kind]}
            </button>
          ))}
        </div>
        <div className={styles.swap}>
          {cases.map(({ kind, about }, index) => (
            <p key={kind} data-active={index === active}>{about}</p>
          ))}
        </div>
      </div>

      <div className={styles.stage}>
        {cases.map(({ kind, line }, index) => {
          const { verdict } = line;
          return (
            <article
              key={kind}
              id={`verdict-panel-${kind}`}
              role="tabpanel"
              aria-labelledby={`verdict-tab-${kind}`}
              hidden={index !== active}
              data-active={index === active}
              className={styles.caseSheet}
            >
              <p className={styles.caseMeta}>{FUNCTION_LABELS[line.function]} · Sample practice</p>
              <h3>{line.vendor}</h3>
              <b className={styles.chip} data-kind={kind}>{VERDICT_TITLES[kind]}</b>
              <dl>
                <div><dt>Current annual cost</dt><dd>{money(annualCost(line))}</dd></div>
                <div><dt>Net first-year savings</dt><dd>{money(netFirstYearSavings(line))}</dd></div>
                {verdict.kind === "keep" ? (
                  <div><dt>Why keep</dt><dd>{verdict.reason}</dd></div>
                ) : (
                  <div><dt>Switch to</dt><dd>{verdict.alternative.name}</dd></div>
                )}
                {verdict.kind === "replace_with_caveats" && (
                  <div><dt>Trial plan</dt><dd>{verdict.trialPlan}</dd></div>
                )}
                <div>
                  <dt>Compliance</dt>
                  <dd><ComplianceNote line={line} /></dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </>
  );
}
