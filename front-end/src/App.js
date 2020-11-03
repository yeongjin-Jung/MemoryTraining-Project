/* eslint-disable */
import React, { Component } from 'react';
import { Home, RegisterPage, LoginPage, StudyPage, SearchPage, SetsPage, SetPage, SetDetailPage } from './pages';
// import Auth from "./hoc/auth";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MyNavbar } from './components';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <MyNavbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />

          {/* <Route path="/sets" component={Sets} /> */}
          <Route path="/studypage" component={StudyPage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/sets" component={SetsPage} />
          <Route path="/set-create" component={SetPage} />
          <Route path="/set-detail" component={SetDetailPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
