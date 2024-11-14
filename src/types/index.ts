export interface Product {
  id: number;
  name: string;
  price: number;
  colour: string;
  img: string;
}

export interface BasketItem extends Product {
  quantity: number;
}

export interface BasketState {
  basket: BasketItem[];
}

export interface AddItemAction {
  type: 'ADD_ITEM';
  payload: BasketItem;
}

export interface RemoveItemAction {
  type: 'REMOVE_ITEM';
  payload: BasketItem;
}

export interface UpdateQuantityAction {
  type: 'UPDATE_QUANTITY';
  payload: {id: number; quantity: number};
}

export type BasketAction =
  | AddItemAction
  | RemoveItemAction
  | UpdateQuantityAction;
