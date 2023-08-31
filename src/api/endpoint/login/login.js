import { post } from '../../base';

const login = async (data) => {
  const res = await post('/api/public/login/admin', { ...data });
  return res;
};

export default login;
