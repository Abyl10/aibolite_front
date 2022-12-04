import React, { useState } from 'react';
import { Pagination } from '@mantine/core';
import ReusableTable from '../components/UI/Tables/ReusableTable';
import { DepartmentsHeader, DepartmentsData } from '../consts/data';

const Departments = () => {
  return (
    <main>
      <ReusableTable data={DepartmentsData} headers={DepartmentsHeader} />
    </main>
  );
};

export default Departments;
