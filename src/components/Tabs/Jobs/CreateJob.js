import React, { useEffect, useState } from 'react'
import Loader from 'react-loading'
import { connect } from 'react-redux'
import { createJob } from '../../../actions/job'
import { createErrorMessageSelector, createLoadingSelector } from '../../../actions/selector'
import jobTypes from '../../../js/jobTypes'
import InputContainer from '../utils/InputContainer'
import withNav from '../withNav'
import './CreateJob.css'
import QuizContainer from './QuizContainer'
import StatusSlider from './StatusSlider'
import Modal from 'react-modal';

const errorSelector = createErrorMessageSelector( [ 'CREATE_JOB' ] );
const loadingSelector = createLoadingSelector( [ 'CREATE_JOB' ] );

const mapStateToProps = ( state ) => {
    return {
        jobCreated: state.job.jobCreated,
        token: state.user.token,
        errorMessage: errorSelector( state ),
        loading: loadingSelector( state )
    }
}

const mapDispatchToProps = {
    createJob
}

Modal.setAppElement('#root')

const CreateJob = ( props ) => {

    const [ inputs, setInputs ] = useState( {
            title: "",
            description: "",
            defaultResponse: "",
            salary: "",
            startingDate: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            jobType: "hzp9Ns0xhuB",
            sliders: {
                salary: 0,
                experience: 0,
                employmentTime: 0,
                employmentContract: 0,
                studentsAccepted: 0
            }
    } );
    
    const [ quizRequired, setQuizRequired ] = useState( 0 );
    const [ quiz, setQuiz ] = useState( [ ] );

    const [ modalVisible, setModalVisible ] = useState( false );

    const handleChange = ( e ) => {
        const { name, value } = e.target;

        setInputs( { ...inputs, [name]: value } );
    }

    const setSlider = ( name, value ) => {
        const sliders = { ...inputs.sliders }
        sliders[ name ] = value

        setInputs( { ...inputs, sliders } )
    }

    const createJob = ( ) => {
        closeModal( );

        let quiz_copy = [ ...quiz ];

        quiz_copy.forEach( ( question, index ) => {
            // Remove the points and time limit if it's a textual answer
            if ( question.type == 2 ) {
                delete quiz_copy[ index ].answers;
                delete quiz_copy[ index ].timeLimit;
                delete quiz_copy[ index ].points;
            }
        } );

        props.createJob(
            inputs.title,
            inputs.description,
            inputs.defaultResponse,
            inputs.jobType,
            inputs.salary,
            inputs.sliders.salary,
            inputs.sliders.experience,
            inputs.sliders.employmentContract,
            inputs.sliders.employmentTime,
            inputs.sliders.studentsAccepted,
            inputs.startingDate,
            inputs.address,
            inputs.city,
            inputs.state,
            inputs.zip,
            quiz_copy,
            quizRequired,
            props.token
        )
    }
        
    useEffect( ( ) => {
        if ( props.jobCreated ) props.history.push( '/jobs' )
    }, [ props.jobCreated ] );

    const openModal = ( ) => setModalVisible( true );
    const closeModal = ( ) => setModalVisible( false );

    return (
        <section id="create-job-section">
            <div id="create-job">
                <h1 id="title">Novi posao</h1>
                <InputContainer label="Naslov" value={ inputs.title } name="title" handleChange={ handleChange } />
                { props.errorMessage.jobTitle && <h5 className="input-error">{ props.errorMessage.jobTitle }</h5> }
                <div className="input-container">
                    <textarea type="text" placeholder="&nbsp;" value={ inputs.description } name="description" onChange={ handleChange } ></textarea>
                    <span className="input-label">Opis posla</span>
                </div>
                { props.errorMessage.jobDescription && <h5 className="input-error">{ props.errorMessage.jobDescription }</h5> }
                <div className="row">
                    <InputContainer label="Plaća" value={ inputs.salary } name="salary" handleChange={ handleChange } />
                    <StatusSlider leftText="Po satu" rightText="Mjesečno" status={ inputs.sliders.salary } name="salary" setSlider={ setSlider } />
                </div>
                { props.errorMessage.jobSalary && <h5 className="input-error">{ props.errorMessage.jobSalary }</h5> }
                <div className="row">
                    <StatusSlider label="Iskustvo" leftText="Nepotrebno" rightText="Potrebno" status={ inputs.sliders.experience } name="experience" setSlider={ setSlider } />
                    <StatusSlider label="Radno vrijeme" leftText="Nepuno" rightText="Puno" status={ inputs.sliders.employmentTime } name="employmentTime" setSlider={ setSlider } />
                </div>
                <div className="row">
                    <StatusSlider label="Pozicija" leftText="Privremena" rightText="Trajna" status={ inputs.sliders.employmentContract } name="employmentContract" setSlider={ setSlider } />
                    <StatusSlider label="Studenti" leftText="Nepoželjni" rightText="Prihvaćeni" status={ inputs.sliders.studentsAccepted } name="studentsAccepted" setSlider={ setSlider } />
                </div>
                <div className="input-container">
                    <label id="select-label">Vrsta posla</label>
                    <select placeholder="Vrsta posla" onChange={ handleChange } value={ inputs.jobType } name="jobType" >
                        { Object.keys( jobTypes ).map( key => {
                            return <option value={ key }>{ jobTypes[ key ] }</option>
                        } ) }
                    </select>
                </div>

                { props.errorMessage.jobStudentsAccepted && <h5 className="input-error">{ props.errorMessage.jobStudentsAccepted }</h5> }

                <InputContainer label="Adresa" value={ inputs.address } name="address" handleChange={ handleChange } />
                { props.errorMessage.jobAddress && <h5 className="input-error">{ props.errorMessage.jobAddress }</h5> }

                <InputContainer label="Grad" value={ inputs.city } name="city" handleChange={ handleChange } />
                { props.errorMessage.jobCity && <h5 className="input-error">{ props.errorMessage.jobCity }</h5> }

                <InputContainer label="Županija" value={ inputs.state } name="state" handleChange={ handleChange } />
                { props.errorMessage.jobState && <h5 className="input-error">{ props.errorMessage.jobState }</h5> }

                <div className="row">
                    <InputContainer label="Poštanski broj" value={ inputs.zip } name="zip" handleChange={ handleChange } />
                    <div className="input-container" id="starting-date">
                        <input type="date" placeholder="&nbsp;" value={ inputs.startingDate } name="startingDate" onChange={ handleChange } />
                        <span className="input-label">Početak rada</span>
                        <span className="input-border"></span>
                    </div>
                </div>
                { props.errorMessage.jobZIP && <h5 className="input-error">{ props.errorMessage.jobZIP }</h5> }
                { props.errorMessage.jobStartingDate && <h5 className="input-error">{ props.errorMessage.jobStartingDate }</h5> }
                <div className="input-container">
                    <textarea type="text" placeholder="&nbsp;" value={ inputs.defaultResponse } name="defaultResponse" onChange={ handleChange } ></textarea>
                    <span className="input-label">Automatski odgovor na prijavu</span>
                </div>
                { props.errorMessage.jobDefaultResponse && <h5 className="input-error">{ props.errorMessage.jobDefaultResponse }</h5> }

                { !props.loading ? 
                    <h3 id="create-job-button" onClick={ openModal }>Kreiraj posao</h3>
                    : <Loader id="loader" type="bubbles" color="#068CDD" height={32} width={64} />
                }
            </div>
            <div id="right-column">
                <QuizContainer editable={ true } quiz={ quiz } setQuiz={ setQuiz } quizRequired={ quizRequired } setQuizRequired={ setQuizRequired } />
            </div>
            <Modal
                isOpen={ modalVisible }
                onRequestClose={ closeModal }
                contentLabel="Potvrdite izradu oglasa"
                className="create-job-modal"
                overlayClassName="create-job-modal-overlay"
            >
                <h2>Potvrdite radnju</h2>
                <h4>Želite li kreirati ovaj oglas? Sliku oglasa i upitnik možete urediti nakon izrade. Međutim, nakon izrade oglasa nije moguće mijenjati ostale podatke.</h4>
                <div id="modal-row">
                    <h3 id="cancel-button" onClick={ closeModal }>Odustani</h3>
                    <h3 id="confirm-button" onClick={ createJob }>Potvrdi</h3>
                </div>
            </Modal>
        </section>
    )
}

export default connect( mapStateToProps, mapDispatchToProps )( withNav( CreateJob, '0' ) )