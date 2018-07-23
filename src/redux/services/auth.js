import qs from 'qs';
import axios from 'axios';
import baseURL from '../baseUrl';

function login(username, password) {
  console.log(password);
  return axios({
    method: 'post',
    url: `${baseURL}/user/login`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: qs.stringify({
      username,
      password,
    })
  });
}

function logout() {
  return axios({
    method: 'get',
    url: `${baseURL}/user/logout`,
  });
}

const authServices = {
  login,
  logout,
};

export default authServices;
