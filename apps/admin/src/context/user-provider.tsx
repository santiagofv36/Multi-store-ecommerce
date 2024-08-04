'use client';

import React from 'react';

import { IUser } from '@packages/models';

type TUserContext = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

export const UserContext = React.createContext<TUserContext>({
  user: null,
  setUser: () => {},
});

interface TUserContextProviderProps {
  children: React.ReactNode;
}

export function UserContextProvider({ children }: TUserContextProviderProps) {
  const [user, setUser] = React.useState<IUser | null>(null);

  const value: TUserContext = { user, setUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
