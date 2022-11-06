import React from 'react';
import { Dropdown } from './Dropdown';
import classes from './ProgressList.module.scss';

type Props = {
  title: string;
  options: string[];
};

const reserves = [
  { reserve: 'Спец. Одежда', percentage: 30 },
  { reserve: 'Эмаль', percentage: 22 },
  { reserve: 'Краска', percentage: 13 },
  { reserve: 'Бумага', percentage: 56 },
  { reserve: 'Спец. Одежда', percentage: 30 },
  { reserve: 'Эмаль', percentage: 22 },
  { reserve: 'Краска', percentage: 13 },
  { reserve: 'Бумага', percentage: 56 },
  { reserve: 'Спец. Одежда', percentage: 30 },
  { reserve: 'Эмаль', percentage: 22 },
  { reserve: 'Краска', percentage: 13 },
  { reserve: 'Бумага', percentage: 56 },
  { reserve: 'Спец. Одежда', percentage: 30 },
  { reserve: 'Эмаль', percentage: 22 },
  { reserve: 'Краска', percentage: 13 },
  { reserve: 'Бумага', percentage: 56 },
  { reserve: 'Спец. Одежда', percentage: 30 },
  { reserve: 'Эмаль', percentage: 22 },
  { reserve: 'Краска', percentage: 13 },
  { reserve: 'Бумага', percentage: 56 },
  { reserve: 'Спец. Одежда', percentage: 30 },
  { reserve: 'Эмаль', percentage: 22 },
  { reserve: 'Краска', percentage: 13 },
  { reserve: 'Бумага', percentage: 56 },
  { reserve: 'Спец. Одежда', percentage: 30 },
  { reserve: 'Эмаль', percentage: 22 },
  { reserve: 'Краска', percentage: 13 },
  { reserve: 'Бумага', percentage: 56 },
];

const ProgressList: React.FC<Props> = ({ title, options }) => {
  return (
    <div className={classes['card']}>
      <div className={classes['card__header']}>
        <p className={classes['card__title']}>{title}</p>
        <Dropdown
          options={options}
          placeholder={'Год'}
          onChange={() => {
            return;
          }}
          classname={'small'}
          withSearch={false}
        />
      </div>
      <div className={classes['card__list__wrapper']}>
        <ul className={classes['card__list']}>
          {reserves.map((elem, index) => {
            return (
              <li key={`${elem.reserve}--${index}`} className={classes['card__list__item']}>
                {elem.reserve}
                <div>
                  <progress value={elem.percentage} max={100} />
                  <span>{elem.percentage}%</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ProgressList;
