import React, { useEffect, useState } from 'react';
import AppointmentsModal from '../components/UI/Modals/AppointmentsModal';
import { Search } from '../components/UI/Search';
import ReusableTable from '../components/UI/Tables/ReusableTable';
import ReusableTableWithSearch from '../components/UI/Tables/ReusableTableWithSearch';
import { AppointmentHeader } from '../consts/data';
import { useTranslations } from '../hooks/useTranslations';
import { getAppointments } from '../requests/appointments';
import { IAppointment } from '../ts/types';

import classes from './Appointments.module.scss';

const Appointments = () => {
  const { t } = useTranslations();
  const [opened, setOpened] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const handleToggle = (val: boolean) => {
    setOpened(val);
  };

  useEffect(() => {
    getAppointments().then((res) => {
      setAppointments(res);
    });
  }, []);

  return (
    <main>
      <div className={classes['appointments']}>
        <h2 className={classes['appointments__title']}>{t('appointments')}</h2>
        <div className={classes['appointments__search']}>
          <Search onChange={setQuery} />
        </div>
        <AppointmentsModal opened={opened} handleToggle={handleToggle} />
      </div>

      <ReusableTable
        data={appointments}
        headers={AppointmentHeader}
        nameofHeader={'appointments'}
      />
    </main>
  );
};

export default Appointments;
