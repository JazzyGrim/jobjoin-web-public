export const getCredits = ( token ) => dispatch => {
    dispatch( { type: 'GET_CREDITS_TRIGGER', payload: { token } } )
}

export const removeCredit = ( amount ) => dispatch => {
    dispatch( { type: 'REMOVE_CREDIT', payload: { amount } } )
}

export const getProfile = ( id, token ) => dispatch => {
    dispatch( { type: 'GET_PROFILE_TRIGGER', payload: { id, token } } )
}

export const saveProfile = ( firstName, lastName, companyName, token ) => dispatch => {
    dispatch( { type: 'SAVE_PROFILE_TRIGGER', payload: { firstName, lastName, companyName, token } } )
}

export const saveImage = ( form, token ) => dispatch => {
    dispatch( { type: 'SAVE_PROFILE_IMAGE_TRIGGER', payload: { form, token } } )
}

export const purchase = ( cardToken, name, address, city, state, zip, country, email, phone, product, token ) => dispatch => {
    dispatch( { type: 'PURCHASE_TRIGGER', payload: { cardToken, name, address, city, state, zip, country, email, phone, product, token } } )
}

export const resetOrderNumber = ( ) => dispatch => {
    dispatch( { type: 'RESET_ORDER_NUMBER', payload: {  } } )
}