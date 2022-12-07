import { api } from './api';
import { IDoctor } from '../ts/types';

const baseUrl = '/v2/client';

export const getDoctors = (): Promise<IDoctor[]> =>
  api.get(`${baseUrl}/doctors`).then((res) => res.data);
