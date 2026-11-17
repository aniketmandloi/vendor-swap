import { expect, test } from "vitest";
import type { PracticeFunction, VerdictKind } from "./model";
import { sampleReport } from "./sample";

const practiceFunctions: Record<PracticeFunction, true> = {
  practice_management: true,
  patient_texting: true,
  insurance_verification: true,
  recall_reminders: true,
  answering_service: true,
  marketing: true,
  other: true,
};

const verdictKinds: Record<VerdictKind, true> = {
  replace_now: true,
  replace_with_caveats: true,
  keep: true,
};

const { lines } = sampleReport;

test("the sample has 7 to 9 lines", () => {
  expect(lines.length).toBeGreaterThanOrEqual(7);
  expect(lines.length).toBeLessThanOrEqual(9);
});

test("the sample covers every practice function", () => {
  expect(new Set(lines.map((line) => line.function))).toEqual(
    new Set(Object.keys(practiceFunctions)),
  );
});

test("the sample covers every verdict bucket", () => {
  expect(new Set(lines.map((line) => line.verdict.kind))).toEqual(
    new Set(Object.keys(verdictKinds)),
  );
});
