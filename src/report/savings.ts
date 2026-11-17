import {
  cents,
  type Cents,
  type StackVerdictReport,
  type VendorLine,
  type VerdictKind,
} from "./model";

export function annualCost(line: VendorLine): Cents {
  return cents(line.monthlyCost * 12);
}

export function netFirstYearSavings(line: VendorLine): Cents {
  const { verdict } = line;
  switch (verdict.kind) {
    case "replace_now":
    case "replace_with_caveats": {
      const { monthlyCost, setupCost, trainingCost } = verdict.alternative;
      return cents(
        annualCost(line) - (monthlyCost * 12 + setupCost + trainingCost),
      );
    }
    case "keep":
      return cents(0);
    default: {
      const unhandled: never = verdict;
      return unhandled;
    }
  }
}

export type Totals = { annualSpend: Cents; netFirstYearSavings: Cents };

function addLine(totals: Totals, line: VendorLine): Totals {
  return {
    annualSpend: cents(totals.annualSpend + annualCost(line)),
    netFirstYearSavings: cents(
      totals.netFirstYearSavings + netFirstYearSavings(line),
    ),
  };
}

export function reportTotals(report: StackVerdictReport): {
  byBucket: Record<VerdictKind, Totals>;
  overall: Totals;
} {
  const zero = (): Totals => ({
    annualSpend: cents(0),
    netFirstYearSavings: cents(0),
  });
  const byBucket: Record<VerdictKind, Totals> = {
    replace_now: zero(),
    replace_with_caveats: zero(),
    keep: zero(),
  };
  let overall = zero();
  for (const line of report.lines) {
    byBucket[line.verdict.kind] = addLine(byBucket[line.verdict.kind], line);
    overall = addLine(overall, line);
  }
  return { byBucket, overall };
}
