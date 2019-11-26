
export const userProfile = {
  // baseURL: '10.10.51.40',
  url: '/api/profile',
  method: 'GET',
  token: localStorage.getItem('token'),
};

export const userLogout = {
  url: '/api/logout',
  method: 'POST',
};

export const userLogin = {
  url: '/api/login',
  method: 'POST',
};

export const userRegister = {
  url: '/api/register',
  method: 'POST',
};

export const menu = {
  url: '/api/menu',
  method: 'GET',
};

export const carData = {
  // baseURL: '10.10.51.40',
  url: '/api/cardata',
  method: 'GET',
  token: localStorage.getItem('token'),
};
