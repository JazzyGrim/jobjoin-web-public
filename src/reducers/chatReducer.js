export default function reducer( state={
    chatHistory: null,
    hasMore: false,
    historyPage: 0,
    chatUnlocked: false
}, action ) {

    let newState = { ...state }
    let newHistory = state.chatHistory ? [ ...state.chatHistory ] : [ ]

    switch( action.type ) {
        case "GET_CHAT_HISTORY_SUCCESS":
            for (let i = 0; i < action.payload.data.length; i++) {
                const element = action.payload.data[i];
                newHistory.push( element )
            }
            newState = { ...state, chatHistory: newHistory, historyPage: state.historyPage + 1, hasMore: ( action.payload.data.length != 0 && action.payload.data.length % 10 == 0 ) }
            break

        case "GET_CHAT_SUCCESS":
            newState = { ...state, chat: action.payload.data }
            break

        case "UPDATE_CHAT_HISTORY":
            if ( newState.chatHistory === null ) break

            for (let i = 0; i < newHistory.length; i++) {
                if ( newHistory[ i ].messageSenderID === action.payload.userID || newHistory[ i ].messageReceiverID === action.payload.userID ) {
                    // Make a new instance of the object, this will cause the shallow prop check in the FlatList to fail and cause a re render
                    newHistory[ i ] = { ...newHistory[ i ] };
                    newHistory[ i ].messageText = action.payload.message;
                    newHistory[ i ].messageTime = new Date( );
                }
            }
            newState = { ...state, chatHistory: newHistory }
            break

        case "RESET_CHAT_HISTORY":
            newState = { ...state, chatHistory: [ ], historyPage: 0, hasMore: false }
            break

        case "UNLOCK_CHAT_SUCCESS":
            newState = { ...state, chatUnlocked: true }
            break

        case "RESET_CHAT_UNLOCKED":
            newState = { ...state, chatUnlocked: false }
            break
        
        case "RESET_MESSAGES":
            newState = { ...state, errorMessage: { }, successMessage: null }
            break
            
        default:
            break

    }
    
    return newState
}