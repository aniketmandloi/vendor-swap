import { z } from "zod";

export const roles = [
  { value: "owner_dentist", label: "Owner dentist" },
  { value: "office_manager", label: "Office manager" },
  { value: "other", label: "Other" },
] as const;

export const practiceSizes = [
  { value: "solo", label: "Solo" },
  { value: "two_to_three_staff", label: "2 to 3 staff" },
  { value: "four_plus_staff", label: "4 or more staff" },
] as const;

export const monthlySoftwareSpends = [
  { value: "under_500", label: "Under $500" },
  { value: "500_to_1000", label: "$500 to $1,000" },
  { value: "1000_to_2000", label: "$1,000 to $2,000" },
  { value: "over_2000", label: "Over $2,000" },
  { value: "not_sure", label: "Not sure" },
] as const;

type Options = readonly { value: string; label: string }[];
type OptionValue<T extends Options> = T[number]["value"];

export type Role = OptionValue<typeof roles>;
export type PracticeSize = OptionValue<typeof practiceSizes>;
export type MonthlySoftwareSpend = OptionValue<typeof monthlySoftwareSpends>;

export type FoundingSignup = {
  email: string;
  role: Role;
  practiceSize: PracticeSize | null;
  monthlySoftwareSpend: MonthlySoftwareSpend | null;
};

export type SignupField = keyof FoundingSignup;
export type SignupValues = Record<SignupField, string>;

export type SignupState =
  | { status: "idle" }
  | { status: "invalid"; fieldErrors: Partial<Record<SignupField, string>>; values: SignupValues }
  | { status: "saved" }
  | { status: "failed"; values: SignupValues };

export type SignupStore = {
  save(signup: FoundingSignup): Promise<void>;
};

export const honeypotField = "company_website";

const fields: SignupField[] = ["email", "role", "practiceSize", "monthlySoftwareSpend"];

function choice<T extends Options>(options: T, error: string) {
  return z.enum(options.map((option) => option.value) as OptionValue<T>[], { error });
}

function optionalChoice<T extends Options>(options: T) {
  return z.union([z.literal("").transform(() => null), choice(options, "Choose one of the listed options.")]);
}

const signupSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email({ error: "Enter a valid email address." })),
  role: choice(roles, "Choose your role."),
  practiceSize: optionalChoice(practiceSizes),
  monthlySoftwareSpend: optionalChoice(monthlySoftwareSpends),
}) satisfies z.ZodType<FoundingSignup, SignupValues>;

function readValues(formData: FormData): SignupValues {
  const read = (field: SignupField) => {
    const value = formData.get(field);
    return typeof value === "string" ? value : "";
  };
  return {
    email: read("email"),
    role: read("role"),
    practiceSize: read("practiceSize"),
    monthlySoftwareSpend: read("monthlySoftwareSpend"),
  };
}

export async function handleSignup(
  store: SignupStore,
  _prevState: SignupState,
  formData: FormData,
): Promise<SignupState> {
  // Bots get the normal success message so they have no signal to retry with.
  if (formData.get(honeypotField)) return { status: "saved" };

  const values = readValues(formData);
  const parsed = signupSchema.safeParse(values);
  if (!parsed.success) {
    const errors = z.flattenError(parsed.error).fieldErrors;
    const fieldErrors: Partial<Record<SignupField, string>> = {};
    for (const field of fields) {
      const message = errors[field]?.[0];
      if (message) fieldErrors[field] = message;
    }
    return { status: "invalid", fieldErrors, values };
  }

  try {
    await store.save(parsed.data);
  } catch (error) {
    console.error("Saving a founding signup failed", error);
    return { status: "failed", values };
  }
  return { status: "saved" };
}
