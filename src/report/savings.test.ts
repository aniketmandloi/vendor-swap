import { expect, test } from "vitest";
import { cents, type Alternative, type Verdict, type VendorLine } from "./model";
import { annualCost, netFirstYearSavings, reportTotals } from "./savings";

function line(monthlyCost: number, verdict: Verdict): VendorLine {
  return {
    vendor: "Test vendor",
    function: "other",
    monthlyCost: cents(monthlyCost),
    renewalDate: null,
    verdict,
    compliance: { touchesPhi: false, confirmBeforeCancelling: [] },
  };
}

function alternative(
  monthlyCost: number,
  setupCost: number,
  trainingCost: number,
): Alternative {
  return {
    name: "Test alternative",
    monthlyCost: cents(monthlyCost),
    setupCost: cents(setupCost),
    trainingCost: cents(trainingCost),
    signsBaa: true,
  };
}

const keep: Verdict = { kind: "keep", reason: "Nothing cheaper fits" };

test("annual cost is twelve months of the current bill", () => {
  expect(annualCost(line(45_000, keep))).toBe(540_000);
});

test("replace now saves the current year minus the alternative's first year", () => {
  const verdict: Verdict = {
    kind: "replace_now",
    alternative: alternative(20_000, 50_000, 25_000),
  };
  expect(netFirstYearSavings(line(45_000, verdict))).toBe(225_000);
});

test("replace with caveats counts savings the same way", () => {
  const verdict: Verdict = {
    kind: "replace_with_caveats",
    alternative: alternative(15_000, 10_000, 0),
    trialPlan: "Run both for one month",
  };
  expect(netFirstYearSavings(line(30_000, verdict))).toBe(170_000);
});

test("keep saves nothing", () => {
  expect(netFirstYearSavings(line(45_000, keep))).toBe(0);
});

test("a swap whose setup and training outweigh the cheaper bill loses money", () => {
  const verdict: Verdict = {
    kind: "replace_now",
    alternative: alternative(9_000, 30_000, 20_000),
  };
  expect(netFirstYearSavings(line(10_000, verdict))).toBe(-38_000);
});

test("report totals sum each bucket and the whole stack", () => {
  const report = {
    practiceName: "Test Dental",
    preparedOn: "2026-11-18",
    lines: [
      line(45_000, {
        kind: "replace_now",
        alternative: alternative(20_000, 50_000, 25_000),
      }),
      line(10_000, {
        kind: "replace_now",
        alternative: alternative(9_000, 30_000, 20_000),
      }),
      line(25_000, keep),
    ],
  };
  expect(reportTotals(report)).toEqual({
    byBucket: {
      replace_now: { annualSpend: 660_000, netFirstYearSavings: 187_000 },
      replace_with_caveats: { annualSpend: 0, netFirstYearSavings: 0 },
      keep: { annualSpend: 300_000, netFirstYearSavings: 0 },
    },
    overall: { annualSpend: 960_000, netFirstYearSavings: 187_000 },
  });
});
