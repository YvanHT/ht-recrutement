import {
  post, put, get, deleteRequest,
} from '../../base';

export const addOne = async (id, data, token) => {
  const res = await post(`/api/admin/exercise/${id}`, {
    titre: data.titre,
    duree: data.duree,
    status: data.status,
    questions: data.questions,
    enunciated: data.enunciated,
  }, token);
  return res;
};
export const editOne = async (id, data, token) => {
  const res = await put(`/api/admin/exercise/${id}`, {
    titre: data.titre,
    duree: data.duree,
    status: data.status,
    questions: data.questions,
    enunciated: data.enunciated,
  }, token);
  return res;
};
export const getOne = async (id, token) => {
  const res = await get(`/api/admin/exercise/${id}`, token);
  return res;
};
export const deleteOne = async (id, token) => {
  const res = await deleteRequest(`/api/admin/exercise/${id}`, token);
  return res;
};
export const deleteReponse = async (id, token) => {
  const res = await deleteRequest(`/api/admin/reponse/${id}`, token);
  return res;
};
export const deleteQuestion = async (id, token) => {
  const res = await deleteRequest(`/api/admin/question/${id}`, token);
  return res;
};
