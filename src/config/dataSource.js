import { serverIP } from './settings';
//   // baseURL: '192.168.8.20',
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
//   // baseURL: '192.168.8.20',
//   url: '/api/cardata',
//   method: 'GET',
//   token: localStorage.getItem('token'),
// };

export const carProfile = {
  baseURL: 'http://' + serverIP,
  url: '/car/profile',
  method: 'GET',
  token: localStorage.getItem('token'),
};

export const logout = {
  baseURL: 'http://' + serverIP,
  url: '/car/logout',
  method: 'POST',
  carid: localStorage.getItem('carid'),
  token: localStorage.getItem('token'),
};

export const login = {
  baseURL: 'http://' + serverIP,
  url: '/car/login',
  method: 'POST',
};

export const register = {
  baseURL: 'http://' + serverIP,
  url: '/car/register',
  method: 'POST',
};

export const menu = {
  url: '/api/menu',
  method: 'GET',
};

export const carData = {
  baseURL: 'http://' + serverIP,
  url: '/car/cardata',
  method: 'GET',
  carid: localStorage.getItem('carid'),
  token: localStorage.getItem('token'),
};

export const routeName = {
  baseURL: 'http://' + serverIP,
  url: '/route/all',
  method: 'POST',
  // add car id
  carid: localStorage.getItem('carid'),
  token: localStorage.getItem('token'),
};

export const routeInfo = {
  baseURL: 'http://' + serverIP,
  url: '/route/select',
  method: 'POST',
  // add car id route id
  carid: localStorage.getItem('carid'),
  routeid: localStorage.getItem('routeid'),
  token: localStorage.getItem('token'),
};

export const start = {
  baseURL: 'http://' + serverIP,
  url: '/car/action/start',
  method: 'POST',
  carid: localStorage.getItem('carid'),
  token: localStorage.getItem('token'),
};

export const slowStop = {
  baseURL: 'http://' + serverIP,
  url: '/car/action/slowStop',
  method: 'POST',
  carid: localStorage.getItem('carid'),
  token: localStorage.getItem('token'),
};

export const emergencyStop = {
  baseURL: 'http://' + serverIP,
  url: '/car/action/emergencyStop',
  method: 'POST',
  carid: localStorage.getItem('carid'),
  token: localStorage.getItem('token'),
};