import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, purgeState } from '../../actions/auth';
import { resetMessages } from '../../actions/error';
import Nav from './Nav';
import './AppDownload.css';

const mapDispatchToProps = { resetMessages, purgeState, logout }

const AppDownload = ( props ) => {

    useEffect( ( ) => {
        props.resetMessages( );
        props.purgeState( );
        props.logout( );
    }, [ ] );

    return (
        <div id="app-download-screen">
            <Nav />
            <div id="landing-auth-box">
                <div id="slider" style={{ backgroundImage: `url(/img/Slider.png)` }}>
                    <h1>Pozdrav!</h1>
                    <h3>Vec imate racun?<br />Prijavite se da nastavite u JOBJOIN</h3>
                    <Link to="/login" id="slider-button">Prijava</Link>
                </div>
                <div id="content">
                    <h1>Preuzmite JOBJOIN aplikaciju za prijavu</h1>
                    <h3>JOBJOIN za trazitelje posla je dostupan na Google Play i App Store aplikacijama</h3>
                    <img alt="Google Play" id="google-play" src="/img/googleplay.png" />
                    <img alt="Play Store" id="app-store" src="/img/appstore.png" />
                </div>
            </div>
        </div>
    )
}

export default connect( null, mapDispatchToProps )( AppDownload )