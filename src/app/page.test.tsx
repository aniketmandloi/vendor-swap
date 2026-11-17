import { renderToStaticMarkup } from "react-dom/server";
import { expect, test } from "vitest";
import Home from "./page";

test("home page renders the VendorSwap headline", () => {
  expect(renderToStaticMarkup(<Home />)).toMatch(
    /<h1[^>]*>VendorSwap<\/h1>/,
  );
});
