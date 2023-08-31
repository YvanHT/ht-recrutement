import {
  post,
  put,
  get,
  deleteRequest,
} from '../../base';

export const addOne = async (data, token) => {
  const res = await post('/api/admin/technology', {
    name: data.name,
    file: data.file,
    logo: data.logo,
    type_technology: data.type_technology,
  }, token);
  return res;
};

export const editOne = async (id, data, token) => {
  const res = await put(`/api/admin/technology/${id}`, {
    name: data.name,
    file: data.file,
    logo: data.logo,
    type_technology: data.type_technology,
  }, token);
  return res;
};

export const getAllType = async (token) => {
  const res = await get('/api/candidate/types/technology', token);
  return res;
};

export const getOne = async (id, token) => {
  const res = await get(`/api/admin/technology/${id}`, token);
  return res;
};

export const getAll = async (token, params) => {
  const res = await get('/api/candidate/technologies/search', token, { ...params });
  return res;
};

export const getDetail = async (token, id) => {
  const res = await get(`/api/admin/detail/technology/${id}`, token);
  return res;
};

export const deleteOne = async (id, token) => {
  const res = await deleteRequest(`/api/admin/technology/${id}`, token);
  return res;
};
