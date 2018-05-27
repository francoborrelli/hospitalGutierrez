import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from './axios-api';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import reducer from './store/reducers';
import App from './App';
import * as actions from './store/actions';
import './main.css';
import registerServiceWorker from './registerServiceWorker';
import { AUTH_SUCCESS } from './store/actions/types';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware)
);

store.dispatch(actions.checkAuth());

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      if (error.response.data.newToken) {
        const token = error.response.data.newToken;
        localStorage.setItem('token', token);
        store.dispatch(actions.authSuccess(token));
      }
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
