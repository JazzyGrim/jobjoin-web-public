import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loading';
import InputContainer from '../utils/InputContainer';
import './QuizContainer.css';

const default_question = {
    text: '',
    type: 0,
    answers: [
        {
            value: '',
            correct: false
        },
        {
            value: '',
            correct: false
        }
    ],
    timeLimit: 0,
    points: 1
}

const default_answer = {
    value: '',
    correct: false
}

Object.byString = function(o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

const QuizContainer = props => {

    // Deconstruct some values
    const { jobActive, loading, quiz, setQuiz, quizRequired, setQuizRequired, updating, updated, updateQuiz, editable, errors } = props;

    const [ questionIndex, setQuestionIndex ] = useState( 0 );
    const [ quizEditable, setQuizEditable ] = useState( false );
    const [ errorList, setErrorList ] = useState( [] );

    useEffect( ( ) => {
        if ( editable ) setQuizEditable( true );
    }, [ ] );

    useEffect( ( ) => {
        // Reset the error list when saving changes
        if ( updating ) setErrorList( [ ] );
    }, [ updating ] );

    useEffect( ( ) => {
        console.log( 'Error list', errorList );
    }, [ errorList ] );

    useEffect( ( ) => {
        if ( !quiz || !errors ) return;

        const keys = Object.keys( errors );

        keys.forEach( key => {
            const search_key = key.substr( 4 );
            const parts = search_key.split( '.' );
            const question_index = parts[0].substr( 1 ).substring( 0, parts[0].length - 2 );
            

            if ( parts.length === 2 ) {
                setErrorList( prev_list => [ ...prev_list, { [ question_index ]: { [ parts[ 1 ] ]: errors[ key ] } } ] )
            }

            if ( parts.length === 3 ) {
                const answer_index = parts[1].substr( 7 ).substr( 1 ).substring( 0, parts[1].length - 9 );
                setErrorList( prev_list => [ ...prev_list, { [ question_index ]: { [ 'answer' + answer_index ]: errors[ key ] } } ] )
            }

        } );

    }, [ errors ] );

    const createQuiz = ( ) => {
        
        if ( jobActive === false ) return;
        
        setQuizEditable( true );
        setQuiz( [ default_question ] );
    }

    const beginEditing = ( ) => {

        if ( jobActive === false ) return;

        setQuizEditable( true );
    }

    const handleQuestionChange = ( e, index ) => {
        const { name, value } = e.target;

        const new_quiz = [ ...quiz ];
        new_quiz[ index ][ name ] = value;

        if ( name === 'type' ) {
            for (let i = 0; i < new_quiz[ index ][ 'answers' ].length; i++) {
                new_quiz[ index ][ 'answers' ][ i ].correct = false;
            }
        }
        
        setQuiz( new_quiz );
    }

    const handleAnswerChange = ( e, index, answerIndex ) => {
        const { value } = e.target;

        const new_quiz = [ ...quiz ];
        new_quiz[ index ][ 'answers' ][ answerIndex ].value = value;
        
        setQuiz( new_quiz );
    }

    const addAnswer = ( index ) => {

        const new_quiz = [ ...quiz ];
        new_quiz[ index ][ 'answers' ].push( default_answer )

        setQuiz( new_quiz );
    }

    const removeAnswer = ( index, answerIndex ) => {
        const new_quiz = [ ...quiz ];
        new_quiz[ index ][ 'answers' ].splice( answerIndex, 1 );

        setQuiz( new_quiz );
    }

    const addQuestion = ( ) => {
        const new_quiz = [ ...quiz, default_question ];

        setQuiz( new_quiz );
        setQuestionIndex( new_quiz.length - 1 );
    }

    const removeQuestion = ( index ) => {

        setQuiz( prev_quiz => prev_quiz.filter( ( _, i ) => i !== index ) );
        if ( questionIndex >= 1 ) setQuestionIndex( prevIndex => prevIndex - 1 )
    
    }

    const setRadioSelected = ( index, answerIndex ) => {
        const new_quiz = [ ...quiz ];

        new_quiz[ index ][ 'answers' ].forEach( ( answer, index ) => {
            answer.correct = ( index == answerIndex );
        });

        setQuiz( new_quiz );
    }

    const setCheckboxSelected = ( index, answerIndex ) => {
        const new_quiz = [ ...quiz ];

        new_quiz[ index ][ 'answers' ][ answerIndex ].correct = !new_quiz[ index ][ 'answers' ][ answerIndex ].correct;

        setQuiz( new_quiz );
    }

    return (
        <div id="create-quiz" style={ updating ? { pointerEvents: 'none', opacity: 0.7 } : undefined }>
            {/* Create quiz */}
            <h1 id="title">Upitnik</h1>
            { !quiz.length ? <>
                <h6 id="quiz-description">Prilikom prijave na Vaš oglas moguće je posloprimcima postaviti upitnik. Nakon završetka upitnika imate uvid u rezultat i odgovore posloprimca.<br/>Upitnik Vam olakšava odabir najboljih kandidata.</h6>
                { !loading ?
                    <h3 style={ jobActive === false ? { backgroundColor: '#808080', cursor: 'default' } : undefined } className="big-button" id="create-job-button" onClick={ createQuiz }>Dodaj upitnik</h3>
                    : <Loader id="quiz-loader" type="bubbles" color="#068CDD" height={64} width={64} /> }
            </> : ( quizEditable ? ( ( ) =>  { 
                let error = { }

                errorList.forEach( e => {
                    if ( Object.keys( e )[0] == questionIndex ) error = { ...error, ...e[ questionIndex ] };
                });

                return <>
                    <div className="input-container" id="quiz-required">
                        <label id="select-label">Uptinik je:</label>
                        <select placeholder="Vrsta odgovora" onChange={ ( e ) => setQuizRequired( e.target.value ) } value={ quizRequired } >
                            <option value="0">Obvezan</option>
                            <option value="1">Izboran</option>
                        </select>
                    </div>
                
                    <div key={ questionIndex } className="question">
                    
                    <div className="question-row">
                        <InputContainer label="Pitanje" value={ quiz[ questionIndex ].text } name="text" handleChange={ ( e ) => handleQuestionChange( e, questionIndex ) } />
                        <FontAwesomeIcon onClick={ ( ) => removeQuestion( questionIndex ) } icon={ [ 'fas', 'trash-alt' ] } size="lg" fixedWidth />
                    </div>
                    { error.text && <h5 className="input-error">{ error.text }</h5> }

                    <div className="input-container">
                        <label id="select-label">Vrsta odgovora</label>
                        <select placeholder="Vrsta odgovora" onChange={ ( e ) => handleQuestionChange( e, questionIndex ) } value={ quiz[ questionIndex ].type } name="type" >
                            <option value="0">Jednostruki odabir</option>
                            <option value="1">Višestruki odabir</option>
                            <option value="2">Tekstualni odgovor</option>
                        </select>
                    </div>
                    
                    { quiz[ questionIndex ].type == 0 && <>
                        { quiz[ questionIndex ].answers.map( ( answer, answerIndex ) => {
                            return <>
                            <div key={ answerIndex }  className="question-row">
                                <span onClick={ ( ) => setRadioSelected( questionIndex, answerIndex ) } className={ answer.correct == true ? 'active-radio radio' : 'radio' }></span>
                                <InputContainer label={ "Odgovor " + ( answerIndex + 1 ) } value={ answer.value } handleChange={ ( e ) => handleAnswerChange( e, questionIndex, answerIndex ) } />
                                { ( answerIndex === 2 || answerIndex === 3 ) && <FontAwesomeIcon onClick={ ( ) => removeAnswer( questionIndex, answerIndex ) } icon={ [ 'fas', 'trash-alt' ] } size="lg" fixedWidth /> }
                            </div>
                            { error[ 'answer' + answerIndex ] && <h5 className="input-error">{ error[ 'answer' + answerIndex ] }</h5> }
                            </>
                        } ) }
                        { quiz[ questionIndex ].answers.length != 4 && <h5 className="big-button" onClick={ ( ) => addAnswer( questionIndex ) }>Dodaj odgovor</h5> }
                    </> }
                    { quiz[ questionIndex ].type == 1 && <>
                        { quiz[ questionIndex ].answers.map( ( answer, answerIndex ) => {
                            return <>
                            <div key={ answerIndex }  className="question-row">
                                <span onClick={ ( ) => setCheckboxSelected( questionIndex, answerIndex ) } className={ answer.correct == true ? 'active-checkbox checkbox' : 'checkbox' }></span>
                                <InputContainer label={ "Odgovor " + ( answerIndex + 1 ) } value={ answer.value } handleChange={ ( e ) => handleAnswerChange( e, questionIndex, answerIndex ) } />
                                { ( answerIndex === 2 || answerIndex === 3 ) && <FontAwesomeIcon onClick={ ( ) => removeAnswer( questionIndex, answerIndex ) } icon={ [ 'fas', 'trash-alt' ] } size="lg" fixedWidth /> }
                            </div>
                            { error[ 'answer' + answerIndex ] && <h5 className="input-error">{ error[ 'answer' + answerIndex ] }</h5> }
                            </>
                        } ) }
                        { quiz[ questionIndex ].answers.length != 4 && <h5 className="big-button" onClick={ ( ) => addAnswer( questionIndex ) }>Dodaj odgovor</h5> }
                    </> }
                    { error.answers && <h5 className="input-error">{ error.answers }</h5> }
                    
                    { quiz[ questionIndex ].type != 2 && <InputContainer label="Broj bodova za točan odgovor" value={ quiz[ questionIndex ].points } name="points" handleChange={ ( e ) => handleQuestionChange( e, questionIndex ) } /> }                    
                    { error.points && <h5 className="input-error">{ error.points }</h5> }

                    { quiz[ questionIndex ].type != 2 && <InputContainer id="time-limit" label="Vremensko ograničenje ( u sekundama )" value={ quiz[ questionIndex ].timeLimit } name="timeLimit" handleChange={ ( e ) => handleQuestionChange( e, questionIndex ) } /> }
                    { error.timeLimit && <h5 className="input-error">{ error.timeLimit }</h5> }

                </div>
                <div className="button-row">
                    { questionIndex != 0 ? 
                        <FontAwesomeIcon onClick={ ( ) => setQuestionIndex( ( prevIndex ) => prevIndex - 1 ) } icon={ [ 'fas', 'caret-square-left' ] } color="#068CDD" size="2x" fixedWidth />
                    : <FontAwesomeIcon icon={ [ 'fas', 'caret-square-left' ] } color="#333333" size="2x" fixedWidth /> }
                    <h3 id="question-counter">{ ( questionIndex + 1 ) + '/' + quiz.length }</h3>
                    { questionIndex != ( quiz.length - 1 ) ? <FontAwesomeIcon onClick={ ( ) => setQuestionIndex( ( prevIndex ) => prevIndex + 1 ) } icon={ [ 'fas', 'caret-square-right' ] } color="#068CDD" size="2x" fixedWidth />
                    : <FontAwesomeIcon icon={ [ 'fas', 'caret-square-right' ] } color="#333333" size="2x" fixedWidth /> }
                </div>
                <div className="button-row">
                    { quiz.length < 20 && <h5 className="big-button empty-button" onClick={ ( ) => addQuestion( ) }>Dodaj pitanje</h5> }
                    {/* !editable because if the quiz is editable from the beginning, we are at the create job page */}
                    {/* updated to see if the quiz has been updated */}
                    { !editable && updated && ( !updating ? 
                            <h5 className="big-button" onClick={ updateQuiz }>Spremi promjene</h5>
                            : <Loader id="job-loader" type="bubbles" color="#068CDD" height={64} width={64} /> ) }
                </div>
                </> } )( ) : <>
                    <label id="quiz-required-text">Uptinik je: <b>{ quizRequired ? 'obvezan' : 'izboran' }</b></label>
                
                    <div key={ questionIndex } className="question">
                    
                    <div className="question-row">
                        <InputContainer label="Pitanje" readOnly={ true } value={ quiz[ questionIndex ].text } name="text" handleChange={ ( e ) => handleQuestionChange( e, questionIndex ) } />
                    </div>


                    { quiz[ questionIndex ].type == 0 && <h3 id="question-type">Jednostruki odabir</h3> }
                    { quiz[ questionIndex ].type == 1 && <h3 id="question-type">Višestruki odabir</h3> }
                    { quiz[ questionIndex ].type == 2 && <h3 id="question-type">Tekstualni odgovor</h3> }
                    
                    { quiz[ questionIndex ].type == 0 && <>
                        { quiz[ questionIndex ].answers.map( ( answer, answerIndex ) => {
                            return <div key={ answerIndex } className="question-row">
                                <span className={ answer.correct == true ? 'active-radio radio' : 'radio' }></span>
                                <h3 className="answer-text">{ answer.value }</h3>
                            </div>
                        } ) }
                    </> }
                    { quiz[ questionIndex ].type == 1 && <>
                        { quiz[ questionIndex ].answers.map( ( answer, answerIndex ) => {
                            return <div key={ answerIndex } className="question-row">
                                <span className={ answer.correct == true ? 'active-checkbox checkbox' : 'checkbox' }></span>
                                <h3 className="answer-text">{ answer.value }</h3>
                            </div>
                        } ) }
                    </> }
                    { quiz[ questionIndex ].type != 2 && <h3 id="correct-points-text">Broj bodova za točan odgovor: <b>{ quiz[ questionIndex ].points }</b></h3> }
                    { quiz[ questionIndex ].type != 2 && <h3 id="time-limit-text">Vremensko ograničenje ( u sekundama ): <b>{ quiz[ questionIndex ].timeLimit }</b></h3> }

                </div>
                <div className="button-row">
                    { questionIndex != 0 ? 
                        <FontAwesomeIcon onClick={ ( ) => setQuestionIndex( ( prevIndex ) => prevIndex - 1 ) } icon={ [ 'fas', 'caret-square-left' ] } color="#068CDD" size="2x" fixedWidth />
                    : <FontAwesomeIcon icon={ [ 'fas', 'caret-square-left' ] } color="#333333" size="2x" fixedWidth /> }
                    <h3 id="question-counter">{ ( questionIndex + 1 ) + '/' + quiz.length }</h3>
                    { questionIndex != ( quiz.length - 1 ) ? <FontAwesomeIcon onClick={ ( ) => setQuestionIndex( ( prevIndex ) => prevIndex + 1 ) } icon={ [ 'fas', 'caret-square-right' ] } color="#068CDD" size="2x" fixedWidth />
                    : <FontAwesomeIcon icon={ [ 'fas', 'caret-square-right' ] } color="#333333" size="2x" fixedWidth /> }
                </div>
                <div className="button-row">
                    <h3 className="big-button gray-button" onClick={ ( ) => { setQuiz( [ ] ); setQuizEditable( true ); } }>Ukloni upitnik</h3>
                    <h3 style={ jobActive === false ? { backgroundColor: '#808080', cursor: 'default' } : undefined } className="big-button" onClick={ beginEditing }>Uredi upitnik</h3>
                </div>
            </> ) }
        </div>
    )

}

export default QuizContainer