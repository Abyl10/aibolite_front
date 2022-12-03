export enum Role {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
  GUEST = 'GUEST',
}

export type Language = 'kz' | 'ru' | 'en';

export interface ITranslation {
  key: string;
  kz: string;
  ru: string;
  en: string;
}

export interface IPatient {
  id: number;
  name: string;
  surname: string;
  phone: string;
  birthDate: string;
  IIN: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
}
