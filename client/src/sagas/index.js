import { all } from 'redux-saga/effects';
import { watchSignUp, watchSignIn } from './users';

export default function* rootSaga() {
  yield all([watchSignUp(), watchSignIn()]);
}
