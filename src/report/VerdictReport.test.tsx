import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import type { VerdictKind } from "./model";
import { sampleReport } from "./sample";
import { reportTotals, type Totals } from "./savings";
import { VerdictReport } from "./VerdictReport";

const bucketTitles: Record<string, VerdictKind> = {
  "Replace now": "replace_now",
  "Replace with caveats": "replace_with_caveats",
  Keep: "keep",
};

function dollars(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const [whole, fraction] = (Math.abs(cents) / 100).toFixed(2).split(".");
  return `${sign}$${whole.replace(/\B(?=(\d{3})+$)/g, ",")}.${fraction}`;
}

function text(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

function totalsText(totals: Totals): string[] {
  return [
    `Total annual spend${dollars(totals.annualSpend)}`,
    `Total net first-year savings${dollars(totals.netFirstYearSavings)}`,
  ];
}

const markup = renderToStaticMarkup(<VerdictReport report={sampleReport} />);
const [header, ...sectionMarkup] = markup.split("<section");
const sections = new Map(
  sectionMarkup.map((html) => {
    const title = text(html.match(/<h2[^>]*>(.*?)<\/h2>/)![1]);
    return [bucketTitles[title], text(html)];
  }),
);
const expected = reportTotals(sampleReport);

test("the header shows the report's overall totals", () => {
  for (const pair of totalsText(expected.overall)) {
    expect(text(header)).toContain(pair);
  }
});

test("each bucket shows its own totals", () => {
  expect([...sections.keys()]).toEqual([
    "replace_now",
    "replace_with_caveats",
    "keep",
  ]);
  for (const [kind, section] of sections) {
    for (const pair of totalsText(expected.byBucket[kind])) {
      expect(section).toContain(pair);
    }
  }
});

test("each vendor appears only under its own bucket", () => {
  for (const line of sampleReport.lines) {
    for (const [kind, section] of sections) {
      expect(section.includes(line.vendor)).toBe(kind === line.verdict.kind);
    }
  }
});
