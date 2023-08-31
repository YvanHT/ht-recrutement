export const setJWT = (token) => {
  localStorage.setItem('session_token', token);
};

export const getJWT = () => localStorage.getItem('session_token') || '';

export const setRole = (role) => {
  localStorage.setItem('session_role', role);
};

export const getRole = () => localStorage.getItem('session_role') || '';

export const setUser = (user) => {
  localStorage.setItem('session_user', user);
};

export const getUser = () => localStorage.getItem('session_user') || '';
