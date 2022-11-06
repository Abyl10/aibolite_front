import React, { useMemo } from 'react';
import classes from './Sidebar.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { useUserContext } from '../../contexts/UserContext';

type SideLink = {
  name: string;
  path: string;
  icon: string;
  iconSelected: string;
};

const sideLinks: SideLink[] = [
  {
    name: 'Главная',
    path: '/',
    icon: '../../assets/icons/home.svg',
    iconSelected: '../../assets/icons/home-selected.svg',
  },
  {
    name: 'Заявки',
    path: '/requests',
    icon: '../../assets/icons/requests.svg',
    iconSelected: '../../assets/icons/requests-selected.svg',
  },
  {
    name: 'Склад',
    path: '/store',
    icon: '../../assets/icons/store-nav.svg',
    iconSelected: '../../assets/icons/store-selected.svg',
  },
  {
    name: 'Аналитика',
    path: '/analytics',
    icon: '../../assets/icons/analytics.svg',
    iconSelected: '../../assets/icons/analytics-selected.svg',
  },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useUserContext();

  const getLinkPath = (link: SideLink): string =>
    link.path === '/' ? `/${user.role?.toLowerCase()}` : link.path;

  return (
    <aside className={classes['side']}>
      <NavLink to={'/'}>
        <img
          className={classes['side__logo']}
          src="../../assets/icons/./logo-vertical.svg"
          alt="Logo"
        />
      </NavLink>
      <video className={classes['video']} autoPlay loop>
        <source src="../../assets/img/mini.gif.mp4" type="video/mp4" />
        Does not support video
      </video>
      <nav className={classes['side__nav']}>
        <ul className={classes['side__list']}>
          {sideLinks.map((link) => (
            <li key={link.path} className={classes['side__item']}>
              <NavLink
                to={getLinkPath(link)}
                className={({ isActive }) =>
                  isActive ? classNames(classes['link'], classes['link--active']) : classes['link']
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
