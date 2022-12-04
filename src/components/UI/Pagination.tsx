import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import classes from './Pagination.module.scss';

type Props = {
  currentPage: number;
  pageCount?: number;
  setCurrentPage: (prevPage: number) => void;
};

const Pagination: React.FC<Props> = ({ currentPage, pageCount, setCurrentPage }) => {
  const [pages, setPages] = useState<number[]>([1, 2, 3, 4, 5]);

  useEffect(() => {
    setPages([1, 2, 3]);
  }, []);

  return (
    <div className={classes['pagination__wrapper']}>
      {pages.map((item) => (
        <button
          key={item}
          className={classNames(
            classes['pagination__button'],
            currentPage === item && classes['pagination__button--active']
          )}
          onClick={() => setCurrentPage(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
