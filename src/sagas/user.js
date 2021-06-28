import { all, put, takeLatest } from 'redux-saga/effects';
import axios from '../js/axios';

function* getUser( { payload } ) {
    yield put( { type: 'GET_USER_REQUEST' } )
    try {

        let url = '/user/' + payload.id + '?details' // Default URL
        if ( payload.appID !== null && payload.appID !== '' ) url += '&appID=' + payload.appID; // If the app ID is set, add it to the query string
        console.log( url )
        const data = yield axios.get( url, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )

        yield put( { type: 'GET_USER_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'GET_USER_ERROR', payload: e } )
    }
}

function* watchGetUser( ) {
    yield takeLatest( "GET_USER_TRIGGER", getUser )
}

function* getUserQuiz( { payload } ) {
    yield put( { type: 'GET_USER_QUIZ_REQUEST' } )
    try {
        const data = yield axios.get( '/user/' + payload.userID + '/quiz?jobID=' + payload.jobID, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )

        yield put( { type: 'GET_USER_QUIZ_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'GET_USER_QUIZ_ERROR', payload: e } )
    }
}

function* watchGetUserQuiz( ) {
    yield takeLatest( "GET_USER_QUIZ_TRIGGER", getUserQuiz )
}

function* getCandidates( { payload } ) {
    yield put( { type: 'GET_CANDIDATES_REQUEST' } )
    try {
        const data = yield axios.get( '/recruiter/nearby?jobTypeID=' + payload.jobTypeID + "&city=" + payload.city + "&page=" + payload.page, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
;
        yield put( { type: 'GET_CANDIDATES_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'GET_CANDIDATES_ERROR', payload: e } )
    }
}

function* watchGetCandidates( ) {
    yield takeLatest( "GET_CANDIDATES_TRIGGER", getCandidates )
}

function* getProfile( { payload } ) {
    yield put( { type: 'GET_PROFILE_REQUEST' } )
    try {
        const data = yield axios.get( '/recruiter/' + payload.id, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )

        yield put( { type: 'GET_PROFILE_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'GET_PROFILE_ERROR', payload: e } )
    }
}

function* watchGetProfile( ) {
    yield takeLatest( "GET_PROFILE_TRIGGER", getProfile )
}

function* getCredits( { payload } ) {
    yield put( { type: 'GET_CREDITS_REQUEST' } )
    try {
        const data = yield axios.get( '/recruiter/credits', { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )

        yield put( { type: 'GET_CREDITS_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'GET_CREDITS_ERROR', payload: e } )
    }
}

function* watchGetCredits( ) {
    yield takeLatest( "GET_CREDITS_TRIGGER", getCredits )
}

function* saveProfile( { payload } ) {
    yield put( { type: 'SAVE_PROFILE_REQUEST' } )
    try {
        const data = yield axios.post( '/recruiter/edit', { recruiterFirstName: payload.firstName, recruiterLastName: payload.lastName, recruiterCompanyName: payload.companyName }, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )

        yield put( { type: 'SAVE_PROFILE_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'SAVE_PROFILE_ERROR', payload: e } )
    }
}

function* watchSaveProfile( ) {
    yield takeLatest( "SAVE_PROFILE_TRIGGER", saveProfile )
}

function* saveImage( { payload } ) {
    yield put( { type: 'SAVE_PROFILE_IMAGE_REQUEST' } )
    try {
        const data = yield axios.post( '/recruiter/image', payload.form, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )

        yield put( { type: 'SAVE_PROFILE_IMAGE_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'SAVE_PROFILE_IMAGE_ERROR', payload: e } )
    }
}

function* watchSaveImage( ) {
    yield takeLatest( "SAVE_PROFILE_IMAGE_TRIGGER", saveImage )
}

function* getUserWithoutDetails( { payload } ) {
    yield put( { type: 'GET_USER_REQUEST' } )
    try {
        const data = yield axios.get( '/user/' + payload.id, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )

        yield put( { type: 'GET_USER_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'GET_USER_ERROR', payload: e } )
    }
}

function* watchGetUserWithoutDetails( ) {
    yield takeLatest( "GET_USER_NO_DETAILS_TRIGGER", getUserWithoutDetails )
}

function* shortlistUser( { payload } ) {
    yield put( { type: 'SHORTLIST_USER_REQUEST' } )
    try {
        const data = yield axios.post( '/applications/shortlist/', { applicationID: payload.applicationID }, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )

        yield put( { type: 'SHORTLIST_USER_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'SHORTLIST_USER_ERROR', payload: e } )
    }
}

function* watchShortlistUser( ) {
    yield takeLatest( "SHORTLIST_USER_TRIGGER", shortlistUser )
}

function* denyUser( { payload } ) {
    yield put( { type: 'DENY_USER_REQUEST' } )
    try {
        const data = yield axios.post( '/applications/deny/', { applicationID: payload.applicationID }, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )

        yield put( { type: 'DENY_USER_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'DENY_USER_ERROR', payload: e } )
    }
}

function* watchDenyUser( ) {
    yield takeLatest( "DENY_USER_TRIGGER", denyUser )
}

function* purchaseTokens( { payload } ) {
    yield put( { type: 'PURCHASE_REQUEST' } )
    try {
        const data = yield axios.post( '/buy/', {
            cardToken: payload.cardToken,
            name: payload.name,
            address: payload.address,
            city: payload.city,
            state: payload.state,
            zip: payload.zip,
            country: payload.country,
            email: payload.email,
            phone: payload.phone,
            product: payload.product
        }, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )

        yield put( { type: 'PURCHASE_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'PURCHASE_ERROR', payload: e } )
    }
}

function* watchPurchaseTokens( ) {
    yield takeLatest( "PURCHASE_TRIGGER", purchaseTokens )
}

export default function* rootSaga( ) {
    yield all( [
        watchGetUser( ),
        watchGetCandidates( ),
        watchGetProfile( ),
        watchGetCredits( ),
        watchSaveProfile( ),
        watchSaveImage( ),
        watchGetUserWithoutDetails( ),
        watchShortlistUser( ),
        watchDenyUser( ),
        watchPurchaseTokens( ),
        watchGetUserQuiz( )
    ] );
}