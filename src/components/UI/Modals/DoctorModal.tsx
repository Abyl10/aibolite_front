import React from 'react';
import InputMask from 'react-input-mask';
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
  NumberInput,
  useMantineTheme,
  Textarea,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { IconEyeCheck, IconEyeOff, IconX, IconCheck, IconUpload, IconPhoto } from '@tabler/icons';
import { useTranslations } from '../../../hooks/useTranslations';

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
  props?: Partial<DropzoneProps>;
}

const DoctorModal: React.FC<IProps> = ({ opened, handleToggle, props }) => {
  const { t } = useTranslations();
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [visible, { toggle }] = useDisclosure(false);
  const [value, setValue] = useState('');
  const { classes, cx } = useStyles();
  const strength = getStrength(value);
  const theme = useMantineTheme();
  const color = strength === 100 ? 'teal' : strength > 50 ? 'yellow' : 'red';
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test(value)} />
  ));
  const form = useForm({
    initialValues: {
      dob: null,
      IIN: '',
      ID: '',
      name: '',
      surname: '',
      category: null,
      degree: null,
      rating: null,
      deptID: '',
      specID: '',
      experience: null,
      details: '',
      price: null,
      phone: '',
      address: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      dob: (value) => (value === null ? 'Date of birth is required' : null),
      IIN: (value) => (value.length !== 12 ? 'IIN must be 12 digits' : null),
      ID: (value) => (value.length !== 9 ? 'ID must be 9 digits' : null),
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
      surname: (value) => (value.length < 2 ? 'Surname must be at least 2 characters' : null),
      category: (value) => (value === null ? 'Category is required' : null),
      degree: (value) => (value === null ? 'Degree is required' : null),
      rating: (value) => (value === null ? 'Rating is required' : null),
      deptID: (value) => (value.length !== 3 ? 'Department ID must be 3 digits' : null),
      specID: (value) => (value.length !== 3 ? 'Specialization ID must be 3 digits' : null),
      experience: (value) => (value === null ? 'Experience is required' : null),
      details: (value) => (value.length < 10 ? 'Schedule details are too short' : null),
      price: (value) => (value === null ? 'Price is required' : null),
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

  return (
    <>
      <Modal
        title="Fill in this form to add a doctor"
        size="xl"
        transition="slide-down"
        transitionDuration={300}
        transitionTimingFunction="ease"
        overlayOpacity={0.5}
        overlayBlur={1}
        opened={opened}
        onClose={() => handleToggle(false)}
      >
        <form onSubmit={form.onSubmit(console.log)}>
          <Center>
            <Dropzone
              onDrop={(files: any) => console.log('accepted files', files)}
              onReject={(files: any) => console.log('rejected files', files)}
              accept={IMAGE_MIME_TYPE}
              multiple={false}
              maxFiles={1}
              style={{ width: 300 }}
              radius="xl"
              {...props}
            >
              <Group position="center">
                <Dropzone.Accept>
                  <IconUpload
                    size={50}
                    stroke={1.5}
                    color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    size={50}
                    stroke={1.5}
                    color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto size={50} stroke={1.5} />
                </Dropzone.Idle>
                <div>
                  <Center>
                    <Text size="xl" inline>
                      Attach your profile photo
                    </Text>
                  </Center>
                  <Center>
                    <Text size="sm" color="dimmed" inline mt={7}>
                      Drag images here or click to select files
                    </Text>
                  </Center>
                </div>
              </Group>
            </Dropzone>
          </Center>
          <Space h="md"></Space>
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
              {...form.getInputProps('IIN')}
            />
            <TextInput
              label="ID Number"
              placeholder="Your ID"
              size="md"
              style={{ width: 230 }}
              required
              {...form.getInputProps('ID')}
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
            <Select
              label="Category"
              placeholder="Your category"
              size="md"
              style={{ width: 230 }}
              data={[
                {
                  label: 'Highest',
                  value: 'highest',
                },
                {
                  label: 'First',
                  value: 'first',
                },
                {
                  label: 'Second',
                  value: 'second',
                },
                {
                  label: 'Third',
                  value: 'third',
                },
              ]}
              required
              transition="scale-y"
              transitionDuration={80}
              transitionTimingFunction="ease"
              {...form.getInputProps('category')}
            />
            <Select
              label="Degree/Education"
              placeholder="Your degree"
              size="md"
              style={{ width: 230 }}
              data={[
                {
                  label: 'PhD',
                  value: 'phd',
                },
                {
                  label: 'MD',
                  value: 'md',
                },
              ]}
              required
              transition="scale-y"
              transitionDuration={80}
              transitionTimingFunction="ease"
              {...form.getInputProps('degree')}
            />
            <NumberInput
              label="Rating (from 0 to 10)"
              placeholder="Your rating"
              size="md"
              style={{ width: 230 }}
              min={0}
              max={10}
              {...form.getInputProps('rating')}
            />
          </div>
          <Space h="md"></Space>
          <div className={classes.inOneRow}>
            <TextInput
              label="Department ID Number"
              placeholder="Your department ID"
              size="md"
              style={{ width: 230 }}
              required
              {...form.getInputProps('deptID')}
            />
            <TextInput
              label="Specialization ID Number"
              placeholder="Your specialization ID"
              size="md"
              style={{ width: 230 }}
              required
              {...form.getInputProps('specID')}
            />
            <NumberInput
              label="Experience (in years)"
              placeholder="Your experience"
              size="md"
              style={{ width: 230 }}
              min={0}
              {...form.getInputProps('experience')}
            />
          </div>
          <Space h="md"></Space>
          <div className={classes.inOneRow}>
            <Textarea
              label="Schedule details"
              placeholder="Your schedule details"
              size="md"
              style={{ width: 485 }}
              required
              {...form.getInputProps('details')}
            />
            <NumberInput
              label="Price of the appointment"
              placeholder="Your price"
              size="md"
              style={{ width: 230 }}
              parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
              formatter={(value) =>
                !Number.isNaN(parseFloat(value!))
                  ? `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  : '$ '
              }
              required
              {...form.getInputProps('price')}
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
              label="Homepage URL"
              placeholder="Your homepage URL"
              size="md"
              style={{ width: 230 }}
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
            <Button type="submit" mt="sm">
              {t('register_doctor')}
            </Button>
          </Center>
        </form>
      </Modal>
      <Group position="center">
        <Button onClick={() => handleToggle(true)} size={'xs'}>
          {t('add_doctor')}
        </Button>
      </Group>
    </>
  );
};

export default DoctorModal;
