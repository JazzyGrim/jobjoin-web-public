export default function reducer( state={
    jobList: [],
    page: 0,
    hasMore: false,
    job: null,
    quiz: null,
    quizRequired: null,
    applications: [],
    applicationPage: 0,
    hasMoreApps: false,
    applicationCounts: {},
    jobCreated: false,
    jobUpdated: false
}, action ) {

    let newState = { ...state }
    let job
    let apps
    let newJobList = [ ...newState.jobList ]
    let newApplications = [ ...newState.applications ]

    switch( action.type ) {

        case "GET_JOB_LIST_SUCCESS":
            for (let i = 0; i < action.payload.data.length; i++) {
                const element = action.payload.data[i];
                newJobList.push( element )
            }
            newState = { ...state, jobList: newJobList, page: state.page + 1, hasMore: ( action.payload.data.length != 0 && action.payload.data.length % 10 == 0 ), jobCreated: false, job: null }
            break

        case "RESET_JOB_PAGE":
            newState = { ...state, jobList: [], hasMore: false, page: 0 }
            break

        case "GET_JOB_SUCCESS":
            newState = { ...state, job: action.payload.data, jobUpdated: false }
            break

        case "GET_JOB_ERROR":
            newState = { ...state, jobUpdated: false }
            break

        case "GET_QUIZ_SUCCESS":
            newState = { ...state, quiz: action.payload.data.quiz, quizRequired: action.payload.data.quizRequired }
            break

        case "UPDATE_QUIZ_SUCCESS":
            newState = { ...state, quiz: action.payload.quiz, quizRequired: action.payload.quizRequired }
            break

        case "REMOVE_QUIZ":
            newState = { ...state, quiz: null, quizRequired: null }
            break

        case "GET_APPLICATIONS_SUCCESS":
            for (let i = 0; i < action.payload.data.length; i++) {
                const element = action.payload.data[i];
                newApplications.push( element )
            }
            newState = { ...state, applications: newApplications, applicationPage: state.applicationPage + 1, hasMoreApps: ( action.payload.data.length != 0 && action.payload.data.length % 10 == 0 ) }
            break

        case "RESET_APP_PAGE":
            newState = { ...state, applications: [], hasMoreApps: false, applicationPage: 0 }
            break

        case "CREATE_JOB_SUCCESS":
            newState = { ...state, jobList: [], jobCreated: true }
            break

        case "GET_JOB_APPLICATION_COUNT_SUCCESS":
            job = { ...state.job }

            job.totalApplicationCount = action.payload.data.total

            newState = { ...state, job }
        break

        case "GET_APPLICATION_TYPE_COUNT_SUCCESS":
            apps = action.payload.data

            newState = { ...state, applicationCounts: { ...apps } }
        break
            
        case "SAVE_JOB_IMAGE_SUCCESS":
            newState = { ...state, jobUpdated: true }
            break

        case "JOB_HIRE_SUCCESS":
            newState = { ...state, job: { ...job, hired: 1 } }
            break
        
        case "JOB_CANCEL_SUCCESS":
            newState = { ...state, job: { ...job, cancelled: 1 } }
            break

        case "RESET_MESSAGES":
            newState = { ...state, errorMessage: { }, successMessage: null }
            break

        default:
            break

    }
    
    return newState
}