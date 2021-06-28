export const getCandidates = ( city, jobTypeID, token, page = 0 ) => dispatch => {
    dispatch( { type: 'GET_CANDIDATES_TRIGGER', payload: { city, jobTypeID, token, page } } )
}

export const resetCandidatesPage = (  ) => dispatch => {
    dispatch( { type: 'RESET_CANDIDATES_PAGE', payload: { } } )
}

export const getUser = ( id, appID, token ) => dispatch => {
    dispatch( { type: 'GET_USER_TRIGGER', payload: { id, appID, token } } )
}

export const getUserNoDetails = ( id, token ) => dispatch => {
    dispatch( { type: 'GET_USER_NO_DETAILS_TRIGGER', payload: { id, token } } )
}

export const getUserQuiz = ( userID, jobID, token ) => dispatch => {
    dispatch( { type: 'GET_USER_QUIZ_TRIGGER', payload: { userID, jobID, token } } )
}

export const shortlistUser = ( applicationID, token ) => dispatch => {
    dispatch( { type: 'SHORTLIST_USER_TRIGGER', payload: { applicationID, token } } )
}

export const denyUser = ( applicationID, token ) => dispatch => {
    dispatch( { type: 'DENY_USER_TRIGGER', payload: { applicationID, token } } )
}

export const resetUser = ( ) => dispatch => {
    dispatch( { type: 'RESET_USER', payload: {  } } )
}