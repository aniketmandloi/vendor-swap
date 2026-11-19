import Link from "next/link";
import type { Metadata } from "next";
import { contactEmail } from "../../contact";
import styles from "../landing.module.css";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What the VendorSwap founding-list form collects, why, where it is stored, and how to have it deleted.",
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <nav aria-label="Privacy navigation" className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-sm sm:px-6">
        <Link href="/" className={styles.wordmark}>
          <span className={styles.mark} aria-hidden="true">↔</span>
          VendorSwap
        </Link>
        <Link href="/" className="underline underline-offset-4">
          Back to landing page
        </Link>
      </nav>

      <main className="mx-auto w-full max-w-3xl px-4 pt-10 pb-24 sm:px-6">
        <h1 className={styles.head}>Privacy</h1>
        <p className={styles.headNote}>
          Last updated <time dateTime="2026-11-19">November 19, 2026</time>
        </p>
        <p className={`${styles.lead} mt-6`}>
          This page covers the founding-list form on this site. It says what we collect, why, where we keep it, and how to have it deleted.
        </p>

        <section className="mt-14 max-w-prose">
          <h2 className={styles.subhead}>What the form collects</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Your practice email. Required.</li>
            <li>Your role. Required.</li>
            <li>Your practice size. Optional.</li>
            <li>Your monthly software spend. Optional.</li>
            <li>The time you signed up and the time you last updated your answers.</li>
          </ul>
          <p className="mt-4">The form never asks for patient data.</p>
        </section>

        <section className="mt-12 max-w-prose space-y-4">
          <h2 className={styles.subhead}>Why we collect it</h2>
          <p>
            We use your email to contact you at launch. We&apos;ll set up your free first-pass scan of up to 10 vendors and offer you first pick of paid audit slots.
          </p>
          <p>Your role, practice size, and software spend help us shape the product.</p>
          <p>We never sell your answers or share them for marketing. We take no referral fees from vendors.</p>
        </section>

        <section className="mt-12 max-w-prose space-y-4">
          <h2 className={styles.subhead}>Where it is stored</h2>
          <p>Your answers are stored in a Postgres database hosted by Neon. This site is hosted on Vercel and sends your answers to that database.</p>
        </section>

        <section className="mt-12 max-w-prose space-y-4">
          <h2 className={styles.subhead}>Changing your answers</h2>
          <p>Sign up again with the same email. Your new answers replace the old ones.</p>
        </section>

        <section className="mt-12 max-w-prose space-y-4">
          <h2 className={styles.subhead}>Analytics</h2>
          <p>This site uses Vercel Web Analytics to count visits.</p>
        </section>

        <section className="mt-12 max-w-prose space-y-4">
          <h2 className={styles.subhead}>Deleting your signup</h2>
          <p>
            Email{" "}
            <a href={`mailto:${contactEmail}`} className="underline underline-offset-4">
              {contactEmail}
            </a>{" "}
            and we&apos;ll delete your signup. Send any question about your data to the same address.
          </p>
        </section>
      </main>
    </div>
  );
}
