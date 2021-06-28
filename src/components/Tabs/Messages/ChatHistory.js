import React, { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Loader from 'react-loading'
import { connect } from 'react-redux'
import { getChatHistory, resetChatHistory, updateChatHistory } from '../../../actions/chat'
import { createLoadingSelector } from '../../../actions/selector'
import { getImageUrl } from '../../../js/imageManager'
import { disableGetMessage, getMessage } from '../../../js/socket'
import withNav from '../withNav'
import './ChatHistory.css'

const loadingSelector = createLoadingSelector( [ 'GET_CHAT_HISTORY' ] );

const mapStateToProps = ( state ) => {
    return {
        chatHistory: state.chat.chatHistory,
        historyPage: state.chat.historyPage,
        hasMore: state.chat.hasMore,
        id: state.user.id,
        token: state.user.token,
        socketReady: state.user.socketReady,
        loading: loadingSelector( state )
    }
}

const mapDispatchToProps = {
    getChatHistory,
    updateChatHistory,
    resetChatHistory
}

const ChatHistory = ( props ) => {

    const handleGetMessage = ( message ) => {
        
        if ( message.error != null ) return // If we got an access error
        
        let userID;
        ( message.receiverID == props.id ) ? userID = message.senderID : userID = message.receiverID;
        // Are we receiving this message?    If so, the recruiter ID is the sender, otherwise we sent the message, and the receiver is the recruiter

        props.updateChatHistory( message, userID );
    }

    useEffect( ( ) => {
        props.getChatHistory( props.historyPage, props.token )
        return ( ) => props.resetChatHistory( );
    }, [ ] );

    useEffect( ( ) => {
        if ( !props.socketReady ) return; // If the socket isn't ready yet
        getMessage( handleGetMessage );
        return ( ) => disableGetMessage( handleGetMessage );
    }, [ props.socketReady ] );

    const openChat = ( userID ) => {
        props.history.push( '/chat/' + userID )
    }

    const loadHistory = ( ) => props.getChatHistory( props.historyPage, props.token )

    return (
        <section id="chat-section">
            { props.chatHistory ? 
                <div id="chat-box">
                    <div id="chat-history">
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={ loadHistory }
                            hasMore={ props.hasMore }
                            initialLoad={ false }
                            useWindow={ false }
                            id="history-container"
                        >
                            { !props.loading ? <>
                                { props.chatHistory.map( ( chat, index ) => {
                                    const time = new Date( chat.messageTime )

                                    return (
                                        <div className="history-item" key={ chat.messageID } onClick={ ( ) => openChat( chat.userID ) } >
                                            <div className="history-image" style={ { backgroundImage: 'url(' + getImageUrl( chat.userImagePath ) + ')' } } >
                                            </div>
                                            <div className="history-content">
                                                <div className="history-row">
                                                    <h1>{ chat.userFirstName } { chat.userLastName }</h1>
                                                    <h5>{ time.toTimeString( ).substr( 0, 5 ) }</h5>
                                                </div>
                                                <h3>{ chat.messageText === 'CF385DEAF06072B2B7E465B88696006BAE21A1868C59F0CF576F3EE526038167' ? '' : chat.messageText }</h3>
                                            </div>
                                        </div>
                                    )
                                } ) }
                                <h6>Kraj povijesti razgovora</h6>
                            </> : <Loader id="loader" type="bubbles" color="#068CDD" height={64} width={64} /> }
                        </InfiniteScroll>
                    </div>
                </div>
                : <Loader id="loader" type="bubbles" color="#068CDD" height={64} width={64} /> }
        </section>
    )
    
}

export default connect( mapStateToProps, mapDispatchToProps )( withNav( ChatHistory, '2' ) )