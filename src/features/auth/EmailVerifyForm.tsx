import { useNavigate } from "@tanstack/react-router";
import {
  useResendCountDown,
  useSendVerificationEmail,
  useVerifyEmailCode,
} from "@/hooks/verificationEmail.ts";
import RequireEmailNotVerify from "@/ui/RequireEmailNotVerify";
import RequireLogin from "@/ui/RequireLogin";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { FieldInfo } from "@/ui/FieldInfo.tsx";

function EmailVerifyForm() {
  const navigate = useNavigate();

  const { resendTimer, setResendTimer } = useResendCountDown();

  const { isPending: isSending, sendEmail } =
    useSendVerificationEmail(setResendTimer);

  const { isVerifying, verifyEmailCode } = useVerifyEmailCode(navigate);

  const codeSchema = z.object({
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

  const form = useForm({
    defaultValues: {
      code: "",
    },
    onSubmit: ({ value: { code } }) => {
      verifyEmailCode({ code });
    },
    validators: {
      onBlur: codeSchema,
    },
  });

  return (
    <RequireLogin>
      <RequireEmailNotVerify>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="flex items-center justify-center min-h-screen"
        >
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-8">
            <h2 className="text-center text-4xl mb-4">Email Verification</h2>

            <form.Field
              name="code"
              children={(field) => (
                <>
                  <label className="label">Verification Code</label>
                  <input
                    type="text"
                    className="input input-lg w-full"
                    inputMode="numeric"
                    placeholder="Your Code"
                    maxLength={6}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                  />

                  <FieldInfo field={field} />
                </>
              )}
            />

            <button
              disabled={isVerifying}
              className="btn btn-primary btn-lg mt-5 w-full"
            >
              Verify
            </button>

            <button
              onClick={() => {
                sendEmail();
                setResendTimer(60);
              }}
              disabled={isSending || resendTimer > 0}
              className="btn btn-secondary btn-lg mt-5 w-full"
            >
              Resend
              {resendTimer > 0 && ` (${resendTimer})`}
            </button>
          </fieldset>
        </form>
      </RequireEmailNotVerify>
    </RequireLogin>
  );
}
export default EmailVerifyForm;
