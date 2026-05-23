import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';

import { useUserInfo } from '@/hooks/userInfo.ts';

function RequireEmailNotVerify({ children }: { children: React.ReactNode }) {
  const { isLoading, user } = useUserInfo();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && user && user?.emailVerified) {
      navigate({ to: '/' });
    }
  }, [isLoading, user?.emailVerified]);

  if (isLoading) {
    return <span className="flex mx-auto min-h-screen loading loading-spinner loading-xl"></span>;
  }

  return children;
}
export default RequireEmailNotVerify;
