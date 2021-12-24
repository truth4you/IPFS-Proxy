import { combineReducers } from 'redux';
import home from './home';
import users from './users';
import keys from './keys';
import alert from './alert';

const reducer = combineReducers({
  home,
  users,
  keys,
  alert
});

export default reducer;
