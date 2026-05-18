import type { User } from "@neondatabase/neon-js/auth/types";
import { atom } from "jotai";

export const userAtom = atom<User | null>(null);