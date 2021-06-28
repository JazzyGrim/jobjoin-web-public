import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Loader from 'react-loading'
import { connect } from 'react-redux'
import { getProfile, saveImage, saveProfile } from '../../../actions/recruiter'
import { createErrorMessageSelector, createLoadingSelector } from '../../../actions/selector'
import { getImageUrl } from '../../../js/imageManager'
import ErrorHandler from '../../utils/ErrorHandler'
import InputContainer from '../utils/InputContainer'
import withNav from '../withNav'
import './EditProfile.css'

const errorSelector = createErrorMessageSelector( [ 'GET_PROFILE', 'SAVE_PROFILE', 'SAVE_PROFILE_IMAGE' ] );
const loadingSelector = createLoadingSelector( [ 'SAVE_PROFILE', 'SAVE_PROFILE_IMAGE' ] );

const mapStateToProps = ( state ) => {
    return {
        profile: state.user.profile,
        profileUpdated: state.user.profileUpdated,
        credits: state.user.credits,
        id: state.user.id,
        token: state.user.token,
        errorMessage: errorSelector( state ),
        loading: loadingSelector( state )
    }
}

const mapDispatchToProps = {
    getProfile,
    saveProfile,
    saveImage
}

const EditProfile = ( props ) => {

    const [ inputs, setInputs ] = useState( {
        firstName: "",
        lastName: "",
        companyName: ""
    } );
    const [ loading, setLoading ] = useState( true );

    let fileUploader = null;

    useEffect( ( ) => {
        if ( !props.profile ) { // Load the profile if it hasn't been loaded already
            props.getProfile( props.id, props.token );
            return;
        }

        const { firstName, lastName, companyName } = props.profile;
        setInputs( { firstName, lastName, companyName } );
        setLoading( false );

    }, [ ] );

    useEffect( ( ) => { // If the profile wasn't initally loaded, run this after loading the profile
        if ( loading && props.profile ) {
            const { firstName, lastName, companyName } = props.profile;
            setInputs( { firstName, lastName, companyName } );
            setLoading( false );
        }
    }, [ props.profile ] );
    
    useEffect( ( ) => { // Once the profile has been updated
        if ( props.profileUpdated ) props.history.push( '/profile' );
    }, [ props.profileUpdated ] );

    const handleChange = ( e ) => {
        const { name, value } = e.target;

        setInputs( { ...inputs, [name]: value } );
    }

    const handleImageSubmit = ( e ) => {  
        const image = e.target.files[ 0 ];

        let formData = new FormData( );
        formData.append( 'image', image );

        props.saveImage( formData, props.token );
    }

    const handleSubmit = ( ) => {
        props.saveProfile( inputs.firstName, inputs.lastName, inputs.companyName, props.token );
    }

    return <section id="edit-profile-section">
                { props.profile ? (
                    <div id="edit-profile">
                        <div id="edit-profile-image" style={ props.profile != null ? { backgroundImage: 'url(' + getImageUrl( props.profile.imagePath ) + ' )' } : { } } ></div>
                        <div id="edit-profile-image-cover" onClick={ ( ) => fileUploader.click( ) }>
                            <input type="file" accept="image/*" ref={ ( element ) => fileUploader = element } style={ { display: "none" } } onChange={ handleImageSubmit } />
                            <FontAwesomeIcon icon={ [ 'fas', 'camera' ] } color="white" size="3x" fixedWidth />
                            <h3>Promijeni<br />sliku</h3>
                        </div>
                        <InputContainer id="name-input" label="Ime" value={ inputs.firstName } name="firstName" handleChange={ handleChange } />
                        { props.errorMessage.recruiterFirstName && <h5 className="input-error">{ props.errorMessage.recruiterFirstName }</h5> }
                        <InputContainer label="Prezime" value={ inputs.lastName } name="lastName" handleChange={ handleChange } />
                        { props.errorMessage.recruiterLastName && <h5 className="input-error">{ props.errorMessage.recruiterLastName }</h5> }
                        <InputContainer label="Ime tvrtke" value={ inputs.companyName } name="companyName" handleChange={ handleChange } />
                        { props.errorMessage.recruiterCompanyName && <h5 className="input-error">{ props.errorMessage.recruiterCompanyName }</h5> }
                        { !props.loading ? <div id="edit-profile-row">
                                <h3 id="cancel-button" onClick={ ( ) => props.history.push( '/profile' ) }>Odustani</h3>
                                <h3 id="save-button" onClick={ handleSubmit }>Spremi promjene</h3>
                        </div> : <Loader type="bubbles" color="#068CDD" height={64} width={64} /> }
                    </div>
                ) : <ErrorHandler errorMessage={ props.errorMessage } /> }
            </section>
}

const EditProfileComponent = connect( mapStateToProps, mapDispatchToProps )( withNav( EditProfile, '3' ) )

export default EditProfileComponent