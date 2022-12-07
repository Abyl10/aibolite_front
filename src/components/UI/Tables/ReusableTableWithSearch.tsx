import React, { useEffect, useState } from 'react';
import { Table, createStyles, Pagination, Center } from '@mantine/core';
import cx from './CustomTableUser.module.scss';
import { useTranslations } from '../../../hooks/useTranslations';
import { IDepartment, IDoctor } from '../../../ts/types';
import ModalDoctorDepartment from '../Modals/ModalDoctorDepartment';

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
  nameofHeader?: string;
}

const ReusableTableWithSearch: React.FC<IProps> = ({ data, headers, nameofHeader }) => {
  const { t } = useTranslations();
  const { classes } = useStyles();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [selectedId, setSelectedId] = useState<number>();
  const total = 5;
  const mxPage = Math.ceil(data.length / total);

  const handleTableClick = (id: number) => {
    setSelectedId(id);
  };

  useEffect(() => {
    data.map((item: IDepartment) => {
      if (item.id === selectedId) {
        setDoctors(item.doctors);
      }
    });
  }, [selectedId]);

  return (
    <main className={cx['table']}>
      {/* <div className={cx['table__header']}>
        <h2 className={cx['table__title']}>{t(nameofHeader)}</h2>
      </div> */}
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
        {data.length > 5 && (
          <Pagination page={currentPage} onChange={setCurrentPage} total={mxPage} />
        )}
      </Center>
      {selectedId && (
        <ModalDoctorDepartment handleToggle={() => setSelectedId(undefined)} values={doctors} />
      )}
    </main>
  );
};

export default ReusableTableWithSearch;
