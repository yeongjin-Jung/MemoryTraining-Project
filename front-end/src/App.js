import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home, Login, Search, Sets } from './pages';
import { MyNavbar } from './components';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      // <BrowserRouter>
      //   <Navbar />
      //   <Switch>
      //     <Route exact path="/" component={Home} />
      //     <Route path="/login" component={Login} />
      //     <Route path="/search" component={Search} />
      //     <Route path="/sets" component={Sets} />
      //   </Switch>
      // </BrowserRouter>
      <BrowserRouter>
        <MyNavbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/sets" component={Sets} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
