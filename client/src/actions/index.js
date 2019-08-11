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

export const signOut = () => dispatch => {
  dispatch({ type: types.LOGOUT_USER });
};

export const loadUser = (userDetails) => async dispatch => {
  try {
    let response = await fetch(process.env.REACT_APP_REMOTE_HOST + '/api/load-user', {
      method: 'POST',
      body: JSON.stringify(userDetails)
    });
    let data = await response.json();
    if (data.success) {
      dispatch({ type: types.LOAD_USER, payload: data });
    }
    return data;
  }
  catch (e) {
    console.log(e);
  }
};

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
