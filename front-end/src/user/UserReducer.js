import { LOGIN, LOGOUT } from './types';

const UserReducer = (state = { isLoggedIn: 'false' }, action) => {
  switch (action.type) {
    case LOGIN:
      console.log('REDUCER LOGIN CALLED.');
      return {
        ...state,
        isLoggedIn: 'true',
      };

    case LOGOUT:
      console.log('REDUCER LOGOUT CALLED.');
      return {
        ...state,
        isLoggedIn: 'false',
      };

    default:
      return state;
  }
};

export default UserReducer;
