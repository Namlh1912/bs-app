import axios from 'axios';

function listBook() {
  return axios({
    method: 'get',
    url: 'https://5286e018-07e5-4711-9b1f-f2d93ad5f74c.mock.pstmn.io/listbook',
  });
}

const bookServices = {
  listBook,
};

export default bookServices;