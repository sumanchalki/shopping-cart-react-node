import * as types from '../actions/action-types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_USER:
      const userData = action.payload;
      return { ...state, ...{ userData } };
    case types.LOGOUT_USER:
      return { ...state, ...{ userData: null } };
    default:
      return state;
  }
}

export default userReducer;
