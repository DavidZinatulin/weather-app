import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from 'redux/store';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/sagas';
import 'styles/theme.scss';
import App from './containers/App';

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({}, sagaMiddleware);
const MOUNT_NODE = document.getElementById('app');

sagaMiddleware.run(rootSaga);

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
