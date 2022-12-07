import { createStyles, Table } from '@mantine/core';
import React, { useState } from 'react';

import { PatientHeader } from '../../../consts/data';
import { useTranslations } from '../../../hooks/useTranslations';
import DoctorModal from '../Modals/DoctorModal';
import PatientInfo from '../Modals/PatientInfo';
import PatientModal from '../Modals/PatientModal';
import { Search } from '../Search';

import cx from './CustomTableDoctor.module.scss';

interface IProps {
  data: any;
}

const useStyles = createStyles((theme) => ({
  tableHeader: {
    thead: {
      border: 'none',
    },
  },
  table: {},
  tableActive: {},
  editInput: {
    width: '75px',
    height: '20px',
    border: '1px solid #000',
    outline: 'none',
    fontSize: '1.4rem',
    borderRadius: '5px',
  },
}));

const CustomTableDoctor: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslations();
  const [query, setQuery] = useState<string>('');
  const [opened, setOpened] = useState<boolean>(false);
  const { classes } = useStyles();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleToggle = (val: boolean) => {
    setOpened(val);
  };

  const handleTableClick = (id: number, item: any) => {
    console.log(id, item);
  };

  return (
    <main className={cx['table']}>
      <div className={cx['table__header']}>
        <h2 className={cx['table__title']}>Patients</h2>
        <div className={cx['table__search']}>
          <Search onChange={setQuery} />
        </div>
        <DoctorModal opened={opened} handleToggle={handleToggle} />
      </div>
      <Table highlightOnHover fontSize={'xs'} className={classes.tableHeader}>
        <thead>
          <tr>
            {Object.keys(PatientHeader).map((key) => (
              <th key={key}>{t(`${key}`)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item: any) => {
              if (query === '') {
                return item.name;
              } else if (item.name.toLowerCase().includes(query.toLowerCase())) {
                return item.name.toLowerCase().includes(query.toLowerCase());
              }
            })
            .map((item: any) => (
              <tr key={item.id} onClick={() => handleTableClick(item.id, item)}>
                <td className={item.id === selectedId ? classes.tableActive : classes.table}>
                  <div>{item.name}</div>
                </td>
                <td className={item.id === selectedId ? classes.tableActive : classes.table}>
                  <div>{item.phone}</div>
                </td>
                <td>{item.birth_date}</td>
                <td className={item.id === selectedId ? classes.tableActive : classes.table}>
                  <div>{item.email}</div>
                </td>
                <td>{item.iin_number}</td>
                <td>{item.id}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </main>
  );
};

export default CustomTableDoctor;
