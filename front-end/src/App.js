/* eslint-disable */
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Login, Home, LandingPage, RegisterPage } from "./pages";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={RegisterPage} />
      </BrowserRouter>
    );
  }
}

export default App;
