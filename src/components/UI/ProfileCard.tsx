import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import classes from './ProfileCard.module.scss';
import { ADMIN } from '../../consts/enums';
import { useUserContext } from '../../contexts/UserContext';
import { useTranslations } from '../../hooks/useTranslations';
import { removeTokens } from '../../utils/token';
import { LogoutIcon } from '../../assets/icons/js/LogoutIcon';

type Props = {
  handleClose?: () => void;
  targetId?: string;
};

const ProfileCard: React.FC<Props> = ({ handleClose, targetId }) => {
  const { user } = useUserContext();
  const { t } = useTranslations();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (targetId && wrapperRef) {
      const targetWidth = document.getElementById(targetId)?.getBoundingClientRect().width;
      if (targetWidth) {
        wrapperRef.current?.setAttribute('style', `width: ${targetWidth + 10}px`);
      }
    }
  }, []);

  const handleLogout = () => {
    handleClose && handleClose();
    removeTokens();
    window.location.href = '/auth';
  };

  return (
    <div className={classes['wrapper']} ref={wrapperRef} id={'profile__wrapper'}>
      <div className={classes['header__profile']} onClick={handleClose}>
        <div className={classes['profile__info']}>
          <div className={classes['profile__name']}>{`${user.firstName} ${user.lastName}`}</div>
          <div className={classes['profile__role']}>{user.role || ADMIN}</div>
        </div>
        <img
          src="../assets/icons/profile-header.svg"
          alt="Profile icon"
          className={classes['profile__avatar']}
        />
      </div>
      <Link to={'/profile'} className={classes['link']} onClick={handleClose}>
        <p className={classes['option']}>{t('change_password')}</p>{' '}
      </Link>
      <p className={classes['option__logout']} onClick={handleLogout}>
        <LogoutIcon />
        {t('logout')}
      </p>
    </div>
  );
};

export default ProfileCard;
