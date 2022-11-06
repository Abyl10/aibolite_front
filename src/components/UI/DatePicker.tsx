import React, { Dispatch, SetStateAction, useState } from 'react';
import { DateRange } from 'react-date-range';
import { ru, enUS, kk } from 'date-fns/locale';
import { DateType } from '../../pages/Analytics';
import { Backdrop } from './Backdrop';
import classes from './DatePicker.module.scss';

type Props = {
  dateRange: DateType[];
  setDateRange: Dispatch<SetStateAction<DateType[]>>;
};

const DatePicker: React.FC<Props> = ({ dateRange, setDateRange }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDropdownClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={classes['dropdown']}>
      {isOpen ? (
        <>
          <Backdrop handleOpen={handleOpen} />
          <DateRange
            className={classes['dropdown__body']}
            editableDateInputs={true}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            locale={ru}
            dateDisplayFormat="dd.MM.yyyy"
            startDatePlaceholder=""
            endDatePlaceholder=""
            staticRanges={[]}
            inputRanges={[]}
          />
        </>
      ) : (
        <div className={classes['dropdown__header']} onClick={handleDropdownClick}>
          <img
            src={'../../assets/icons/calendar.svg'}
            alt={'calendar'}
            className={classes['dropdown__header__calendar-icon']}
          />
          {dateRange[0].endDate ? (
            dateRange[0].endDate.getTime() === dateRange[0].startDate?.getTime() ? (
              <p
                className={classes['dropdown__header__title']}
              >{`${dateRange[0].startDate?.toLocaleDateString('ru-RU')}`}</p>
            ) : (
              <p
                className={classes['dropdown__header__title']}
              >{`${dateRange[0].startDate?.toLocaleDateString(
                'ru-RU'
              )} - ${dateRange[0].endDate?.toLocaleDateString('ru-RU')}`}</p>
            )
          ) : (
            <p
              className={classes['dropdown__header__title']}
            >{`${dateRange[0].startDate?.toLocaleDateString('ru-RU')}`}</p>
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

export default DatePicker;
