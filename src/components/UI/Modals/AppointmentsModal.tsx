import React, { useEffect } from 'react';
import InputMask from 'react-input-mask';
import { IDoctor, IUser, Role } from '../../../ts/types';
import { useState } from 'react';
import {
  Modal,
  Button,
  Group,
  createStyles,
  TextInput,
  Select,
  Input,
  Center,
  Space,
  Text,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useTranslations } from '../../../hooks/useTranslations';

import { SpecializationsData } from '../../../consts/data';
import { getDoctors } from '../../../requests/doctors';
import { createAppointment } from '../../../requests/appointments';
import { getUserProfile } from '../../../requests/user';

const useStyles = createStyles((theme) => ({
  inOneRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outside: {
    opacity: 0,
  },
}));

interface IProps {
  opened: boolean;
  handleToggle: (val: boolean) => void;
  reloadData: () => void;
}

const AppointmentsModal: React.FC<IProps> = ({ opened, handleToggle, reloadData }) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslations();

  const [userProfile, setUserProfile] = useState<IUser>();
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const form = useForm({
    initialValues: {
      name: '',
      surname: '',
      date: '',
      doctor: '',
      doctor_specialization: '',
      phone: '',
      time: '',
    },
  });

  useEffect(() => {
    getDoctors().then((res) => {
      setDoctors(res);
    });
    getUserProfile().then((res) => {
      setUserProfile(res);
    });
  }, []);

  const handleRegisterClick = () => {
    handleToggle(true);
  };

  const handleSubmitClick = () => {
    const { values } = form;
    if (userProfile?.role === Role.PATIENT) {
      const appointmentData = {
        time: values.time,
        doctor_id: values.doctor.id,
        patient_id: userProfile?.id,
      };
      createAppointment(appointmentData).then((res) => {
        setSuccess('Appointment created successfully');
        reloadData();
      });
    } else {
      setError('You are not a patient');
    }
  };

  const handleOnClose = () => {
    handleToggle(false);
    setSuccess('');
    setError('');
    form && form.reset();
  };

  return (
    <>
      <Modal
        title="Fill in this form to add a create appointment"
        size="xl"
        transition="slide-down"
        transitionDuration={300}
        transitionTimingFunction="ease"
        overlayOpacity={0.5}
        overlayBlur={1}
        opened={opened}
        onClose={handleOnClose}
      >
        <form>
          <div className={classes.inOneRow}>
            <TextInput
              label={t('name')}
              placeholder="Your name"
              size="md"
              style={{ width: 345 }}
              required
              hideControls
              {...form.getInputProps('name')}
            />
            <Input.Wrapper
              label="Contact Number"
              size="md"
              style={{ width: 345 }}
              required
              {...form.getInputProps('phone')}
            >
              <Input
                placeholder="Your phone"
                size="md"
                style={{ width: 345 }}
                component={InputMask}
                mask="+7 (999) 999-99-99"
                {...form.getInputProps('phone')}
              />
            </Input.Wrapper>
          </div>
          <Space h="md"></Space>
          <div className={classes.inOneRow}>
            <Select
              label={t('specializations')}
              placeholder="Choose specialization"
              size="md"
              style={{ width: 345 }}
              data={SpecializationsData.map((item) => ({
                label: item.name,
                value: item.id,
              }))}
              required
              transition="scale-y"
              transitionDuration={80}
              transitionTimingFunction="ease"
              {...form.getInputProps('doctor_specialization')}
            />
            <Select
              label={t('doctor')}
              placeholder="Choose doctor"
              size="md"
              style={{ width: 345 }}
              data={doctors.map((doctor) => ({
                label: `${doctor.name} ${doctor.surname}`,
                value: doctor,
              }))}
              required
              transition="scale-y"
              transitionDuration={80}
              transitionTimingFunction="ease"
              {...form.getInputProps('doctor')}
            />
          </div>
          <Space h="md"></Space>
          <div className={classes.inOneRow}>
            <DatePicker
              label={t('appointment_date')}
              placeholder="Appointment date"
              size="md"
              style={{ width: 345 }}
              disableOutsideEvents
              dayClassName={(date, modifiers) =>
                cx({
                  [classes.outside]: modifiers.outside,
                })
              }
              required
              {...form.getInputProps('date')}
            />
            <Select
              label={t('Time')}
              placeholder="Choose Time"
              size="md"
              style={{ width: 345 }}
              data={[
                { label: '09:00 - 09:30', value: '09:00 - 09:30' },
                { label: '09:30 - 10:00', value: '10:00 - 10:30' },
                { label: '10:30 - 11:00', value: '11:00 - 11:30' },
                { label: '11:30 - 12:00', value: '12:00 - 12:30' },
                { label: '12:30 - 13:00', value: '14:00 - 14:30' },
                { label: '14:30 - 15:00', value: '15:00 - 15:30' },
                { label: '15:00 - 16:00', value: '16:00 - 16:30' },
                { label: '16:00 - 17:00', value: '17:00 - 17:30' },
              ]}
              required
              transition="scale-y"
              transitionDuration={80}
              transitionTimingFunction="ease"
              {...form.getInputProps('time')}
            />
          </div>

          <Space h="md"></Space>
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
          <Center>
            <Button onClick={handleSubmitClick} mt="sm">
              {t('create_appointment')}
            </Button>
          </Center>
        </form>
      </Modal>
      <Group position="center">
        <Button size="xs" onClick={handleRegisterClick}>
          {t('create_appointment')}
        </Button>
      </Group>
    </>
  );
};

export default AppointmentsModal;
