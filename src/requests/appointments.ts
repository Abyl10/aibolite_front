import { api } from './api';
import { IAppointment } from '../ts/types';

const baseURL = '/v2/client';

interface ICreateAppointment {
  time: string;
  doctor_id: number;
  patient_id?: number;
}

export const getAppointments = (): Promise<IAppointment[]> =>
  api.get(`${baseURL}/appointments`).then((res) => res.data);

export const createAppointment = (appointment: ICreateAppointment): Promise<IAppointment> =>
  api.post(`${baseURL}/appointments/create`, appointment).then((res) => res.data);
