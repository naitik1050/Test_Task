import { takeEvery, put, call, delay } from 'redux-saga/effects';
import { CONSTANTS } from '../../constants/AppConst';
import { restaurantList } from '../actions';

export function* handleRestaurentList() {
    try {
        const res = yield call(restaurantList);
        yield put({
            type: CONSTANTS.RESTAURENT_GET_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.log(error);
        yield put({ type: CONSTANTS.RESTAURENT_GET_FAILURE });
    }
}

export default function* watchRestaurentList() {
    yield takeEvery(CONSTANTS.RESTAURENT_GET_REQUEST, handleRestaurentList);
}