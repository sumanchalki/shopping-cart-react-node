import { all } from 'redux-saga/effects';
import { watchSignUp } from './users';


export default function* rootSaga() {
  yield all([
    watchSignUp(),
  ]);
}
