import React from 'react'
import Nav from './Nav'
import './Contact.css'

const Landing = ( ) => {
    return (
        <>
            <div id="landing-contact">
                <Nav />
                <main>
                    <div id="content">
                        <h1>Kontakt</h1>
                        <h3>Za upite i pomoć kontaktirajte<br />nas na <span>support@jobjoin.hr</span></h3>
                    </div>
                    <img alt="JOBJOIN Contact Page" id="contact-image" src="/img/landing-main.png" />
                </main>
            </div>
        </>
    )
}

export default Landing