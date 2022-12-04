import React, { useState } from 'react';
import ReusableTable from '../components/UI/Tables/ReusableTable';
import { DepartmentsHeader, DepartmentsData } from '../consts/data';

const Departments = () => {
  return (
    <main>
      <ReusableTable
        nameofHeader={'departments'}
        data={DepartmentsData}
        headers={DepartmentsHeader}
      />
    </main>
  );
};

export default Departments;
