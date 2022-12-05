import React, { useState } from 'react';

import ReusableTableWithSearch from '../components/UI/Tables/ReusableTableWithSearch';

import { DepartmentsHeader, DepartmentsData } from '../consts/data';

const Departments = () => {
  return (
    <main>
      <ReusableTableWithSearch
        nameofHeader={'departments'}
        data={DepartmentsData}
        headers={DepartmentsHeader}
      />
    </main>
  );
};

export default Departments;
