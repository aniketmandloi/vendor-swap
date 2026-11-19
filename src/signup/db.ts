import { neon } from "@neondatabase/serverless";
import type { SignupStore } from "./signup";

export const neonStore: SignupStore = {
  async save({ email, role, practiceSize, monthlySoftwareSpend }) {
    // Read at call time so importing the page never needs a database.
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");

    const sql = neon(url);
    await sql`
      insert into founding_signups (email, role, practice_size, monthly_software_spend)
      values (${email}, ${role}, ${practiceSize}, ${monthlySoftwareSpend})
      on conflict (email) do update set
        role = excluded.role,
        practice_size = excluded.practice_size,
        monthly_software_spend = excluded.monthly_software_spend,
        updated_at = now()
    `;
  },
};
