import axios from 'axios';
import baseURL from '../baseUrl';

function signUp(data) {
  return axios({
    method: 'post',
    url: `${baseURL}/user/sign-up`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: JSON.stringify(data),
  });
}

const userServices = {
  signUp,
};

export default userServices;


