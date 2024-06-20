import React from 'react';

import { useAuthStoreState } from '@/store/authStore';
import { useInviteUserStoreState } from '@/store/inviteUserStore';

const useAuthority = () => {
  const [hasAuthority, setHasAuthority] = React.useState<boolean>(false);

  const user = useAuthStoreState();
  const { invitedUser } = useInviteUserStoreState();

  React.useEffect(() => {
    const check = invitedUser.find(({ id }) => id === user?.id);
    setHasAuthority(!!check);
  }, [user, invitedUser]);

  return hasAuthority;
};

export default useAuthority;
