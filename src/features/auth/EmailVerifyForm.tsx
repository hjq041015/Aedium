import { useNavigate } from "@tanstack/react-router";
import {
  useResendCountDown,
  useSendVerificationEmail,
  useVerifyEmailCode,
} from "@/hooks/verificationEmail.ts";
import RequireEmailNotVerify from "@/ui/RequireEmailNotVerify";
import RequireLogin from "@/ui/RequireLogin";

function EmailVerifyForm() {
  const navigate = useNavigate();

  const { resendTimer, setResendTimer } = useResendCountDown();

  const { isPending: isSending, sendEmail } =
    useSendVerificationEmail(setResendTimer);

  const { code, setCode, isVerifying, verifyEmailCode } =
    useVerifyEmailCode(navigate);

  return (
    <RequireLogin>
      <RequireEmailNotVerify>
        <form className="flex items-center justify-center min-h-screen">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-md border p-8">
            <h2 className="text-center text-4xl mb-4">Email Verification</h2>

            <label className="label">Verification Code</label>
            <input
              type="text"
              className="input input-lg w-full"
              inputMode="numeric"
              placeholder="Your Code"
              maxLength={6}
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />

            <button
              onClick={(event) => {
                event.preventDefault();
                verifyEmailCode();
              }}
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
