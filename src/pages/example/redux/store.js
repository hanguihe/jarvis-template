const initialState = {
  refresh: true,
  visible: false,
  currentData: null,
};

const CHANGE_REFRESH_STATUS = 'change refresh type';
const OPEN_DRAWER_FORM = 'open drawer form';
const CLOSE_DRAWER_FORM = 'close drawer form';

export const changeRefreshStatus = () => {
  return { type: CHANGE_REFRESH_STATUS };
};

export const openDrawerForm = data => {
  console.log(1);
  return { type: OPEN_DRAWER_FORM, payload: data || null };
};

export const closeDrawerForm = refresh => {
  return { type: CLOSE_DRAWER_FORM, payload: refresh };
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_REFRESH_STATUS:
      return { ...state, refresh: !state.refresh };
    case OPEN_DRAWER_FORM:
      return { ...state, visible: true, currentData: action.payload };
    case CLOSE_DRAWER_FORM:
      return { visible: false, currentData: null, refresh: action.payload };
    default:
      return state;
  }
}
