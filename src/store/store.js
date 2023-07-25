import { compose , createStore, applyMiddleware} from 'redux';
//import logger from 'redux-logger';
import {persistStore , persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {rootReducer} from './root-reducer';
// root-reducer
import thunk from 'redux-thunk';
import { dispatch } from 'react';
import { loggerMiddleware } from './middleware/logger';

import createSagaMiddleware from 'redux-saga';

import { rootSaga } from './root-saga';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
}

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [process.env.NODE_ENV === 'production' && loggerMiddleware,sagaMiddleware , thunk,].filter(Boolean); //if in production nothing will be logged from the middleware logger

// const thunkMiddleware = (store)=> (next) => (action)=>{
//     if(typeof(action) === 'function'){
//         action(dispatch);
//     }
// }

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose ;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer , undefined, composedEnhancers); //store will be using persistedreducer that is the reducer persisting all latest changes as per local storage changes

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);