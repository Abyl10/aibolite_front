import React, { ReactElement } from 'react';
import classes from './AnalyticsCard.modules.scss';

type Props = {
  title: string;
  quantity: number | string;
  icon: ReactElement;
};

const AnalyticsCard: React.FC<Props> = ({ title, quantity, icon }) => {
  const ttl = title.split(' ');
  return (
    <div className={classes['card']}>
      <p className={classes['card__title']}>
        {ttl[0]}
        <br />
        {ttl
          .map((elem, index) => {
            if (index !== 0) {
              return elem;
            }
          })
          .join(' ')}
      </p>
      <p className={classes['card__quantity']}>{quantity}</p>
      {icon}
    </div>
  );
};

export default AnalyticsCard;
