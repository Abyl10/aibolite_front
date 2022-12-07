import React, { useEffect, useMemo, useState } from 'react';
import classes from './Header.module.scss';
import { useUserContext } from '../../contexts/UserContext';
import { ADMIN } from '../../consts/enums';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../consts/routes';
import { useTranslations } from '../../hooks/useTranslations';
import { SelectLanguage } from './SelectLanguage';
import ProfileCard from '../UI/ProfileCard';
import DropdownPortal from '../UI/DropdownPortal';
import { getUserProfile } from '../../requests/user';
import { IUser, Role } from '../../ts/types';

const initialUserState: IUser = {
  id: 0,
  phone: '',
  birth_date: '',
  role: Role.GUEST,
  name: '',
  surname: '',
  middle_name: '',
};

export const Header: React.FC = () => {
  const { user } = useUserContext();
  const { t } = useTranslations();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<IUser>(initialUserState);

  const { pathname } = useLocation();

  useEffect(() => {
    getUserProfile().then((res) => {
      setUserProfile(res);
    });
  }, []);

  const headerName: string = useMemo(
    () => ROUTES.find((route) => route.path === pathname)?.name || 'home',
    [pathname]
  );

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className={classes['header']}>
      <div id={'header__container'} className={classes['header__container']}>
        <div className={classes['header__title']}>{t(headerName)}</div>
      </div>
      <SelectLanguage />
      <div
        className={classes['header__profile']}
        id={'header__profile'}
        onClick={() => handleToggleDropdown()}
      >
        <div className={classes['profile__info']}>
          <div
            className={classes['profile__name']}
          >{`${userProfile.name} ${userProfile.surname}`}</div>
          <div className={classes['profile__role']}>{userProfile.role || ADMIN}</div>
        </div>
        <img
          src="../assets/icons/profile-header.svg"
          alt="Profile icon"
          className={classes['profile__avatar']}
        />
        <img
          src={'../assets/icons/down-arrow.svg'}
          alt={'arrow'}
          className={classes['profile__arrow']}
        />
      </div>
      {isOpen && (
        <DropdownPortal
          open={isOpen}
          handleClose={handleToggleDropdown}
          targetId={'header__profile'}
        >
          <ProfileCard handleClose={handleToggleDropdown} targetId={'header__profile'} />
        </DropdownPortal>
      )}
    </header>
  );
};
