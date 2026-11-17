import type { Metadata } from "next";
import { sampleReport } from "@/report/sample";
import { VerdictReport } from "@/report/VerdictReport";

export const metadata: Metadata = {
  title: "Sample Stack Verdict Report | VendorSwap",
  description:
    "A sample Stack Verdict Report for a fictional solo dental practice.",
};

export default function SampleReportPage() {
  return (
    <main>
      <VerdictReport report={sampleReport} />
    </main>
  );
}
