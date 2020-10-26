import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import './index.css';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>,
  document.getElementById('root'),
);
