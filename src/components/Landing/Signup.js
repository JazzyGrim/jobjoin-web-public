import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Loader from 'react-loading'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../../actions/auth'
import { createErrorMessageSelector, createLoadingSelector } from '../../actions/selector'
import { setSocketReady } from '../../actions/socket'
import { connectWithToken, onConnection } from '../../js/socket'
import Nav from './Nav'
import InputContainer from './utils/InputContainer'
import './Signup.css'

const errorSelector = createErrorMessageSelector( [ 'REGISTER' ] );
const loadingSelector = createLoadingSelector( [ 'REGISTER' ] );

const mapStateToProps = ( state ) => {
    return {
        token: state.user.token,
        loading: loadingSelector( state ),
        errorMessage: errorSelector( state )
    }
}

const mapDispatchToProps = {
    register,
    setSocketReady
}

const SignUp = ( props ) => {

    const [ stage, setStage ] = useState( 0 );
    const [ inputs, setInputs ] = useState( {
            email: "",
            password: "",
            confirmPassword: "",
            name: "",
            surname: "",
            company: ""
    } );
    const [ matchPassword, setMatchPassword ] = useState( '' );

    const handleChange = ( e ) => {
        const { name, value } = e.target;

        setInputs( { ...inputs, [name]: value } );
    }

    useEffect( ( ) => {
        if ( props.token ) { // If the register was successful
            
            if ( props.type === 'user' ) {
                props.history.push( '/login/user' );
                return;
            }

            connectWithToken( props.token ) // Connect to the server with the token

            onConnection( ( ) => {
                props.setSocketReady( );
            } );
            
            props.history.push( '/jobs' ); // Redirect the user to the jobs page

        }
    }, [ props.token ] );

    const handleSubmit = ( ) => {
        if ( !stage ) {
            setStage( 1 );
            return;
        }

        if ( inputs.password !== inputs.confirmPassword ) {
            setMatchPassword( 'Lozinke se ne podudaraju!' );
            setStage( 0 );
            return;
        }

        // If all is well
        // Reset the confirm password error if it was set from previous attempts

        setMatchPassword( '' );
        // Now send a register request
        props.register( inputs );
    }

    const onKeyDown = ( e ) => {
        if ( e.keyCode == 13 ) handleSubmit( );
    }

    return (
        <div id="signup-screen">
            <Nav />
            <div id="landing-auth-box">
                <div id="slider" style={{ backgroundImage: `url(/img/Slider.png)` }}>
                    <h1>Pozdrav!</h1>
                    <h3>Već imate račun?<br />Prijavite se da nastavite u JOBJOIN</h3>
                    <Link to="/login" id="slider-button">Prijava</Link>
                </div>
                <div id="content">
                    <h1>Registracija</h1>
                    <span></span>
                    <button id="facebook-button">
                        <FontAwesomeIcon color="#111111" icon={ [ 'fab', 'facebook-f' ] } size="lg" fixedWidth />
                        <p>Nastavi kroz Facebook</p>
                    </button>
                    <div id="or">
                        <span></span>
                        <p>ILI</p>
                        <span></span>
                    </div>
                    { !stage ? <>
                        <InputContainer placeholder="Email" onChange={ handleChange } value={ inputs.email } onKeyDown={ onKeyDown } name="email" icon={ [ 'fas', 'envelope' ] } />
                        { props.errorMessage.recruiterEmail && <h5 className="input-error">{ props.errorMessage.recruiterEmail }</h5> }

                        <InputContainer type="password" placeholder="Lozinka" onChange={ handleChange } value={ inputs.password } onKeyDown={ onKeyDown } name="password" icon={ [ 'fas', 'unlock-alt' ] } />
                        { props.errorMessage.recruiterPassword && <h5 className="input-error">{ props.errorMessage.recruiterPassword }</h5> }

                        <InputContainer type="password" placeholder="Potvrdi lozinku" onChange={ handleChange } value={ inputs.confirmPassword } onKeyDown={ onKeyDown } name="confirmPassword" icon={ [ 'fas', 'unlock-alt' ] } />
                        { matchPassword && <h5 className="input-error">{ matchPassword || "" }</h5> }
                    </> : <>
                        <InputContainer placeholder="Ime" onChange={ handleChange } value={ inputs.name } onKeyDown={ onKeyDown } name="name" icon={ [ 'fas', 'signature' ] } />
                        { props.errorMessage.recruiterFirstName && <h5 className="input-error">{ props.errorMessage.recruiterFirstName }</h5> }

                        <InputContainer placeholder="Prezime" onChange={ handleChange } value={ inputs.surname } onKeyDown={ onKeyDown } name="surname" icon={ [ 'fas', 'signature' ] } />
                        { props.errorMessage.recruiterLastName && <h5 className="input-error">{ props.errorMessage.recruiterLastName }</h5> }

                        <InputContainer placeholder="Ime Firme" onChange={ handleChange } value={ inputs.company } onKeyDown={ onKeyDown } name="company" icon={ [ 'far', 'building' ] } />
                        { props.errorMessage.recruiterCompanyName && <h5 className="input-error">{ props.errorMessage.recruiterCompanyName }</h5> }

                    </> }
                    { !stage ? <h3 onClick={ handleSubmit } id="continue-button">Nastavi</h3> : <>
                        { !props.loading ? <h3 onClick={ handleSubmit } id="register-button">Registriraj se!</h3> : <Loader type="bubbles" color="#FF9695" height={64} width={64} /> }
                        <h3 onClick={ ( ) => setStage( 0 ) } id="return-button">Povratak</h3>
                    </> }
                </div>
            </div>
        </div>
    )

}

export default connect( mapStateToProps, mapDispatchToProps )( SignUp )