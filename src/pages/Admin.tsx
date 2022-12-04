import React, { useEffect, useState } from 'react';
import CustomTableUser from '../components/UI/Tables/CustomTableUser';
import { getPatient, getPatients } from '../requests/patients';
import { IPatient } from '../ts/types';

const Admin = () => {
  const [patients, setPatients] = useState<IPatient[]>([]);

  useEffect(() => {
    getPatients().then((res) => {
      setPatients(res);
    });
  }, []);

  return (
    <main>
      <CustomTableUser data={patients} />
    </main>
  );
};

export default Admin;
