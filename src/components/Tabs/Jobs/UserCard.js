import React from 'react'
import { withRouter } from "react-router-dom"
import { getAge } from '../../../js/DateDifference'
import { getImageUrl } from '../../../js/imageManager'
import './UserCard.css'
import { animated } from 'react-spring'

const User = ( { id, appID, userID, imagePath, firstName, lastName, birthday, city, experience, quizScore, jobTypeID, history, transition } ) => {

    let totalExperience = 0, experienceInField = 0

    for (let i = 0; i < experience.length; i++) {
        if ( experience[ i ].typeID === jobTypeID ) {
            experienceInField += experience[ i ].amount
        }
        
        totalExperience += experience[ i ].amount
    }

    return (
        <animated.div style={ transition } className="user" key={ id } onClick={ ( ) => history.push( appID ? '/user/' + userID + '?appID=' + appID : '/user/' + userID ) }>
            <div className="user-image-container" style={ { backgroundImage: 'url(' + getImageUrl( imagePath ) +')' } }>
                { birthday != null && <h3>{ getAge( new Date( birthday ) ) } Godina</h3> }
            </div>
            <div className="user-content">
                <h1 className="user-name">{ firstName + " " + lastName }</h1>
                <h3 className="user-location">{ city }</h3>
                <div className="user-row">
                    <h3>{ calculateTime( experienceInField ) }</h3>
                    <h4>u traženom zanimanju</h4>
                </div>
                <h5 className="user-total-experience">{ calculateTime( totalExperience ) } Radnog Iskustva</h5>
            </div>
            { quizScore && <div className="quiz-score-container">
                <h2>Upitnik riješen</h2>
                <h3>{ quizScore + '%' }</h3>
            </div> }
        </animated.div>
    )

}

const calculateTime = ( m ) => {
    const years = Math.floor( m / 12 );
    const months = m % 12;
    if ( months > 0 ) return `> ${ years } Godina`;
    if ( years == 0 ) return `${ months } Mjeseci`;

    return `${ years } Godina`; 
}

export default withRouter( User )