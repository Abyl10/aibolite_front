import React, { useEffect, useState } from 'react';
import CustomTableUser from '../components/UI/Tables/CustomTableUser';
import { getPatients } from '../requests/patients';
import { IPatient } from '../ts/types';

const Patients = () => {
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

export default Patients;
