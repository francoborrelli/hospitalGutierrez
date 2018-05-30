import * as types from '../actions/types';

const initialState = {
  appLoading: false,
  title: null,
  email: null,
  footer: null,
  listAmount: null,
  enabled: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.APP_LOADING:
      return { ...state, appLoading: true };
    case types.APP_LOADED:
      return {
        ...state,
        appLoading: false,
        title: action.site.title,
        email: action.site.email,
        footer: action.site.footer,
        enabled: action.site.enabled,
        listAmount: action.site.listAmount
      };
    case types.APP_DISABLED:
      return { ...state, enabled: false };
    case types.APP_ENABLED:
      return { ...state, enabled: true };
    default:
      return state;
  }
};

export default reducer;
