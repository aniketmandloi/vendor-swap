import { expect, test } from "vitest";
import { cents } from "./model";

test("cents keeps whole amounts, including negative ones", () => {
  expect(cents(12_345)).toBe(12_345);
  expect(cents(-500)).toBe(-500);
  expect(cents(0)).toBe(0);
});

test("cents rejects amounts that are not safe integers", () => {
  expect(() => cents(19.99)).toThrow(RangeError);
  expect(() => cents(Number.NaN)).toThrow(RangeError);
  expect(() => cents(Number.MAX_SAFE_INTEGER + 1)).toThrow(RangeError);
});
