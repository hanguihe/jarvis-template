import React from 'react';

export const initialState = {
  refresh: true,
  visible: false,
  currentData: null,
};

export const CHANGE_REFRESH_STATUS = 'change refresh status';

export const OPEN_DRAWER_FORM = 'open drawer form';

export const CLOSE_DRAWER_FORM = 'close drawer form';

export const StoreContext = React.createContext({
  state: initialState,
  dispatch: () => null,
});

export const reducer = (state, action) => {
  console.log('store', state, action);

  switch (action.type) {
    case CHANGE_REFRESH_STATUS:
      return { ...state, refresh: !state.refresh };
    case OPEN_DRAWER_FORM:
      return { ...state, visible: true, currentData: action.payload || null };
    case CLOSE_DRAWER_FORM:
      return {
        ...state,
        visible: false,
        currentData: null,
        refresh: action.payload,
      };
    default:
      return state;
  }
};
