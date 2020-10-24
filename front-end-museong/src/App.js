/* eslint-disable */

import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import Home from './pages/Home'
// import About from './pages/About'
import { Home, About } from './pages';
import { Menu } from './components';

const App = () => {
  return (
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </div>
  );
};

export default App;
