import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetMessages } from '../../actions/error';
import './Nav.css';

const mapStateToProps = ( state ) => {
    return {
        errorMessage: state.error[ Object.keys( state.error )[0] ] || { },
        successMessage: state.success[ Object.keys( state.success )[0] ],
    }
}

const mapDispatchToProps = {
    resetMessages
}


const Nav = ( props ) => {

    return ( <>
                <nav id="landing-nav">
                    <Link to="/"><img alt="" src="/img/logo.png"/></Link>
                    <div>
                        <Link to="/">Naslovna</Link>
                        <Link to="/contact">Kontakt</Link>
                        <Link to="/login" id="button-box" >Prijava</Link>
                    </div>
                    <Link to="/login" id="mobile-button">Prijava</Link>
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

export default connect( mapStateToProps, mapDispatchToProps )( Nav )