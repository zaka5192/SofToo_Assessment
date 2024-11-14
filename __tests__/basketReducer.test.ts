import {basketReducer} from '../src/context/BasketContext';
import {BasketItem} from '../src/types';

describe('basketReducer', () => {
  it('should add an item to the basket', () => {
    const initialState = {basket: []};
    const newItem: BasketItem = {
      id: 1,
      name: 'Product 1',
      colour: 'Black',
      img: '',
      price: 10,
      quantity: 1,
    };
    const action = {type: 'ADD_ITEM', payload: newItem};
    const state = basketReducer(initialState, action);
    expect(state.basket.length).toBe(1);
    expect(state.basket[0]).toEqual(newItem);
  });

  it('should remove an item from the basket', () => {
    const initialState = {
      basket: [{id: 1, name: 'Product 1', price: 10, quantity: 1}],
    };
    const action = {
      type: 'REMOVE_ITEM',
      payload: {id: 1, name: 'Product 1', price: 10, quantity: 1},
    };
    const state = basketReducer(initialState, action);
    expect(state.basket.length).toBe(0);
  });

  it('should update item quantity', () => {
    const initialState = {
      basket: [{id: 1, name: 'Product 1', price: 10, quantity: 1}],
    };
    const action = {type: 'UPDATE_QUANTITY', payload: {id: 1, quantity: 2}};
    const state = basketReducer(initialState, action);
    expect(state.basket[0].quantity).toBe(2);
  });
});
