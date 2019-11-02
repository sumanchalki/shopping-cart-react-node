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

export function* watchEditProfile() {
  yield takeLatest(types.EDIT_PROFILE_REQUEST, editProfileSaga);
}

export function* editProfileSaga(action) {
  const formData = new FormData(document.getElementById(action.formId));
  formData.append('_id', action.userData._id);
  try {
    let response = yield fetch(
      process.env.REACT_APP_REMOTE_HOST + '/api/update-profile',
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${action.userData.token}`
        }
      }
    );
    let data = yield response.json();
    if (data.success) {
      yield put({ type: types.RELOAD_USER, payload: data.userData });
      yield call(action.resolve, data);
    } else {
      // Server invalidated the token so signing out the user.
      yield put({ type: types.LOGOUT_USER });
      action.history.push('/sign-in');
      yield call(action.reject);
    }
  } catch (e) {
    // Server rejected the request meaning the token is invalid.
    yield put({ type: types.LOGOUT_USER });
    action.history.push('/sign-in');
    yield call(action.reject);
  }
}
