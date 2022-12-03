import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/UserContext';
import { useTranslations } from '../../hooks/useTranslations';
import { Input } from './Input';
import { Button } from './Button';
import { removeTokens, setTokens } from '../../utils/token';
import { resetPassword, ResetPasswordResponse } from '../../requests/user';
import classes from './ChangePasswordForm.module.scss';

type ChangePassword = {
  oldPassword: string;
  newPassword: string;
  newPasswordCopy: string;
};

type ChangePasswordTemp = {
  login: string;
  password: string;
  oldPassword: string;
};

interface IPasswordValidation extends Record<string, boolean> {
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasSymbol: boolean;
  hasDigit: boolean;
  minLength: boolean;
  noSequence: boolean;
  noSpace: boolean;
  equalToOld: boolean;
  passwordsEqual: boolean;
}

interface IProps {
  isTemporaryPassword?: boolean;
  returnBack?: () => void;
}

const ChangePasswordForm: React.FC<IProps> = ({ isTemporaryPassword, returnBack }) => {
  const { t } = useTranslations();
  const { getUser } = useUserContext();
  const navigate = useNavigate();
  const [oldPassBlur, setOldPassBlur] = useState<boolean>(false);
  const [newPassFocus, setNewPassFocus] = useState<boolean>(false);
  const [newPassCopyFocus, setNewPassCopyFocus] = useState<boolean>(false);
  const [passwords, setPasswords] = useState<ChangePassword>({
    oldPassword: '',
    newPassword: '',
    newPasswordCopy: '',
  });
  const [user, setUser] = useState<ChangePasswordTemp>({
    login: '',
    password: '',
    oldPassword: '',
  });
  const [changePasswordTempError, setChangePasswordTempError] = useState<string | null>(null);

  const [passwordValidation, setPasswordValidation] = useState<IPasswordValidation>({
    hasUppercase: false,
    hasLowercase: false,
    hasSymbol: false,
    hasDigit: false,
    minLength: false,
    noSequence: false,
    noSpace: false,
    equalToOld: false,
    passwordsEqual: true,
  });
  const [response, setResponse] = useState<ResetPasswordResponse | null>(null);

  useEffect(() => {
    if (response && response.success) {
      setTimeout(() => {
        handleLogout();
      }, 2000);
    }
  }, [response]);

  const errors: Record<string, string> = {
    hasUppercase: 'min_1_upper_char',
    hasLowercase: 'min_1_lower_char',
    hasSymbol: 'min_1_symbol',
    hasDigit: 'min_1_digit',
    minLength: 'min_8_symbols',
    noSequence: 'without_sequence',
    noSpace: 'no_space',
    equalToOld: 'differ_from_old',
    passwordsEqual: 'passwords_not_identical',
  };

  const checkValidationError = useMemo(
    () => Object.values(passwordValidation).some((validation) => validation === false),
    [passwordValidation]
  );

  const checkOldPassword = useMemo(
    () =>
      passwords.oldPassword.trim().length !== passwords.oldPassword.length ||
      passwords.oldPassword.trim().length < 8,
    [passwords.oldPassword]
  );

  const validationErrors = useMemo(() => {
    return Object.keys(passwordValidation).filter(
      (key) => key !== 'passwordsEqual' && !passwordValidation[key]
    );
  }, [passwordValidation]);

  const getValidationErrors = useCallback(() => {
    return validationErrors.map((elem) => errors[elem]);
  }, [validationErrors]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });

    if (name === 'newPassword') {
      handlePasswordValidation(value.split(''));
    } else if (name === 'newPasswordCopy') {
      handleRepeatPasswordValidation(value);
    }
  };

  const handlePasswordValidation = (password: string[]) => {
    setPasswordValidation({
      ...passwordValidation,
      hasUppercase: password.some((char) => char >= 'A' && char <= 'Z'),
      hasLowercase: password.some((char) => char >= 'a' && char <= 'z'),
      hasSymbol: password.some((char) => '#$+-=!()%&_*.@",{}[]'.includes(char)),
      hasDigit: password.some((char) => char >= '0' && char <= '9'),
      minLength: password.length > 7,
      noSequence: checkNoSequenceSubstring(password.join('').toLowerCase()),
      noSpace: !password.some((char) => ' '.includes(char)),
      equalToOld: passwords.oldPassword !== password.join(''),
    });
  };

  const handleRepeatPasswordValidation = (password: string) => {
    setPasswordValidation({
      ...passwordValidation,
      passwordsEqual: passwords.newPassword === password,
    });
  };

  const checkNoSequenceSubstring = (str: string) => {
    const qwertySequence =
      'qwertyuiopasdfghjklzxcvbnmmnbvcxzlkjhgfdsapoiuytrewqqazwsxedcrfvtgbyhnujmikolp';
    const digitsSequence = '01234567890';
    const digitSequenceReverse = '09876543210';

    const substringLength = 3;

    for (let i = 0; i < str.length - substringLength; i++) {
      const substring = str.substring(i, i + substringLength);
      if (
        qwertySequence.includes(substring) ||
        digitsSequence.includes(substring) ||
        digitSequenceReverse.includes(substring)
      ) {
        return false;
      }
    }

    return str.length > 0;
  };

  const handleLogout = () => {
    removeTokens();
    window.location.href = '/auth';
  };

  const handleSubmit = () => {
    resetPassword(passwords.oldPassword, passwords.newPassword).then((data) => {
      setResponse(data);
    });
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleTempInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
    if (name === 'password') {
      handlePasswordValidation(value.split(''));
    }
  };

  const handleTempChangeButtonClick = () => {
    changePassword(user.login, user.password, user.oldPassword)
      .then(({ accessToken, refreshToken }) => {
        setTokens(accessToken, refreshToken);
        getUser();
        navigate('/');
      })
      .catch((err) => setChangePasswordTempError(err));
  };

  const handleBackClick = () => {
    if (returnBack) {
      returnBack();
    }
  };

  return (
    <>
      {!isTemporaryPassword ? (
        <div className={classes['user__inputs']}>
          {response && (
            <p className={classes[`response--${response.success}`]}>
              {response.success ? t('password_successfully_changed') : response.msg}
            </p>
          )}
          <label className={classes['user__inputs__label']}>{t('old_password')}</label>
          <Input
            className={classes['user__input']}
            value={passwords.oldPassword}
            onChange={handleInputChange}
            name={'oldPassword'}
            type={'password'}
            error={checkOldPassword && oldPassBlur}
            onBlur={() => setOldPassBlur(true)}
          />
          {checkOldPassword && oldPassBlur && (
            <p className={classes['user__inputs__error']}>{t('old_password_empty')}</p>
          )}
          <label className={classes['user__inputs__label']}>{t('new_password')}</label>
          <Input
            className={classes['user__input']}
            value={passwords.newPassword}
            onChange={handleInputChange}
            name={'newPassword'}
            type={'password'}
            onFocus={() => setNewPassFocus(true)}
            error={checkValidationError && newPassFocus}
          />
          {newPassFocus && validationErrors && (
            <p className={classes['user__inputs__error']}>
              {getValidationErrors().map((elem, index) => (
                <React.Fragment key={`${elem}--${index}`}>
                  <span>{t(elem)}</span>
                  <br />
                </React.Fragment>
              ))}
            </p>
          )}
          <label className={classes['user__inputs__label']}>{t('repeat_new_password')}</label>
          <Input
            className={classes['user__input']}
            value={passwords.newPasswordCopy}
            onChange={handleInputChange}
            name={'newPasswordCopy'}
            type={'password'}
            onKeyPress={handleKeyPress}
            onFocus={() => setNewPassCopyFocus(true)}
            error={!passwordValidation.passwordsEqual && newPassCopyFocus}
          />
          {!passwordValidation.passwordsEqual && newPassCopyFocus && (
            <p className={classes['user__inputs__error']}>{t(errors.passwordsEqual)}</p>
          )}
          <Button
            variant={'primary'}
            onClick={handleSubmit}
            className={classes['user__inputs__btn']}
            disabled={checkValidationError || checkOldPassword}
          >
            {t('change_password')}
          </Button>
        </div>
      ) : (
        <div className={classes['temporary']}>
          <Input
            name={'login'}
            value={user.login}
            onChange={handleTempInputChange}
            label={t('username')}
          />
          <Input
            name={'password'}
            value={user.password}
            onChange={handleTempInputChange}
            type={'password'}
            label={t('new_password')}
            onFocus={() => setNewPassFocus(true)}
            error={checkValidationError && newPassFocus}
          />
          {newPassFocus && validationErrors && (
            <p className={classes['user__inputs__error']}>
              {getValidationErrors().map((elem, index) => (
                <React.Fragment key={`${elem}--${index}`}>
                  <span>{t(elem)}</span>
                  <br />
                </React.Fragment>
              ))}
            </p>
          )}
          <Input
            value={user.oldPassword}
            onChange={handleTempInputChange}
            name={'oldPassword'}
            type={'password'}
            label={t('temp_password')}
          />
          <Button
            variant={'primary'}
            className={classes['temporary__btn']}
            onClick={handleTempChangeButtonClick}
            disabled={checkValidationError}
          >
            {t('login')}
          </Button>
          {changePasswordTempError && (
            <p className={classes['temporary__error']}>{changePasswordTempError}</p>
          )}
          <div className={classes['temporary__back']} onClick={handleBackClick}>
            {t('back_to_login')}
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePasswordForm;
