import * as z from "zod";
export const verifyEmailSchema = z.object({
    code: z
        .string()
        .trim()
        .length(6, "Code must be 6 digits")
        .refine((code) => {
            for (const char of code) {
                if (char >= "0" && char <= "9") {
                    continue;
                }
                return false;
            }
            return false;
        }, "Code must be a number"),
});

export type veriftyEmail = z.infer<typeof verifyEmailSchema>;