import { useMutation } from "@tanstack/react-query";
import { authClient } from "@/utils/nenoHelper.ts";
import { getUser } from "@/utils/userHelper.ts";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { type UseNavigateResult } from "@tanstack/react-router";

export function useSendVerificationEmail(
  setResendTimer: (ReresendTimer: number) => void,
) {
  const { isPending, mutate: sendEmail } = useMutation({
    mutationKey: ["send-verification-code"],
    mutationFn: async () => {
      const user = await getUser();
      if (!user) {
        throw new Error("No user found");
      }

      const { error } = await authClient.sendVerificationEmail({
        email: user.email,
        callbackURL: window.location.origin + "/",
      });

      if (error) throw error;

      setResendTimer(60);
    },
    onSuccess: () => {
      toast.success("Verification email sent", {
        position: "top-center",
        richColors: true,
      });
    },
    onError: () => {
      toast.error("Error while sending verification email", {
        position: "top-center",
        richColors: true,
      });
    },
  });

  useEffect(() => {
    sendEmail();
  }, []);

  return { isPending, sendEmail };
}

export function useResendCountDown() {
  const [resendTimer, setResendTimer] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    if (resendTimer <= 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [resendTimer]);

  return { resendTimer, setResendTimer };
}

export function useVerifyEmailCode(navigate: UseNavigateResult<string>) {
  const [code, setCode] = useState("");

  const { mutate: verifyEmailCode, isPending: isVerifying } = useMutation({
    mutationKey: ["verify-email-code"],
    mutationFn: async () => {
      if (!code.trim().length) {
        throw new Error("Code is required");
      }

      const user = await getUser();
      if (!user) {
        throw new Error("No user found");
      }
      const { data, error } = await authClient.emailOtp.verifyEmail({
        email: user.email,
        otp: code,
      });
      if (error) {
        throw error;
      }
      return data;
    },

    onSuccess: (data) => {
      toast.success("Email verified successfully", {
        position: "top-center",
        richColors: true,
      });
      if (data?.user) {
        navigate({ to: "/" });
      } else {
        navigate({
          to: "/auth/$pathname",
          params: {
            pathname: "sign-in",
          },
        });
      }
    },
    onError: () => {
      toast.error("Error while verifying email", {
        position: "top-center",
        richColors: true,
      });
    },
  });

  return { code, setCode, verifyEmailCode, isVerifying };
}
