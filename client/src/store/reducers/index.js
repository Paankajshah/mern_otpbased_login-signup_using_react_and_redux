
import { combineReducers } from 'redux';

import error from './error';
import auth from './auth';
import register from './register'

export default combineReducers({
  error,
  auth,
  register

});