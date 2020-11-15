import axios from 'axios';

const DOMAIN = 'http://localhost:8000';
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
export const request = (method, url, data) => {
  //수정 console.log(data);
  return axios({
    method,
    url: DOMAIN + url,
    data,
  })
    .then((res) => {
      //수정 console.log('res', res);
      return res.data;
    })
    .catch((err) => //수정 console.log(err));
};
