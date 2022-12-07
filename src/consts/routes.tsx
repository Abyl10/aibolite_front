import React from 'react';

import { Settings } from '../pages/Settings';
import { Role } from '../ts/types';
import { Redirect } from '../pages/Redirect';
import Profile from '../pages/Profile';
import Departments from '../pages/Departments';
import Specializations from '../pages/Specializations';
import Doctors from '../pages/Doctors';
import Appointments from '../pages/Appointments';
import Patients from '../pages/Patients';

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
    name: 'patients',
    path: '/patients',
    component: <Patients />,
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
    roles: [Role.ADMIN, Role.DOCTOR],
  },
  {
    name: 'specializations',
    path: '/specializations',
    component: <Specializations />,
    roles: [Role.ADMIN, Role.DOCTOR],
  },
  {
    name: 'doctors',
    path: '/doctors',
    component: <Doctors />,
    roles: [Role.ADMIN, Role.DOCTOR, Role.PATIENT],
  },
  {
    name: 'appointments',
    path: '/appointments',
    component: <Appointments />,
    roles: [Role.PATIENT, Role.DOCTOR, Role.ADMIN],
  },
];
