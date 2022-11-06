import React from 'react';
import { Button } from '../UI/Button';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import BoxIcon from '../../assets/icons/js/BoxIcon';
import DocumentIcon from '../../assets/icons/js/DocumentIcon';
import CheckListIcon from '../../assets/icons/js/CheckListIcon';
import AddIcon from '../../assets/icons/js/AddIcon';
import classes from './AccountantButtons.module.scss';
import globalClasses from '../../assets/sass/base/_base.scss';

export const AccountantButtons: React.FC = () => {
  const handleProfileButton = () => {};
  const handleAddUserButton = () => {};
  const handleAddCategoryButton = () => {};

  const handleAddStoreButton = () => {};

  return (
    <div className={classes['buttons']}>
      <NavLink
        to={'/reception'}
        className={({ isActive }) =>
          isActive
            ? classNames(globalClasses['link'], globalClasses['link--active'])
            : globalClasses['link']
        }
      >
        <Button variant="secondary" onClick={handleProfileButton}>
          <DocumentIcon />
          Прием
        </Button>
      </NavLink>
      <NavLink
        to={'/release'}
        className={({ isActive }) =>
          isActive
            ? classNames(globalClasses['link'], globalClasses['link--active'])
            : globalClasses['link']
        }
      >
        <Button variant="secondary" onClick={handleAddUserButton}>
          <DocumentIcon />
          Отпуск
        </Button>
      </NavLink>
      <Button variant="secondary" onClick={handleAddCategoryButton}>
        <DocumentIcon />
        Отчет
      </Button>
      <NavLink
        to={'/inventory'}
        className={({ isActive }) =>
          isActive
            ? classNames(globalClasses['link'], globalClasses['link--active'])
            : globalClasses['link']
        }
      >
        <Button variant="secondary">
          <BoxIcon />
          Инвентаризация
        </Button>
      </NavLink>
      <Button variant="secondary" onClick={handleAddStoreButton}>
        <CheckListIcon />
        Списание
      </Button>
      <Button variant="secondary" onClick={handleAddStoreButton}>
        <CheckListIcon />
        Брак
      </Button>
      <Button variant="secondary" onClick={handleAddStoreButton}>
        <AddIcon />
        Дополнение
      </Button>
    </div>
  );
};
