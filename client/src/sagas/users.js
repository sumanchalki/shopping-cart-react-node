import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/action-types';

export function* watchSignUp() {
  yield takeLatest(types.SIGN_UP_REQUEST, signUpSaga);
}

export function* signUpSaga(action) {
  try {
    const response = yield fetch(
      process.env.REACT_APP_REMOTE_HOST + '/api/signup',
      {
        method: 'POST',
        body: JSON.stringify(action.formProps)
      }
    );
    const data = yield response.json();
    if (data.success) {
      yield call(action.resolve, data);
    } else {
      yield call(action.reject, data);
    }
  } catch (e) {
    console.log(e);
    yield call(action.reject);
  }
}

export function* watchSignIn() {
  yield takeLatest(types.SIGN_IN_REQUEST, signInSaga);
}

export function* signInSaga(action) {
  try {
    const response = yield fetch(
      process.env.REACT_APP_REMOTE_HOST + '/api/signin',
      {
        method: 'POST',
        body: JSON.stringify(action.formProps)
      }
    );
    const data = yield response.json();
    // For success dispatch SIGN_IN_SUCCESS action to
    // update localstorage with session data and then
    // resolve the promise (caller component will act on it).
    if (data.success && typeof data.userData !== 'undefined') {
      yield put({
        type: types.SIGN_IN_SUCCESS,
        payload: data.userData
      });
      yield call(action.resolve, data);
    } else {
      yield call(action.reject, data);
    }
  } catch (e) {
    console.log(e);
    yield call(action.reject);
  }
}
