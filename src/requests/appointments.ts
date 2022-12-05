import { api } from './api';
import { IAppointment } from '../ts/types';

const baseURL = '/v2/client';

export const getAppointments = (): Promise<IAppointment[]> =>
  api.get(`${baseURL}/appointments`).then((res) => res.data);
