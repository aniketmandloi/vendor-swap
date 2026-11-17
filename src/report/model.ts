export type Cents = number & { readonly __brand: "Cents" };

export type PracticeFunction =
  | "practice_management"
  | "patient_texting"
  | "insurance_verification"
  | "recall_reminders"
  | "answering_service"
  | "marketing"
  | "other";

export type Alternative = {
  name: string;
  monthlyCost: Cents;
  setupCost: Cents;
  trainingCost: Cents;
  signsBaa: boolean;
};

export type Verdict =
  | { kind: "replace_now"; alternative: Alternative }
  | { kind: "replace_with_caveats"; alternative: Alternative; trialPlan: string }
  | { kind: "keep"; reason: string };

export type VerdictKind = Verdict["kind"];

export type ComplianceNote = {
  touchesPhi: boolean;
  confirmBeforeCancelling: string[];
};

export type VendorLine = {
  vendor: string;
  function: PracticeFunction;
  monthlyCost: Cents;
  renewalDate: string | null;
  verdict: Verdict;
  compliance: ComplianceNote;
};

export type StackVerdictReport = {
  practiceName: string;
  preparedOn: string;
  lines: VendorLine[];
};

export function cents(value: number): Cents {
  if (!Number.isSafeInteger(value)) {
    throw new RangeError(`Cents must be a safe integer, got ${value}`);
  }
  return value as Cents;
}
