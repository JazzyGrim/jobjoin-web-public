import React, { useState } from 'react'
import { sendMessage } from '../../../../js/socket'

const ChatFooter = ( props ) => {

    const [ message, setMessage ] = useState( '' )

    const handleKeyPress = ( e ) => {
        if ( e.key === 'Enter' ) handleSubmit( );
    }

    const handleSubmit = ( ) => {

        // If we remove whitespaces and there is no message, don't send it
        if ( !message.replace( /\s/g, '' ).length ) return;

        sendMessage( message, props.userID )
        setMessage( '' )
        props.setSentMessages( props.sentMessages + 1 )
    }

    return (
        <div id="chat-footer">
            <input type="text" value={ message } name="message" onChange={ ( e ) => setMessage( e.target.value ) } placeholder="Unesite poruku..." onKeyPress={ handleKeyPress } />
            <h3 onClick={ handleSubmit }>Pošalji</h3>
        </div>
    )

}

export default ChatFooter