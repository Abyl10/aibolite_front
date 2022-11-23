import { api } from './api';
import { IUser } from '../ts/types';
import { PAGE_SIZE } from '../consts/requests';

const baseURL = '/api/v1';

type UserResponseType = {
  data: IUser[];
  totalCount: number;
};

export const getUserList = (page = 0, pageSize = PAGE_SIZE): Promise<UserResponseType> =>
  api.get(`${baseURL}/user/list`, { params: { page, pageSize } }).then((res) => res.data);
