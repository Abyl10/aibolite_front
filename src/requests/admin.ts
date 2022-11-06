import { api } from './api';
import { ICategory, IStore, IUser, IProduct, IAddUser } from '../ts/types';
import { PAGE_SIZE } from '../consts/requests';

const baseURL = '/admin';

type СategoryResponseType = {
  data: ICategory[];
  totalCount: number;
};

type StockResponseType = {
  data: IStore[];
  totalCount: number;
};

type UserResponseType = {
  data: IUser[];
  totalCount: number;
};

type ProductResponseType = {
  data: IProduct[];
  totalCount: number;
};

type PostResponseType = {
  success: boolean;
};

export const getCategoryList = (page = 0, pageSize = PAGE_SIZE): Promise<СategoryResponseType> =>
  api.get(`${baseURL}/category/list`, { params: { page, pageSize } }).then((res) => res.data.data);

export const addCategory = (category: ICategory): Promise<PostResponseType> =>
  api.post(`${baseURL}/category/add`, { categoryDto: category }).then((res) => res.data);

export const getStoreList = (page = 0, pageSize = PAGE_SIZE): Promise<StockResponseType> =>
  api.get(`${baseURL}/store/list`, { params: { page, pageSize } }).then((res) => res.data.data);

export const addStore = (stock: IStore): Promise<PostResponseType> =>
  api.post(`${baseURL}/store/add`, { stockDto: stock }).then((res) => res.data);

export const editStore = (stock: IStore): Promise<PostResponseType> =>
  api.post(`${baseURL}/store/edit`, { stockDto: stock }).then((res) => res.data);

export const getFavouriteStoreList = (page = 0, pageSize = PAGE_SIZE): Promise<StockResponseType> =>
  api
    .get(`${baseURL}/store/favourite/list`, { params: { page, pageSize } })
    .then((res) => res.data.data);

export const addFavouriteStore = (storeId: number): Promise<PostResponseType> =>
  api.post(`${baseURL}/store/favourite/add?storeId=${storeId}`).then((res) => res.data);

export const removeFavouriteStore = (storeId: number): Promise<PostResponseType> =>
  api.delete(`${baseURL}/store/favourite/delete`, { params: { storeId } }).then((res) => res.data);

export const getUserList = (page = 0, pageSize = PAGE_SIZE): Promise<UserResponseType> =>
  api.get(`${baseURL}/user/list`, { params: { page, pageSize } }).then((res) => res.data);

export const addUser = (user: IAddUser): Promise<PostResponseType> =>
  api.post(`${baseURL}/user/add`, user).then((res) => res.data);

export const editUser = (user: IUser): Promise<PostResponseType> =>
  api.post(`${baseURL}/user/edit`, { userDto: user }).then((res) => res.data);

export const getProductList = (page = 0, pageSize = PAGE_SIZE): Promise<ProductResponseType> =>
  api.get(`${baseURL}/product/list`, { params: { page, pageSize } }).then((res) => res.data.data);

export const getFavouriteProductList = (
  page = 0,
  pageSize = PAGE_SIZE
): Promise<ProductResponseType> =>
  api
    .get(`${baseURL}/product/favourite/list`, { params: { page, pageSize } })
    .then((res) => res.data.data);

export const addFavouriteProduct = (productId: number): Promise<PostResponseType> =>
  api.post(`${baseURL}/product/favourite/add?productId=${productId}`).then((res) => res.data);

export const removeFavouriteProduct = (productId: number): Promise<PostResponseType> =>
  api
    .delete(`${baseURL}/product/favourite/delete`, { params: { productId } })
    .then((res) => res.data);
