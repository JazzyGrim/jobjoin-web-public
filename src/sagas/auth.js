import { takeLatest, put, all } from 'redux-saga/effects'
import axios from '../js/axios'

function* login( { payload } ) {
    yield put( { type: 'LOGIN_REQUEST' } )
    try {
        const data = yield axios.post( '/login', { loginEmail: payload.email, loginPassword: payload.password } ).then( ( data ) => { return data } )
        yield put( { type: 'LOGIN_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'LOGIN_ERROR', payload: e } )
    }
    
}

function* watchLogin( ) {
    yield takeLatest( 'LOGIN_TRIGGER', login )
}

function* register( { payload } ) {
    yield put( { type: 'REGISTER_REQUEST' } )
    try {
        const data = yield axios.post( '/registerRecruiter', { recruiterFirstName: payload.name, recruiterLastName: payload.surname, recruiterCompanyName: payload.company, recruiterEmail: payload.email, recruiterPassword: payload.password } ).then( ( data ) => { return data } )
        yield put( { type: 'REGISTER_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'REGISTER_ERROR', payload: e } )
    }
}

function* watchRegister( ) {
    yield takeLatest( "REGISTER_TRIGGER", register )
}

function* forgotPassword( { payload } ) {
    yield put( { type: 'FORGOT_PASSWORD_REQUEST' } )
    try {
        const data = yield axios.post( '/reset', { resetEmail: payload.email, api: true } ).then( ( data ) => { return data } )
        yield put( { type: 'FORGOT_PASSWORD_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'FORGOT_PASSWORD_ERROR', payload: e } )
    }
}

function* watchForgotPassword( ) {
    yield takeLatest( "FORGOT_PASSWORD_TRIGGER", forgotPassword )
}

function* loginFacebook( { payload } ) {
    yield put( { type: 'FACEBOOK_LOGIN_REQUEST' } )
    try {
        const data = yield axios.post( '/facebook/recruiter', { accessToken: payload.accessToken, accountType: 'recruiter', recruiterCompanyName: 'TestJob' } ).then( ( data ) => { return data } )
        yield put( { type: 'FACEBOOK_LOGIN_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'FACEBOOK_LOGIN_ERROR', payload: e } )
    }
}

function* watchLoginFacebook( ) {
    yield takeLatest( "FACEBOOK_LOGIN_TRIGGER", loginFacebook )
}

export default function* rootSaga( ) {
    yield all( [
        watchLogin( ),
        watchRegister( ),
        watchForgotPassword( ),
        watchLoginFacebook( )
    ] );
}