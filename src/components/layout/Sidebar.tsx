import React, { useEffect, useState } from 'react';
import classes from './Sidebar.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useUserContext } from '../../contexts/UserContext';
import { useTranslations } from '../../hooks/useTranslations';
import { IUser, Role } from '../../ts/types';
import { getUserProfile } from '../../requests/user';

type SideLink = {
  name: string;
  path: string;
  icon: string;
  iconSelected: string;
};

export const Sidebar: React.FC = () => {
  const { t } = useTranslations();
  const location = useLocation();
  const { user } = useUserContext();
  const [userProfile, setUserProfile] = useState<IUser>();

  const sideLinks: SideLink[] = [
    {
      name: t('patients'),
      path: '/patients',
      icon: '../../assets/icons/requests.svg',
      iconSelected: '../../assets/icons/requests-selected.svg',
    },
    {
      name: t('appointments'),
      path: '/appointments',
      icon: '../../assets/icons/store-nav.svg',
      iconSelected: '../../assets/icons/store-selected.svg',
    },
    {
      name: t('departments'),
      path: '/departments',
      icon: '../../assets/icons/analytics.svg',
      iconSelected: '../../assets/icons/analytics-selected.svg',
    },
    {
      name: t('specializations'),
      path: '/specializations',
      icon: '../../assets/icons/home.svg',
      iconSelected: '../../assets/icons/home-selected.svg',
    },
  ];

  const sideLinksPatient: SideLink[] = [
    {
      name: t('doctors'),
      path: '/doctors',
      icon: '../../assets/icons/requests.svg',
      iconSelected: '../../assets/icons/requests-selected.svg',
    },
    {
      name: t('appointments'),
      path: '/appointments',
      icon: '../../assets/icons/store-nav.svg',
      iconSelected: '../../assets/icons/store-selected.svg',
    },
    {
      name: t('departments'),
      path: '/departments',
      icon: '../../assets/icons/analytics.svg',
      iconSelected: '../../assets/icons/analytics-selected.svg',
    },
    {
      name: t('specializations'),
      path: '/specializations',
      icon: '../../assets/icons/home.svg',
      iconSelected: '../../assets/icons/home-selected.svg',
    },
  ];

  const sideLinksAdmin: SideLink[] = [
    {
      name: t('doctors'),
      path: '/doctors',
      icon: '../../assets/icons/requests.svg',
      iconSelected: '../../assets/icons/requests-selected.svg',
    },
    {
      name: t('patients'),
      path: '/patients',
      icon: '../../assets/icons/store-nav.svg',
      iconSelected: '../../assets/icons/store-selected.svg',
    },
    {
      name: t('departments'),
      path: '/departments',
      icon: '../../assets/icons/analytics.svg',
      iconSelected: '../../assets/icons/analytics-selected.svg',
    },
    {
      name: t('specializations'),
      path: '/specializations',
      icon: '../../assets/icons/home.svg',
      iconSelected: '../../assets/icons/home-selected.svg',
    },
  ];

  const getLinkPath = (link: SideLink): string =>
    link.path === '/' ? `/${user.role?.toLowerCase()}` : link.path;

  useEffect(() => {
    getUserProfile().then((res) => setUserProfile(res));
  }, []);

  return (
    <aside className={classes['side']}>
      <NavLink to={'/'}>
        <img
          className={classes['side__logo']}
          src={require('../../assets/icons/aibolit-logo-white.png')}
          alt="Logo"
        />
      </NavLink>
      <video className={classes['video']} autoPlay loop>
        <source src="../../assets/img/mini.gif.mp4" type="video/mp4" />
        Does not support video
      </video>
      <nav className={classes['side__nav']}>
        <ul className={classes['side__list']}>
          {userProfile?.role === Role.DOCTOR &&
            sideLinks.map((link) => (
              <li key={link.path} className={classes['side__item']}>
                <NavLink
                  to={getLinkPath(link)}
                  className={({ isActive }) =>
                    isActive
                      ? classNames(classes['link'], classes['link--active'])
                      : classes['link']
                  }
                >
                  {location.pathname === getLinkPath(link) ? (
                    <img src={link.iconSelected} alt={link.name} />
                  ) : (
                    <img src={link.icon} alt={link.name} />
                  )}
                  <div className={classes['link__name']}>{link.name}</div>
                </NavLink>
              </li>
            ))}
          {userProfile?.role === Role.PATIENT &&
            sideLinksPatient.map((link) => (
              <li key={link.path} className={classes['side__item']}>
                <NavLink
                  to={getLinkPath(link)}
                  className={({ isActive }) =>
                    isActive
                      ? classNames(classes['link'], classes['link--active'])
                      : classes['link']
                  }
                >
                  {location.pathname === getLinkPath(link) ? (
                    <img src={link.iconSelected} alt={link.name} />
                  ) : (
                    <img src={link.icon} alt={link.name} />
                  )}
                  <div className={classes['link__name']}>{link.name}</div>
                </NavLink>
              </li>
            ))}
          {userProfile?.role === Role.ADMIN &&
            sideLinksAdmin.map((link) => (
              <li key={link.path} className={classes['side__item']}>
                <NavLink
                  to={getLinkPath(link)}
                  className={({ isActive }) =>
                    isActive
                      ? classNames(classes['link'], classes['link--active'])
                      : classes['link']
                  }
                >
                  {location.pathname === getLinkPath(link) ? (
                    <img src={link.iconSelected} alt={link.name} />
                  ) : (
                    <img src={link.icon} alt={link.name} />
                  )}
                  <div className={classes['link__name']}>{link.name}</div>
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
      <div className={classes['side__footer']}>
        <NavLink to="/notifications">
          <img src="../assets/icons/notification.svg" alt="Notification icon" />
        </NavLink>
        <NavLink to="/settings">
          <img src="../assets/icons/settings.svg" alt="Settings icon" />
        </NavLink>
      </div>
    </aside>
  );
};
