import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { browserHistory } from './helper/browserHistory';

import App from './App/App';
import './index.css';


ReactDOM.render(
  <HashRouter history={browserHistory}>
    <App />
  </HashRouter>
  ,
  document.getElementById('root')
);
