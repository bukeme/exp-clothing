import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import {thunk} from 'redux-thunk';
// import createSagaMiddleware from 'redux-saga';

import rootReducer from './root-reducer';

// const sagaMiddleware = createSagaMiddleware()
const middlewares = [thunk, logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
// sagaMiddleware.run(fetchCollectionsStart);
export const persistor = persistStore(store);

// export default { store, persistor };