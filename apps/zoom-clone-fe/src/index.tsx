import App from '@app/App';
import * as serviceWorker from '@app/serviceWorker';
import { store } from '@app/store/store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
