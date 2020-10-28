/* eslint-disable */
import React, { Component } from 'react';
import { Home, RegisterPage, LoginPage, Search, Sets, StudyPage } from './pages';
// import Auth from "./hoc/auth";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
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
        {/* <Route path="/login" component={Login} /> */}
        {/* <Route exact path="/" component={Home} /> */}
        {/* <Route exact path="/" component={Auth(LandingPage, null)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} /> */}
        <MyNavbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route path="/search" component={Search} />
          <Route path="/sets" component={Sets} />
          <Route path="/studypage" component={StudyPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
