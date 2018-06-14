import { combineReducers } from 'redux';

import auth from './auth';
import app from './app';

const reducer = combineReducers({ auth, app });

export default reducer;
