import * as types from './action-types';

export function addToCartAction(product) {
  return {
    type: types.ADD_TO_CART,
    payload: { Id: product.Id, Title: product.Title, Price: product.Price }
  };
}

export function removeFromCartAction(productId) {
  return {
    type: types.REMOVE_FROM_CART,
    productId: productId
  };
}

export function updateCartAction(payload) {
  return {
    type: types.UPDATE_CART,
    payload
  };
}

export function getProducts(payload) {
  return {
    type: types.FETCH_PRODUCTS_REQUEST,
    payload
  };
}

export function getProductDetails(productId) {
  return {
    type: types.FETCH_PRODUCT_DETAILS_REQUEST,
    productId
  };
}

export function signUp(formProps, resolve, reject) {
  return {
    type: types.SIGN_UP_REQUEST,
    formProps,
    resolve,
    reject
  };
}

export function signIn(formProps, resolve, reject) {
  return {
    type: types.SIGN_IN_REQUEST,
    formProps,
    resolve,
    reject
  };
}

export function editProfile(formId, userData, history, resolve, reject) {
  return {
    type: types.EDIT_PROFILE_REQUEST,
    formId,
    userData,
    history,
    resolve,
    reject
  };
}

export const signOut = () => dispatch => {
  dispatch({ type: types.LOGOUT_USER });
};
