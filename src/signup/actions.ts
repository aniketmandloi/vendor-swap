"use server";

import { neonStore } from "./db";
import { handleSignup, type SignupState } from "./signup";

export async function submitSignup(prevState: SignupState, formData: FormData): Promise<SignupState> {
  return handleSignup(neonStore, prevState, formData);
}
