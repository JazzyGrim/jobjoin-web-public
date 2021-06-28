import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getCredits, getProfile } from '../../../actions/recruiter'
import { createErrorMessageSelector } from '../../../actions/selector'
import { getImageUrl } from '../../../js/imageManager'
import ErrorHandler from '../../utils/ErrorHandler'
import withNav from '../withNav'
import './ProfileScreen.css'

const errorSelector = createErrorMessageSelector( [ 'GET_PROFILE', 'GET_CREDITS' ] );

const mapStateToProps = ( state ) => {
    return {
        profile: state.user.profile,
        credits: state.user.credits,
        id: state.user.id,
        token: state.user.token,
        errorMessage: errorSelector( state )
    }
}

const mapDispatchToProps = {
    getProfile,
    getCredits
}

const Profile = ( props ) => {

    useEffect( ( ) => {
        props.getProfile( props.id, props.token )
        props.getCredits( props.token )
    }, [ ] );

    return (
        <section id="profile-section">
                { ( props.profile ) ? <div id="profile">
                <div id="profile-row">
                    <div id="profile-image" style={ { backgroundImage: 'url(' + getImageUrl( props.profile.imagePath ) + ' )' } } ></div>
                    <div id="profile-column">
                        <h1 id="profile-title">{ props.profile.firstName + " " + props.profile.lastName }</h1>
                        <h4 id="profile-company">{ props.profile.companyName }</h4>
                    </div>
                </div>
                    <h3 id="buy-tokens-button" onClick={ ( ) => props.history.push( '/credits' ) }>Nadoplati račun s tokenima</h3>
                <div className="button-row">
                    <FontAwesomeIcon id="edit-profile" icon={ [ 'fas', 'pencil-alt' ] } color="white" size="lg" fixedWidth onClick={ ( ) => props.history.push( '/profile/edit' ) } />
                    <h5 onClick={ ( ) => props.history.push( '/profile/edit' ) } >Uredi profil</h5>
                </div>
                <div className="button-row">
                    <FontAwesomeIcon id="report-bug" icon={ [ 'fas', 'bug' ] } color="white" size="lg" fixedWidth onClick={ ( ) => props.history.push( '/profile/bug' ) } />
                    <h5 onClick={ ( ) => props.history.push( '/profile/bug' ) } >Prijavi pogrešku</h5>
                </div>
            </div> : <ErrorHandler errorMessage={ props.errorMessage } /> }
        </section>
    )
}

export default connect( mapStateToProps, mapDispatchToProps )( withNav( Profile, '3' ) )