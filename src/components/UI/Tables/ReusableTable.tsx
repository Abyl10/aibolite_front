import React, { useState } from 'react';
import { Table, createStyles, Pagination, Center } from '@mantine/core';
import cx from './CustomTableUser.module.scss';
import { useTranslations } from '../../../hooks/useTranslations';

const useStyles = createStyles((theme) => ({
  tableHeader: {
    thead: {
      border: 'none',
    },
  },
}));

interface IProps {
  data: any;
  headers: any;
}

const ReusableTable: React.FC<IProps> = ({ data, headers }) => {
  const { t } = useTranslations();
  const { classes } = useStyles();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const total = 5;
  const mxPage = Math.ceil(data.length / total);

  const handleTableClick = (id: number) => {
    console.log(id);
  };

  return (
    <main className={cx['table']}>
      <div className={cx['table__header']}>
        <h2 className={cx['table__title']}>Departments</h2>
      </div>
      <Table highlightOnHover fontSize={'xs'} className={classes.tableHeader}>
        <thead>
          <tr>
            {Object.keys(headers).map((key) => (
              <th key={key}>{t(`${key}`)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(currentPage * 5 - 5, 5 * (currentPage + 1) - 5).map((item: any) => (
            <tr key={item.id} onClick={() => handleTableClick(item.id)}>
              <td>{item.id}</td>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Center mt={30}>
        <Pagination page={currentPage} onChange={setCurrentPage} total={mxPage} />
      </Center>
    </main>
  );
};

export default ReusableTable;
