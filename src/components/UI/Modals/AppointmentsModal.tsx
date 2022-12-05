import React from 'react';
import InputMask from 'react-input-mask';
import { IAppointment } from '../../../ts/types';
import classes from './PatientModal.scss';
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
}

const AppointmentsModal: React.FC<IProps> = ({ opened, handleToggle }) => {
  const { classes, cx } = useStyles();
  const { t } = useTranslations();

  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const form = useForm({
    initialValues: {
      name: '',
      surname: '',
      date: '',
      doctor: '',
      doctor_specialization: '',
      phone: '',
    },
  });

  const handleRegisterClick = () => {
    handleToggle(true);
  };

  const handleSubmitClick = () => {
    return;
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
        onClose={() => handleToggle(false)}
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
            <TextInput
              label={t('surname')}
              placeholder="Your surname"
              size="md"
              style={{ width: 345 }}
              required
              hideControls
              {...form.getInputProps('surname')}
            />
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
              data={[
                { value: 'dastan', label: 'Dastan' },
                { value: 'meiirlan', label: 'Meiirlan' },
                { value: 'shyngys', label: 'Shyngys' },
                { value: 'denis', label: 'Denis' },
                { value: 'abylay', label: 'Abylay' },
              ]}
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
