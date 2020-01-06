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


// export const carProfile = {
//   baseURL: 'http://' + serverIP,
//   url: '/car/profile',
//   method: 'GET',
//   token: localStorage.getItem('token'),
// };

// export const menu = {
//   url: '/api/menu',
//   method: 'GET',
// };

export const login = {
  baseURL: 'http://' + serverIP,
  url: '/car/login',
  method: 'POST',
};

export const logout = {
  baseURL: 'http://' + serverIP,
  url: '/car/' + localStorage.getItem('carid') + '/logout',
  method: 'POST',
  token: localStorage.getItem('token'),
};

export const register = {
  baseURL: 'http://' + serverIP,
  url: '/car/register',
  method: 'POST',
};

export const carProfile = {
  baseURL: 'http://' + serverIP,
  url: '/car/' + localStorage.getItem('carid') + '/car_profile',
  method: 'GET',
  token: localStorage.getItem('token'),
};

export const routeName = {
  baseURL: 'http://' + serverIP,
  url: '/route/car/' + localStorage.getItem('carid') + '/all',
  method: 'GET',
  token: localStorage.getItem('token'),
};

export const routeInfo = {
  baseURL: 'http://' + serverIP,
  url: '/route/' + localStorage.getItem('routeid'),
  method: 'GET',
  token: localStorage.getItem('token'),
};

export const start = {
  baseURL: 'http://' + serverIP,
  url: '/car/' + localStorage.getItem('carid') + '/action/start',
  method: 'POST',
  token: localStorage.getItem('token'),
};

export const slowStop = {
  baseURL: 'http://' + serverIP,
  url: '/car/' + localStorage.getItem('carid') + '/action/slow_stop',
  method: 'POST',
  token: localStorage.getItem('token'),
};

export const emergencyStop = {
  baseURL: 'http://' + serverIP,
  url: '/car/' + localStorage.getItem('carid') + '/action/emergency_stop',
  method: 'POST',
  token: localStorage.getItem('token'),
};