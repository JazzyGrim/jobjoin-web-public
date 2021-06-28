import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import reducer from './reducers';
import authSaga from './sagas/auth';
import chatSaga from './sagas/chat';
import jobSaga from './sagas/job';
import reportSaga from './sagas/report';
import userSaga from './sagas/user';

const sagaMiddleware = createSagaMiddleware( );

const middleware = applyMiddleware( sagaMiddleware, logger, thunk );

let store = createStore( reducer, middleware );

let persistor = persistStore( store );

export default { store, persistor }

sagaMiddleware.run( authSaga );
sagaMiddleware.run( chatSaga );
sagaMiddleware.run( jobSaga );
sagaMiddleware.run( reportSaga );
sagaMiddleware.run( userSaga );