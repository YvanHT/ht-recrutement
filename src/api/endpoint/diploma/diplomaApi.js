import {
  post, put, get, deleteRequest,
} from '../../base';

export const addOne = async (data, token) => {
  const res = await post('/api/admin/diploma', { name: data.name }, token);
  return res;
};

export const editOne = async (id, data, token) => {
  const res = await put(`/api/admin/diploma/${id}`, { name: data.name }, token);
  return res;
};

export const getAllDiploma = async (token, params) => {
  const res = await get('/api/candidate/diplomas/search', token, { ...params });
  return res;
};

export const getOne = async (id, token) => {
  const res = await get(`/api/admin/diploma/${id}`, token);
  return res;
};

export const deleteOne = async (id, token) => {
  const res = await deleteRequest(`/api/admin/diploma/${id}`, token);
  return res;
};
