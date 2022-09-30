import { applyMiddleware, createStore, compose } from 'redux';
/* import { composeWithDevTools } from 'redux-devtools-extension'; */
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk),
    /* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */));

export default store;