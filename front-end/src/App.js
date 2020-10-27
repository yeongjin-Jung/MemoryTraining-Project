/* eslint-disable */
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home, LandingPage, RegisterPage, LoginPage } from "./pages";
// import Auth from "./hoc/auth";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route exact path="/" component={Home} /> */}
        {/* <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} /> */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </BrowserRouter>
    );
  }
}

export default App;
