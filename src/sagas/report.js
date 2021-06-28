import { all, put, takeLatest } from 'redux-saga/effects'
import axios from '../js/axios'

function* reportUser( { payload } ) {
    yield put( { type: 'REPORT_USER_REQUEST' } )
    try {
        const data = yield axios.post( '/report/new', { reportedID: payload.reportedID, reason: payload.reason }, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        console.log( data )
        yield put( { type: 'REPORT_USER_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'REPORT_USER_ERROR', payload: e } )
    }
}

function* watchReportUser( ) {
    yield takeLatest( "REPORT_USER_TRIGGER", reportUser )
}

function* reportBug( { payload } ) {
    yield put( { type: 'REPORT_BUG_REQUEST' } )
    try {
        const data = yield axios.post( '/report/bug', { info: payload.bugInfo }, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        console.log( data )
        yield put( { type: 'REPORT_BUG_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'REPORT_BUG_ERROR', payload: e } )
    }
}

function* watchReportBug( ) {
    yield takeLatest( "REPORT_BUG_TRIGGER", reportBug )
}

export default function* rootSaga( ) {
    yield all( [
        watchReportBug( ),
        watchReportUser( )
    ] );
}