import { cents, type StackVerdictReport } from "./model";

export const sampleReport: StackVerdictReport = {
  practiceName: "Cedar Hollow Family Dentistry",
  preparedOn: "2026-11-02",
  lines: [
    {
      vendor: "Chairtext Plus",
      function: "patient_texting",
      monthlyCost: cents(18_900),
      renewalDate: "2027-01-15",
      verdict: {
        kind: "replace_now",
        alternative: {
          name: "Smilenote Messaging",
          monthlyCost: cents(6_900),
          setupCost: cents(15_000),
          trainingCost: cents(0),
          signsBaa: true,
        },
      },
      compliance: {
        touchesPhi: true,
        confirmBeforeCancelling: [
          "Export the message history",
          "Sign the new vendor's BAA",
        ],
      },
    },
    {
      vendor: "EligiQuik Verify",
      function: "insurance_verification",
      monthlyCost: cents(14_900),
      renewalDate: "2027-03-01",
      verdict: {
        kind: "replace_now",
        alternative: {
          name: "Coverwise Lite",
          monthlyCost: cents(4_900),
          setupCost: cents(10_000),
          trainingCost: cents(15_000),
          signsBaa: true,
        },
      },
      compliance: {
        touchesPhi: true,
        confirmBeforeCancelling: ["Download saved eligibility reports"],
      },
    },
    {
      vendor: "Pearlbright Growth Agency",
      function: "marketing",
      monthlyCost: cents(39_900),
      renewalDate: null,
      verdict: {
        kind: "replace_now",
        alternative: {
          name: "Hearthpage Listings",
          monthlyCost: cents(9_900),
          setupCost: cents(30_000),
          trainingCost: cents(0),
          signsBaa: false,
        },
      },
      compliance: {
        touchesPhi: false,
        confirmBeforeCancelling: [
          "Move ownership of your online listings to the practice",
        ],
      },
    },
    {
      vendor: "Clearpane Intake Forms",
      function: "other",
      monthlyCost: cents(7_900),
      renewalDate: "2027-05-20",
      verdict: {
        kind: "replace_now",
        alternative: {
          name: "Formfern",
          monthlyCost: cents(2_900),
          setupCost: cents(0),
          trainingCost: cents(10_000),
          signsBaa: true,
        },
      },
      compliance: {
        touchesPhi: true,
        confirmBeforeCancelling: [
          "Export completed patient forms",
          "Sign the new vendor's BAA",
        ],
      },
    },
    {
      vendor: "Flossbell Recall",
      function: "recall_reminders",
      monthlyCost: cents(12_900),
      renewalDate: "2027-02-10",
      verdict: {
        kind: "replace_with_caveats",
        alternative: {
          name: "Recallnest",
          monthlyCost: cents(4_900),
          setupCost: cents(20_000),
          trainingCost: cents(30_000),
          signsBaa: true,
        },
        trialPlan:
          "Send recalls from both for one 60-day cycle. Cancel Flossbell only if Recallnest books as many visits.",
      },
      compliance: {
        touchesPhi: true,
        confirmBeforeCancelling: ["Export the recall list"],
      },
    },
    {
      vendor: "Nightdesk Answering",
      function: "answering_service",
      monthlyCost: cents(29_500),
      renewalDate: null,
      verdict: {
        kind: "replace_with_caveats",
        alternative: {
          name: "Callmoss Reception",
          monthlyCost: cents(17_900),
          setupCost: cents(15_000),
          trainingCost: cents(25_000),
          signsBaa: true,
        },
        trialPlan:
          "Send after-hours calls to Callmoss for two weeks while Nightdesk keeps daytime overflow. Switch fully if no calls are missed.",
      },
      compliance: {
        touchesPhi: true,
        confirmBeforeCancelling: [
          "Point the after-hours number at the new service",
        ],
      },
    },
    {
      vendor: "Molarix Practice Cloud",
      function: "practice_management",
      monthlyCost: cents(36_900),
      renewalDate: "2027-08-01",
      verdict: {
        kind: "keep",
        reason:
          "Charts, imaging, and claims history live here, and no cheaper system in the catalog imports them cleanly. Revisit at renewal.",
      },
      compliance: { touchesPhi: true, confirmBeforeCancelling: [] },
    },
    {
      vendor: "Bytevault Office Backup",
      function: "other",
      monthlyCost: cents(8_900),
      renewalDate: "2027-04-12",
      verdict: {
        kind: "keep",
        reason:
          "A cheaper backup service exists, but it would cost more than this one in its first year once setup and training are counted.",
      },
      compliance: { touchesPhi: true, confirmBeforeCancelling: [] },
    },
  ],
};
