import React from 'react';
import Nav from './Nav';

const withNav = ( Component, activePage ) => {

    return ( props ) => (
        <>
            <Nav activePage={ activePage } />
            <Component {...props} />
        </>
    )
}

export default withNav