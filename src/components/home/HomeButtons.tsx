import React from 'react';
import classes from './HomeButtons.module.scss';
import globalClasses from '../../assets/sass/base/_base.scss';
import { Button } from '../UI/Button';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useTranslations } from '../../hooks/useTranslations';

export const HomeButtons: React.FC = () => {
  const { t } = useTranslations();
  const handleProfileButton = () => {};
  const handleAddUserButton = () => {};
  const handleAddCategoryButton = () => {};
  const handleAddItemButton = () => {};
  const handleAddStoreButton = () => {};

  return (
    <div className={classes['buttons']}>
      <Button variant="secondary" onClick={handleProfileButton}>
        <img src="../../assets/icons/profile-dark.svg" alt="Profile icon" />
        {t('profile')}
      </Button>
      <NavLink
        to={'/add-user'}
        className={({ isActive }) =>
          isActive
            ? classNames(globalClasses['link'], globalClasses['link--active'])
            : globalClasses['link']
        }
      >
        <Button variant="secondary" onClick={handleAddUserButton}>
          <img src="../../assets/icons/add-user.svg" alt="Add user icon" />
          {t('add_user')}
        </Button>
      </NavLink>
      <Button variant="secondary" onClick={handleAddCategoryButton}>
        <img src="../../assets/icons/add-icon.svg" alt="Add icon" />
        {t('add_patient')}
      </Button>
      <Button variant="secondary" onClick={handleAddItemButton}>
        <img src="../../assets/icons/add-icon.svg" alt="Add icon" />
        {t('add_doctor')}
      </Button>
      <Button variant="secondary" onClick={handleAddStoreButton}>
        <img src="../../assets/icons/add-icon.svg" alt="Add icon" />
        {t('add_department')}
      </Button>
    </div>
  );
};
