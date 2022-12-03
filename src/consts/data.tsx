import { Role } from '../ts/types';

export const DoctorHeader = {
  name: 'Name',
  phone: 'Phone',
  dateofbirth: 'Date of birth',
  email: 'Email',
  IIN: 'IIN',
  id: 'ID',
};

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
