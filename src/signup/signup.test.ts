import { readFileSync } from "node:fs";
import { expect, test, vi } from "vitest";
import {
  handleSignup,
  honeypotField,
  monthlySoftwareSpends,
  practiceSizes,
  roles,
  type FoundingSignup,
  type SignupState,
  type SignupStore,
} from "./signup";

function memoryStore() {
  const rows = new Map<string, FoundingSignup>();
  const store: SignupStore = {
    async save(signup) {
      rows.set(signup.email, signup);
    },
  };
  return { rows, store };
}

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [name, value] of Object.entries(fields)) data.set(name, value);
  return data;
}

const idle: SignupState = { status: "idle" };

test("a valid submit saves the signup with a trimmed, lowercased email", async () => {
  const { rows, store } = memoryStore();

  const state = await handleSignup(store, idle, form({
    email: "  Dr@Example.COM ",
    role: "owner_dentist",
    practiceSize: "solo",
    monthlySoftwareSpend: "",
  }));

  expect(state).toEqual({ status: "saved" });
  expect([...rows.values()]).toEqual([
    { email: "dr@example.com", role: "owner_dentist", practiceSize: "solo", monthlySoftwareSpend: null },
  ]);
});

test("an invalid email returns a field error, keeps the answers, and saves nothing", async () => {
  const { rows, store } = memoryStore();
  const values = { email: "not-an-email", role: "office_manager", practiceSize: "", monthlySoftwareSpend: "not_sure" };

  const state = await handleSignup(store, idle, form(values));

  expect(state).toEqual({
    status: "invalid",
    fieldErrors: { email: "Enter a valid email address." },
    values,
  });
  expect(rows.size).toBe(0);
});

test("a missing role returns a field error and saves nothing", async () => {
  const { rows, store } = memoryStore();

  const state = await handleSignup(store, idle, form({ email: "dr@example.com" }));

  expect(state.status).toBe("invalid");
  expect(state.status === "invalid" && state.fieldErrors.role).toBe("Choose your role.");
  expect(rows.size).toBe(0);
});

test("a repeat submit from the same email updates the answers and succeeds the same way", async () => {
  const { rows, store } = memoryStore();

  const first = await handleSignup(store, idle, form({
    email: "dr@example.com",
    role: "owner_dentist",
    practiceSize: "solo",
    monthlySoftwareSpend: "under_500",
  }));
  const second = await handleSignup(store, first, form({
    email: "DR@example.com",
    role: "office_manager",
    practiceSize: "four_plus_staff",
    monthlySoftwareSpend: "",
  }));

  expect(second).toEqual(first);
  expect([...rows.values()]).toEqual([
    { email: "dr@example.com", role: "office_manager", practiceSize: "four_plus_staff", monthlySoftwareSpend: null },
  ]);
});

test("a filled honeypot shows the normal success and saves nothing", async () => {
  const { rows, store } = memoryStore();

  const state = await handleSignup(store, idle, form({
    email: "bot@example.com",
    role: "other",
    [honeypotField]: "https://spam.example",
  }));

  expect(state).toEqual({ status: "saved" });
  expect(rows.size).toBe(0);
});

test("a store failure returns failed with the answers kept for a retry", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const store: SignupStore = {
    async save() {
      throw new Error("connection refused");
    },
  };
  const values = { email: "dr@example.com", role: "owner_dentist", practiceSize: "", monthlySoftwareSpend: "" };

  const state = await handleSignup(store, idle, form(values));

  expect(state).toEqual({ status: "failed", values });
});

test("the option registries match the check constraints in db/schema.sql", () => {
  const schema = readFileSync(new URL("../../db/schema.sql", import.meta.url), "utf8");
  const allowed = (column: string) => {
    const list = schema.match(new RegExp(`check \\(${column} in \\(([^)]*)\\)`))?.[1] ?? "";
    return [...list.matchAll(/'([^']+)'/g)].map((match) => match[1]);
  };
  const values = (options: readonly { value: string }[]) => options.map((option) => option.value);

  expect(values(roles)).toEqual(allowed("role"));
  expect(values(practiceSizes)).toEqual(allowed("practice_size"));
  expect(values(monthlySoftwareSpends)).toEqual(allowed("monthly_software_spend"));
});
