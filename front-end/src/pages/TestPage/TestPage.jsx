import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducers from './reducers';

const store = createStore(reducers);

const render = () => {
  ReactDOM.render(<App store={store} />, document.getElementById('root'));
};
store.subscribe(render);
render();
