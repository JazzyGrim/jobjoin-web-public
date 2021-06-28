import { all, put, takeLatest } from 'redux-saga/effects'
import axios from '../js/axios'

function* getJobList( { payload } ) {
    yield put( { type: 'GET_JOB_LIST_REQUEST' } )
    try {
        const endpoint = payload.inactive ? '/recruiter/jobs?inactive&page=' + payload.page : '/recruiter/jobs?page=' + payload.page
        const data = yield axios.get( endpoint, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        yield put( { type: 'GET_JOB_LIST_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'GET_JOB_LIST_ERROR', payload: e } )
    }
}

function* watchGetJobList( ) {
    yield takeLatest( "GET_JOB_LIST_TRIGGER", getJobList )
}

function* getJob( { payload } ) {
    yield put( { type: 'GET_JOB_REQUEST' } )
    try {
        const data = yield axios.get( '/job/' + payload.id, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        yield put( { type: 'GET_JOB_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'GET_JOB_ERROR', payload: e } )
    }
}

function* watchGetJob( ) {
    yield takeLatest( "GET_JOB_TRIGGER", getJob )
}

function* getQuiz( { payload } ) {
    yield put( { type: 'GET_QUIZ_REQUEST' } )
    try {
        const data = yield axios.get( '/job/' + payload.id + '/quiz', { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        yield put( { type: 'GET_QUIZ_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'GET_QUIZ_ERROR', payload: e } )
    }
}

function* watchGetQuiz( ) {
    yield takeLatest( "GET_QUIZ_TRIGGER", getQuiz )
}

function* updateQuiz( { payload } ) {
    yield put( { type: 'UPDATE_QUIZ_REQUEST' } )
    try {
        const data = yield axios.post( '/job/' + payload.id + '/quiz', { quiz: payload.quiz, quizRequired: payload.quizRequired }, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        yield put( { type: 'UPDATE_QUIZ_SUCCESS', payload: { ...data, quiz: payload.quiz, quizRequired: payload.quizRequired } } )
    } catch ( e ) {
        yield put( { type: 'UPDATE_QUIZ_ERROR', payload: e } )
    }
}

function* watchUpdateQuiz( ) {
    yield takeLatest( "UPDATE_QUIZ_TRIGGER", updateQuiz )
}

function* getApplications( { payload } ) {
    yield put( { type: 'GET_APPLICATIONS_REQUEST' } )
    try {
        const endpoint = payload.expired ? '/recruiter/applied/' + payload.id + '?page=' + payload.page : '/recruiter/applied/' + payload.id + '?page=' + payload.page + '&status=' + payload.status
        console.log( endpoint )
        const data = yield axios.get( endpoint, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        yield put( { type: 'GET_APPLICATIONS_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'GET_APPLICATIONS_ERROR', payload: e } )
    }
}

function* watchGetApplications( ) {
    yield takeLatest( "GET_APPLICATIONS_TRIGGER", getApplications )
}

function* createJob( { payload } ) {
    yield put( { type: 'CREATE_JOB_REQUEST' } )
    try {
        const requestData = { ...payload }
        delete requestData.token // Remove the token from the request

        const data = yield axios.post( '/job/new', { ...requestData }, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        yield put( { type: 'CREATE_JOB_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'CREATE_JOB_ERROR', payload: e } )
    }
}

function* watchCreateJob( ) {
    yield takeLatest( "CREATE_JOB_TRIGGER", createJob )
}

function* getJobApplicationCount( { payload } ) {
    yield put( { type: 'GET_JOB_APPLICATION_COUNT_REQUEST' } )
    try {
        const data = yield axios.get( '/recruiter/applied-total/' + payload.id, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        yield put( { type: 'GET_JOB_APPLICATION_COUNT_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'GET_JOB_APPLICATION_COUNT_ERROR', payload: e } )
    }
}

function* watchGetJobApplicationCount( ) {
    yield takeLatest( "GET_JOB_APPLICATION_COUNT_TRIGGER", getJobApplicationCount )
}

function* getJobApplicationTypeCount( { payload } ) {
    yield put( { type: 'GET_APPLICATION_TYPE_COUNT_REQUEST' } )
    try {
        const data = yield axios.get( '/recruiter/applied-count/' + payload.id, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        yield put( { type: 'GET_APPLICATION_TYPE_COUNT_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'GET_APPLICATION_TYPE_COUNT_ERROR', payload: e } )
    }
}

function* watchGetJobApplicationTypeCount( ) {
    yield takeLatest( "GET_APPLICATION_TYPE_COUNT_TRIGGER", getJobApplicationTypeCount )
}

function* saveJobImage( { payload } ) {
    yield put( { type: 'SAVE_JOB_IMAGE_REQUEST' } )
    try {
        const data = yield axios.post( '/job/image/' + payload.id, payload.form, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        yield put( { type: 'SAVE_JOB_IMAGE_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'SAVE_JOB_IMAGE_ERROR', payload: e } )
    }
}

function* watchSaveJobImage( ) {
    yield takeLatest( "SAVE_JOB_IMAGE_TRIGGER", saveJobImage )
}

function* saveResponse( { payload } ) {
    yield put( { type: 'SAVE_RESPONSE_REQUEST' } )
    try {
        const data = yield axios.post( '/job/' + payload.id + '/app-response', { defaultResponse: payload.defaultResponse }, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        yield put( { type: 'SAVE_RESPONSE_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'SAVE_RESPONSE_ERROR', payload: e } )
    }
}

function* watchSaveResponse( ) {
    yield takeLatest( "SAVE_RESPONSE_TRIGGER", saveResponse )
}

function* jobHire( { payload } ) {
    yield put( { type: 'JOB_HIRE_SUCCESS_REQUEST' } )
    try {
        const data = yield axios.post( '/job/hire/' + payload.id, null, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        yield put( { type: 'JOB_HIRE_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'JOB_HIRE_SUCCESS', payload: e } )
    }
}

function* watchJobHire( ) {
    yield takeLatest( "JOB_HIRE_TRIGGER", jobHire )
}

function* jobCancel( { payload } ) {
    yield put( { type: 'JOB_CANCEL_REQUEST' } )
    try {
        const data = yield axios.post( '/job/cancel/' + payload.id, null, { headers: { 'x-access-token': payload.token } } ).then( ( data ) => { return data } )
        yield put( { type: 'JOB_CANCEL_SUCCESS', payload: data } )
    } catch ( e ) {
        yield put( { type: 'JOB_CANCEL_SUCCESS', payload: e } )
    }
}

function* watchJobCancel( ) {
    yield takeLatest( "JOB_CANCEL_TRIGGER", jobCancel )
}

export default function* rootSaga( ) {
    yield all( [
        watchGetJobList( ),
        watchGetJob( ),
        watchGetQuiz( ),
        watchUpdateQuiz( ),
        watchGetApplications( ),
        watchCreateJob( ),
        watchGetJobApplicationCount( ),
        watchGetJobApplicationTypeCount( ),
        watchSaveJobImage( ),
        watchSaveResponse( ),
        watchJobHire( ),
        watchJobCancel( )
    ] );
}