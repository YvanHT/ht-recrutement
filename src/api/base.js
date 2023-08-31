import Config from '../config/config';
// TODO: verify base api
// TODO: set authorization header here JWT - Make a call before doing it

const baseUrl = Config.apiUrl;

export const handleResponse = (res) => res.json().then((json) => {
  if (res.status >= 200 && res.status < 300) {
    return json;
  }

  if (res.status === 403) {
    window.location.replace('/error');
  }
  const error = new Error(json);
  error.status = res.status;
  error.message = json.status || 'UNKNOWN';
  throw error;
}).catch((err) => {
  if (err.status) {
    return err;
  }

  const error = new Error(res.statusText);
  error.status = res.status;
  return error;
});

export const postFiles = async (path, files) => {
  const data = new FormData();

  files.keys().forEach((fileIndex) => {
    data.append(fileIndex, files[fileIndex]);
  });

  const res = await fetch(baseUrl + path, {
    method: 'POST',
    mode: 'cors',
    body: data,
  });

  return handleResponse(res);
};

export const post = (path, params, auth) => fetch(baseUrl + path, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    ...(auth && { Authorization: `Bearer ${auth}` }),
  },
  mode: 'cors',
  body: JSON.stringify(params),
}).then(handleResponse);

export const put = (path, params, auth) => fetch(baseUrl + path, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth}`,
  },
  mode: 'cors',
  body: JSON.stringify(params),
}).then(handleResponse);

export const patch = (path, params) => fetch(baseUrl + path, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  mode: 'cors',
  body: JSON.stringify(params),
}).then(handleResponse);

export const get = async (path, auth, params) => {
  let queryString = '';
  if (params) {
    queryString = `?${Object.keys(params).map((key) => `${key}=${params[key]}`).join('&')}`;
  }

  const res = await fetch(baseUrl + path + queryString, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(auth && { Authorization: `Bearer ${auth}` }),
    },
    mode: 'cors',
  });

  return handleResponse(res);
};

export const deleteRequest = (path, auth) => fetch(baseUrl + path, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth}`,
  },
  mode: 'cors',
}).then(handleResponse);
