import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
// A provide is a component that enables us to interact with the store that was created in store.js
import { Provider } from 'react-redux';
// We import our newly created store to provide it as a prop to the provider.
import store from './store';

ReactDOM.render(
    // We "wrap" our App component with code so that any component in our component tree will have access to the store.
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
