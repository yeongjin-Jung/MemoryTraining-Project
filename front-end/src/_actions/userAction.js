import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, AUTH_USER } from './types';
import { request } from '../utils/axios';

const USER_URL = '/api/rest-auth';

export function registerUser(dataToSubmit) {
  const data = request('post', USER_URL + '/signup/', dataToSubmit).data;
  console.log(data);
  return {
    type: REGISTER_USER,
    payload: data,
  };
}

export function loginUser(dataToSubmit) {
  const data = request('post', USER_URL + '/login/', dataToSubmit).data;
  return {
    type: LOGIN_USER,
    payload: data,
  };
}

export function logoutUser() {
  const token = localStorage.getItem('Authorization');
  const config = {
    Authorization: token,
  };

  const res = request('post', USER_URL + '/logout/', null, config);

  return {
    type: LOGOUT_USER,
    payload: res,
  };
}

export function authUser() {
  const data = request('get', USER_URL + '/auth/').data;
  return {
    type: AUTH_USER,
    payload: data,
  };
}
