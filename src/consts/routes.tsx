import React from 'react';

import { Settings } from '../pages/Settings';
import { Role } from '../ts/types';
import { Redirect } from '../pages/Redirect';
import Profile from '../pages/Profile';
import Admin from '../pages/Admin';
import Departments from '../pages/Departments';

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
    roles: [Role.ADMIN, Role.DOCTOR, Role.PATIENT],
  },
  {
    name: 'home',
    path: '/patients',
    component: <Admin />,
    roles: [Role.ADMIN, Role.DOCTOR, Role.PATIENT],
  },
  {
    name: 'settings',
    path: '/settings',
    component: <Settings />,
    roles: [Role.ADMIN, Role.DOCTOR],
  },

  {
    name: 'profile',
    path: '/profile',
    component: <Profile />,
    roles: [Role.ADMIN, Role.PATIENT, Role.DOCTOR],
  },
  {
    name: 'departments',
    path: '/departments',
    component: <Departments />,
    roles: [Role.ADMIN, Role.DOCTOR, Role.PATIENT],
  },
];
