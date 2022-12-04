import React from 'react';
import ReusableTable from '../components/UI/Tables/ReusableTable';
import { SpecializationsHeader, SpecializationsData } from '../consts/data';

const Specializations = () => {
  return (
    <main>
      <ReusableTable
        nameofHeader={'specializations'}
        data={SpecializationsData}
        headers={SpecializationsHeader}
      />
    </main>
  );
};

export default Specializations;
