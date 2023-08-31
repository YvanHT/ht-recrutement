import {
  post, put, get, deleteRequest,
} from '../../base';

export const getLang = async (token, params) => {
  const res = await get('/api/candidate/languages/search', token, { ...params });
  return res;
};

export const addOne = async (data, token) => {
  const res = await post('/api/admin/language', { label: data.label }, token);
  return res;
};

export const editOne = async (id, data, token) => {
  const res = await put(`/api/admin/language/${id}`, { label: data.label }, token);
  return res;
};

export const getOne = async (id, token) => {
  const res = await get(`/api/admin/language/${id}`, token);
  return res;
};

export const deleteOne = async (id, token) => {
  const res = await deleteRequest(`/api/admin/language/${id}`, token);
  return res;
};
