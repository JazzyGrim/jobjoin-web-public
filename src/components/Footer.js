import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import './Footer.css'

const Footer = ( ) => {
    return (
        <footer>
            <ul>
                <li><a href="/">Naslovna</a></li>
                <li><a href="/contact">Kontakt</a></li>
                <li><a href="/about">O Nama</a></li>
            </ul>
            <ul>
                <li><a href="/login">Prijava</a></li>
                <li><a href="/register">Registracija</a></li>
            </ul>
            <div id="social-media">
                <a href="http://www.facebook.com"><FontAwesomeIcon icon={ [ 'fab', 'facebook-f' ] } size="lg" fixedWidth /></a>
                <a href="http://www.instagram.com"><FontAwesomeIcon icon={ [ 'fab', 'instagram' ] } size="lg" fixedWidth /></a>
                <a href="http://www.twitter.com"><FontAwesomeIcon icon={ [ 'fab', 'twitter' ] } size="lg" fixedWidth /></a>
            </div>
            <p>Copyright © 2020 JobJoin</p>
        </footer>
    )
}

export default Footer