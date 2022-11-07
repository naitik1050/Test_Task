import { combineReducers } from 'redux';
import authReducer from './auth_reducer';
import restaurentListReducer from './restaurentList_reducer';

export default combineReducers({
  authReducer:authReducer,
  restaurentListReducer: restaurentListReducer,
});
