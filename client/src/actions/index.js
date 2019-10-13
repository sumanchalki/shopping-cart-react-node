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
  return function action(dispatch) {
    return fetch("/data/ProductData.json")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch({ type: types.FETCH_PRODUCTS, payload: json.Products });
      });
  }
}

export function getProductDetails(productId) {
  return function action(dispatch) {
    return fetch("/data/ProductData.json")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const product = json.Products.filter(product => {
          if (product.Id === productId) {
            return true;
          }
          else {
            return false;
          }
        });
        dispatch({ type: types.FETCH_PRODUCT_DETAILS, payload: product });
      });
  }
}

export const signUp = formProps => async dispatch => {
  try {
    let response = await fetch(process.env.REACT_APP_REMOTE_HOST + '/api/signup', {
      method: 'POST',
      body: JSON.stringify(formProps)
    });
    let data = await response.json();
    return data;
  }
  catch (e) {
    console.log(e);
  }
};

export const signIn = formProps => async dispatch => {
  try {
    let response = await fetch(process.env.REACT_APP_REMOTE_HOST + '/api/signin', {
      method: 'POST',
      body: JSON.stringify(formProps)
    });

    let data = await response.json();
    if (typeof(data.userData) !== 'undefined') {
      dispatch({ type: types.LOGIN_USER, payload: data.userData });
    }
    return data;
  }
  catch (e) {
    console.log(e);
  }
};

export const editProfile = (formId, userData, history) => async dispatch => {
  const formData = new FormData(document.getElementById(formId));
  formData.append('_id', userData._id);
  try {
    let response = await fetch(process.env.REACT_APP_REMOTE_HOST + '/api/update-profile', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${userData.token}`
      }
    });
    let data = await response.json();
    if (data.success) {
      dispatch({ type: types.RELOAD_USER, payload: data.userData });
    }
    else {
      // Server invalidated the token so signing out the user.
      dispatch({ type: types.LOGOUT_USER });
      history.push('/sign-in');
    }
    return data;
  }
  catch (e) {
    // Server rejected the request meaning the token is invalid.
    dispatch({ type: types.LOGOUT_USER });
    history.push('/sign-in');
  }
};

export const signOut = () => dispatch => {
  dispatch({ type: types.LOGOUT_USER });
};

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
