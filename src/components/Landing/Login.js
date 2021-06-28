import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import Loader from 'react-loading'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { login, loginFacebook } from '../../actions/auth'
import { createErrorMessageSelector, createLoadingSelector } from '../../actions/selector'
import { setSocketReady } from '../../actions/socket'
import { connectWithToken, onConnection } from '../../js/socket'
import Nav from './Nav'
import InputContainer from './utils/InputContainer'
import './Login.css'

const loadingSelector = createLoadingSelector( [ 'LOGIN', 'FACEBOOK_LOGIN' ] );
const errorSelector = createErrorMessageSelector( [ 'LOGIN', 'FACEBOOK_LOGIN' ] );

const mapStateToProps = ( state ) => {
    return {
        token: state.user.token,
        type: state.user.type,
        loading: loadingSelector( state ),
        errorMessage: errorSelector( state )
    }
}

const mapDispatchToProps = {
    login,
    loginFacebook,
    setSocketReady
}

const Login = ( props ) => {

    const [ email, setEmail ] = useState( "matej.sindo@gmail.com" );
    const [ password, setPassword ] = useState( "laptop11" );

    useEffect( ( ) => {
        if ( props.token ) { // If the login was successful

            if ( props.type === 'user' ) {
                props.history.push( '/login/user' ); // Redirect the user to the target page
                return;
            }

            let { from } = props.location.state || { from: { pathname: '/jobs' } } // If the user was redirected to login, send him back, otherwise go to /jobs
            
            connectWithToken( props.token ) // Connect to the server with the token

            onConnection( ( ) => {
                props.setSocketReady( );
            } );
            
            props.history.push( from ); // Redirect the user to the target page
        }
    }, [ props.token ] );

    const onKeyDown = ( e ) => {
        if ( e.keyCode == 13 ) props.login( email, password );
    }

    return (
        <div id="login-screen">
            <Nav />
            <div id="landing-auth-box">
                <div id="slider" style={{ backgroundImage: `url(/img/Slider.png)` }}>
                    <h1>Pozdrav!</h1>
                    <h3>Novi ste ovdje?<br />Registrirajte se i istražite kandidate blizu Vas</h3>
                    <Link to="/register" id="slider-button">Registracija</Link>
                </div>
                <div id="content">
                    <h1>Prijava</h1>
                    <span></span>
                    <FacebookLogin
                        appId="3868271966520170"
                        fields="name,email,picture,birthday"
                        scope="public_profile,user_birthday"
                        callback={ ( r ) => props.loginFacebook( r.accessToken ) }
                        render={renderProps => (
                            <button id="facebook-button" color="#111111" onClick={ renderProps.onClick }>
                                <FontAwesomeIcon icon={ [ 'fab', 'facebook-f' ] } size="lg" fixedWidth />
                                <p>Nastavi kroz Facebook</p>
                            </button>
                        )}
                    />
                    <div id="or">
                        <span></span>
                        <p>ILI</p>
                        <span></span>
                    </div>
                    
                    <InputContainer placeholder="Email" onChange={ ( e ) => setEmail( e.target.value ) } onKeyDown={ onKeyDown } value={ email } icon={ [ 'fas', 'envelope' ] } />
                    { props.errorMessage.loginEmail && <h5 className="input-error">{ props.errorMessage.loginEmail }</h5> }
                    
                    <InputContainer type="password" placeholder="Lozinka" onChange={ ( e ) => setPassword( e.target.value ) } onKeyDown={ onKeyDown } value={ password } icon={ [ 'fas', 'unlock-alt' ] } />
                    { props.errorMessage.loginPassword && <h5 className="input-error">{ props.errorMessage.loginPassword }</h5> }
                    
                        { !props.loading ? <h3 onClick={ ( ) => props.login( email, password ) } >Prijavi se</h3> : <Loader type="bubbles" color="#FF9695" height={64} width={64} /> }
                    <p id="forgot-password"><Link to="/login/reset">Zaboravljena lozinka?</Link></p>
                </div>
            </div>
        </div>
    )

}

export default connect( mapStateToProps, mapDispatchToProps )( Login )