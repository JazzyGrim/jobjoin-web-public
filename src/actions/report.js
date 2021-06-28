export const reportBug = ( bugInfo, token ) => dispatch => {
    dispatch( { type: 'REPORT_BUG_TRIGGER', payload: { bugInfo, token } } )
}

export const resetBugReported = ( ) => dispatch => {
    dispatch( { type: 'RESET_BUG_REPORTED', payload: { } } )
}

export const reportUser = ( reportedID, reason, token ) => dispatch => {
    dispatch( { type: 'REPORT_USER_TRIGGER', payload: { reportedID, reason, token } } )
}

export const resetUserReported = ( ) => dispatch => {
    dispatch( { type: 'RESET_USER_REPORTED', payload: { } } )
}