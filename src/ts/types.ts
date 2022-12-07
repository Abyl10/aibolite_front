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
  password: string;
}

export interface IDoctor {
  id?: number;
  iin_number: string;
  id_number: string;
  name: string;
  surname: string;
  middle_name: string;
  department_id: number;
  specialization_details_id: number;
  experience_years: number;
  photo: string;
  category: string;
  price_per_appointment: number;
  schedule_details: string;
  degree: string;
  rating: number;
  address: string;
  homepage_url: string;
  registration_date?: string;
  birth_date: string;
  phone: string;
}

export interface IUser {
  id?: number;
  phone: string;
  birth_date: string;
  role: Role;
  name: string;
  surname: string;
  middle_name: string;
}

export interface IAppointment {
  id?: number;
  name: string;
  surname: string;
  doctor_specialization: string;
  doctor: string;
  contact: string;
  date: string;
}

export interface IDepartment {
  id?: number;
  name: string;
  doctors: IDoctor[];
}
