import { all, put, takeLatest } from 'redux-saga/effects'
import axios from '../js/axios'

function* getChatHistory( { payload } ) {
    yield put( { type: 'GET_CHAT_HISTORY_REQUEST' } )
    try {
        const data = yield axios.get( '/chat-history?page=' + payload.page, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        yield put( { type: 'GET_CHAT_HISTORY_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'GET_CHAT_HISTORY_ERROR', payload: e } )
    }
}

function* watchGetChatHistory( ) {
    yield takeLatest( "GET_CHAT_HISTORY_TRIGGER", getChatHistory )
}

function* unlockChat( { payload } ) {
    yield put( { type: 'UNLOCK_CHAT_REQUEST' } )
    try {
        const data = yield axios.post( '/user/chat-unlock/', { userID: payload.userID }, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        yield put( { type: 'UNLOCK_CHAT_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'UNLOCK_CHAT_ERROR', payload: e } )
    }
}

function* watchUnlockChat( ) {
    yield takeLatest( "UNLOCK_CHAT_TRIGGER", unlockChat )
}

export default function* rootSaga( ) {
    yield all( [
        watchGetChatHistory( ),
        watchUnlockChat( )
    ] );
}