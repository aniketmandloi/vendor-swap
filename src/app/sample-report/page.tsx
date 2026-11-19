import Link from "next/link";
import type { Metadata } from "next";
import { sampleReport } from "@/report/sample";
import { VerdictReport } from "@/report/VerdictReport";

export const metadata: Metadata = {
  title: "Sample Stack Verdict Report",
  description:
    "A sample Stack Verdict Report for a fictional solo dental practice.",
};

export default function SampleReportPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-12 sm:px-6 print:max-w-none print:p-0">
      <nav aria-label="Report navigation" className="flex flex-wrap items-center justify-between gap-3 py-6 text-sm print:hidden">
        <Link href="/" className="text-base font-bold tracking-tight underline-offset-4 hover:underline">
          VendorSwap
        </Link>
        <Link href="/" className="underline underline-offset-4">
          Back to landing page
        </Link>
      </nav>
      <VerdictReport report={sampleReport} />
    </main>
  );
}
