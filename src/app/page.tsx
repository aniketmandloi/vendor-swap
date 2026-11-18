import Link from "next/link";
import { sampleReport } from "../report/sample";
import { VerdictReport } from "../report/VerdictReport";
import { VerdictStack } from "./VerdictStack";
import styles from "./landing.module.css";

const verdicts = [
  { name: "Replace now", detail: "A low-risk switch with a named alternative." },
  { name: "Replace with caveats", detail: "Run a trial or overlap before cancelling." },
  { name: "Keep", detail: "Stay with the current vendor when switching costs or risks outweigh the savings." },
];

const steps = [
  { name: "Share your bills", detail: "Paste your vendor list or upload your software bills." },
  { name: "Map your workflow", detail: "Answer a few questions about what your practice depends on." },
  { name: "Get a verdict", detail: "Review a one-page report with savings after setup and training, plus what to confirm before cancelling." },
];

const prices = [
  { name: "Stack Verdict Audit", price: "$1,495", detail: "One-time audit" },
  { name: "Install", price: "From $8,000", detail: "Migration, training, and 30 days of support" },
  { name: "Managed Stack", price: "$299 / month", detail: "Renewal tracking and refreshed verdicts" },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand}>
          <span className={styles.mark} aria-hidden="true">↔</span>
          VendorSwap
        </Link>
        <nav aria-label="Main navigation">
          <a href="#how-it-works">How it works</a>
          <Link href="/sample-report">Sample report</Link>
        </nav>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="headline">
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>For solo dental practices</p>
            <h1 id="headline">Know which dental software you can <em>safely cancel.</em></h1>
            <p>A flat-fee audit gives every vendor in your practice a verdict. See what to replace, what to trial, and what to keep.</p>
            <a className={styles.button} href="#sample">See the sample report <span aria-hidden="true">↘</span></a>
          </div>
          <VerdictStack />
        </section>

        <section className={styles.problem}>
          <h2>Every renewal is a decision.</h2>
          <p>Software renewals can outpace practice revenue. Cutting the wrong tool can disrupt patient flow or expose patient data. It helps to know what each vendor does for your practice before you decide.</p>
        </section>

        <section className={styles.workflow} id="how-it-works">
          <h2>From bills to a decision.</h2>
          <ol className={styles.steps}>
            {steps.map(({ name, detail }) => (
              <li key={name}><h3>{name}</h3><p>{detail}</p></li>
            ))}
          </ol>
        </section>

        <section className={styles.verdicts} aria-labelledby="verdicts">
          <h2 id="verdicts">Three possible verdicts.</h2>
          <ul>
            {verdicts.map(({ name, detail }) => (
              <li key={name}><h3>{name}</h3><p>{detail}</p></li>
            ))}
          </ul>
        </section>

        <section className={styles.sample} id="sample">
          <div className={styles.sampleIntro}>
            <div>
              <p className={styles.kicker}>Fictional practice · Sample report</p>
              <h2>See the verdict in practice.</h2>
            </div>
            <Link href="/sample-report">Open print-friendly report <span aria-hidden="true">↗</span></Link>
          </div>
          <VerdictReport report={sampleReport} embedded />
        </section>

        <section className={styles.trust} aria-label="Independence and patient data">
          <div>
            <h2>Paid by the practice.</h2>
            <p>VendorSwap takes no referral fees or commissions from AI vendors. Revenue comes from audits, installs, and the managed plan.</p>
          </div>
          <div>
            <h2>Patient records stay with you.</h2>
            <p>The audit uses bills, vendor names, and workflow answers. Patient records are outside the audit.</p>
          </div>
        </section>

        <section className={styles.pricing}>
          <h2>Founding-practice pricing</h2>
          <p>Available at launch.</p>
          <ul>
            {prices.map(({ name, price, detail }) => (
              <li key={name}><h3>{name}</h3><strong>{price}</strong><p>{detail}</p></li>
            ))}
          </ul>
        </section>

        <section className={styles.signup}>
          <div>
            <h2>Become a founding practice.</h2>
            <p>Get a free first-pass scan of up to 10 vendors at launch and first pick of paid audit slots.</p>
          </div>
          <form aria-describedby="signup-status">
            <label htmlFor="practice-email">Practice email</label>
            <div className={styles.signupFields}>
              <input id="practice-email" type="email" autoComplete="email" disabled />
              <button type="submit" disabled>Join the list</button>
            </div>
            <p id="signup-status">Signups aren’t open yet.</p>
          </form>
        </section>
      </main>
      <footer className={styles.footer}><Link href="/">VendorSwap</Link></footer>
    </div>
  );
}
