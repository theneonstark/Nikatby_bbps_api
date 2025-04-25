import { useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';

const useRedirectIfNotVerified = () => {
  const { props } = usePage();
  const user = props.auth?.user;

  useEffect(() => {
    if (user && user.verified !== 1) {
      router.visit('/getonboarding');
    }
  }, [user]);
};

export default useRedirectIfNotVerified;
