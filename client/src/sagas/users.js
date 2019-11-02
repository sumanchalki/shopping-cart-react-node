import { call, takeEvery } from 'redux-saga/effects';
import * as types from '../actions/action-types';

export function* watchSignUp() {
  yield takeEvery(types.SIGN_UP_REQUEST, signUpSaga);
}

export function* signUpSaga(action) {
  try {
    const response = yield fetch(process.env.REACT_APP_REMOTE_HOST + '/api/signup', {
      method: 'POST',
      body: JSON.stringify(action.formProps)
    });
    const data = yield response.json();
    if (data.success) {
      yield call(action.resolve, data);
    }
    else {
      yield call(action.reject, data);
    }
  }
  catch (e) {
    console.log(e);
    yield call(action.reject);
  }
}
