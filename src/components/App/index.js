import React, { useEffect } from 'react';

import './errors.css';
import './inputError.css';
import './app.css';

import { connect } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { logout, purgeState } from '../../actions/auth';
import { resetMessages } from '../../actions/error';
import { setSocketReady } from '../../actions/socket';
import { connectWithToken, onConnection } from '../../js/socket';
import Footer from '../Footer';
import Landing from '../Landing/Landing';
import AppDownload from '../Landing/AppDownload';
import Contact from '../Landing/Contact';
import ForgotPassword from '../Landing/ForgotPassword';
import Login from '../Landing/Login';
import SignUp from '../Landing/Signup';
import Candidates from '../Tabs/Candidates/Candidates';
import Applications from '../Tabs/Jobs/Applications';
import CreateJob from '../Tabs/Jobs/CreateJob';
import Job from '../Tabs/Jobs/Job';
import Jobs from '../Tabs/Jobs/Jobs';
import UserProfile from '../Tabs/Jobs/UserProfile';
import ChatHistory from '../Tabs/Messages/ChatHistory';
import ChatOpen from '../Tabs/Messages/ChatOpen';
import Credits from '../Tabs/Profile/Credits';
import EditProfile from '../Tabs/Profile/EditProfile';
import NotFound from '../NotFound';
import Profile from '../Tabs/Profile/ProfileScreen';
import PurchaseSuccess from '../Tabs/Profile/PurchaseSuccess';
import ReportBug from '../Tabs/Profile/ReportBug';
import ReportUser from '../Tabs/Profile/ReportUser';
import ProtectedRoute from '../utils/ProtectedRoute';
import ScrollToTop from '../utils/ScrollToTop';

const mapStateToProps = ( state ) => {
  return {
      token: state.user.token,
      tokenValid: state.user.tokenValid
  }
}

const mapDispatchToProps = {
  logout,
  purgeState,
  setSocketReady,
  resetMessages
}

const App = ( props ) => {

  let location = useLocation( );

  useEffect( ( ) => {

    if ( props.token ) connectWithToken( props.token );
    
    onConnection( ( ) => {
      props.setSocketReady( );
    } );

  }, [ ] );

  useEffect( ( ) => {
    props.resetMessages( );
  }, [ location.pathname ] );

  useEffect( ( ) => {
    if ( props.tokenValid === false ) {
        props.resetMessages( );
        props.purgeState( );
        props.logout( );
    }
  }, [ props.tokenValid ] );

  return (
      <ScrollToTop>
        <div id="App">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/login/reset" component={ForgotPassword} />
            <Route exact path="/login/user" component={AppDownload} />
            <Route exact path="/register" component={SignUp} />
            <ProtectedRoute exact path="/jobs" component={Jobs} />
            <ProtectedRoute exact path="/job/new" component={CreateJob} />
            <ProtectedRoute exact path="/job/:id" component={Job} />
            <ProtectedRoute exact path="/job/:id/applications" component={Applications} />
            <ProtectedRoute exact path="/user/:id" component={UserProfile} />
            <ProtectedRoute exact path="/user/:id/report" component={ReportUser} />
            <ProtectedRoute exact path="/candidates" component={Candidates} />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <ProtectedRoute exact path="/profile/edit" component={EditProfile} />
            <ProtectedRoute exact path="/profile/bug" component={ReportBug} />
            <ProtectedRoute exact path="/chat" component={ChatHistory} />
            <ProtectedRoute exact path="/chat/:id" component={ChatOpen} />
            <ProtectedRoute exact path="/credits" component={Credits} />
            <ProtectedRoute exact path="/credits/success" component={PurchaseSuccess} />
            <Route path='*' exact={ true } component={ NotFound } />
          </Switch>
          <Footer />
        </div>
      </ScrollToTop>
  );
}

export default connect( mapStateToProps, mapDispatchToProps )( App );