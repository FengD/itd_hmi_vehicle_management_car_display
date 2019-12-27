// export const userProfile = {
//   // baseURL: '10.10.51.152',
//   url: '/api/profile',
//   method: 'GET',
//   token: localStorage.getItem('token'),
// };

// export const userLogout = {
//   url: '/api/logout',
//   method: 'POST',
// };

// export const userLogin = {
//   url: '/api/login',
//   method: 'POST',
// };

// export const userRegister = {
//   url: '/api/register',
//   method: 'POST',
// };

// export const menu = {
//   url: '/api/menu',
//   method: 'GET',
// };

// export const carData = {
//   // baseURL: '10.10.51.152',
//   url: '/api/cardata',
//   method: 'GET',
//   token: localStorage.getItem('token'),
// };


export const carProfile = {
  baseURL: 'http://10.10.51.152:9999',
  url: '/car/profile',
  method: 'GET',
  token: localStorage.getItem('token'),
};

export const logout = {
  baseURL: 'http://10.10.51.152:9999',
  url: '/car/logout',
  method: 'POST',
  carid: localStorage.getItem('carid'),
  token: localStorage.getItem('token'),
};

export const login = {
  baseURL: 'http://10.10.51.152:9999',
  url: '/car/login',
  method: 'POST',
};

export const register = {
  baseURL: 'http://10.10.51.152:9999',
  url: '/car/register',
  method: 'POST',
};

export const menu = {
  url: '/api/menu',
  method: 'GET',
};

export const carData = {
  baseURL: 'http://10.10.51.152:9999',
  url: '/car/cardata',
  method: 'GET',
  carid: localStorage.getItem('carid'),
  token: localStorage.getItem('token'),
};

export const routeName = {
  baseURL: 'http://10.10.51.152:9999',
  url: '/route/all',
  method: 'POST',
  // add car id
  carid: localStorage.getItem('carid'),
  token: localStorage.getItem('token'),
};

export const routeInfo = {
  baseURL: 'http://10.10.51.152:9999',
  url: '/route/select',
  method: 'POST',
  // add car id route id
  carid: localStorage.getItem('carid'),
  routeid: localStorage.getItem('routeid'),
  token: localStorage.getItem('token'),
};
