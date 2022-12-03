import React, { useEffect, useState } from 'react';
import classes from './Auth.module.scss';
import { Button } from '../components/UI/Button';
import { Input } from '../components/UI/Input';
import { NavLink, useNavigate } from 'react-router-dom';
import { Radio } from '../components/UI/Radio';
import { login } from '../requests/auth';
import { getAccessToken, getRefreshToken, removeTokens, setTokens } from '../utils/token';
import { useUserContext } from '../contexts/UserContext';
import { useTranslations } from '../hooks/useTranslations';

type LoginUserType = {
  phone: string;
  password: string;
};

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  // const { getUser } = useUserContext();
  const { t } = useTranslations();

  const [user, setUser] = useState<LoginUserType>({ phone: '', password: '' });
  const [error, setError] = useState<string>('');
  const [rememberUser, setRememberUser] = useState<boolean>(
    Boolean(localStorage.getItem('REMEMBER_USER')) || false
  );

  const handleLogin = () => {
    login(user.phone, user.password)
      .then(({ access, refresh }) => {
        setTokens(access, refresh);
        navigate('/');
      })
      .catch(() => setError('Incorrect email/password'));
  };

  useEffect(() => {
    localStorage.getItem('REMEMBER_USER') === 'false' ? removeTokens() : getRefreshToken();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setError('');
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleRememberUser = () => {
    setRememberUser((prevRememberUser) => !prevRememberUser);
    localStorage.setItem('REMEMBER_USER', String(!rememberUser));
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className={classes['auth']}>
      <div className={classes['video__wrapper']}>
        <img src="../assets/icons/logo-horizontal.svg" alt="Logo" className={classes['logo']} />
        <video className={classes['video']} autoPlay loop>
          <source src="../assets/img/wave-2.gif.mp4" type="video/mp4" />
          Does not support video
        </video>
      </div>

      <>
        <Input name="phone" value={user.phone} onChange={handleInputChange} label={t('username')} />
        <Input
          name="password"
          value={user.password}
          onChange={handleInputChange}
          label={t('password')}
          type="password"
          onKeyPress={handleKeyPress}
        />
        <div className={classes['auth__options']}>
          <Radio
            checked={rememberUser}
            onClick={handleRememberUser}
            name="remember-user"
            label={t('remember_me')}
            className={classes['auth__remember-user']}
          />
          <NavLink to={'/forgot-password'} className={classes['auth__forgot-password']}>
            {t('forgot_password')}
          </NavLink>
        </div>
        {error && <p className={classes['auth__error']}>{error}</p>}
        <Button variant="primary" onClick={handleLogin} className={classes['auth__btn']}>
          {t('login')}
        </Button>
      </>
    </div>
  );
};
