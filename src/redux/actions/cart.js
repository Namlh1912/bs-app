import * as ACTIONS from '../types';

export function AddItemCart(book) {
  return{
    type: ACTIONS.ADD_ITEM_TO_CART,
    book
  };
}

export function EmptyCart(){
  return{
    type: ACTIONS.EMPTY_CART,
  };
}

export function UpdateItemQuantity(book,quantity) {
  return{
    type:ACTIONS.UPDATE_ITEM_QUANTITY,
    book,
    quantity
  };
}

export function RemoveItemCart(index, book) {
  return{
    type: ACTIONS.REMOVE_ITEM_CART,
    index,
    book
  };
}

const cartActions = {
  AddItemCart,
  EmptyCart,
  UpdateItemQuantity,
  RemoveItemCart
};

export default cartActions;