import { cents, type Cents, type VendorLine } from "./model";

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
