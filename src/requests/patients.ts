import { api } from './api';
import { IPatient } from '../ts/types';

const baseUrl = '/v2/client';

export const getPatients = (): Promise<IPatient[]> =>
  api.get(`${baseUrl}/patients`).then((res) => res.data);

export const getPatient = (id: number): Promise<IPatient> =>
  api.get(`${baseUrl}/patients/${id}`).then((res) => res.data);

export const createPatient = (patient: IPatient): Promise<IPatient> =>
  api.post(`${baseUrl}/patients/create`, patient).then((res) => res.data);

export const deletePatient = (id: number): Promise<void> =>
  api.delete(`${baseUrl}/patients/${id}`).then((res) => res.data);

export const updatePatient = (id: number, patient: IPatient): Promise<IPatient> =>
  api.patch(`${baseUrl}/patients/${id}`, patient).then((res) => res.data);
