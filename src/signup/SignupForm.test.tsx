import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { monthlySoftwareSpends, practiceSizes, roles } from "./signup";
import { SignupForm } from "./SignupForm";

test("signup form asks for a required email and role, and offers every registry option", () => {
  const html = renderToStaticMarkup(<SignupForm />);
  const tag = (name: string) => html.match(new RegExp(`<(input|select)[^>]*name="${name}"[^>]*>`))?.[0] ?? "";

  expect(tag("email")).toContain('type="email"');
  expect(tag("email")).toContain("required");
  expect(tag("role")).toContain("required");
  expect(tag("practiceSize")).not.toContain("required");
  expect(tag("monthlySoftwareSpend")).not.toContain("required");
  expect(tag("company_website")).toContain('tabindex="-1"');
  for (const { value, label } of [...roles, ...practiceSizes, ...monthlySoftwareSpends]) {
    expect(html).toContain(`<option value="${value}">${label}</option>`);
  }
});
