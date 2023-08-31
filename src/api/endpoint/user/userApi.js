import { get, put } from '../../base';

export const getList = async (token, params) => {
  const res = await get('/api/admin/recruteurs/search', token, { ...params });
  return res;
};

export const getOne = async (token, id) => {
  const res = await get(`/api/admin/recruteur/${id}`, token);
  return res;
};

export const editOne = async (id, data, token) => {
  const res = await put(`/api/admin/recruteur/${id}`, { role: data.role }, token);
  return res;
};
