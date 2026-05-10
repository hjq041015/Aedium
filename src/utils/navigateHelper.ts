import { verifyEmail } from "./userHelper.ts";
import type { UseNavigateResult } from '@tanstack/react-router';


export async function navigateToEditor(navigate :  UseNavigateResult<string>) {
    const result = await verifyEmail();
    if (!result) {
      navigate({
        to: '/auth/verify-email',
      })
      return;
    }
    navigate({
      to: '/editor',
    })
}