import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import languageManager from 'languages'
import queryString from 'query-string'
import React, { useEffect, useState } from 'react'
import Loader from 'react-loading'
import { connect } from 'react-redux'
import { createErrorMessageSelector, createLoadingSelector } from '../../../actions/selector'
import { denyUser, getUser, getUserQuiz, shortlistUser, resetUser } from '../../../actions/user'
import { getAge } from '../../../js/DateDifference'
import { getImageUrl } from '../../../js/imageManager'
import ErrorHandler from '../../utils/ErrorHandler'
import withNav from '../withNav'
import './UserProfile.css'

const loadingSelector = createLoadingSelector( [ 'GET_USER_QUIZ' ] );
const quizErrorSelector = createErrorMessageSelector( [ 'GET_USER_QUIZ' ] );
const errorSelector = createErrorMessageSelector( [ 'GET_USER', 'SHORTLIST_USER', 'DENY_USER' ] );

const mapStateToProps = ( state ) => {
    return {
        user: state.user.user,
        token: state.user.token,
        errorMessage: errorSelector( state ),
        userQuiz: state.user.userQuiz,
        userQuizUserPoints: state.user.userQuizUserPoints,
        userQuizTotalPoints: state.user.userQuizTotalPoints,
        quizLoading: loadingSelector( state ),
        quizError: quizErrorSelector( state )
    }
}

const mapDispatchToProps = {
    getUser,
    shortlistUser,
    denyUser,
    getUserQuiz,
    resetUser
}

const UserProfile = ( props ) => {

    const [ currentInfo, setCurrentInfo ] = useState( 0 );
    const [ experience, setExperience ] = useState( null );
    const [ education, setEducation ] = useState( null );
    const [ languages, setLanguages ] = useState( null );
    const [ modalVisible, setModalVisible ] = useState( false );
    const [ helpVisible, setHelpVisible ] = useState( false );

    useEffect( ( ) => {
        let appID = queryString.parse( props.location.search ).appID;
        
        props.getUser( props.match.params.id, appID, props.token )

        return ( ) => props.resetUser( );

    }, [ ] );

    useEffect( ( ) => {

        if ( props.user && props.user.experience && Object.keys( props.user ).length > 0 ) { // If the user is loaded
            setExperience(props.user.experience.map( ( exp ) => {
                return (
                    <div key={ exp.id } className="user-profile-info-box" >
                        <div className="user-profile-row">
                            <h1>{ exp.title }</h1>
                            <h4><b>{ calculateTime( exp.amount ) }</b> { calculateTimeUnit( exp.amount ) }</h4>
                        </div>
                        <h3>{ exp.company }</h3>
                        <p>{ exp.description }</p>
                    </div>
                )
            } ) );

            setEducation( props.user.education.map( ( ed ) => {
                let title

                if ( ed.title === 0 ) title = "Sveučilišni prvostupnik"
                if ( ed.title === 1 ) title = "Diploma"
                if ( ed.title === 2 ) title = "Certifikat"

                return (
                    <div key={ ed.id } className="user-profile-info-box" >
                        <div className="user-profile-row">
                            <h1>{ ed.school }</h1>
                            <h4><b>{ ed.graduationYear }.</b> Godina</h4>
                        </div>
                        <div className="user-profile-row">
                            <h3>{ title }</h3>
                            <p>{ ed.major }</p>
                        </div>
                    </div>
                )
            } ) );

            setLanguages( props.user.languages.map( ( lang ) => {
                let level

                if ( lang.level === 0 ) level = "Osnovno znanje"
                if ( lang.level === 1 ) level = "Razgovorno znanje"
                if ( lang.level === 2 ) level = "Izvrsno znanje"
                if ( lang.level === 3 ) level = "Materinji jezik"

                return (
                    <div key={ lang.id } className="user-profile-info-box" >
                        <div className="user-profile-row">
                            <h1>{ languageManager.getLanguageInfo( lang.name ).nativeName }</h1>
                            <h4><b>{ level }</b></h4>
                        </div>
                    </div>
                )
            } ) );
            
        }

    }, [ props.user, currentInfo ] );

    const openQuizAnswers = ( ) => {
        setModalVisible( true );
        
        props.getUserQuiz( props.match.params.id, props.user.applicationJobID, props.token );
    }

    useEffect( ( ) => {
        if( props.quizError && modalVisible ) setModalVisible( false );
    }, [ props.quizError ] );

    return (
        <section id="user-profile-section">
            { ( props.user ) ? <>
                <div id="user-profile">
                    <div id="user-profile-image" style={ props.user != null ? { backgroundImage: 'url(' + getImageUrl( props.user.imagePath ) +')' } : { } } ></div>
                    <h1 id="user-profile-title">{ props.user.firstName + " " + props.user.lastName }</h1>
                    { props.user.birthday != null && <h4 id="user-profile-age">{ getAge( new Date( props.user.birthday ) ) } Godina</h4> }
                    <div className="user-profile-row">
                        <h3 className="user-profile-info-button" id={ currentInfo === 0 ? "active" : "" } onClick={ ( ) => setCurrentInfo( 0 ) }>Iskustvo</h3>
                        <h3 className="user-profile-info-button" id={ currentInfo === 1 ? "active" : "" } onClick={ ( ) => setCurrentInfo( 1 ) }>Edukacija</h3>
                        <h3 className="user-profile-info-button" id={ currentInfo === 2 ? "active" : "" } onClick={ ( ) => setCurrentInfo( 2 ) }>Jezici</h3>
                    </div>
                    <div id="user-profile-info-container" >
                        { currentInfo === 0 ? experience : "" }
                        { currentInfo === 1 ? education : "" }
                        { currentInfo === 2 ? languages : "" }
                    </div>
                    <h5 id="user-profile-about-title">O osobi</h5>
                    <p id="user-profile-about">{ props.user.about || "Korisnik nije postavio opis." }</p>
                    { ( ( ) => {
                        // This will only be null when the application doesn't exist
                        if ( !props.user.applicationJobID ) return;
                        if ( props.user.applicationQuizScore != -2 ) {
                            if ( props.user.applicationQuizScore == -1 ) {
                                return <div id="quiz-box" style={ { borderColor: '#F95F62' } }>
                                    <h3 style={ { color: '#F95F62' } }>Upitnik nije riješen</h3>
                                    <h4 style={ { backgroundColor: '#F95F62' } }>0%</h4>
                                </div>
                            } else if ( props.user.applicationQuizScore == null ) {
                                return <div id="quiz-box" style={ { borderColor: '#F95F62' } }>
                                    <h3 style={ { color: '#F95F62' } }>Upitnik nedovršen</h3>
                                    <FontAwesomeIcon id="quiz-help-button" onClick={ ( ) => setHelpVisible( prev => !prev ) } color="#ffffff" icon={ [ 'fas', 'question' ] } size="lg" fixedWidth />
                                </div>
                            } else {
                                return <div id="quiz-box" onClick={ openQuizAnswers } style={ { borderColor: '#34C191' } }>
                                    <h3 style={ { color: '#34C191' } }>Upitnik riješen</h3>
                                    <h4 style={ { backgroundColor: '#34C191' } }>{ props.user.applicationQuizScore }%</h4>
                                </div>
                            }
                        }
                    } )() }
                    { helpVisible && <h5 id="quiz-help-text">Korisnik nije riješio upitnik. Moguće je da korisnik i dalje riješava upitnik, ili je došlo do tehničkih poteškoća prilikom ispune upitnika. Također je moguće da je korisnik prisilno izašao iz upitnika tijekom ispune.</h5> }
                    <h3 id="user-profile-message-button" onClick={ ( ) => {
                        let appID = queryString.parse( props.location.search ).appID
                        let url = appID ? '/chat/' + props.match.params.id + '?appID=' + appID : '/chat/' + props.match.params.id
                        props.history.push( url )
                    } }>Pošalji poruku</h3>
                    { (  queryString.parse( props.location.search ).appID !== null && props.user.applicationStatus !== 2&& props.user.applicationJobID != null ) && <>
                        <h3 id="user-profile-shortlist-button" onClick={ ( ) => props.shortlistUser( queryString.parse( props.location.search ).appID, props.token ) }>{ props.user.applicationStatus === 0 ? 'Dodaj u uži izbor' : 'Makni iz užeg izbora' }</h3>
                        <h3 id="user-profile-deny-button" onClick={ ( ) => props.denyUser( queryString.parse( props.location.search ).appID, props.token ) }>Odbij prijavu</h3>
                    </> }
                    <div className="user-profile-row">
                        <h6 id="report-user" onClick={ ( ) => props.history.push( '/user/' + props.match.params.id + '/report' ) }>Prijavi korisnika</h6>
                    </div>
                </div>
                <div id="quiz-modal" onClick={ ( ) => setModalVisible( false ) } style={ modalVisible ? { display: 'flex' } : { display: 'none' } }>
                    <div id="quiz-modal-container" onClick={ ( e ) => e.stopPropagation( ) }>
                        <div id="quiz-header">
                            <h1>Odgovori posloprimca</h1>
                            <FontAwesomeIcon onClick={ ( ) => setModalVisible( false ) } id="close-button" color="#111111" icon={ [ 'fas', 'times' ] } size="lg" fixedWidth />
                        </div>
                        { ( !props.quizLoading && props.userQuiz ) ? <>
                            { props.userQuiz.map( ( question, q_i ) => {
                                return <div key={ q_i } className="quiz-question">
                                    <h3 className="quiz-question-text">{ ( question.number + 1 ) }. { question.text }</h3>
                                    { question.answers.map( ( answer, a_i ) => {
                                        return <div key={ a_i } className="question-answer">
                                            { question.type != 2 ? ( answer.correct ? <FontAwesomeIcon color="#34C191" icon={ [ 'fas', 'check-circle' ] } size="lg" fixedWidth />
                                            : <FontAwesomeIcon color="#F95F62" icon={ [ 'fas', 'times-circle' ] } size="lg" fixedWidth /> ) : <FontAwesomeIcon color="#808080" icon={ [ 'fas', 'info-circle' ] } size="lg" fixedWidth /> }
                                            <h4 className="question-answer-text">{ answer.value }</h4>
                                            <h5>{ answer.points }</h5>
                                        </div>
                                    } ) }
                                </div>
                            } ) }
                            <h3 id="total-points">{ props.userQuizUserPoints } / { props.userQuizTotalPoints }</h3>
                        </> : <Loader id="job-loader" type="bubbles" color="#068CDD" height={64} width={64} /> }
                    </div>
                </div>
            </> : <ErrorHandler errorMessage={ props.errorMessage } /> }
        </section>
    )
}

const calculateTime = ( m ) => {
    const years = Math.floor( m / 12 );
    const months = m % 12;
    if ( months > 0 ) return `> ${ years }`;
    if ( years == 0 ) return `${ months }`;

    return `${ years }`; 
}

const calculateTimeUnit = ( m ) => {
    const years = Math.floor( m / 12 );
    if ( years == 0 ) return `Mjeseci`;

    return `Godina`; 
}

export default connect( mapStateToProps, mapDispatchToProps )( withNav( UserProfile ) )