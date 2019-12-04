import React from 'react';
import ReactDOM from 'react-dom';

// config
import './config/axios.config';

// redux
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './reducer';

// router
import Router from './router';

// worker
import * as serviceWorker from './serviceWorker';

// global style
import './global.less';

// 当前运行环境
const environment = process.env.NODE_ENV;

// 开发环境启动chrome插件
const store =
  // eslint-disable-next-line no-nested-ternary
  environment !== 'development'
    ? createStore(reducers, compose(applyMiddleware(thunk)))
    : // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__
    ? // eslint-disable-next-line no-underscore-dangle
      createStore(reducers, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()))
    : createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
