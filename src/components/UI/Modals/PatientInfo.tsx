import React, { useEffect, useState } from 'react';
import { IPatient } from '../../../ts/types';
import ModalPortal from '../ModalPortal';

import classes from './PatientInfo.module.scss';
import modalClasses from '../../../assets/sass/components/_modal.scss';
import { Input } from '../Input';
import { useTranslations } from '../../../hooks/useTranslations';
import { Button } from '../Button';
import { updatePatient } from '../../../requests/patients';
import { Center, Text } from '@mantine/core';

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
  password: '',
};

const PatientInfo: React.FC<IProps> = ({ handleToggle, values }) => {
  const [form, setForm] = useState<IPatient>(initialPatient);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { t } = useTranslations();

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

  const handleEditClick = () => {
    updatePatient(form.id ? form.id : 0, form)
      .then((res) => {
        setSuccess('Patient info updated successfully');
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong');
      });
  };

  const handleCancelClick = () => {
    handleToggle();
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
                  label={t('name')}
                  variant="primary"
                  value={form.name}
                  onChange={handleInputChange}
                  name={'name'}
                />
                <Input
                  label={t('surname')}
                  variant="primary"
                  value={form.surname}
                  onChange={handleInputChange}
                  name={'surname'}
                />
                <Input
                  label={t('iin')}
                  variant="primary"
                  value={form.iin_number}
                  onChange={handleInputChange}
                  name={'iin_number'}
                />
                <Input
                  label={t('id_number')}
                  variant="primary"
                  value={form.id_number}
                  onChange={handleInputChange}
                  name={'id_number'}
                />
                <Input
                  label={t('blood_group')}
                  variant="primary"
                  value={form.blood_group}
                  onChange={handleInputChange}
                  name={'blood_group'}
                />
                <Input
                  label={t('email')}
                  variant="primary"
                  value={form.email}
                  onChange={handleInputChange}
                  name={'email'}
                />
                <Input
                  label={t('address')}
                  variant="primary"
                  value={form.address}
                  onChange={handleInputChange}
                  name={'address'}
                />
                <Input
                  label={t('marital_status')}
                  variant="primary"
                  value={form.marital_status}
                  onChange={handleInputChange}
                  name={'marital_status'}
                />
                <Input
                  label={t('birth_date')}
                  variant="primary"
                  value={form.birth_date}
                  onChange={handleInputChange}
                  name={'birth_date'}
                />
                <Input
                  label={t('phone')}
                  variant="primary"
                  value={form.phone}
                  onChange={handleInputChange}
                  name={'phone'}
                />
              </div>
              <Center>
                {success && (
                  <Text color={'green'} size="md">
                    {success}
                  </Text>
                )}
                {error && (
                  <Text color={'red'} size="md">
                    {error}
                  </Text>
                )}
              </Center>
              <div className={classes['button']}>
                <Button variant={'tertiary'} onClick={handleEditClick}>
                  {t('edit')}
                </Button>
                <Button variant={'tertiary'} onClick={handleCancelClick}>
                  {t('cancel')}
                </Button>
              </div>
            </div>
          )}
        </ModalPortal>
      </React.Fragment>
    </main>
  );
};

export default PatientInfo;
