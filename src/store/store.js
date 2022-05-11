import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk'; //Este es un middleware que efectua la peticiones asincronas

// Combine Reducers:
import rootReducer from '../reducers/rootReducers';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    );

export default store;