import { applyMiddleware, createStore, compose } from 'redux';
/* import { composeWithDevTools } from 'redux-devtools-extension'; */
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducer.js';

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;