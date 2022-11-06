import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import classes from './Layout.module.scss';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div className={classes['layout']}>
      <Sidebar />
      <Header />
      <Outlet />
    </div>
  );
};
