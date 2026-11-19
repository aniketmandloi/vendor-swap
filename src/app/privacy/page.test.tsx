import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import { contactEmail } from "../../contact";
import PrivacyPage from "./page";

test("privacy page names every field the founding-list form stores", () => {
  const html = renderToStaticMarkup(<PrivacyPage />);

  expect(html).toContain("Your practice email. Required.");
  expect(html).toContain("Your role. Required.");
  expect(html).toContain("Your practice size. Optional.");
  expect(html).toContain("Your monthly software spend. Optional.");
  expect(html).toContain("time you signed up");
  expect(html).toContain("last updated your answers");
  expect(html).toContain("never asks for patient data");
});

test("privacy page links to the contact address for deletion", () => {
  const html = renderToStaticMarkup(<PrivacyPage />);

  expect(html).toContain(`href="mailto:${contactEmail}"`);
});
