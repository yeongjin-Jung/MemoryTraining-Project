import axios from 'axios';

const DOMAIN = 'http://localhost:8000';
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
export const request = (method, url, data, config) => {
  return axios({
    method,
    url: DOMAIN + url,
    data,
    config,
  })
    .then((res) => {
      console.log(res.status);
      return res;
    })
    .catch((err) => console.log(err));
};
