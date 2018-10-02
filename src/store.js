// This file sets up the redux store so that we can modify and reference data from it.
import {createStore} from 'redux';
import reducer from './dux/guestList';

// We invoke create store and pass in the reducer.
//NOTE: The second argument is code that we add to make it so our Redux DevTools extension can see data from the redux store for debugging purposes. It isn't required, but it is very helpful when we are trying to debug an application that is using redux.
export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());