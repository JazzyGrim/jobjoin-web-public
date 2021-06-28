import React from 'react';
import Loader from 'react-loading'
import './LoadingScreen.css';

const LoadingScreen = ( ) => {

  return (
    <div id="loading-screen">
        <Loader type="bubbles" color="#068CDD" height={64} width={64} />
    </div>
  );
}

export default LoadingScreen;