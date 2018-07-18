import * as ACTIONS from '../types';

const initialState = {
  cart: {
    items: [],
    updated: null,
  }
};

export default function carts(state = initialState, action) {
  switch (action.type){
    case ACTIONS.ADD_ITEM_TO_CART:
      state.cart.items.push(action.item);
      return state.cart;
      return{
        cart: {
          //Add item to item list
          items:[
            ...state.cart.items,
            action.item
          ],
          //Updated current time of item
          updated: Date.now(),

        }
      };
    case ACTIONS.EMPTY_CART:
      return{
        cart:{
          //Clear items
          items: [],
          updated: Date.now(),
        }
      };
    case ACTIONS.UPDATE_ITEM_QUANTITY:
      return{
        books: [...state.books, action.book]
      };
    case ACTIONS.REMOVE_ITEM_CART:
      return{
        cart:{
          item:[
            ...state.cart.items.slice(0,action.index),
            ...state.cart.items.slice(action.index+1),
          ],
          updated: Date.now(),
        }
      };
    default:
      return state;
  }
}