import React, { useEffect, useRef, useState } from 'react';
import { Table, createStyles } from '@mantine/core';
import { DoctorData, PatientHeader } from '../../../consts/data';
import PatientModal from '../Modals/PatientModal';
import cx from './CustomTableUser.module.scss';
import { useTranslations } from '../../../hooks/useTranslations';
import { Search } from '../Search';
import PatientInfo from '../Modals/PatientInfo';
import { IPatient } from '../../../ts/types';

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

interface IProps {
  data: any;
}

const CustomTableUser: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslations();
  const { classes } = useStyles();
  const [opened, setOpened] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const ref = useRef<HTMLTableCellElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<IPatient>();

  const handleModalToggle = () => {
    setOpen(!open);
  };

  const handleToggle = (val: boolean) => {
    setOpened(val);
  };

  const handleTableClick = (id: number, item: IPatient) => {
    setSelectedId(id);
    setSelectedPatient(item);
    handleToggle(opened);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [selectedId]);

  const handleSaveClick = () => {
    return;
  };

  return (
    <main className={cx['table']}>
      <div className={cx['table__header']}>
        <h2 className={cx['table__title']}>Patients</h2>
        <div className={cx['table__search']}>
          <Search onChange={setQuery} />
        </div>
        <PatientModal opened={opened} handleToggle={handleToggle} />
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
                <td ref={ref}>{item.birth_date}</td>
                <td className={item.id === selectedId ? classes.tableActive : classes.table}>
                  <div>{item.email}</div>
                </td>
                <td ref={ref}>{item.iin_number}</td>
                <td ref={ref}>{item.id}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      {selectedId && (
        <PatientInfo handleToggle={() => setSelectedId(null)} values={selectedPatient} />
      )}
    </main>
  );
};

export default CustomTableUser;
