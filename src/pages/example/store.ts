import React, { createContext, Dispatch, Reducer } from 'react';
import { ExampleData } from '@/pages/example/data';

interface State {
  refresh: boolean;
  modalVisible: boolean;
  currentData: ExampleData | null;
}

interface Action {
  type: 'refresh' | 'open-drawer' | 'close-modal';
  payload?: any;
}

export const initialState: State = {
  refresh: true,
  modalVisible: false,
  currentData: null,
};

export const StoreContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const reducer: Reducer<State, Action> = (state, action) => {
  console.log('store', action);

  switch (action.type) {
    case 'refresh':
      return {
        ...state,
        refresh: !state.refresh,
      };
    case 'open-drawer':
      return {
        ...state,
        modalVisible: true,
        currentData: action.payload || null,
      };
    case 'close-modal':
      return {
        ...state,
        modalVisible: false,
        refresh: action.payload,
      };
    default:
      return state;
  }
};
