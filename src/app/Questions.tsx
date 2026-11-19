"use client";

import { useState } from "react";
import styles from "./landing.module.css";

const questions = [
  {
    question: "Do you need patient records?",
    answer: "No. The audit uses bills, vendor names, and workflow answers. Patient records are outside the audit.",
  },
  {
    question: "What happens to my bills?",
    answer: "Raw bills are never stored. VendorSwap keeps only the vendor lines you confirm, your workflow answers, and the report.",
  },
  {
    question: "Who picks the verdicts?",
    answer: "A rules table over a curated vendor catalog. The same bills and answers always give the same report.",
  },
  {
    question: "What if nothing should change?",
    answer: "Then the report says keep. Keep is a verdict, with the reason written next to it.",
  },
  {
    question: "Do you take referral fees?",
    answer: "No referral fees or commissions from any vendor. Revenue comes from audits, installs, and the managed plan.",
  },
  {
    question: "What do founding practices get?",
    answer: "A free first-pass scan of up to 10 vendors at launch, and first pick of paid audit slots.",
  },
];

export function Questions() {
  const [active, setActive] = useState(0);

  return (
    <>
      <ul className={styles.faqList}>
        {questions.map(({ question, answer }, index) => (
          <li key={question}>
            <button
              type="button"
              className={styles.question}
              aria-expanded={index === active}
              onClick={() => setActive(index)}
            >
              {question}
            </button>
            <p className={styles.inlineAnswer} hidden={index !== active}>{answer}</p>
          </li>
        ))}
      </ul>
      <div className={`${styles.swap} ${styles.answerPane}`}>
        {questions.map(({ question, answer }, index) => (
          <p key={question} className={styles.answer} data-active={index === active}>{answer}</p>
        ))}
      </div>
    </>
  );
}
