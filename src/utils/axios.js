import axios from 'axios';
import { notification } from '../plugins/notify';
import router from '../router';

const basicResponseSuccessInterceptor = response => {
  // besides http status code, business status code is well needed too
  // for example, when fetch an auth-token (use password and username),
  // possible definitions of business status code are below:
  //  0 - totally successful, got a meaningful token as expected
  //  1 - wrong password or something otherwise was wrong (differences were told in 'message')
  // ...
  //
  // what is more, when token is almost out of time (but we keep requesting moments before),
  // status 210 will occur, and then, we need to update our token.
  if (response.status === 210) {
    sessionStorage.setItem('auth-token', response.data.token);
  }
  return Promise.resolve(response.data);
};

const basicResponseErrorInterceptor = err => {
  notification.error(err);

  // especially, once token is invalid or out of time, status 401,
  // which is well accepted as an unauthorized status, will occur,
  // and app page will be routed to '/sign-in' at this circumstance.
  if (err.response.status === 401) {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('signed-in-user');
    notification.warning('登录已过期，请重新登录');
    router.push('/sign-in');
  }

  return Promise.reject(err);
};

const basicRequestInterceptor = config => {
  const token = sessionStorage.getItem('auth-token');
  token && (config.headers['Authorization'] = token);
  return config;
};

export const jsonAxios = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: false,
  headers: { 'Content-Type': 'application/json' },
});

jsonAxios.interceptors.request.use(basicRequestInterceptor);

jsonAxios.interceptors.response.use(basicResponseSuccessInterceptor, basicResponseErrorInterceptor);

export const formDataAxios = axios.create({
  baseURL: '/api',
  timeout: 10000,
  withCredentials: false,
  headers: { 'Content-Type': 'multipart/form-data' },
});

formDataAxios.interceptors.request.use(basicRequestInterceptor);
formDataAxios.interceptors.response.use(basicResponseSuccessInterceptor, basicResponseErrorInterceptor);

export default jsonAxios;
