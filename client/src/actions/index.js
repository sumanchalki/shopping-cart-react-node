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

export const editProfile = (formId, userData, history) => async dispatch => {
  const formData = new FormData(document.getElementById(formId));
  formData.append('_id', userData._id);
  try {
    let response = await fetch(
      process.env.REACT_APP_REMOTE_HOST + '/api/update-profile',
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      }
    );
    let data = await response.json();
    if (data.success) {
      dispatch({ type: types.RELOAD_USER, payload: data.userData });
    } else {
      // Server invalidated the token so signing out the user.
      dispatch({ type: types.LOGOUT_USER });
      history.push('/sign-in');
    }
    return data;
  } catch (e) {
    // Server rejected the request meaning the token is invalid.
    dispatch({ type: types.LOGOUT_USER });
    history.push('/sign-in');
  }
};

export const signOut = () => dispatch => {
  dispatch({ type: types.LOGOUT_USER });
};
