export const resetMessages = ( ) => dispatch => {
    dispatch( { type: 'RESET_MESSAGES', payload: { } } )
}

export const setErrorMessage = ( message ) => dispatch => {
    dispatch( { type: 'SET_ERROR_MESSAGE', payload: { message } } )
}