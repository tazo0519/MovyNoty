import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import rootReducer, { rootSaga } from './modules/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { tempSetUser, check } from './modules/user';
import { HelmetProvider } from 'react-helmet-async';

const sagaMiddleware = createSagaMiddleware();
//store 생성
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return;
    store.dispatch(tempSetUser(user));
    store.dispatch(check());
  } catch (error) {
    console.log('not working');
  }
}

sagaMiddleware.run(rootSaga);
loadUser();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();


