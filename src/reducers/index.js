import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import chat from './chatReducer'
import job from './jobReducer'
import report from './reportReducer'
import user from './userReducer'
import loading from './loadingReducer'
import error from './errorReducer'
import success from './successReducer'

const persistConfig = {
    key: 'user',
    storage,
    whitelist: [ 'id', 'type', 'token', 'valid' ]
}

const rootReducer = combineReducers( {
    user:  persistReducer( persistConfig, user ),
    job,
    chat,
    report,
    loading,
    error,
    success
} );

export default ( state, action ) => {
    if ( action.type === 'LOGOUT' ) {
        state = undefined;
    }

    return rootReducer( state, action );
}