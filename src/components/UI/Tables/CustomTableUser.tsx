import React, { useState } from 'react';
import { Table, createStyles } from '@mantine/core';
import { DoctorData, PatientHeader } from '../../../consts/data';
import PatientModal from '../Modals/PatientModal';
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
}

const CustomTableUser: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslations();
  const { classes } = useStyles();
  const [opened, setOpened] = useState<boolean>(false);

  const handleToggle = (val: boolean) => {
    setOpened(val);
  };

  const handleTableClick = (id: number) => {
    console.log(id);
    handleToggle(opened);
  };

  return (
    <main className={cx['table']}>
      <div className={cx['table__header']}>
        <h2 className={cx['table__title']}>Patients</h2>
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
          {data.map((item: any) => (
            <tr key={item.id} onClick={() => handleTableClick(item.id)}>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.birth_date}</td>
              <td>{item.email}</td>
              <td>{item.iin_number}</td>
              <td>{item.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
};

export default CustomTableUser;
