export const getChatHistory = ( page, token ) => dispatch => {
    dispatch( { type: 'GET_CHAT_HISTORY_TRIGGER', payload: { page, token } } )
}

export const updateChatHistory = ( message, userID ) => dispatch => {
    dispatch( { type: 'UPDATE_CHAT_HISTORY', payload: { message: message.message, userID } } )
}

export const resetChatHistory = ( ) => dispatch => {
    dispatch( { type: 'RESET_CHAT_HISTORY', payload: { } } )
}

export const unlockChat = ( userID, token ) => dispatch => {
    dispatch( { type: 'UNLOCK_CHAT_TRIGGER', payload: { userID, token } } )
}

export const resetChatUnlocked = ( ) => dispatch => {
    dispatch( { type: 'RESET_CHAT_UNLOCKED', payload: {  } } )
}