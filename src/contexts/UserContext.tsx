import React, { createContext, useContext, useState } from 'react';
import { IUser, Role } from '../ts/types';
import { getRefreshToken } from '../utils/token';
import { getUserProfile } from '../requests/user';

const initialUserState: IUser = {
  id: 0,
  phone: '',
  birth_date: '',
  role: Role.GUEST,
  name: '',
  surname: '',
  middle_name: '',
};

type ContextType = {
  user: IUser;
  getUser: () => void;
};

const UserContext = createContext<ContextType>({
  user: initialUserState,
  getUser: () => null,
});

export const useUserContext = (): ContextType => useContext(UserContext);

type PropsType = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<PropsType> = ({ children }) => {
  const [user, setUser] = useState<IUser>(initialUserState);

  const getUser = (): void => {
    getRefreshToken() &&
      getUserProfile()
        .then((user) => setUser(user))
        .catch((err) => console.log(err));
  };

  return <UserContext.Provider value={{ user, getUser }}>{children}</UserContext.Provider>;
};
