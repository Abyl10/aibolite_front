import React from 'react';
import InputMask from 'react-input-mask';
import { IPatient } from '../../../ts/types';
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
  PasswordInput,
  Progress,
  Text,
  Popover,
  Box,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconEyeCheck, IconEyeOff, IconX, IconCheck } from '@tabler/icons';
import { createPatient } from '../../../requests/patients';

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

const PasswordRequirement = ({ meets, label }: { meets: boolean; label: string }) => {
  return (
    <Text
      color={meets ? 'teal' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />} <Box ml={10}>{label}</Box>
    </Text>
  );
};

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

const getStrength = (password: string) => {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
};

interface IProps {
  opened: boolean;
  handleToggle: (val: boolean) => void;
}

const PatientModal: React.FC<IProps> = ({ opened, handleToggle }) => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const [value, setValue] = useState('');
  const { classes, cx } = useStyles();
  const strength = getStrength(value);
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const form = useForm({
    initialValues: {
      dob: new Date(),
      iin: '',
      id: '',
      name: '',
      surname: '',
      regDate: new Date(),
      maritalStatus: '',
      bloodType: '',
      phone: '',
      address: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      dob: (value) => (value === null ? 'Date of birth is required' : null),
      iin: (value) => (value.length !== 12 ? 'IIN must be 12 digits' : null),
      id: (value) => (value.length !== 9 ? 'ID must be 9 digits' : null),
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
      surname: (value) => (value.length < 2 ? 'Surname must be at least 2 characters' : null),
      regDate: (value) => (value === null ? 'Registration date is required' : null),
      maritalStatus: (value) => (value === null ? 'Marital status is required' : null),
      bloodType: (value) => (value === null ? 'Blood type is required' : null),
      phone: (value) => (value === '+7 (___) ___-__-__' ? 'Phone number must be 11 digits' : null),
      address: (value) => (value.length < 5 ? 'Address must be at least 5 characters' : null),
      username: (value) => (value.length < 5 ? 'Username must be at least 5 characters' : null),
      password: (value) => (value === null ? 'Password is required' : null),
      confirmPassword: (value, values) =>
        value === ''
          ? 'Confirm password is required'
          : null || value !== values.password
          ? 'Passwords do not match'
          : null,
    },
    validateInputOnBlur: true,
  });

  const handleRegisterClick = () => {
    handleToggle(true);
  };

  const handleSubmitClick = () => {
    const {
      dob,
      iin,
      id,
      name,
      surname,
      regDate,
      maritalStatus,
      bloodType,
      phone,
      address,
      email,
      username,
      password,
      confirmPassword,
    } = form.values;

    // validate form
    // const errors = form.validate();
    // if (Object.keys(errors).length > 0) {
    //   setError('Please fill in all the fields correctly');
    //   setSuccess('');
    // } else {
    const data: IPatient = {
      iin_number: iin,
      id_number: id,
      name: name,
      surname: surname,
      middle_name: '',
      blood_group: bloodType,
      emergency_contact_number: phone,
      email: email,
      address: address,
      marital_status: maritalStatus,
      registration_date: regDate.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      birth_date: dob.toLocaleDateString('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
      phone: phone,
    };
    createPatient(data)
      .then((res) => {
        if (res) {
          setSuccess('Patient successfully created');
          setError('');
        }
      })
      .catch((err) => {
        setError(err.message);
        setSuccess('');
      });
    // }
  };

  return (
    <>
      <Modal
        title="Fill in this form to add a patient"
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
            <DatePicker
              label="Date Of Birth"
              placeholder="Pick date"
              size="md"
              style={{ width: 230 }}
              disableOutsideEvents
              dayClassName={(date, modifiers) =>
                cx({
                  [classes.outside]: modifiers.outside,
                })
              }
              required
              {...form.getInputProps('dob')}
            />
            <TextInput
              label="IIN Number"
              placeholder="Your IIN"
              size="md"
              style={{ width: 230 }}
              required
              hideControls
              {...form.getInputProps('iin')}
            />
            <TextInput
              label="ID Number"
              placeholder="Your ID"
              size="md"
              style={{ width: 230 }}
              required
              hideControls
              {...form.getInputProps('id')}
            />
          </div>
          <Space h="md"></Space>
          <div className={classes.inOneRow}>
            <TextInput
              label="Name"
              placeholder="Your name"
              size="md"
              style={{ width: 230 }}
              required
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Surname"
              placeholder="Your surname"
              size="md"
              style={{ width: 230 }}
              required
              {...form.getInputProps('surname')}
            />
            <TextInput
              label="Middlename"
              placeholder="Your middlename"
              size="md"
              style={{ width: 230 }}
            />
          </div>
          <Space h="md"></Space>
          <div className={classes.inOneRow}>
            <DatePicker
              label="Registration Date"
              placeholder="Pick date"
              size="md"
              style={{ width: 230 }}
              disableOutsideEvents
              dayClassName={(date, modifiers) =>
                cx({
                  [classes.outside]: modifiers.outside,
                })
              }
              required
              {...form.getInputProps('regDate')}
            />
            <Select
              label="Marital Status"
              placeholder="Your marital status"
              size="md"
              style={{ width: 230 }}
              data={[
                { value: 'single', label: 'Single' },
                { value: 'married', label: 'Married' },
                { value: 'divorced', label: 'Divorced' },
                { value: 'widowed', label: 'Widowed' },
                { value: 'separated', label: 'Separated' },
              ]}
              required
              transition="scale-y"
              transitionDuration={80}
              transitionTimingFunction="ease"
              {...form.getInputProps('maritalStatus')}
            />
            <Select
              label="Blood Type"
              placeholder="Your blood type"
              size="md"
              style={{ width: 230 }}
              data={[
                {
                  value: 'o+',
                  label: 'O+',
                  group: 'RhD Positive',
                },
                {
                  value: 'a+',
                  label: 'A+',
                  group: 'RhD Positive',
                },
                {
                  value: 'b+',
                  label: 'B+',
                  group: 'RhD Positive',
                },
                {
                  value: 'ab+',
                  label: 'AB+',
                  group: 'RhD Positive',
                },
                {
                  value: 'o-',
                  label: 'O-',
                  group: 'RhD Negative',
                },
                {
                  value: 'a-',
                  label: 'A-',
                  group: 'RhD Negative',
                },
                {
                  value: 'b-',
                  label: 'B-',
                  group: 'RhD Negative',
                },
                {
                  value: 'ab-',
                  label: 'AB-',
                  group: 'RhD Negative',
                },
              ]}
              required
              transition="scale-y"
              transitionDuration={80}
              transitionTimingFunction="ease"
              {...form.getInputProps('bloodType')}
            />
          </div>
          <Space h="md"></Space>
          <div className={classes.inOneRow}>
            <Input.Wrapper
              label="Contact Number"
              size="md"
              style={{ width: 230 }}
              required
              {...form.getInputProps('phone')}
            >
              <Input
                placeholder="Your phone"
                size="md"
                style={{ width: 230 }}
                component={InputMask}
                mask="+7 (999) 999-99-99"
                {...form.getInputProps('phone')}
              />
            </Input.Wrapper>
            <TextInput
              label="Address"
              placeholder="Your address"
              size="md"
              style={{ width: 230 }}
              required
              {...form.getInputProps('address')}
            />
            <TextInput
              label="Email"
              placeholder="Your email"
              size="md"
              style={{ width: 230 }}
              {...form.getInputProps('email')}
            />
          </div>
          <Space h="md"></Space>
          <div className={classes.inOneRow}>
            <TextInput
              label="Username"
              placeholder="Your username"
              size="md"
              style={{ width: 230 }}
              required
              {...form.getInputProps('username')}
            />
            <Popover opened={popoverOpened} position="bottom" width="target" transition="pop">
              <Popover.Target>
                <div
                  onFocusCapture={() => setPopoverOpened(true)}
                  onBlurCapture={() => setPopoverOpened(false)}
                >
                  <PasswordInput
                    label="Your password"
                    placeholder="Your password"
                    size="md"
                    style={{ width: 230 }}
                    required
                    value={value}
                    onChange={(event) => {
                      setValue(event.currentTarget.value);
                      form.getInputProps('password').onChange(event);
                    }}
                    visible={visible}
                    onVisibilityChange={toggle}
                    visibilityToggleIcon={({ reveal, size }) =>
                      reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
                    }
                  />
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <Progress color={color} value={strength} size={5} style={{ marginBottom: 10 }} />
                <PasswordRequirement
                  label="Includes at least 6 characters"
                  meets={value.length > 5}
                />
                {checks}
              </Popover.Dropdown>
            </Popover>
            <PasswordInput
              label="Confirm Password"
              placeholder="Confirm your password"
              size="md"
              style={{ width: 230 }}
              required
              visible={visible}
              onVisibilityChange={toggle}
              visibilityToggleIcon={({ reveal, size }) =>
                reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />
              }
              {...form.getInputProps('confirmPassword')}
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
              Register patient
            </Button>
          </Center>
        </form>
      </Modal>
      <Group position="center">
        <Button size="xs" onClick={handleRegisterClick}>
          Add Patient
        </Button>
      </Group>
    </>
  );
};

export default PatientModal;
