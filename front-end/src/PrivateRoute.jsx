/* eslint-disable */
import React, { Component, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { MyNavbar } from './components';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  useEffect(() => {
    // //수정 console.log('PrivateRoute.jsx useEffect called.');
    // //수정 console.log('...rest : ', { ...rest });
    // //수정 console.log('isLoggedIn : ', isLoggedIn);
    // //수정 console.log('typeof isLoggedIn : ', typeof isLoggedIn);
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        // localStorage.getItem('Authorization') != undefined ? (
        isLoggedIn == 'true' ? (
          <>
            <MyNavbar />
            <Component {...props} isLoggedIn={isLoggedIn} />
          </>
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
};

let mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
  };
};

// PrivateRoute = connect(mapStateToProps)(PrivateRoute);

// export default PrivateRoute;

export default connect(mapStateToProps)(PrivateRoute);
