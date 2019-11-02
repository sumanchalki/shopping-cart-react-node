import { put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/action-types';

export function* watchFetchProducts() {
  yield takeLatest(types.FETCH_PRODUCTS_REQUEST, fetchProductsSaga);
}

export function* fetchProductsSaga(action) {
  try {
    const products = yield fetch('/data/ProductData.json')
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then(json => {
        return json.Products;
      });

    yield put({ type: types.FETCH_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    console.log(error);
  }
}

export function* watchFetchProductDetails() {
  yield takeLatest(
    types.FETCH_PRODUCT_DETAILS_REQUEST,
    fetchProductDetailsSaga
  );
}

export function* fetchProductDetailsSaga(action) {
  try {
    const product = yield fetch('/data/ProductData.json')
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(res => res.json())
      .then(json => {
        return json.Products.filter(product => {
          if (product.Id === action.productId) {
            return true;
          } else {
            return false;
          }
        });
      });

    yield put({ type: types.FETCH_PRODUCT_DETAILS_SUCCESS, payload: product });
  } catch (error) {
    console.log(error);
  }
}
