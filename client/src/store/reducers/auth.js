import * as types from '../actions/types';

const initialState = {
  jwt: null,
  user: null,
  loading: false,
  error: null,
  recentLogin: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return { ...state, loading: true, error: null };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        jwt: action.jwt,
        user: action.user
      };
    case types.AUTH_RECENT_LOGIN:
      return { ...state, recentLogin: true };
    case types.AUTH_FAIL:
      return { ...state, loading: false, error: action.error };
    case types.AUTH_LOGOUT:
      return { ...state, jwt: null, user: null };
    case types.AUTH_SEE_MESSAGE:
      return { ...state, recentLogin: false };
    default:
      return state;
  }
};

export default reducer;
