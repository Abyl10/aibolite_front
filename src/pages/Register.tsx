import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { useTranslations } from '../hooks/useTranslations';
import classes from './Register.module.scss';

export const Register = () => {
  const { t } = useTranslations();
  const [user, setUser] = useState({
    name: '',
    surname: '',
    login: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log(user);
    }
  };

  return (
    <div className={classes['register']}>
      <div className={classes['video__wrapper']}>
        <img src="../assets/icons/logo-horizontal.svg" alt="Logo" className={classes['logo']} />
        <video className={classes['video']} autoPlay loop>
          <source src="../assets/img/wave-2.gif.mp4" type="video/mp4" />
          Does not support video
        </video>
      </div>
      <Input name="name" value={user.name} onChange={handleInputChange} label={t('name')} />
      <Input
        name="surname"
        value={user.surname}
        onChange={handleInputChange}
        label={t('surname')}
      />
      <Input
        name="login"
        value={user.login}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        label={t('username')}
      />
      <Button
        onClick={() => console.log(user)}
        variant={'primary'}
        className={classes['register__btn']}
      >
        {t('register')}
      </Button>
      <div className={classes['register__bottom__container']}>
        <p className={classes['register__bottom__text']}>{t('have_account')}</p>
        <NavLink to={'/auth'} className={classes['register__bottom__link']}>
          {t('login')}
        </NavLink>
      </div>
    </div>
  );
};
