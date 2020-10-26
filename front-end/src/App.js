import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Login, Home, Search, Sets } from './pages';
import { Nav } from './components';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/search" component={Search} />
          <Route path="/sets" component={Sets} />
        </Switch>
      </div>
    );
  }
}

export default App;
