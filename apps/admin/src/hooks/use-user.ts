import React from 'react';

import { UserContext } from '@admin/context/user-provider';

export default function useUser() {
  const { user, setUser } = React.useContext(UserContext);

  return [user, setUser] as const;
}
