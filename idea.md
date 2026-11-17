# VendorSwap — Product Idea

## The problem

Solo dental practices (one dentist, 1–3 staff) pay $500–$1,700 a month for a software stack that grew one subscription at a time: practice management, patient texting, insurance verification, recall and reminders, an answering service, marketing tools. Renewals have climbed 15–30% a year since 2023 while practice revenue grows 4–7%.

Owners know AI can replace parts of this stack (AI voice now runs about $0.08–$0.14 a minute), but they don't know which vendor is safe to drop. One wrong cut can break patient flow or touch HIPAA, so they don't switch.

## The product

A flat-fee vendor audit. The owner uploads a vendor list or bills (paste or PDF), answers a few workflow questions, and gets a one-page **Stack Verdict Report**.

Every vendor is sorted into one of three buckets:

- **Replace now**: low risk, with a named AI alternative.
- **Replace with caveats**: a viable swap that needs a trial or overlap period first.
- **Keep**: an honest verdict when switching isn't worth the risk.

Each line also shows net first-year savings after setup and training, and a compliance note (HIPAA exposure and what to confirm before cancelling).

## Why it's different

- Subscription finders list charges but don't judge them.
- AI vendors judge the stack but sell their own tool.
- VendorSwap gives a neutral, practice-specific verdict on every line, including "keep."

## Who it's for

Solo dentists and 1–3 person practice owners who are tired of rising renewals, suspect half the stack could go, and won't risk patient flow or HIPAA to find out by trial and error. Dental first; solo law later.

## How it makes money

- **$1,495** one-time Stack Verdict Audit (the paid front door).
- **From $8,000** audit plus done-for-you install of the approved replacements, with data migration, front-desk training, and 30 days of support.
- **$299/month** Managed Stack: health checks, renewal calendar with price-hike alerts, refreshed verdicts, and a quarterly mini re-audit.

No referral fees or commissions from AI vendors. Revenue comes only from the audit, the install, and the managed plan.

## Go-to-market

Nobody searches for "SaaS audit." They search for the replacement (about 74K monthly searches for "AI receptionist"), so the landing page sells the verdict, not the category.

The first step is a validation landing page that collects emails for a founding-practice list. The offer is a free first-pass scan of up to 10 vendors at launch, plus first pick of paid audit slots. The page includes a sample verdict report for a fictional practice, so visitors can see the format before signing up.

## MVP (after the page validates)

1. **Stack Verdict Report**: upload or paste bills, extract vendors and costs, map each to a practice function, and output the three-bucket verdict with alternative, net savings, and compliance note.
2. **Bill ingestion**: extract vendor names, monthly costs, and renewal dates from pasted text or PDFs.
3. **Savings math**: annualized cost, setup and training cost, and net first-year savings per line.
4. **Printable one-page report**: clean and shareable.
5. **Renewal calendar**: upcoming renewals with flags.

Out of scope for the MVP: human consultant review, done-for-you install management, monitoring dashboard, QuickBooks or Stripe integrations, live vendor price lookups, multi-practice workspaces, email alerts, payment processing, and the solo-attorney vertical.

## Key risks and how the product handles them

- **Wrong cut breaks patient flow or HIPAA.** Replace-now items are low-risk by definition. Anything uncertain gets a trial plan first, such as running 20 claims before cancelling verification. Every line has a compliance note.
- **Trust in AI hype.** The audience is skeptical, so the product and its marketing read as a professional advisory service, not a tech pitch. The audit scope is to be reviewed by a healthcare attorney.
- **Patient data exposure.** The audit uses bills, vendor names, and workflow answers only. It never touches patient records.
