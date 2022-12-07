import { api } from './api';
import { IDepartment } from '../ts/types';

const baseUrl = '/v2/client';

export const getDepartments = (): Promise<IDepartment[]> =>
  api.get(`${baseUrl}/departments`).then((res) => res.data);
