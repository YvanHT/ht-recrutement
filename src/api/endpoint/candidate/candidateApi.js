import config from '../../../config/config';

import { get } from '../../base';

export const downloadCv = (token) => `${config.apiUrl}/api/protected/download/cv?token=${token}`;

export const getDownloadToken = async (token, id) => {
  const res = await get(`/api/generate/token/${id}?action=download_cv`, token);
  return res;
};

export const getList = async (token, params) => {
  const res = await get('/api/recruteur/candidates/search', token, { ...params });
  return res;
};

export const getOne = async (token, id) => {
  const res = await get(`/api/recruteur/candidate/${id}`, token);
  return res;
};

export const reNew = async (token, id) => {
  const res = await get(`/api/admin/qcm-reinitialise/${id}`, token);
  return res;
};
