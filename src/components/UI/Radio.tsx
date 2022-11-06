import React from 'react';
import classes from './Radio.module.scss';

type PropsType = {
  checked: boolean;
  onClick: () => void;
  name: string;
  label: string;
  className?: string;
};

export const Radio: React.FC<PropsType> = ({ checked, onClick, name, label, className }) => {
  return (
    <label htmlFor={name} className={classes['radio__label']}>
      <input
        type="radio"
        id={name}
        name={name}
        checked={checked}
        onClick={onClick}
        className={classes['radio']}
      />
      <span className={classes['radio__circle']} />
      <div className={classes['radio__text']}>{label.toUpperCase()}</div>
    </label>
  );
};
