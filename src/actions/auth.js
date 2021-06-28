import { PURGE } from 'redux-persist';

export const forgotPassword = ( email ) => dispatch => {
    dispatch( { type: 'FORGOT_PASSWORD_TRIGGER', payload: { email } } )
}

export const login = ( email, password ) => dispatch => {
    dispatch( { type: 'LOGIN_TRIGGER', payload: {
        email, password
    } } )
}

export const logout = ( ) => dispatch => {
    dispatch( { type: 'LOGOUT', payload: { } } )
}

export const loginFacebook = ( accessToken ) => dispatch => {
    dispatch( { type: 'FACEBOOK_LOGIN_TRIGGER', payload: { accessToken } } )
}

export const register = ( { email, password, name, surname, company } ) => dispatch => {
    dispatch( { type: 'REGISTER_TRIGGER', payload: {
        email, password, name, surname, company
    } } )
}

export const purgeState = ( ) => dispatch => {
    dispatch( { type: PURGE, key: 'root', result: ( ) => null, payload: { } } )
}