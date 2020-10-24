import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Login, Home } from "./pages";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Home} />
      </BrowserRouter>
    );
  }
}

export default App;
