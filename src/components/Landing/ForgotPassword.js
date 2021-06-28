import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotPassword } from '../../actions/auth'
import { createErrorMessageSelector } from '../../actions/selector'
import Nav from './Nav'
import './ForgotPassword.css'

const errorSelector = createErrorMessageSelector( [ 'FORGOT_PASSWORD' ] );

const mapStateToProps = ( state ) => {
    return {
        errorMessage: errorSelector( state )
    }
}

const mapDispatchToProps = {
    forgotPassword
}

const ForgotPassword = ( props ) => {

    const [ email, setEmail ] = useState( "matej.sindek@gmail.com" );

    const onKeyDown = ( e ) => {
        if ( e.keyCode == 13 ) props.forgotPassword( email );
    }

    return (
        <div id="forgot-password-screen">
            <Nav />
            <div id="landing-auth-box">
                <div id="slider" style={{ backgroundImage: `url(/img/Slider.png)` }}>
                    <h1>Pozdrav!</h1>
                    <h3>Novi ste ovdje?<br />Registrirajte se i istražite kandidate blizu Vas</h3>
                    <Link to="/register" id="slider-button">Registracija</Link>
                </div>
                <div id="content">
                    <h1>Zaboravljena lozinka</h1>
                    <span></span>
                    <h4>Unesite e-mail adresu vašeg računa na koju ćete primiti e-mail s instrukcijama za promijenu lozinke.</h4>
                    <div className="input-container">
                        <img alt="" src="/img/email.jpg" />
                        <input type="text" placeholder="Email" onChange={ ( e ) => setEmail( e.target.value ) } value={ email } onKeyDown={ onKeyDown } name="email" />
                    </div>
                    <h5 className="input-error">{ props.errorMessage.email || "" }</h5>
                    <h3 onClick={ ( ) => props.forgotPassword( email ) } >Pošalji mail</h3>
                    { props.errorMessage.text ? <h3 id="forgot-password-error">{ props.errorMessage.text }</h3> : "" }
                </div>
            </div>
        </div>
    )

}

export default connect( mapStateToProps, mapDispatchToProps )( ForgotPassword )