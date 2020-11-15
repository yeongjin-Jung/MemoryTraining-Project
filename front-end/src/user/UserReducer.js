import { LOGIN, LOGOUT } from './types';

const UserReducer = (state = { isLoggedIn: 'false' }, action) => {
  switch (action.type) {
    case LOGIN:
      //수정 console.log('REDUCER LOGIN CALLED.');
      return {
        ...state,
        isLoggedIn: 'true',
      };

    case LOGOUT:
      //수정 console.log('REDUCER LOGOUT CALLED.');
      return {
        ...state,
        isLoggedIn: 'false',
      };

    default:
      return state;
  }
};

export default UserReducer;
