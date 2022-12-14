import React, { useRef } from 'react';
import classes from './Input.module.scss';
import classNames from 'classnames';

type PropsType = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label?: string;
  className?: string;
  type?: string;
  onKeyPress?: (_: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: boolean;
  placeholder?: string;
  variant?: string;
};

export const Input: React.FC<PropsType> = ({
  value,
  onChange,
  name,
  label,
  type = 'text',
  className,
  onKeyPress,
  onBlur,
  onFocus,
  error,
  placeholder,
  variant,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleEyeClick = () => {
    if (inputRef.current) {
      inputRef.current.type = inputRef.current.type === 'text' ? 'password' : 'text';
    }
  };

  return (
    <div className={classNames(classes['input__container'], className)}>
      {label && (
        <label className={classes['input__label']} htmlFor={name}>
          {label}
        </label>
      )}
      <div className={classes['input__wrapper']}>
        <input
          ref={inputRef}
          type={type}
          className={classNames(
            classes[`input${error ? '--error' : ''}`],
            classes[`input--${variant}`]
          )}
          value={value}
          name={name}
          onChange={onChange}
          onKeyDown={onKeyPress && ((event) => onKeyPress(event))}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <img
            src="../assets/icons/eye-closed.svg"
            alt="Password hidden"
            onClick={handleEyeClick}
          />
        )}
      </div>
    </div>
  );
};
