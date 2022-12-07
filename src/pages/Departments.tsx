import React, { useEffect, useState } from 'react';

import ReusableTableWithSearch from '../components/UI/Tables/ReusableTableWithSearch';

import { DepartmentsHeader } from '../consts/data';
import { getDepartments } from '../requests/departments';
import { IDepartment } from '../ts/types';

const Departments = () => {
  const [departments, setDepartments] = useState<IDepartment[]>([]);

  useEffect(() => {
    getDepartments().then((res) => {
      setDepartments(res);
      console.log(res);
    });
  }, []);

  return (
    <main>
      <ReusableTableWithSearch
        nameofHeader={'departments'}
        data={departments}
        headers={DepartmentsHeader}
      />
    </main>
  );
};

export default Departments;
