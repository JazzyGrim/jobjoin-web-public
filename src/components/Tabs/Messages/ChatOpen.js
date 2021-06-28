import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Loader from 'react-loading'
import { connect } from "react-redux"
import { resetChatUnlocked, unlockChat } from '../../../actions/chat'
import { removeCredit } from '../../../actions/recruiter'
import { getUserNoDetails, resetUser } from '../../../actions/user'
import { getImageUrl } from '../../../js/imageManager'
import { disableGetChat, disableGetMessage, getChat, getMessage, onGetChat } from '../../../js/socket'
import withNav from '../withNav'
import ChatFooter from './ChatFooter'
import './ChatOpen.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const mapStateToProps = ( state ) => {
    return {
        user: state.user.user,
        socketReady: state.user.socketReady,
        chatUnlocked: state.chat.chatUnlocked,
        id: state.user.id,
        token: state.user.token
    }
}

const mapDispatchToProps = {
    getUserNoDetails,
    resetUser,
    removeCredit,
    unlockChat,
    resetChatUnlocked
}

const ChatOpen = ( props ) => {  

    const [ chat, setChat ] = useState( { } );
    const [ chatPage, setChatPage ] = useState( 0 );
    const [ chatForbidden, setChatForbidden ] = useState( false );
    const [ menuOpen, setMenuOpen ] = useState( 0 );
    const [ sentMessages, setSentMessages ] = useState( 0 );
    
    const [ hasMore, setHasMore ] = useState( true );

    useEffect( ( ) => {

        props.getUserNoDetails( props.match.params.id, props.token )

        return ( ) => {
            props.resetUser( )
        }
    }, [ ] );

    useEffect( ( ) => {
        if ( !props.socketReady ) return; // If the socket isn't ready yet
        getChat( props.match.params.id, sentMessages, chatPage )
    }, [ props.socketReady ] );

    const handleGetMessage = ( message ) => { // Create a subscription based on the current chat
        if ( message.error != null ) { // If we get an access error from the server
            setChatForbidden( true ); // It means the chat is locked
            return // Return to prevent further actions
        }

        let newChat = { ...chat } // Get the old chat

        newChat.chat.unshift( message ) // Append the new message

        setChat( newChat ) // Set the new chat value
    }

    useEffect( ( ) => {
        if ( !props.socketReady ) return; // If the socket isn't ready yet
        getMessage( handleGetMessage );

        return ( ) => {
            disableGetMessage( handleGetMessage )
        }
    }, [ chat, props.socketReady ] );

    const handleGetChat = ( newChat ) => {
        setChatPage( chatPage + 1 ); // Update the chat page to load
        
        if ( chat.chat == null ) { // If this is the first call
            setChat( newChat ); // Set the chat
            return; // Return to prevent further actions
        }

        let oldChat = { ...chat } // Get the old chat
        oldChat.chat = [ ...oldChat.chat, ...newChat.chat ]; // Add the new chat to the old chat

        setHasMore( ( newChat.chat.length != 0 && newChat.chat.length % 15 == 0 ) )
        setChat( oldChat ); // Change the chat
    }

    useEffect( ( ) => {
        if ( !props.socketReady ) return; // If the socket isn't ready yet
        onGetChat( handleGetChat );

        return ( ) => {
            disableGetChat( handleGetChat )
        }
    }, [ chat, chatPage, props.socketReady ] );

    useEffect( ( ) => { // When chat is unlocked
        if ( props.chatUnlocked ) {
            setChatForbidden( false ); // Unlock the chat page
            getChat( props.match.params.id, 0, 0 ); // Get the first chat page
            // props.resetChatUnlocked( ); // Reset the chat unlocked flag
            props.removeCredit( 1 ); // Remove one credit from the user
        }
    }, [ props.chatUnlocked ] );

    const loadMore = ( ) => getChat( props.match.params.id, sentMessages, chatPage );

    const handleNameClick = ( ) => {
        props.resetUser( );
        props.history.push( '/user/' + props.match.params.id );
    }

    const handleUnlock = ( ) => {
        props.unlockChat( props.match.params.id, props.token );
    }

    return (
        <section id="chat-section">
            <div id="chat-box">
                <div id="chat-open">
                    <div id="chat-titlebar">
                        <span id="back-button" onClick={ ( ) => props.history.push( '/chat' ) }></span>
                        <h1 onClick={ handleNameClick }>{ props.user ? props.user.firstName + " " + props.user.lastName : "" }</h1>
                        <div id="chat-hamburger">
                            <FontAwesomeIcon onClick={ ( ) => setMenuOpen( prevMenu => !prevMenu ) } icon={ [ 'fas', 'ellipsis-v' ] } color="#111111" size="lg" fixedWidth />
                            { menuOpen ? <div id="menu">
                                <h3 onClick={ handleNameClick }>Prikaži profil</h3>
                                <h3 onClick={ ( ) => props.history.push( '/user/' + props.match.params.id + '/report' ) }>Prijavi korisnika</h3>
                            </div> : "" }
                        </div>
                    </div>
                    <div id="chat-content">
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={ loadMore }
                            hasMore={ hasMore }
                            initialLoad={ false }
                            isReverse={ true }
                            useWindow={ false }
                            id="chat-scroll-container"
                        >
                            { ( chat.chat && props.user ) ? chat.chat.map( ( message, index ) => {
                                
                                const time = message.MessageTime ? new Date( message.MessageTime ) : new Date( )
                                // For security reasons, I will not be checking for duplicates of this key,
                                // so if some one sends this exact message it will show up as 'Pocetak razgovora'
                                if ( message.MessageText === 'CF385DEAF06072B2B7E465B88696006BAE21A1868C59F0CF576F3EE526038167' ) {
                                    return (
                                        <h6 key="convo-start" id="convo-start">Početak razgovora</h6>
                                    )
                                }
                                if ( message.MessageReceiverID === props.id || message.receiverID === props.id ) {
                                    return ( <div className="message" key={ index }>
                                        <div onClick={ handleNameClick } className="message-image" style={ { backgroundImage: 'url(' + getImageUrl( props.user.imagePath ) + ' )' } }></div>
                                        <h3>{ message.message || message.MessageText }</h3>
                                        <h5>{ time.toTimeString( ).substr( 0, 5 ) }</h5>
                                    </div> )
                                } else {
                                    return ( <div className="message sent-message" key={ index }>
                                        <h5>{ time.toTimeString( ).substr( 0, 5 ) }</h5>
                                        <h3>{ message.message || message.MessageText }</h3>
                                    </div> )
                                }
                            } ) : !chatForbidden && <Loader id="loader" type="bubbles" color="#068CDD" height={64} width={64} /> }
                            { chatForbidden ? <div id="unlock-container">
                                <h1>Razgovor zaključan</h1>
                                <h3>Iskoristite 1 token za otkljucavanje razgovora s korisnikom</h3>
                                <div id="unlock-chat" onClick={ handleUnlock }>
                                    <div id="token-container">
                                        <h3>1</h3>
                                        <img alt="" className="token" src="/img/token.png" />
                                    </div>
                                    <h3 id="unlock-chat-text">Otkljucaj razgovor</h3>
                                </div>
                            </div> : "" }
                        </InfiniteScroll>
                    </div>
                    <ChatFooter userID={ props.match.params.id } sentMessages={ sentMessages } setSentMessages={ setSentMessages } /> { /* To prevent this component from re-rendering after state updates from typing in the input box */ }
                </div>
            </div>
        </section>
    )
    
}

export default connect( mapStateToProps, mapDispatchToProps )( withNav( ChatOpen, '2' ) )