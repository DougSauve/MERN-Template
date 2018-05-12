import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';

import './styles/styles.scss'

import Maintenance from './components/maintenance/maintenance';
import NotFound from './components/notFound/notFound';
import createStore from './redux/store';
const store = createStore();


import Index from './components/index/index';

//router
const Router = () => {
    switch (window.location.pathname) {
      case '/': return <Index />;

      default:
      return <NotFound />;
  };
};

const WrappedApp = () => (
  <Provider store = {store} >
    <Router />
  </Provider>
);

ReactDOM.render(<WrappedApp />, document.getElementById('app'));
