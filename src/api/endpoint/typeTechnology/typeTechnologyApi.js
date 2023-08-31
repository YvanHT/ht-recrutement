import {
  post, put, get, deleteRequest,
} from '../../base';

export const addOne = async (data, token) => {
  const res = await post('/api/admin/type/technology', { type_technology: data.type_technology }, token);
  return res;
};

export const editOne = async (id, data, token) => {
  const res = await put(`/api/admin/type/technology/${id}`, { type_technology: data.type_technology }, token);
  return res;
};

export const getAllType = async (token, params) => {
  const res = await get('/api/candidate/types/technology', token, { ...params });
  return res;
};

export const getOne = async (id, token) => {
  const res = await get(`/api/candidate/type/technology/${id}`, token);
  return res;
};

export const deleteOne = async (id, token) => {
  const res = await deleteRequest(`/api/admin/type/technology/${id}`, token);
  return res;
};
