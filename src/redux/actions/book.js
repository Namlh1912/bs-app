import * as ACTIONS from '../types';
import bookServices from '../services/book';

function listBook() {
  function request() {
    return { type: ACTIONS.LIST_BOOK_REQUEST };
  }
  function success(payload) {
    return { type: ACTIONS.LIST_BOOK_SUCCESS, payload };
  }
  function failure() {
    return { type: ACTIONS.LIST_BOOK_FAIL };
  }

  return async (dispatch) => {
    dispatch(request());
    await bookServices.listBook().then(
      (res) => {
        dispatch(success({ books: res.data }));
      },
      () => {
        dispatch(failure());
      },
    );
  };
}

const bookActions = {
  listBook,
};

export default bookActions;
