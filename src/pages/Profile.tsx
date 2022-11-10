import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { useTranslations } from '../hooks/useTranslations';
import { removeTokens } from '../utils/token';
import ChangePasswordForm from '../components/UI/ChangePasswordForm';
import { LogoutIcon } from '../assets/icons/js/LogoutIcon';
import classes from './Profile.module.scss';

const Profile: React.FC = () => {
  const { user } = useUserContext();
  const { t } = useTranslations();

  const handleLogout = () => {
    removeTokens();
    window.location.href = '/auth';
  };

  return (
    <main className={classes['user__wrapper']}>
      <div className={classes['user__header']}>
        <img
          src="../assets/icons/profile-header.svg"
          alt="Profile icon"
          className={classes['user__avatar']}
        />
        <div>
          <p className={classes['user__name']}>
            {user.firstName} {user.lastName}
          </p>
          <p className={classes['user__position']}>{user.role}</p>
        </div>
      </div>
      <div className={classes['user__options']}>
        <Link to={'/profile'} className={classes['link']}>
          <p className={classes['user__option']}>{t('change_password')}</p>
        </Link>
        <p className={classes['user__option__logout']} onClick={handleLogout}>
          <LogoutIcon />
          {t('logout')}
        </p>
      </div>
      <ChangePasswordForm />
    </main>
  );
};

export default Profile;
