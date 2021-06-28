import React from 'react'
import Loader from 'react-loading'

const ErrorHandler = ( props ) => {

    return (
        ( props.errorMessage.text ) ? <div id="page-error">
                                    <h3>{ props.errorMessage.status }</h3>
                                    <h4>{ props.errorMessage.text }</h4>
                                </div> : <Loader type="bubbles" color="#068CDD" height={64} width={64} />
    )

}

export default ErrorHandler