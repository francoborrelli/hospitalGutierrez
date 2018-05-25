import axios from '../../axios-api';
import * as types from './types';
import jwtDecode from 'jwt-decode';

const authStart = () => ({
  type: types.AUTH_START
});

const authSuccess = jwt => {
  const user = jwtDecode(jwt);
  return {
    type: types.AUTH_SUCCESS,
    jwt,
    user
  };
};

const authFail = error => ({
  type: types.AUTH_FAIL,
  error: error.response
});

const recentLogin = () => ({
  type: types.AUTH_RECENT_LOGIN
});

export const login = (email, password) => {
  return async dispatch => {
    dispatch(authStart());
    try {
      const response = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      dispatch(recentLogin());
      dispatch(authSuccess(response.data.token));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const seeSuccessMessage = () => ({
  type: types.AUTH_SEE_MESSAGE
});

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: types.AUTH_LOGOUT
  };
};

// TODO: expiration date
export const checkAuth = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      dispatch(authSuccess(token));
    }
  };
};