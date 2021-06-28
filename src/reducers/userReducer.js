export default function reducer( state={
    id: '',
    token: '',
    type: '',
    admin: false,
    tokenValid: null,
    socketReady: false,
    user: null,
    profile: null,
    profileUpdated: false,
    candidates: [],
    hasMoreCandidates: false,
    page: 0,
    credits: null,
    shortlisted: false,
    denied: false,
    userQuiz: null,
    userQuizTotalPoints: null,
    userQuizUserPoints: null,
    orderID: null
}, action ) {

    let newState = { ...state }
    let newUser;
    let newCandidates = [ ...newState.candidates ]

    if ( action.payload && action.payload.status === 406 ) { // If any request returns 406, we are logged out
        newState.tokenValid = false; // Set the token as invalid
        return newState; // Return to prevent further actions
    }

    switch( action.type ) {
        case "NETWORK_ERROR":
            newState = { ...state, errorMessage: { text: 'Komunikacija sa serverom nije moguća.', status: 404 } }
            break

        case "SOCKET_READY":
            newState = { ...state, socketReady: true }
            break

        case "LOGIN_SUCCESS":
            const { id:loginID, token:loginToken, type:loginType, admin:loginAdmin } = action.payload.data

            newState = { ...state, id:loginID, token:loginToken, type:loginType, admin:loginAdmin, tokenValid: true }
            break

        case "FACEBOOK_LOGIN_SUCCESS":
            const { id:fbLoginID, token:fbLoginToken, type:fbLoginType } = action.payload.data

            newState = { ...state, id:fbLoginID, token:fbLoginToken, type:fbLoginType, admin: false, tokenValid: true }
            break

        case "REGISTER_SUCCESS":
            const { id:registerID, token:registerToken, type:registerType } = action.payload.data

            newState = { ...state, id:registerID, token:registerToken, type:registerType, tokenValid: true }
            break

        case "GET_USER_SUCCESS":
            console.log( action.payload.data )
            newState = { ...state, user: action.payload.data }
            break

        case "RESET_USER":
            newState = { ...state, user: null, shortlisted: false, denied: false, orderID: null }
            break

        case "REMOVE_CREDIT":
            newState = { ...state, credits: state.credits - action.payload.amount }
            break

        case "SHORTLIST_USER_SUCCESS":
            newUser = { ...state.user };
            newUser.applicationStatus = newUser.applicationStatus ? 0 : 1; // Toggle user shortlisted ( it can't be 2, since the server would not allow shortlisting if the application was denied )

            newState = { ...state, user: newUser }
            break

        case "DENY_USER_SUCCESS":
            newUser = { ...state.user };
            newUser.applicationStatus = 2; // Set the application as denied

            newState = { ...state, user: newUser }
            break

        case "GET_CANDIDATES_SUCCESS":
            for (let i = 0; i < action.payload.data.length; i++) {
                const element = action.payload.data[i];
                newCandidates.push( element )
            }

            newState = { ...state, candidates: newCandidates, page: state.page + 1, hasMoreCandidates: ( action.payload.data.length != 0 && action.payload.data.length % 10 == 0 ) }
            break

        case "RESET_CANDIDATES_PAGE":
            newState = { ...state, candidates: [], page: 0, hasMoreCandidates: false }
            break

        case "GET_PROFILE_SUCCESS":
            newState = { ...state, profile: action.payload.data, profileUpdated: false }
            break

        case "GET_CREDITS_SUCCESS":
            newState = { ...state, credits: action.payload.data.credits }
            break

        case "SAVE_PROFILE_SUCCESS":
            newState = { ...state, profile: null, profileUpdated: true }
            break

        case "SAVE_PROFILE_IMAGE_SUCCESS":
            newState = { ...state, profile: null, profileUpdated: true }
            break
            
        case "GET_USER_QUIZ_SUCCESS":
            const { answers, user_points, total_points } = action.payload.data
            newState = { ...state, userQuiz: answers, userQuizTotalPoints: total_points, userQuizUserPoints: user_points }
            break

        case "PURCHASE_SUCCESS":
            newState = { ...state, orderID: action.payload.data.orderID }
            break

        case "RESET_ORDER_NUMBER":
            newState = { ...state, orderID: null }
            break

        case "SET_ERROR_MESSAGE":
            newState = { ...state, errorMessage: { text: action.payload.message, status: 500 } }
            break

        case "RESET_MESSAGES":
            newState = { ...state, errorMessage: { }, successMessage: null }
            break

        default:
            break

    }
    
    return newState

}