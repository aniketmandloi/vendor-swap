import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import Home from "./page";

test("home page shows the audit pitch and links to the embedded sample report", () => {
  const html = renderToStaticMarkup(<Home />);

  expect(html).toContain("Know which dental software");
  expect(html).toContain("safely cancel.");
  expect(html).toContain('href="#sample"');
  expect(html).toContain('id="sample"');
  expect(html).toContain("Cedar Hollow Family Dentistry");
});

test("home page signup section takes founding-practice signups", () => {
  const html = renderToStaticMarkup(<Home />);
  const signup = html.slice(html.indexOf('id="signup"'));

  expect(signup).toContain('name="email"');
  expect(signup).toContain('name="role"');
  expect(signup).not.toContain("disabled");
});
