import { takeEvery, put, call, delay } from 'redux-saga/effects';
import { Keyboard } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { CONSTANTS, ROUTES } from '../../constants';
import  {RootNavigation}  from '../../navigators/RootNavigation';
import { Colors } from '../../theme';
import { logIn, signOut, signUp } from '../actions';

export function* loginSaga(action) {
    Keyboard.dismiss();
    const { payload } = action;
    try {
        const data = yield call(logIn, payload);
        if (data.emailVerified) {
            RootNavigation.navigate(ROUTES.RESTAURENT_LIST)
            yield put({ type: CONSTANTS.SIGNIN_SUCCEEDED, payload: data });
        } else {
            Snackbar.show({ text: 'Please Verify Your Email Address', backgroundColor: Colors.warning });
            yield put({ type: CONSTANTS.SIGNIN_FAILED });
        }
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            Snackbar.show({ text: 'User is not found with this email address!', backgroundColor: Colors.error });
            yield put({ type: CONSTANTS.SIGNIN_FAILED });
        } else {
            Snackbar.show({ text: 'Please check your email and password', backgroundColor: Colors.error });
            yield put({ type: CONSTANTS.SIGNIN_FAILED });
        }
    }
}

export function* signupSaga(action) {
    Keyboard.dismiss();
    const { payload } = action;
    try {
        const data = yield call(signUp, payload);
        Snackbar.show({ text: 'SignUp Sccessful', backgroundColor: Colors.success });
        RootNavigation.navigate(ROUTES.LOGIN)
        yield put({ type: CONSTANTS.SIGNUP_SUCCEEDED, payload: data });
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            Snackbar.show({ text: 'That email address is already in use!', backgroundColor: Colors.error });
            yield put({ type: CONSTANTS.SIGNUP_FAILED });
        }
        if (error.code === 'auth/invalid-email') {
            Snackbar.show({ text: 'That email address is invalid!', backgroundColor: Colors.error });
            yield put({ type: CONSTANTS.SIGNUP_FAILED });
        }
    }
}

export function* signOutSaga() {
    try {
        yield call(signOut);
        Snackbar.show({ text: 'SignOut Succecced!', backgroundColor: Colors.success });
        // RootNavigation.navigate(ROUTES.LOGIN)
        yield put({ type: CONSTANTS.SIGNOUT_SUCCEEDED });
    } catch (error) {
        yield put({ type: CONSTANTS.SIGNOUT_FAILED });
    }
}

export default function* watchAuth() {
    yield takeEvery(CONSTANTS.SIGNIN_REQUESTED, loginSaga);
    yield takeEvery(CONSTANTS.SIGNUP_REQUESTED, signupSaga);
    yield takeEvery(CONSTANTS.SIGNOUT_REQUESTED, signOutSaga);
}