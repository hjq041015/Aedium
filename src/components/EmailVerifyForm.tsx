import { useEffect, useState } from "react";
import { sendEmail, verifyEmailCode } from "../utils/verifyEmailHelper.ts";
import { useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

function EmailVerifyForm() {
  const [resendTimer, setResendTimer] = useState(0);
  const [code, setCode] = useState("");

  const navigate = useNavigate();

  const { isLoading } = useQuery({
    queryKey: ["send-verification-code"],
    queryFn: () => {
      sendEmail();
      setResendTimer(60);
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    if (resendTimer <= 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [resendTimer]);

  return (
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
            verifyEmailCode(code, navigate);
          }}
          className="btn btn-primary btn-lg mt-5 w-full"
        >
          Verify
        </button>

        <button
          onClick={() => {
            sendEmail();
            setResendTimer(60);
          }}
          disabled={!isLoading}
          className="btn btn-secondary btn-lg mt-5 w-full"
        >
          Resend
          {resendTimer > 0 && ` (${resendTimer})`}
        </button>
      </fieldset>
    </form>
  );
}
export default EmailVerifyForm;
