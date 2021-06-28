export const getJob = ( id, token ) => dispatch => {
    console.warn( 'Getting job' )
    dispatch( { type: 'GET_JOB_TRIGGER', payload: { id, token } } )
}

export const getQuiz = ( id, token ) => dispatch => {
    dispatch( { type: 'GET_QUIZ_TRIGGER', payload: { id, token } } )
}

export const updateQuiz = ( quiz, quizRequired, id, token ) => dispatch => {
    dispatch( { type: 'UPDATE_QUIZ_TRIGGER', payload: { quiz, quizRequired, id, token } } )
}

export const removeQuiz = ( ) => dispatch => {
    dispatch( { type: 'REMOVE_QUIZ', payload: {  } } )
}

export const getApplications = ( status = 0, expired, id, page, token ) => dispatch => {
    dispatch( { type: 'GET_APPLICATIONS_TRIGGER', payload: { status, expired, id, page, token } } )
}

export const getApplicationTypeCount = ( id, token ) => dispatch => {
    dispatch( { type: 'GET_APPLICATION_TYPE_COUNT_TRIGGER', payload: { id, token } } )
}

export const createJob = ( jobTitle, jobDescription, jobDefaultResponse, jobTypeID, jobSalary, jobSalaryType, jobExperience, jobEmploymentContract, jobEmploymentTime, jobStudentsAccepted, jobStartingDate, jobAddress, jobCity, jobState, jobZIP, quiz, quizRequired, token ) => dispatch => {
    dispatch( { type: 'CREATE_JOB_TRIGGER', payload: { jobTitle, jobDescription, jobDefaultResponse, jobTypeID, jobSalary, jobSalaryType, jobExperience, jobEmploymentContract, jobEmploymentTime, jobStudentsAccepted, jobStartingDate, jobAddress, jobCity, jobState, jobZIP, quiz, quizRequired, token } } )
}

export const getJobApplicationCount = ( id, token ) => dispatch => {
    dispatch( { type: 'GET_JOB_APPLICATION_COUNT_TRIGGER', payload: { id, token } } )
}

export const saveJobImage = ( form, id, token ) => dispatch => {
    dispatch( { type: 'SAVE_JOB_IMAGE_TRIGGER', payload: { form, id, token } } )
}

export const saveResponse = ( defaultResponse, id, token ) => dispatch => {
    dispatch( { type: 'SAVE_RESPONSE_TRIGGER', payload: { defaultResponse, id, token } } )
}

export const jobHire = ( id, token ) => dispatch => {
    dispatch( { type: 'JOB_HIRE_TRIGGER', payload: { id, token } } )
}

export const jobCancel = ( id, token ) => dispatch => {
    dispatch( { type: 'JOB_CANCEL_TRIGGER', payload: { id, token } } )
}

export const getJobList = ( token, inactive = false, page = 0 ) => dispatch => {
    dispatch( { type: 'GET_JOB_LIST_TRIGGER', payload: { token, inactive, page } } )
}

export const resetJobPage = (  ) => dispatch => {
    dispatch( { type: 'RESET_JOB_PAGE', payload: { } } )
}

export const resetAppPage = (  ) => dispatch => {
    dispatch( { type: 'RESET_APP_PAGE', payload: { } } )
}