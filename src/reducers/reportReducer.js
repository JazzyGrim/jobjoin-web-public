export default function reducer( state={
    bugReported: false,
    userReported: false
}, action ) {

    let newState = { ...state }

    switch( action.type ) {

        case "REPORT_USER_SUCCESS":
            newState = { ...state, userReported: true }
            break

        case "RESET_USER_REPORTED":
            newState = { ...state, userReported: false }
            break

        case "REPORT_BUG_SUCCESS":
            newState = { ...state, bugReported: true }
            break

        case "RESET_BUG_REPORTED":
            newState = { ...state, bugReported: false }
            break

        case "RESET_MESSAGES":
            newState = { ...state, errorMessage: { }, successMessage: null }
            break

        default:
            break

    }
    
    return newState

}