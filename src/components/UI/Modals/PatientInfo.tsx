import React, { useEffect, useState } from 'react';
import { IPatient } from '../../../ts/types';
import ModalPortal from '../ModalPortal';

import classes from './PatientInfo.module.scss';
import modalClasses from '../../../assets/sass/components/_modal.scss';
import { Input } from '../Input';

interface IProps {
  handleToggle: () => void;
  values: IPatient | undefined;
}

const initialPatient: IPatient = {
  id: 0,
  iin_number: '',
  id_number: '',
  name: '',
  surname: '',
  middle_name: '',
  blood_group: '',
  emergency_contact_number: '',
  email: '',
  address: '',
  marital_status: '',
  registration_date: '',
  birth_date: '',
  phone: '',
};

const PatientInfo: React.FC<IProps> = ({ handleToggle, values }) => {
  const [form, setForm] = useState<IPatient>(initialPatient);

  useEffect(() => {
    if (values) {
      setForm(values);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main className={classes['modal']}>
      <React.Fragment key={'modal'}>
        <ModalPortal open={true} handleClose={handleToggle} targetId={'modal__header'}>
          {values && (
            <div className={classes['patient']}>
              <div className={modalClasses['modal__header']}>
                <div className={modalClasses['modal__header__title']}>Patient Info</div>
                <img
                  src={'../../../assets/icons/x.svg'}
                  alt={'close'}
                  className={modalClasses['modal__header__close']}
                  onClick={handleToggle}
                />
              </div>
              <div className={classes['patient__info']}>
                <Input
                  variant="primary"
                  value={form.name}
                  onChange={handleInputChange}
                  name={'name'}
                />
                <div>{`Name: ${values.name}`}</div>
                <div>{`Surname: ${values.surname}`}</div>
                <div>{`Iin-number: ${values.iin_number}`}</div>
              </div>
            </div>
          )}
        </ModalPortal>
      </React.Fragment>
    </main>
  );
};

export default PatientInfo;
