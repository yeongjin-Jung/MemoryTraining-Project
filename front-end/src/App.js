/* eslint-disable */
import React from 'react';
import {
  Home,
  RegisterPage,
  LoginPage,
  StudyPage,
  SearchPage,
  SetsPage,
  SetCreatePage,
  SetDetailPage,
  QuizPage,
  SetModifyPage,
  TestPaperPage,
  TestPaperPage_word,
  TestPaperPage_meaning,
  GamePage,
} from './pages';
// import Auth from "./hoc/auth";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import PrivateRoute from './PrivateRoute';

import UserReducer from './user/UserReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Interceptor from './Interceptor';

const store = createStore(UserReducer);
Interceptor.interceptor(store);

if (localStorage.getItem('Authorization') != undefined) {
  store.dispatch({ type: 'LOGIN' });
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route
            path="/login"
            component={() => {
              if (localStorage.getItem('Authorization') == undefined) {
                return <LoginPage />;
              } else {
                return <Redirect to={{ pathname: '/' }} />;
              }
            }}
          />
          <Route
            path="/register"
            component={() => {
              if (localStorage.getItem('Authorization') == undefined) {
                return <RegisterPage />;
              } else {
                return <Redirect to={{ pathname: '/' }} />;
              }
            }}
          />

          <PrivateRoute path="/" exact component={Home} />
          <PrivateRoute path="/search" component={SearchPage} />
          <PrivateRoute path="/sets" component={SetsPage} />
          <PrivateRoute path="/set-create" component={SetCreatePage} />
          <PrivateRoute path="/set-detail" component={SetDetailPage} />
          <PrivateRoute path="/study" component={StudyPage} />
          <PrivateRoute path="/quiz" component={QuizPage} />
          <PrivateRoute path="/set-modify" component={SetModifyPage} />
          <PrivateRoute path="/test-paper" component={TestPaperPage} />
          <PrivateRoute path="/test-only-word" component={TestPaperPage_word} />
          <PrivateRoute path="/test-only-meaning" component={TestPaperPage_meaning} />
          <PrivateRoute path="/game" component={GamePage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
