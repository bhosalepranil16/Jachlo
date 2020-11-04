import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';

import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import rootReducer from './store/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancers());

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>,document.getElementById('root'));
serviceWorker.unregister();
