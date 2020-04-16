import { configureStore, createAction, createReducer } from '@reduxjs/toolkit';
import { ExampleData } from '@/pages/example/data';

export interface State {
  refresh: boolean;
  modalVisible: boolean;
  currentData: ExampleData | null;
}

const initialState: State = {
  refresh: true,
  modalVisible: false,
  currentData: null,
};

export const changeRefresh = createAction('change refresh status');

export const openDrawer = createAction('open form drawer', data => ({
  payload: data || null,
}));

export const closeDrawer = createAction('close form drawer', refresh => ({
  payload: refresh,
}));

export const reducer = createReducer(initialState, {
  [changeRefresh.type]: state => ({ ...state, refresh: !state.refresh }),
  [openDrawer.type]: (state, action) => ({
    ...state,
    currentData: action.payload,
    modalVisible: true,
  }),
  [closeDrawer.type]: (state, action) => ({
    modalVisible: false,
    currentData: null,
    refresh: action.payload,
  }),
});

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
});
