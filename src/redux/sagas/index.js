import { all } from 'redux-saga/effects';
import watchAuth from './auth_saga';
import watchRestaurentList from './restaurentList_saga';

export default function* sagas() {
  yield all([
    watchAuth(),
    watchRestaurentList(),
  ]);
}
