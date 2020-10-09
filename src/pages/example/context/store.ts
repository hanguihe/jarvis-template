import { createContext, Dispatch, Reducer } from 'react';

interface State {
  visible: boolean;
  refresh: boolean;
  formType: string;
  currentData: null | DataSource;
  dataSource: [];
}

interface Action {
  type: 'open-form' | 'close-form' | 'set-data-list' | 're-fetch-data';
  payload?: any;
}

export const initialState: State = {
  visible: false,
  refresh: false,
  formType: 'new',
  currentData: null,
  dataSource: [],
};

export const StoreContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'open-form':
      if (action.payload.type === 'new') {
        return {
          ...state,
          formType: 'new',
          visible: true,
        };
      }
      return {
        ...state,
        visible: true,
        formType: 'update',
        currentData: action.payload.data,
      };
    case 'close-form':
      return {
        ...state,
        visible: false,
      };
    case 'set-data-list':
      return {
        ...state,
        refresh: false,
        dataSource: action.payload,
      };
    case 're-fetch-data':
      return {
        ...state,
        refresh: true,
      };
    default:
      return state;
  }
};
