import type { ReactNode } from "react";
import type {
  Cents,
  PracticeFunction,
  StackVerdictReport,
  VendorLine,
  VerdictKind,
} from "./model";
import {
  annualCost,
  netFirstYearSavings,
  reportTotals,
  type Totals,
} from "./savings";

const BUCKETS: readonly { kind: VerdictKind; title: string }[] = [
  { kind: "replace_now", title: "Replace now" },
  { kind: "replace_with_caveats", title: "Replace with caveats" },
  { kind: "keep", title: "Keep" },
];

const FUNCTION_LABELS: Record<PracticeFunction, string> = {
  practice_management: "Practice management",
  patient_texting: "Patient texting",
  insurance_verification: "Insurance verification",
  recall_reminders: "Recall and reminders",
  answering_service: "Answering service",
  marketing: "Marketing",
  other: "Other",
};

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function money(amount: Cents): string {
  return usd.format(amount / 100);
}

// preparedOn is a calendar date, so format it in UTC to keep the viewer's
// time zone from shifting it a day.
const longDate = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

const muted = "text-foreground/70";

function TotalsList({ totals }: { totals: Totals }) {
  return (
    <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
      <div className="flex gap-2">
        <dt className={muted}>Total annual spend</dt>
        <dd className="font-medium tabular-nums">
          {money(totals.annualSpend)}
        </dd>
      </div>
      <div className="flex gap-2">
        <dt className={muted}>Total net first-year savings</dt>
        <dd className="font-medium tabular-nums">
          {money(totals.netFirstYearSavings)}
        </dd>
      </div>
    </dl>
  );
}

function Row({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="sm:contents">
      <dt className={muted}>{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function VerdictRows({ verdict }: { verdict: VendorLine["verdict"] }) {
  switch (verdict.kind) {
    case "replace_now":
    case "replace_with_caveats": {
      const { name, signsBaa } = verdict.alternative;
      return (
        <>
          <Row term="Switch to">
            {name} ({signsBaa ? "signs a BAA" : "no BAA"})
          </Row>
          {verdict.kind === "replace_with_caveats" && (
            <Row term="Trial plan">{verdict.trialPlan}</Row>
          )}
        </>
      );
    }
    case "keep":
      return <Row term="Why keep">{verdict.reason}</Row>;
    default: {
      const unhandled: never = verdict;
      return unhandled;
    }
  }
}

function ComplianceNote({ line }: { line: VendorLine }) {
  const { touchesPhi, confirmBeforeCancelling } = line.compliance;
  return (
    <>
      {touchesPhi ? "Touches patient data." : "No patient data."}
      {confirmBeforeCancelling.length > 0 &&
        ` Before cancelling: ${confirmBeforeCancelling.join("; ")}.`}
    </>
  );
}

function LineItem({ line }: { line: VendorLine }) {
  return (
    <li className="border-t border-foreground/15 py-3">
      <h3 className="flex flex-wrap items-baseline gap-x-2 font-semibold">
        {line.vendor}
        <span className={`text-sm font-normal ${muted}`}>
          {FUNCTION_LABELS[line.function]}
        </span>
      </h3>
      <dl className="mt-1 grid gap-x-4 gap-y-0.5 text-sm sm:grid-cols-[11rem_1fr]">
        <Row term="Current annual cost">
          <span className="tabular-nums">{money(annualCost(line))}</span>
        </Row>
        <VerdictRows verdict={line.verdict} />
        <Row term="Net first-year savings">
          <span className="tabular-nums">
            {money(netFirstYearSavings(line))}
          </span>
        </Row>
        <Row term="Compliance">
          <ComplianceNote line={line} />
        </Row>
      </dl>
    </li>
  );
}

export function VerdictReport({ report }: { report: StackVerdictReport }) {
  const totals = reportTotals(report);
  return (
    <article className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-8">
      <header className="border-b border-foreground/15 pb-4">
        <h1 className="text-2xl font-semibold tracking-tight">
          Stack Verdict Report
        </h1>
        <p className="text-lg">{report.practiceName}</p>
        <p className={`text-sm ${muted}`}>
          Prepared on{" "}
          <time dateTime={report.preparedOn}>
            {longDate.format(new Date(report.preparedOn))}
          </time>
        </p>
        <div className="mt-3">
          <TotalsList totals={totals.overall} />
        </div>
      </header>
      {BUCKETS.map(({ kind, title }) => {
        const lines = report.lines.filter((line) => line.verdict.kind === kind);
        if (lines.length === 0) return null;
        return (
          <section key={kind} className="mt-6">
            <h2 className="text-lg font-semibold">{title}</h2>
            <TotalsList totals={totals.byBucket[kind]} />
            <ul className="mt-2">
              {lines.map((line, index) => (
                <LineItem key={index} line={line} />
              ))}
            </ul>
          </section>
        );
      })}
    </article>
  );
}
