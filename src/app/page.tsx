import Link from "next/link";
import type { CSSProperties } from "react";
import { sampleReport } from "../report/sample";
import { VerdictReport } from "../report/VerdictReport";
import { SignupForm } from "../signup/SignupForm";
import { HowItWorks } from "./HowItWorks";
import { MotionPage } from "./MotionPage";
import { Questions } from "./Questions";
import { VerdictExplorer } from "./VerdictExplorer";
import { VerdictStack } from "./VerdictStack";
import styles from "./landing.module.css";

const comparison = [
  { name: "Lists every charge", finder: "Yes", vendor: "Only what its tool replaces", us: "Yes, from your bills" },
  { name: "Judges each vendor", finder: "No", vendor: "Against its own product", us: "Every line, including keep" },
  { name: "Names an alternative", finder: "No", vendor: "Its own product", us: "From a curated catalog" },
  { name: "Notes patient-data exposure", finder: "No", vendor: "Varies", us: "With what to confirm before cancelling" },
  { name: "Earns its money from", finder: "A subscription", vendor: "Selling its own tool", us: "The practice, at a flat fee" },
];

const plans = [
  {
    name: "Stack Verdict Audit",
    price: "$1,495",
    period: "One-time",
    rows: ["A one-page verdict on every vendor", "Not included", "Not included", "Not included"],
  },
  {
    name: "Install",
    price: "From $8,000",
    period: "One-time, audit included",
    rows: ["The audit, plus install of approved replacements", "Included", "Front-desk training", "30 days of support"],
  },
  {
    name: "Managed Stack",
    price: "$299",
    period: "Per month",
    rows: ["Refreshed verdicts and renewal tracking", "Not included", "Not included", "Quarterly mini re-audit"],
  },
];

const planRows = ["Includes", "Data migration", "Training", "Support"];

const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as CSSProperties;

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function Home() {
  return (
    <MotionPage>
      <header className={styles.top}>
        <Link href="/" className={styles.wordmark}>
          <span className={styles.mark} aria-hidden="true">↔</span>
          VendorSwap
        </Link>
        <nav aria-label="Main navigation" className={styles.nav}>
          <a className={`${styles.link} ${styles.navLink}`} href="#how-it-works">How it works</a>
          <a className={`${styles.link} ${styles.navLink}`} href="#pricing">Pricing</a>
          <a className={`${styles.link} ${styles.navLink}`} href="#questions">Questions</a>
          <Link className={styles.link} href="/sample-report">Sample report</Link>
        </nav>
      </header>

      <main>
        <section className={`${styles.grid} ${styles.hero}`} aria-labelledby="headline">
          <div className={styles.heroText}>
            <h1 id="headline" className={`${styles.display} ${styles.h1}`}>
              <span className={styles.line}><span style={{ "--i": 0 } as CSSProperties}>Know which dental software</span></span>
              <span className={styles.line}><span style={{ "--i": 1 } as CSSProperties}>you can <em className={styles.highlight}>safely cancel.</em></span></span>
            </h1>
          </div>
          <div className={styles.heroRow}>
            <p className={`${styles.lead} ${styles.heroSentence} ${styles.load}`} style={delay(0.5)}>
              A flat-fee audit gives every vendor in your solo practice a verdict. See what to replace, what to trial, and what to keep.
            </p>
            <div className={`${styles.heroActions} ${styles.load}`} style={delay(0.62)}>
              <a className={styles.button} href="#signup">Join the founding list</a>
              <a className={`${styles.link} ${styles.linkArrow}`} href="#sample">See the sample report <Arrow /></a>
            </div>
          </div>
          <div className={styles.heroApp}>
            <VerdictStack />
          </div>
        </section>

        <section className={`${styles.grid} ${styles.section} ${styles.statement}`}>
          <h2 data-reveal className={styles.head}>Every renewal is a decision.</h2>
          <p data-reveal className={styles.lead} style={delay(0.1)}>
            Software renewals can outpace practice revenue. Cutting the wrong tool can disrupt patient flow or expose patient data. It helps to know what each vendor does for your practice before you decide.
          </p>
        </section>

        <section className={`${styles.grid} ${styles.section} ${styles.outputs}`} id="verdicts" aria-labelledby="verdicts-title">
          <div data-reveal className={styles.outputsHead}>
            <h2 id="verdicts-title" className={styles.head}>Three possible verdicts.</h2>
          </div>
          <VerdictExplorer />
        </section>

        <section className={styles.section} id="how-it-works" aria-labelledby="how-title">
          <div className={styles.grid}>
            <div data-reveal className={styles.stagesHead}>
              <h2 id="how-title" className={styles.head}>From bills to a decision.</h2>
            </div>
          </div>
          <div data-reveal>
            <HowItWorks />
          </div>
        </section>

        <section className={`${styles.grid} ${styles.section}`} aria-labelledby="compare-title">
          <div data-reveal className={styles.compareHead}>
            <h2 id="compare-title" className={styles.head}>A verdict, not a sales pitch.</h2>
          </div>
          <div role="table" aria-labelledby="compare-title" className={styles.compare}>
            <div role="row" className={`${styles.compareRow} ${styles.compareHeader}`}>
              <span role="columnheader" className={styles.compareName}><span className={styles.srOnly}>Feature</span></span>
              <span role="columnheader" className={styles.compareCell}>Subscription finder</span>
              <span role="columnheader" className={styles.compareCell}>AI vendor&apos;s audit</span>
              <span role="columnheader" className={styles.compareCell}>VendorSwap</span>
            </div>
            {comparison.map(({ name, finder, vendor, us }, index) => (
              <div role="row" key={name} data-reveal style={delay(index * 0.06)} className={styles.compareRow}>
                <span role="rowheader" className={styles.compareName}>{name}</span>
                <span role="cell" data-label="Finder" className={styles.compareCell}>{finder}</span>
                <span role="cell" data-label="AI vendor" className={styles.compareCell}>{vendor}</span>
                <span role="cell" data-label="VendorSwap" className={styles.compareCell}>{us}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.sample}`} id="sample" aria-labelledby="sample-title">
          <div className={styles.grid}>
            <div data-reveal className={styles.sampleIntro}>
              <h2 id="sample-title" className={styles.head}>See the verdict in practice.</h2>
              <p className={styles.headNote}>{sampleReport.practiceName} is a fictional practice.</p>
              <Link className={`${styles.link} ${styles.linkArrow}`} href="/sample-report">Open print-friendly report <Arrow /></Link>
            </div>
          </div>
          <div data-reveal className={styles.sampleSheet}>
            <VerdictReport report={sampleReport} embedded />
          </div>
        </section>

        <section className={`${styles.grid} ${styles.section} ${styles.trust}`} aria-label="Independence and patient data">
          <div data-reveal>
            <h2 className={styles.subhead}>Paid by the practice.</h2>
            <p>VendorSwap takes <mark className={styles.marker}>no referral fees or commissions</mark> from AI vendors. Revenue comes from audits, installs, and the managed plan.</p>
          </div>
          <div data-reveal style={delay(0.1)}>
            <h2 className={styles.subhead}>Patient records stay with you.</h2>
            <p>The audit uses bills, vendor names, and workflow answers. <mark className={styles.marker}>Patient records are outside the audit.</mark></p>
          </div>
        </section>

        <section className={`${styles.grid} ${styles.section}`} id="pricing" aria-labelledby="pricing-title">
          <div data-reveal className={styles.priceHead}>
            <h2 id="pricing-title" className={styles.head}>Founding-practice pricing.</h2>
            <p className={styles.headNote}>Available at launch.</p>
          </div>

          <div role="table" aria-labelledby="pricing-title" className={styles.pricing} data-reveal>
            <div role="row" className={`${styles.priceRow} ${styles.priceHeadRow}`}>
              <span role="columnheader" className={styles.priceLabel}><span className={styles.srOnly}>Plan</span></span>
              {plans.map(({ name, price, period }) => (
                <span role="columnheader" key={name} className={styles.priceCell}>
                  <span className={styles.planName}>{name}</span>
                  <span className={styles.planPrice}>{price}</span>
                  <span className={styles.planPeriod}>{period}</span>
                </span>
              ))}
            </div>
            {planRows.map((label, row) => (
              <div role="row" key={label} className={`${styles.priceRow} ${styles.priceBody}`}>
                <span role="rowheader" className={styles.priceLabel}>{label}</span>
                {plans.map(({ name, rows }) => (
                  <span role="cell" key={name} className={styles.priceCell}>{rows[row]}</span>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.plans}>
            {plans.map(({ name, price, period, rows }, index) => (
              <article key={name} data-reveal className={styles.plan} data-featured={index === 0}>
                <h3 className={styles.planName}>{name}</h3>
                <p className={styles.planPrice}>{price}</p>
                <p className={styles.planPeriod}>{period}</p>
                <dl className={styles.planRows}>
                  {planRows.map((label, row) => (
                    <div key={label}><dt>{label}</dt><dd>{rows[row]}</dd></div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.grid} ${styles.section} ${styles.faq}`} id="questions" aria-labelledby="questions-title">
          <div data-reveal className={styles.faqHead}>
            <h2 id="questions-title" className={styles.head}>Before you sign up.</h2>
          </div>
          <Questions />
        </section>

        <section className={`${styles.grid} ${styles.cta}`} id="signup" aria-labelledby="signup-title">
          <div className={styles.ctaText}>
            <h2 id="signup-title" data-reveal className={styles.ctaLine}>Become a founding practice.</h2>
            <p data-reveal style={delay(0.1)}>Get a free first-pass scan of up to 10 vendors at launch and first pick of paid audit slots.</p>
          </div>
          <div data-reveal style={delay(0.18)} className={styles.ctaDialog}>
            <SignupForm />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.tile} ${styles.tileStatement}`}>
          <p>A neutral verdict on every vendor in your practice&apos;s software stack.</p>
          <p className={styles.legal}>No referral fees. No patient records.</p>
        </div>
        <nav aria-label="Footer" className={`${styles.tile} ${styles.tileNav}`}>
          <p className={styles.tileLabel}>Pages</p>
          <ul>
            <li><a className={styles.link} href="#how-it-works">How it works</a></li>
            <li><a className={styles.link} href="#verdicts">Verdicts</a></li>
            <li><a className={styles.link} href="#pricing">Pricing</a></li>
            <li><a className={styles.link} href="#questions">Questions</a></li>
            <li><Link className={styles.link} href="/privacy">Privacy</Link></li>
          </ul>
        </nav>
        <Link href="/" className={styles.tileWord}><span>VendorSwap</span></Link>
        <Link href="/sample-report" className={styles.tileGo}>
          <span>Open the sample report</span>
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <path d="M16 48 48 16M22 16h26v26" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
        </Link>
      </footer>
    </MotionPage>
  );
}
