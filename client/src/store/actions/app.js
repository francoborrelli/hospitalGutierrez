import * as types from './types';
import axios from '../../axios-api';

export const appLoading = () => ({
  type: types.APP_LOADING
});

export const appLoaded = site => ({
  type: types.APP_LOADED,
  site
});

export const appFetchData = () => {
  return async dispatch => {
    const response = await axios.get(`/site`);
    return dispatch(appLoaded(response.data));
  };
};
