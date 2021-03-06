import jwtDecode from 'jwt-decode';

import axios from '../../axios-api';
import * as types from './types';
import * as actions from './index';

const authStart = () => ({
  type: types.AUTH_START
});

export const authSuccess = jwt => {
  axios.defaults.headers['Authorization'] = `Bearer ${jwt}`;
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

export const updateUser = username => ({
  type: types.UPDATE_USER,
  username
});


const recentLogin = () => ({
  type: types.AUTH_RECENT_LOGIN
});

export const login = (email, password) => {
  return async dispatch => {
    dispatch(authStart());
    try {
      const response = await axios.post('/auth/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
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
  return async dispatch => {
    const token = localStorage.getItem('token');
    dispatch(actions.appLoading());
    if (token) {
      const response = await axios.post(`/auth/newToken`);
      localStorage.setItem('token', response.data.token);
      dispatch(authSuccess(response.data.token));
    }
    dispatch(actions.appFetchData());
  };
};
