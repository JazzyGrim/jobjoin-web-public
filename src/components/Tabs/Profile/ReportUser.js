import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { reportUser, resetUserReported } from '../../../actions/report'
import { createErrorMessageSelector } from '../../../actions/selector'
import { getUserNoDetails, resetUser } from '../../../actions/user'
import { getImageUrl } from '../../../js/imageManager'
import ErrorHandler from '../../utils/ErrorHandler'
import withNav from '../withNav'
import './ReportUser.css'

const errorSelector = createErrorMessageSelector( [ 'GET_PROFILE', 'REPORT_USER' ] );

const mapStateToProps = ( state ) => {
    return {
        id: state.user.id,
        token: state.user.token,
        user: state.user.user,
        userReported: state.report.userReported,
        errorMessage: errorSelector( state )
    }
}

const mapDispatchToProps = {
    getUserNoDetails,
    resetUser,
    reportUser,
    resetUserReported
}

const ReportUser = ( props ) => {

    const [ reason, setReason ] = useState( "" );

    useEffect( ( ) => {
        // Load the user if there isn't one loaded, or if there is one loaded, but not the one we need
        if ( !props.user || props.user.id !== props.match.params.id ) props.getUserNoDetails( props.match.params.id, props.token );
        return ( ) => {
            props.resetUser( )
        }
    }, [ ] );

    useEffect( ( ) => {
        if ( props.userReported ) { // If the report was successful
            props.resetUserReported( ); // Reset the user reported status
            props.history.push( '/profile' ); // Redirect the user to /profile if the user was reported
        }
    }, [ props.userReported ] );

    const handleSubmit = ( ) => {
        props.reportUser( props.match.params.id, reason, props.token );
    }

    return (
        <section id="report-profile-section">
            { ( props.user ) ? 
                <div id="report-profile">
                    <div id="report-profile-image" style={ props.user != null ? { backgroundImage: 'url(' + getImageUrl( props.user.imagePath ) + ' )' } : { } } ></div>
                    <div className="input-container">
                        <textarea type="text" placeholder="&nbsp;" value={ reason } name="reportInfo" onChange={ ( e ) => setReason( e.target.value ) } ></textarea>
                        <span className="input-label">Razlog prijave</span>
                        <h5 className="input-error">{ props.errorMessage.reason || "" }</h5>
                    </div>
                    <div id="report-profile-row">
                        <h3 id="cancel-button" onClick={ ( ) => props.history.push( '/profile' ) }>Odustani</h3>
                        <h3 id="save-button" onClick={ handleSubmit }>Prijavi korisnika</h3>
                    </div>
                </div>
            : <ErrorHandler errorMessage={ props.errorMessage } /> }
        </section>
    )
}

export default connect( mapStateToProps, mapDispatchToProps )( withNav( ReportUser, '3' ) )