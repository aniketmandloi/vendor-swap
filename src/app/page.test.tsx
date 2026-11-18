import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import Home from "./page";

test("home page shows the audit pitch and links to the embedded sample report", () => {
  const html = renderToStaticMarkup(<Home />);

  expect(html).toContain("Know which dental software you can");
  expect(html).toContain('href="#sample"');
  expect(html).toContain('id="sample"');
  expect(html).toContain("Cedar Hollow Family Dentistry");
});
