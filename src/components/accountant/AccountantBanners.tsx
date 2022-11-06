import React from 'react';
import classes from './AccountantBanners.module.scss';
import classNames from 'classnames';
import { StatsIcon } from '../../assets/icons/js/StatsIcon';

export const AccountantBanners: React.FC = () => {
  return (
    <div className={classes['banners']}>
      <div className={classNames(classes['box'], classes['box--upper'])}>
        <div className={classes['box__stat']}>125 235</div>
        <div className={classes['box__name']}>Колличество запасов</div>
        <StatsIcon />
      </div>
      <div className={classNames(classes['box'], classes['box--upper'])}>
        <div className={classes['box__stat']}>42 257 589</div>
        <div className={classes['box__name']}>Стоимость запасов</div>
        <StatsIcon />
      </div>
      <div className={classNames(classes['box'], classes['box--upper'])}>
        <div className={classes['box__stat']}>56</div>
        <div className={classes['box__name']}>Колличество поставщиков</div>
        <StatsIcon />
      </div>
      <div className={classNames(classes['box'], classes['box--lower'])}>
        <div className={classes['box__stat']}>320</div>
        <div className={classes['box__name']}>Приемок за месяц</div>
        <StatsIcon />
      </div>
      <div className={classNames(classes['box'], classes['box--lower'])}>
        <div className={classes['box__stat']}>320</div>
        <div className={classes['box__name']}>Отпусков за месяц</div>
        <StatsIcon />
      </div>
      <div className={classNames(classes['box'], classes['box--lower'])}>
        <div className={classes['box__stat']}>72 568 ₸</div>
        <div className={classes['box__name']}>Средняя цена за закупку</div>
        <StatsIcon />
      </div>
    </div>
  );
};
