/* eslint-disable */
import React, { Component, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { MyNavbar } from './components';

const PrivateRoute = ({ component: Component, ...rest }) => {
  //   useEffect(() => {
  //     authorization = localStorage.getItem('Authorization');
  //     console.log('PrivateRoute.jsx useEffect called.');
  //     console.log('authorization : ', authorization);
  //     console.log('authorization == null', authorization == null);
  //     // console.log(props);
  //   });

  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('Authorization') != undefined ? (
          <>
            <MyNavbar />
            <Component {...props} />
          </>
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
};

export default PrivateRoute;
