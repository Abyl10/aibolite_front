import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { useTranslations } from '../hooks/useTranslations';

import classes from './ForgotPassword.module.scss';

export const ForgotPassword = () => {
  const { t } = useTranslations();
  const [login, setLogin] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  return (
    <div className={classes['password']}>
      <div className={classes['video__wrapper']}>
        <img
          src={require('../assets/icons/aibolit-logo-white.png')}
          alt="Logo"
          className={classes['logo']}
        />
        <video className={classes['video']} autoPlay loop>
          <source src="../assets/img/wave-2.gif.mp4" type="video/mp4" />
          Does not support video
        </video>
      </div>
      <Input name="login" value={login} onChange={handleLoginChange} label={t('username')} />
      <Button
        variant="primary"
        onClick={() => {
          return;
        }}
        className={classes['password__btn']}
      >
        {t('send')}
      </Button>
      {error && <p className={classes['password__error']}>{error}</p>}
    </div>
  );
};
