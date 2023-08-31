import { post } from '../../base';

const authGoogle = async (token) => {
  const res = await post('/api/public/login/admin', {
    username: token,
    password: token,
  });
  return res;
};

export default authGoogle;
