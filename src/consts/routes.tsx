import React from 'react';
import { Admin } from '../pages/Admin';


import { Settings } from '../pages/Settings';


import { Role } from '../ts/types';
import { Redirect } from '../pages/Redirect';


import Profile from '../pages/Profile';
import { AddUser } from '../pages/AddUser';

type IRoute = {
  name: string;
  path: string;
  component: React.ReactElement;
  roles: Role[];
};

export const ROUTES: IRoute[] = [
  {
    name: 'redirect',
    path: '/',
    component: <Redirect />,
    roles: [Role.ADMIN, Role.ACCOUNTANT, Role.GUEST],
  },
  {
    name: 'home',
    path: '/admin',
    component: <Admin />,
    roles: [Role.ADMIN],
  },
  {
    name: 'settings',
    path: '/settings',
    component: <Settings />,
    roles: [Role.ADMIN, Role.ACCOUNTANT],
  },

  {
    name: 'profile',
    path: '/profile',
    component: <Profile />,
    roles: [Role.ACCOUNTANT, Role.SUPER_ADMIN, Role.ADMIN, Role.STOREKEEPER, Role.GUEST],
  },
  {
    name: 'add-user',
    path: '/add-user',
    component: <AddUser />,
    roles: [Role.ADMIN, Role.SUPER_ADMIN],
  },
];
