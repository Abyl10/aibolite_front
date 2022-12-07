import React, { useEffect, useState } from 'react';
import CustomTableDoctor from '../components/UI/Tables/CustomTableDoctor';
import { getDoctors } from '../requests/doctors';
import { IDoctor } from '../ts/types';

const Doctors = () => {
  const [doctors, setDoctors] = useState<IDoctor[]>([]);

  useEffect(() => {
    getDoctors().then((res) => {
      setDoctors(res);
    });
  }, []);

  return (
    <main>
      <CustomTableDoctor data={doctors} />
    </main>
  );
};

export default Doctors;
