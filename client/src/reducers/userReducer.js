import * as types from '../actions/action-types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.SIGN_IN_SUCCESS:
      let userData = action.payload;
      return { ...state, userData };
    case types.LOGOUT_USER:
      return {};
    case types.RELOAD_USER:
      userData = action.payload;
      const token = state.userData.token;
      return { ...state, userData: { ...userData, token } };
    default:
      return state;
  }
};

export default userReducer;
