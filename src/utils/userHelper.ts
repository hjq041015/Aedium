import type { User } from "@neondatabase/neon-js/auth/types";
import { authClient } from "../utils/nenoHelper.ts";

export async function getUser(): Promise<User | undefined> {
  const { data, error } = await authClient.getSession();
  if (error) {
    throw error;
  }

  if (data?.user) {
    return data.user;
  }
}

export async function verifyEmail() {
  const user = await getUser();
  if (user) {
    return user.emailVerified;
  }
}
