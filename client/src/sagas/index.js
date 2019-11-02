import { all } from 'redux-saga/effects';
import { watchSignUp, watchSignIn, watchEditProfile } from './users';
import { watchFetchProducts, watchFetchProductDetails } from './products';

export default function* rootSaga() {
  yield all([
    watchSignUp(),
    watchSignIn(),
    watchFetchProducts(),
    watchFetchProductDetails(),
    watchEditProfile()
  ]);
}
