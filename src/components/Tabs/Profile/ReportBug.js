import React, { useEffect, useState } from 'react'
import Loader from 'react-loading'
import { connect } from 'react-redux'
import { getProfile } from '../../../actions/recruiter'
import { reportBug, resetBugReported } from '../../../actions/report'
import { createErrorMessageSelector, createLoadingSelector } from '../../../actions/selector'
import { getImageUrl } from '../../../js/imageManager'
import ErrorHandler from '../../utils/ErrorHandler'
import withNav from '../withNav'
import './ReportBug.css'

const errorSelector = createErrorMessageSelector( [ 'GET_PROFILE', 'REPORT_BUG' ] );
const loadingSelector = createLoadingSelector( [ 'REPORT_BUG' ] );

const mapStateToProps = ( state ) => {
    return {
        profile: state.user.profile,
        id: state.user.id,
        token: state.user.token,
        bugReported: state.report.bugReported,
        errorMessage: errorSelector( state ),
        loading: loadingSelector( state )
    }
}

const mapDispatchToProps = {
    getProfile,
    reportBug,
    resetBugReported
}

const ReportBug = ( props ) => {

    const [ bugInfo, setBugInfo ] = useState( "" );

    useEffect( ( ) => {
        if ( !props.profile ) { // Load the profile if it hasn't been loaded already
            props.getProfile( props.id, props.token );
        }
    }, [ ] );

    useEffect( ( ) => {
        if ( props.bugReported ) {
            props.resetBugReported( ); // Reset the user reported status
            props.history.push( '/profile' ); // Redirect the user to /profile if the bug was reported
        }
    }, [ props.bugReported ] );

    const handleSubmit = ( ) => {
        props.reportBug( bugInfo, props.token );
    }

    return (
        <section id="bug-profile-section">
            { ( props.profile ) ? 
                <div id="bug-profile">
                    <div id="bug-profile-image" style={ props.profile != null ? { backgroundImage: 'url(' + getImageUrl( props.profile.imagePath ) + ' )' } : { } } ></div>
                    <div className="input-container">
                        <textarea type="text" placeholder="&nbsp;" value={ bugInfo } name="bugInfo" onChange={ ( e ) => setBugInfo( e.target.value ) } ></textarea>
                        <span className="input-label">Opis pogreške</span>
                        <h5 className="input-error">{ props.errorMessage.info || "" }</h5>
                    </div>
                    { !props.loading ? <div id="bug-profile-row">
                        <h3 id="cancel-button" onClick={ ( ) => props.history.push( '/profile' ) }>Odustani</h3>
                        <h3 id="save-button" onClick={ handleSubmit }>Prijavi pogrešku</h3>
                    </div> : <Loader type="bubbles" color="#068CDD" height={64} width={64} /> }
                </div>
            : <ErrorHandler errorMessage={ props.errorMessage } /> }
        </section>
    )
}

export default connect( mapStateToProps, mapDispatchToProps )( withNav( ReportBug, '3' ) )