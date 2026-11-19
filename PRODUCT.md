# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Owners of solo dental practices: one dentist with 1 to 3 staff. Their software stack grew one subscription at a time and now costs $500 to $1,700 a month. Renewals rise faster than revenue. They suspect half the stack could go, but they will not risk patient flow or HIPAA to find out by trial and error. The owner is the buyer and the person who decides.

Open question: who runs the audit day to day. The owner may upload the bills and answer the workflow questions, or an office manager or front desk may gather them for the owner to decide on. Settle this during validation. Do not assume either answer.

Dental comes first. Solo law practices may come later and are out of scope now.

## Product Purpose

VendorSwap is a flat-fee vendor audit. The owner pastes or uploads a vendor list or bills and answers a few workflow questions. VendorSwap returns a one-page Stack Verdict Report. The report puts every vendor in one of three verdicts:

- **Replace now**: low risk, with a named AI alternative.
- **Replace with caveats**: a viable swap that needs a trial or an overlap period first.
- **Keep**: switching isn't worth the risk, and the report says why.

Each line shows net first-year savings after setup and training. It also carries a compliance note: the HIPAA exposure and what to confirm before cancelling.

Success right now is the validation gate in GitHub issue #1. That is 50 founding-practice signups within 30 days of the first traffic push, or a 5% visitor-to-signup rate on at least 500 visitors. The MVP (M1) starts only after the gate passes.

## Positioning

- Subscription finders list charges but don't judge them.
- AI vendors judge the stack but sell their own tool.
- VendorSwap gives a neutral verdict on every line for this practice, including "keep". It takes no referral fees or commissions from vendors. Its only revenue is the audit, the install, and the managed plan. No competitor that sells a tool or takes referral money can make that claim.

## Operating Context

- People search for the replacement, not the category. "AI receptionist" gets about 74K searches a month. The landing page therefore sells the verdict, not "SaaS audit".
- The current surface is the M0 validation landing page. It collects founding-practice emails and embeds a sample report for a fictional practice, Cedar Hollow Family Dentistry. The same sample also ships as a print-friendly page at `/sample-report`. There is a privacy page at `/privacy`.
- The founding offer is a free first-pass scan of up to 10 vendors at launch, plus first pick of paid audit slots.
- The report is a printable, shareable one-pager. Owners may print it, forward it, or read it on a phone.
- The audience is skeptical of AI hype. They evaluate VendorSwap the way they would evaluate a professional advisor.

## Capabilities and Constraints

- **One report model.** The landing-page sample and the real MVP report render from one typed model (`src/report/model.ts`) and one component (`src/report/VerdictReport.tsx`). Never fork it.
- **Deterministic verdicts.** A rules table over a curated vendor catalog picks every verdict. An LLM may only read bills and suggest a practice function for an unknown vendor. The same inputs always give the same report.
- **No patient data.** Raw bills are never stored. VendorSwap keeps only the confirmed vendor lines, the workflow answers, and the report. The audit never touches patient records.
- **Pricing:** a $1,495 one-time Stack Verdict Audit, an install from $8,000 (audit included, with data migration, front-desk training, and 30 days of support), and a $299/month Managed Stack (refreshed verdicts, renewal tracking, and a quarterly mini re-audit).
- **Planned MVP:** bill ingestion from pasted text or PDF, mapping each vendor to a practice function, the three-verdict report with savings math, the printable report, and a renewal calendar.
- **Out of scope (binding):** human consultant review, done-for-you install management, a monitoring dashboard, QuickBooks or Stripe integrations, live vendor price lookups, multi-practice workspaces, email alerts, payment processing, and the solo-attorney vertical.
- **Terminology:** "Stack Verdict Report", "verdict", and the three verdict names exactly as written above. Use "founding practice" and "founding list" for signups.

## Brand Commitments

- Name: VendorSwap.
- Voice: a professional advisory service, not a tech pitch. Be plain, specific, and calm. Never hype AI. "Keep" is a legitimate, respected outcome.
- The neutrality claims (no referral fees, no commissions, no patient records) are load-bearing. Every surface must state them accurately.

## Evidence on Hand

- A sample report for a fictional practice in `src/report/sample.ts`, with fictional vendors. Always label it as fictional.
- The market figures in `idea.md`: stack cost, renewal increases, AI voice pricing, and search volume. Cite them only as written.
- `public/images/practice.jpg` is used on the landing page. Its license and source are **unconfirmed**. Confirm them before relying on it at launch.
- **Absent, so never fabricate:** customers, testimonials, practice quotes or pilots, case studies, savings results from real audits, press, and partner logos. The healthcare-attorney review of the audit scope has **not** happened yet. Don't claim legal review.

## Product Principles

1. **Neutral verdicts, every line.** The verdict serves the practice and never a vendor. Recommending "keep" is as valuable as recommending "replace".
2. **Safety before savings.** No recommendation may risk patient flow or HIPAA. Anything uncertain gets a trial plan, and every line gets a compliance note.
3. **Show the format, then ask.** Visitors see exactly what they'll get, through the sample report, before VendorSwap asks for anything.
4. **Deterministic and explainable.** Each verdict traces to a rule and a written reason. The same inputs always give the same report.
5. **Advisor, not vendor.** Every surface reads as a trusted professional service with clear limits.

## Accessibility & Inclusion

No formal standard is committed. Follow good practice. Surfaces must work on desktop and phone, and the report must stay legible when printed.
