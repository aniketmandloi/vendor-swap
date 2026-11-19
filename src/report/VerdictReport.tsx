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

export const BUCKETS: readonly { kind: VerdictKind; title: string; color: string }[] = [
  { kind: "replace_now", title: "Replace now", color: "bg-[#dcebbd]" },
  { kind: "replace_with_caveats", title: "Replace with caveats", color: "bg-[#f6e6b3]" },
  { kind: "keep", title: "Keep", color: "bg-[#dde8e8]" },
];

export const VERDICT_TITLES = Object.fromEntries(
  BUCKETS.map(({ kind, title }) => [kind, title]),
) as Record<VerdictKind, string>;

export const FUNCTION_LABELS: Record<PracticeFunction, string> = {
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

export function money(amount: Cents): string {
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

export function ComplianceNote({ line }: { line: VendorLine }) {
  const { touchesPhi, confirmBeforeCancelling } = line.compliance;
  return (
    <>
      {touchesPhi ? "Touches patient data." : "No patient data."}
      {confirmBeforeCancelling.length > 0 &&
        ` Before cancelling: ${confirmBeforeCancelling.join("; ")}.`}
    </>
  );
}

function LineItem({ line, embedded }: { line: VendorLine; embedded: boolean }) {
  const VendorTitle = embedded ? "h5" : "h3";
  return (
    <li className="break-inside-avoid border-t border-foreground/15 py-3 print:py-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <VendorTitle className="flex flex-wrap items-baseline gap-x-2 font-semibold">
          {line.vendor}
          <span className={`text-sm font-normal ${muted}`}>
            {FUNCTION_LABELS[line.function]}
          </span>
        </VendorTitle>
        <dl className="flex flex-wrap gap-x-4 text-sm">
          <div className="flex gap-2">
            <dt className={muted}>Current annual cost</dt>
            <dd className="tabular-nums">{money(annualCost(line))}</dd>
          </div>
          <div className="flex gap-2">
            <dt className={muted}>Net first-year savings</dt>
            <dd className="font-medium tabular-nums">
              {money(netFirstYearSavings(line))}
            </dd>
          </div>
        </dl>
      </div>
      <dl className="mt-1 grid gap-x-4 gap-y-0.5 text-sm sm:grid-cols-[7rem_1fr]">
        <VerdictRows verdict={line.verdict} />
        <Row term="Compliance">
          <ComplianceNote line={line} />
        </Row>
      </dl>
    </li>
  );
}

export function VerdictReport({
  report,
  embedded = false,
}: {
  report: StackVerdictReport;
  embedded?: boolean;
}) {
  const Title = embedded ? "h3" : "h1";
  const BucketTitle = embedded ? "h4" : "h2";
  const totals = reportTotals(report);
  return (
    <article className="mx-auto w-full max-w-5xl rounded-sm border border-[var(--rule)] bg-[var(--paper)] px-5 py-7 sm:px-10 sm:py-10 print:max-w-none print:rounded-none print:border-0 print:bg-white print:p-0">
      <header className="border-b border-foreground/15 pb-4 print:pb-2">
        <Title className="text-3xl font-medium tracking-[-0.04em] text-[var(--forest)] sm:text-5xl print:text-2xl print:font-semibold print:tracking-tight">
          Stack Verdict Report
        </Title>
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
      {BUCKETS.map(({ kind, title, color }) => {
        const lines = report.lines.filter((line) => line.verdict.kind === kind);
        if (lines.length === 0) return null;
        return (
          <section key={kind} className="mt-6 print:mt-3">
            <BucketTitle className={`mb-2 inline-block rounded-full px-3 py-1 text-sm font-semibold print:mb-0 print:bg-transparent print:p-0 print:text-lg ${color}`}>{title}</BucketTitle>
            <TotalsList totals={totals.byBucket[kind]} />
            <ul className="mt-2">
              {lines.map((line, index) => (
                <LineItem key={index} line={line} embedded={embedded} />
              ))}
            </ul>
          </section>
        );
      })}
    </article>
  );
}
