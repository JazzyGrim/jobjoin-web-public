import React from 'react'
import withNav from './Tabs/withNav'
import './NotFound.css'

const NotFound = ( ) => {
    return (
        <section id="notfound-section">
            <div id="page-error">
                <h3>404</h3>
                <h4>Stranica nije pronađena.</h4>
            </div>
        </section>
    )
}

export default withNav( NotFound )