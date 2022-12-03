import React from 'react';
import { Table, createStyles } from '@mantine/core';
import { DoctorData, DoctorHeader } from '../../consts/data';

const useStyles = createStyles((theme) => ({
  tableHeader: {
    // select root of table header
    thead: {
      border: 'none',
    },
  },
}));

const CustomTable = () => {
  const { classes } = useStyles();
  return (
    <main>
      <Table highlightOnHover fontSize={'xs'} className={classes.tableHeader}>
        <thead>
          <tr>
            {Object.keys(DoctorHeader).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DoctorData.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.birthDate}</td>
              <td>{item.email}</td>
              <td>{item.IIN}</td>
              <td>{item.id}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
};

export default CustomTable;
