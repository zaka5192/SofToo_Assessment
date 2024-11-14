import React, {createContext, useReducer, useContext, ReactNode} from 'react';
import {BasketState, BasketAction, BasketItem} from '../types';

// Initial state
const initialState: BasketState = {
  basket: [],
};

// Reducer function with typed actions
function basketReducer(state: BasketState, action: BasketAction): BasketState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {...state, basket: [...state.basket, action.payload]};
    case 'REMOVE_ITEM':
      return {
        ...state,
        basket: state.basket.filter(item => item.id !== action.payload.id),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        basket: state.basket.map(item =>
          item.id === action.payload.id
            ? {...item, quantity: action.payload.quantity}
            : item,
        ),
      };
    default:
      return state;
  }
}

// Typing the context value
interface BasketProviderProps {
  children: ReactNode;
}

const BasketContext = createContext<
  {state: BasketState; dispatch: React.Dispatch<BasketAction>} | undefined
>(undefined);

export const BasketProvider: React.FC<BasketProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer(basketReducer, initialState);

  return (
    <BasketContext.Provider value={{state, dispatch}}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = (): {
  state: BasketState;
  dispatch: React.Dispatch<BasketAction>;
} => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};
