import { LOGIN, LOGOUT } from './types';

const LoginReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggedIn: true,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default LoginReducer;
