import { serverIp } from './settings';
//   // baseURL: '192.168.8.20',
//   url: '/api/profile',
//   method: 'GET',
//   headers: { token: localStorage.getItem('token') },
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
//   baseURL: 'http://' + serverIp,
//   url: '/car/profile',
//   method: 'GET',
//   headers: { token: localStorage.getItem('token') },
// };

// export const menu = {
//   url: '/api/menu',
//   method: 'GET',  headers: { token: localStorage.getItem('token') },

// };

export const login = {
  baseURL: 'http://' + serverIp,
  url: '/car/login',
  method: 'POST',
};

export const logout = {
  baseURL: 'http://' + serverIp,
  url: '/car/' + localStorage.getItem('carId') + '/logout',
  method: 'POST',
  headers: { token: localStorage.getItem('token') },
};

export const register = {
  baseURL: 'http://' + serverIp,
  url: '/car/register',
  method: 'POST',
};

export const carProfile = {
  baseURL: 'http://' + serverIp,
  url: '/car/' + localStorage.getItem('carId') + '/profile',
  method: 'GET',
  headers: { token: localStorage.getItem('token') },
};

// export const routeName = {
//   baseURL: 'http://' + serverIp,
//   // url: '/route/car/' + localStorage.getItem('carId') + '/all',
//   url: '/route/car/' + localStorage.getItem('carId'),
//   method: 'GET',
//   headers: { token: localStorage.getItem('token') },
// };

// export const routeInfo = {
//   baseURL: 'http://' + serverIp,
//   url: '/route/' + localStorage.getItem('routeid'),
//   method: 'GET',
//   headers: { token: localStorage.getItem('token') },
// };

export const start = {
  baseURL: 'http://' + serverIp,
  url: '/car/' + localStorage.getItem('carId') + '/action/start',
  method: 'POST',
  headers: { token: localStorage.getItem('token') },
};

export const slowStop = {
  baseURL: 'http://' + serverIp,
  url: '/car/' + localStorage.getItem('carId') + '/action/slow_stop',
  method: 'POST',
  headers: { token: localStorage.getItem('token') },
};

export const emergencyStop = {
  baseURL: 'http://' + serverIp,
  url: '/car/' + localStorage.getItem('carId') + '/action/emergency_stop',
  method: 'POST',
  headers: { token: localStorage.getItem('token') },
};