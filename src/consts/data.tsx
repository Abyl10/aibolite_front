import { Role } from '../ts/types';

export const PatientHeader = {
  name: 'Name',
  phone: 'Phone',
  dateofbirth: 'Date of birth',
  email: 'Email',
  IIN: 'IIN',
  id: 'ID',
};

export const DepartmentsHeader = {
  id: 'id',
  name: 'Name',
};

export const DepartmentsData = [
  {
    id: 1,
    name: 'Cardiology',
  },
  {
    id: 2,
    name: 'Neurology',
  },
  {
    id: 3,
    name: 'Oncology',
  },
  {
    id: 4,
    name: 'Pediatrics',
  },
  {
    id: 5,
    name: 'Gynecology',
  },
  {
    id: 6,
    name: 'Dermatology',
  },
  {
    id: 7,
    name: 'Ophthalmology',
  },
  {
    id: 8,
    name: 'Urology',
  },
  {
    id: 9,
    name: 'Orthopedics',
  },
  {
    id: 10,
    name: 'Gastroenterology',
  },
];

export const SpecializationsHeader = {
  id: 'id',
  name: 'Name',
};

export const SpecializationsData = [
  {
    id: 1,
    name: 'Cardiologist',
  },
  {
    id: 2,
    name: 'Neurologist',
  },
  {
    id: 3,
    name: 'Oncologist',
  },
  {
    id: 4,
    name: 'Pediatrician',
  },
  {
    id: 5,
    name: 'Gynecologist',
  },
  {
    id: 6,
    name: 'Dermatologist',
  },
  {
    id: 7,
    name: 'Ophthalmologist',
  },
  {
    id: 8,
    name: 'Urologist',
  },
  {
    id: 9,
    name: 'Orthopedist',
  },
  {
    id: 10,
    name: 'Gastroenterologist',
  },
];

export const DoctorData = [
  {
    id: 1,
    name: 'John',
    surname: 'Doe',
    phone: '+7 777 777 77 77',
    birthDate: '01.01.1990',
    IIN: '123456789012',
    address: 'Almaty, Kazakhstan',
    email: 'john.doe@email.com',
    password: '123456',
    confirmPassword: '123456',
    role: Role.DOCTOR,
  },
  {
    id: 1,
    name: 'John',
    surname: 'Doe',
    phone: '+7 777 777 77 77',
    birthDate: '01.01.1990',
    IIN: '123456789012',
    address: 'Almaty, Kazakhstan',
    email: 'john.doe@email.com',
    password: '123456',
    confirmPassword: '123456',
    role: Role.DOCTOR,
  },
];

export const AppointmentHeader = {
  time: 'time',
  patient: 'Patient',
  doctor: 'Doctor',
};
