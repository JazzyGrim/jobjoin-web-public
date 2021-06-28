import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { logout, purgeState } from '../../actions/auth';
import { resetMessages } from '../../actions/error';
import { getCredits } from '../../actions/recruiter';
import { closeSocket } from '../../js/socket';
import './Nav.css';

const mapStateToProps = ( state ) => {
    return {
        credits: state.user.credits,
        token: state.user.token,
        errorMessage: state.error[ Object.keys( state.error )[0] ] || { },
        successMessage: state.success[ Object.keys( state.success )[0] ]
    }
}

const mapDispatchToProps = {
    getCredits,
    purgeState,
    logout,
    resetMessages
}

const Nav = ( props ) => {

    const [ menuOpen, setMenuOpen ] = useState( false );

    useEffect( ( ) => {
        if ( !props.credits ) props.getCredits( props.token );
    }, [ ] );

    useEffect( ( ) => {
        document.body.style.overflowY = menuOpen ? "hidden" : "scroll"
        return ( ) => {
            document.body.style.overflowY = "scroll";
        }
    }, [ menuOpen ] );

    const handleLogout = ( ) => {
        closeSocket( );
        props.purgeState( );
        props.logout( );
    }

    return (
        <>
            <nav id="recruiter-nav">
                <img alt="" src="/img/logo.png" />
                <ul id="main-list">
                    <li><Link to="/jobs" id={ props.activePage === "0" ? "active" : null }>Moji poslovi</Link></li>
                    <li><Link to="/candidates" id={ props.activePage === "1" ? "active" : null }>Kandidati</Link></li>
                    <li><Link to="/chat" id={ props.activePage === "2" ? "active" : null }>Poruke</Link></li>
                </ul>
                <ul>
                    <div id="token-container" onClick={ ( ) => props.history.push( '/credits' ) }>
                        <h3>{ props.credits ? props.credits : '0' }</h3>
                        <img alt="" className="token" src="/img/token.png" />
                    </div>
                    <li><Link to="/profile" id={ props.activePage === "3" ? "active" : null }>Profil</Link></li>
                    <li><Link to="" onClick={ handleLogout }>Odjava</Link></li>
                </ul>
                <div id="mobile-hamburger" className={ menuOpen ? "open" : "" } onClick={ ( ) => setMenuOpen( prevState => !prevState ) }>
                    <div id="box-1"></div>
                    <div id="box-2"></div>
                    <div id="box-3"></div>
                    <div id="box-4"></div>
                </div>
                <div id="mobile-menu" className={ menuOpen ? "mobile-menu-open" : "" }>
                    <ul id="main-list">
                        <li><Link to="/jobs" id={ props.activePage === "0" ? "active-mobile" : null }>Moji poslovi</Link></li>
                        <li><Link to="/candidates" id={ props.activePage === "1" ? "active-mobile" : null }>Kandidati</Link></li>
                        <li><Link to="/chat" id={ props.activePage === "2" ? "active-mobile" : null }>Poruke</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/profile" id={ props.activePage === "3" ? "active-mobile" : null }>Profil</Link></li>
                        <div id="token-row">
                            <li><Link to="" onClick={ handleLogout }>Odjava</Link></li>
                            <div id="token-container" onClick={ ( ) => props.history.push( '/credits' ) }>
                                <h3>{ props.credits ? props.credits : '0' }</h3>
                                <img alt="" className="token" src="/img/token.png" />
                            </div>
                        </div>
                    </ul>
                </div>
            </nav>
            { ( props.successMessage ) ? <div className="top-message top-success">
                                            <h1>{ props.successMessage }</h1>
                                            <div className="top-close" onClick={ props.resetMessages }></div>
                                        </div> : "" }
            { ( props.errorMessage.text ) ? <div className="top-message">
                                            <h1>{ props.errorMessage.text }</h1>
                                            <div className="top-close" onClick={ props.resetMessages }></div>
                                        </div> : "" }
        </>
    )

}

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Nav ) )