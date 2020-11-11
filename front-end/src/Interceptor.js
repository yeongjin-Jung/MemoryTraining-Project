import axios from 'axios';
import { LOGOUT } from './user/types';

const interceptor = (store) => {
  axios.interceptors.request.use(function (config) {
    if (localStorage.getItem('Authorization') == undefined) return config;
    config.headers.Authorization = localStorage.getItem('Authorization');
    return config;
  });

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status == 401) {
        localStorage.removeItem('Authorization');
        alert('세션이 만료되어 로그인화면으로 이동합니다.');
        store.dispatch({ type: LOGOUT });

        return Promise.reject(error);
      }
    },
  );
};
export default {
  interceptor,
};
