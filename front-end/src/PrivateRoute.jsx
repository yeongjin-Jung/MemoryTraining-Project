/* eslint-disable */
import React, { Component, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { MyNavbar } from './components';
import { MdStayPrimaryPortrait } from 'react-icons/md';

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
        // localStorage.getItem('Authorization') != undefined ? (
        //   <>
        //     <MyNavbar />
        //     <Component {...props} />
        //   </>
        // ) : (
        //   <Redirect to={{ pathname: '/login' }} />
        // )
        {
          if (localStorage.getItem('Authorization') == undefined) {
            return <Redirect to={{ pathname: '/login' }} />;
          } else {
            console.log('ELSE -> props : ', props);
            if (props.location.pathname == '/login' || props.location.pathname == '/register') {
              return <Redirect to={{ pathname: '/' }} />;
            } else
              return (
                <>
                  <MyNavbar />
                  <Component {...props} />
                </>
              );
          }
        }
      }
    />
  );
};

export default PrivateRoute;
