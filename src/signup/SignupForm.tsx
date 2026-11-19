"use client";

import Link from "next/link";
import { useActionState } from "react";
import styles from "../app/landing.module.css";
import { submitSignup } from "./actions";
import {
  honeypotField,
  monthlySoftwareSpends,
  practiceSizes,
  roles,
  type SignupField,
  type SignupState,
} from "./signup";

const idle: SignupState = { status: "idle" };

function errorProps(name: SignupField, error: string | undefined) {
  return error ? { "aria-invalid": true, "aria-describedby": `signup-${name}-error` } : {};
}

function FieldError({ name, error }: { name: SignupField; error: string | undefined }) {
  return error ? <p id={`signup-${name}-error`} className={styles.fieldError}>{error}</p> : null;
}

type SelectFieldProps = {
  name: SignupField;
  label: string;
  options: readonly { value: string; label: string }[];
  empty: string;
  required?: boolean;
  defaultValue: string | undefined;
  error: string | undefined;
};

function SelectField({ name, label, options, empty, required, defaultValue, error }: SelectFieldProps) {
  return (
    <div className={styles.signupField}>
      <label htmlFor={`signup-${name}`}>{label}</label>
      <select id={`signup-${name}`} name={name} required={required} defaultValue={defaultValue ?? ""} {...errorProps(name, error)}>
        <option value="">{empty}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      <FieldError name={name} error={error} />
    </div>
  );
}

export function SignupForm() {
  const [state, formAction, pending] = useActionState(submitSignup, idle);

  if (state.status === "saved") {
    return (
      <div role="status" className={styles.signupDone}>
        <h3>You&apos;re on the founding list.</h3>
        <p>At launch, we&apos;ll contact you at this email to set up your free first-pass scan of up to 10 vendors. You&apos;ll also get first pick of paid audit slots.</p>
        <p>To change your answers, sign up again with the same email.</p>
      </div>
    );
  }

  const values = state.status === "invalid" || state.status === "failed" ? state.values : undefined;
  const errors = state.status === "invalid" ? state.fieldErrors : {};

  return (
    // React resets the form after a submit, and a reset select falls back to its first-mounted default,
    // so remount with the submitted answers.
    <form key={JSON.stringify(values ?? null)} action={formAction} className={styles.signupForm}>
      <div className={styles.signupField}>
        <label htmlFor="signup-email">Practice email</label>
        <input
          id="signup-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={values?.email}
          {...errorProps("email", errors.email)}
        />
        <FieldError name="email" error={errors.email} />
      </div>
      <SelectField name="role" label="Your role" options={roles} empty="Choose one" required defaultValue={values?.role} error={errors.role} />
      <SelectField
        name="practiceSize"
        label="Practice size (optional)"
        options={practiceSizes}
        empty="Prefer not to say"
        defaultValue={values?.practiceSize}
        error={errors.practiceSize}
      />
      <SelectField
        name="monthlySoftwareSpend"
        label="Monthly software spend (optional)"
        options={monthlySoftwareSpends}
        empty="Prefer not to say"
        defaultValue={values?.monthlySoftwareSpend}
        error={errors.monthlySoftwareSpend}
      />
      <div className={styles.srOnly} aria-hidden="true">
        <label htmlFor="signup-company-website">Company website</label>
        <input id="signup-company-website" name={honeypotField} tabIndex={-1} autoComplete="off" />
      </div>
      <button type="submit" className={styles.button} disabled={pending}>
        {pending ? "Joining…" : "Join the list"}
      </button>
      <p>
        We use your email only to contact you about the founding list.{" "}
        <Link href="/privacy" className="underline underline-offset-2">Privacy policy</Link>.
      </p>
      {state.status === "failed" && (
        <p role="alert" className={styles.fieldError}>We couldn&apos;t save your signup. Please try again.</p>
      )}
    </form>
  );
}
