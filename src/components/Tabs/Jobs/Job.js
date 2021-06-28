import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Loader from 'react-loading'
import { connect } from 'react-redux'
import { resetMessages } from '../../../actions/error'
import { getJob, getJobApplicationCount, getQuiz, jobCancel, jobHire, removeQuiz, saveJobImage, saveResponse, updateQuiz } from '../../../actions/job'
import { createErrorMessageSelector, createLoadingSelector } from '../../../actions/selector'
import { getDateDifferenceInWords } from '../../../js/DateDifference'
import { getJobImageUrl } from '../../../js/imageManager'
import ErrorHandler from '../../utils/ErrorHandler'
import withNav from '../withNav'
import './Job.css'
import QuizContainer from './QuizContainer'

const responseLoadingSelector = createLoadingSelector( [ 'SAVE_RESPONSE' ] );
const quizLoadingSelector = createLoadingSelector( [ 'UPDATE_QUIZ' ] );
const quizErrorSelector = createErrorMessageSelector( [ 'UPDATE_QUIZ' ] );
const loadingSelector = createLoadingSelector( [ 'GET_JOB', 'GET_QUIZ' ] );
const errorSelector = createErrorMessageSelector( [ 'GET_JOB', 'GET_JOB_APPLICATION_COUNT', 'SAVE_JOB_IMAGE', 'JOB_HIRE', 'JOB_CANCEL', 'GET_QUIZ', 'SAVE_RESPONSE' ] );

const mapStateToProps = ( state ) => {
    return {
        job: state.job.job,
        jobUpdated: state.job.jobUpdated,
        quiz: state.job.quiz,
        quizRequired: state.job.quizRequired,
        token: state.user.token,
        savingResponse: responseLoadingSelector( state ),
        updatingQuiz: quizLoadingSelector( state ),
        quizError: quizErrorSelector( state ),
        loading: loadingSelector( state ),
        errorMessage: errorSelector( state )
    }
}

const mapDispatchToProps = {
    getJob,
    getQuiz,
    updateQuiz,
    removeQuiz,
    getJobApplicationCount,
    saveJobImage,
    saveResponse,
    jobHire,
    jobCancel,
    resetMessages
}

const Job = ( props ) => {

    const [ quizUpdated, setQuizUpdated ] = useState( false );
    const [ quizRequired, setQuizRequired ] = useState( 0 );
    const [ quiz, setQuiz ] = useState( [ ] );
    const [ defaultResponse, setDefaultResponse ] = useState( '' );
    const [ responseUpdated, setResponseUpdated ] = useState( false );

    let fileUploader = null;

    useEffect( ( ) => {
        return ( ) => props.removeQuiz( );
    }, [ ] );

    useEffect( ( ) => {
        props.getJob( props.match.params.id, props.token )
        props.getQuiz( props.match.params.id, props.token )
    }, [  ] );

    // When the job updates
    // e.g. image is changed or response text is changed
    useEffect( ( ) => {
        if ( props.jobUpdated && !props.loading ) props.getJob( props.match.params.id, props.token );
    }, [ props.jobUpdated ] );

    useEffect( ( ) => {
        if ( !props.quiz ) return;
        
        setQuiz( JSON.parse( JSON.stringify( props.quiz ) ) );
        setQuizRequired( props.quizRequired );
        
    }, [ props.quiz ] );

    useEffect( ( ) => {

        if ( JSON.stringify( props.quiz ) !== JSON.stringify( quiz ) ) {
            setQuizUpdated( true );
            return;
        }

        if ( quizUpdated ) setQuizUpdated( false );

    }, [ quiz ] );

    useEffect( ( ) => {
        if ( props.job ) {
            setDefaultResponse( props.job.defaultResponse );
            if ( props.job.totalApplicationCount == null ) props.getJobApplicationCount( props.match.params.id, props.token )
        }
    }, [ props.job ] );

    useEffect( ( ) => {
        props.getJob( props.match.params.id, props.token )
    }, [ props.jobUpdated ] );

    const handleImageSubmit = ( e ) => {  
        const image = e.target.files[ 0 ];

        let formData = new FormData( );

        formData.append( 'image', image );

        props.resetMessages( );
        props.saveJobImage( formData, props.match.params.id, props.token );
    }

    const updateQuiz = ( ) => {
        let quiz_copy = [ ...quiz ];
        
        quiz_copy.forEach( ( question, index ) => {
            // Remove the points and time limit if it's a textual answer
            if ( question.type == 2 ) {
                delete quiz_copy[ index ].answers;
                delete quiz_copy[ index ].timeLimit;
                delete quiz_copy[ index ].points;
            }
        } );

        props.updateQuiz( quiz_copy, quizRequired, props.match.params.id, props.token );

    }

    const handleResponseChange = ( e ) => {
        const { value } = e.target;

        setDefaultResponse( value );

        if ( value != props.job.defaultResponse ) {
            setResponseUpdated( true );
            return;
        }

        if ( responseUpdated ) setResponseUpdated( false );
    }

    const saveResponse = ( ) => {
        if ( !responseUpdated ) return;

        props.resetMessages( );
        props.saveResponse( defaultResponse, props.match.params.id, props.token );
    }

    return (
        <section id="job-section">
            { ( !props.loading ) ? <>
                { props.job &&
                <div id="job">
                    <div id="job-image-container" style={ { backgroundImage: 'url(' + getJobImageUrl( props.job.imagePath ) +')' } }>
                        <input type="file" accept="image/*" ref={ ( element ) => fileUploader = element } style={ { display: "none" } } onChange={ handleImageSubmit } />
                        <h3 id="edit-image" onClick={ ( ) => fileUploader.click( ) }>Uredi sliku</h3>
                    </div>
                    <div id="job-content">
                        <h1>{ props.job.title }</h1>
                        <div className="job-icon-row">
                            <div className="job-icon">
                                <FontAwesomeIcon icon={ [ 'fas', 'map-marker-alt' ] } color="#969694" size="lg" fixedWidth />
                                <h3>{ props.job.city }</h3>
                            </div>
                            <div className="job-icon" id="salary-icon">
                                <FontAwesomeIcon icon={ [ 'fas', 'money-bill-alt' ] } color="#969694" size="lg" fixedWidth />
                                <h3>{ ( props.job.salaryType ) ? props.job.salary + ' HRK' : props.job.salary + ' HRK po satu' }</h3>
                            </div>
                        </div>
                        <h3 id="job-experience" className={ props.job.experience ? "job-experience-green" : 'job-experience-red' } >{ props.job.experience ? "Iskustvno potrebno" : "Iskustvo nepotrebno" }</h3>
                        <div className="job-row">
                            <h3 id="job-employment-time">{ props.job.employmentTime ? "Puno radno vrijeme" : "Nepuno radno vrijeme" }</h3>
                            <h3 id="job-employment-contract">{ props.job.employmentContract ? "Trajna pozicija" : "Privremena pozicija" }</h3>
                        </div>
                        <h4 id="job-starting-date">Početak rada: <b>{ new Date( props.job.startingDate ).toLocaleDateString( ) }</b></h4>
                        <p id="job-description">
                            { props.job.description }
                        </p>
                        <h4 id="job-students-accepted">Studenti prihvaćeni: <b>{ props.job.studentsAccepted ? 'Da' : 'Ne' }</b></h4>
                        <h4 id="job-type">Vrsta posla: <b>{ props.job.type }</b></h4>
                        <h4 id="job-created">Objavljeno { getDateDifferenceInWords( new Date( props.job.created ) ) }</h4>
                        <div id="job-application-button" onClick={ ( ) => props.history.push( window.location.pathname + '/applications' ) }>
                            <h3>{ ( props.job.totalApplicationCount != null ) ? props.job.totalApplicationCount : '-' }</h3>
                            <h4>Pogledaj prijave</h4>
                        </div>
                        { ( props.job.hired === 0 && props.job.cancelled === 0 ) ? <>
                            <h3 id="job-hired-button" onClick={ ( ) => props.jobHire( props.match.params.id, props.token ) }>Radno mjesto je zauzeto!</h3>
                            <h5 onClick={ ( ) => props.jobCancel( props.match.params.id, props.token ) }>Deaktiviraj posao</h5>
                        </> : '' }
                        { props.job.hired === 1 ? <h5>Radno mjesto je označeno kao zauzeto.</h5> : "" }
                        { props.job.cancelled === 1 ? <h5>Ovaj oglas je deaktiviran.</h5> : "" }
                    </div>
                </div> }
                <div id="right-column">
                    <div id="app-response-container">
                        <h1 id="title">Odgovor na prijavu</h1>
                        <div className="input-container">
                            <textarea type="text" placeholder="&nbsp;" value={ defaultResponse } onChange={ handleResponseChange } ></textarea>
                            <span className="input-label">Automatski odgovor na prijavu</span>
                        </div>
                        { props.errorMessage.defaultResponse && <h5 className="input-error">{ props.errorMessage.defaultResponse }</h5> }

                        { !props.savingResponse ? 
                            <h3 onClick={ saveResponse } id="save-response" style={ !responseUpdated ? { opacity: 0.7, backgroundColor: '#808080', cursor: 'default' } : undefined }>Spremi promjene</h3>
                            : <Loader id="response-loader" type="bubbles" color="#068CDD" height={32} width={32} /> }
                    </div>
                    <QuizContainer
                        jobActive={ props.job && !props.job.hired && !props.job.cancelled }
                        quiz={ quiz }
                        setQuiz={ setQuiz }
                        quizRequired={ quizRequired }
                        setQuizRequired={ setQuizRequired }
                        updated={ quizUpdated }
                        updateQuiz={ updateQuiz }
                        updating={ props.updatingQuiz }
                        errors={ props.quizError }
                    />
                </div>
            </> : <ErrorHandler errorMessage={ props.errorMessage } /> }
        </section>
    )
}

export default connect( mapStateToProps, mapDispatchToProps )( withNav( Job, '0' ) )