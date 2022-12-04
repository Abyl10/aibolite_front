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
  id?: number;
  iin_number: string;
  id_number: string;
  name: string;
  surname: string;
  middle_name: string;
  blood_group: string;
  emergency_contact_number: string;
  email: string;
  address: string;
  marital_status: string;
  registration_date?: string;
  birth_date: string;
  phone: string;
}
