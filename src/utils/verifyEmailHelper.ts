import { toast } from "sonner";
import { authClient } from "../auth.ts";
import { getUser } from "./userHelper.ts";
import type { UseNavigateResult } from '@tanstack/react-router';

let currentUser: any = null;

export async function sendEmail() { 
  try {
    if(!currentUser) {
     const user = await getUser();
      if(!user) {
      throw new Error('No user found');
    }
    currentUser = user;
    }
    
    const { error } = await authClient.sendVerificationEmail({
      email : currentUser.email,
      callbackURL: window.location.origin + '/',
    });

    if (error) throw error;

    toast.success('Verification email sent',{position:'top-center', richColors: true});

    
    
  } catch (error) {
    toast.error('Error while sending verification email',{position:'top-center', richColors: true});
  }
}


export async function verifyEmailCode(code : string, navigate: UseNavigateResult<string>) {
  try {
    if(!currentUser) {
     const user = await getUser();
      if(!user) {
      throw new Error('No user found');
    }
    currentUser = user;
    }
    const { data, error } = await authClient.emailOtp.verifyEmail({
      email:currentUser.email,
      otp: code,
    });
    if (error) throw error;
    toast.success('Email verified successfully',{position:'top-center', richColors: true});
    // Check if auto-sign-in is enabled (default behavior)
    if (data?.user) {
      navigate({to: '/'})
    } else {
      navigate({
        to: '/auth/$pathname',
        params: {
          pathname: 'sign-in',
        },
      })
    }
  } catch (error) {
    toast.error('Error while verifying email',{position:'top-center', richColors: true});
  }
}