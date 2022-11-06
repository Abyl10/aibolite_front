import React, { useCallback, useEffect, useState } from 'react';
import classes from './Calendarik.module.scss';
import { Backdrop } from './Backdrop';
import { Calendar } from 'react-date-range';
import { ru } from 'date-fns/locale';

type Props = {
  date: Date | null;
  setDate: (date: Date | null) => void;
};

const Calendarik: React.FC<Props> = ({ date, setDate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [localDate, setLocalDate] = useState<Date | null>(null);

  useEffect(() => {
    setLocalDate(date);
  }, [date]);

  const handleDropdownClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleCancel = () => {
    setDate(null);
    handleOpen();
  };

  const handleOK = () => {
    setDate(localDate);
    handleOpen();
  };

  return (
    <div className={classes['dropdown']}>
      {isOpen ? (
        <React.Fragment key={'dropdown'}>
          <Backdrop handleOpen={handleOpen} />
          <div className={classes['dropdown__body']}>
            <Calendar onChange={(item: Date) => setLocalDate(item)} locale={ru} date={localDate} />
            <div className={classes['dropdown__body--btns']}>
              <button className={classes['dropdown__body--btn']} onClick={handleCancel}>
                Отмена
              </button>
              <button className={classes['dropdown__body--btn']} onClick={handleOK}>
                ОК
              </button>
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className={classes['dropdown__header']} onClick={handleDropdownClick}>
          <img
            src={'../../assets/icons/calendar.svg'}
            alt={'calendar'}
            className={classes['dropdown__header__calendar-icon']}
          />
          {date ? (
            <p className={classes['dropdown__header__title']}>{`${date.toLocaleDateString(
              'ru-RU'
            )}`}</p>
          ) : (
            <p className={classes['dropdown__header__placeholder']}>Выберите дату*</p>
          )}
          <img
            src="../../assets/icons/down-arrow.svg"
            alt="down-arrow"
            className={classes['dropdown__header-icon']}
          />
        </div>
      )}
    </div>
  );
};

export default Calendarik;
