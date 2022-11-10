export enum Role {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
  GUEST = 'GUEST',
}

export interface IOrganization {
  active: boolean;
  bin: string;
  description: string;
  email: string;
  factAddress: string;
  id: number;
  legalAddress: string;
  name: string;
  phones: string[];
}

export interface IAddUser {
  active: boolean;
  id: number;
  firstName: string;
  lastName: string;
  iin: string;
  orgId: number;
  phoneNumber: string;
  email: string;
  role: Role;
}

export interface IUser extends IAddUser {
  organization: IOrganization;
  locale: string;
  notify: boolean;
}

export type Language = 'kz' | 'ru' | 'en';

export interface ITranslation {
  key: string;
  kz: string;
  ru: string;
  en: string;
}

export interface IListItems {
  id: number;
  productId: number;
  quantity: number;
}

export interface IEmployee {
  id: number;
  name: string;
  departement: string;
  orgId: number;
  updateDate?: Date;
}

export enum MovementType {
  IN = 'IN',
  OUT = 'OUT',
  MOVE_IN = 'MOVE_IN',
  MOVE_OUT = 'MOVE_OUT',
  BROKEN = 'BROKEN',
  WRITE_OFF = 'WRITE_OFF',
}
