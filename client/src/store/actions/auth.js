import axios from '../../axios-api';
import * as types from './types';
import jwtDecode from 'jwt-decode';

const authStart = () => ({
  type: types.AUTH_START
});

const authSuccess = jwt => {
  const user = jwtDecode(jwt.token);
  return {
    type: types.AUTH_SUCCESS,
    jwt: jwt.token,
    user
  };
};

const authFail = error => ({
  type: types.AUTH_FAIL,
  error: error.response
});

export const login = (email, password) => {
  return async dispatch => {
    dispatch(authStart());
    try {
      const response = await axios.post('/auth/login', { email, password });
      dispatch(authSuccess(response.data));
    } catch (error) {
      dispatch(authFail(error));
    }
  };
};

export const seeSuccessMessage = () => ({
  type: types.AUTH_SEE_MESSAGE
});

export const logout = () => ({
  type: types.AUTH_LOGOUT
});
