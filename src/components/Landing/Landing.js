import React from 'react'
import Nav from './Nav'
import { Link } from 'react-router-dom';
import './LandingAuthBox.css'
import './Landing.css'

const Landing = ( ) => {
    return (
        <>
            <div id="landing-main">
                <Nav />
                <main>
                    <div id="content">
                        <h1>Nova era<br />zapošljavanja</h1>
                        <h3>Pronaći posao trebalo bi biti lako<br />Sada i je, uz JOBJOIN.</h3>
                        <h4>Posloprimci</h4>
                        <img alt="Google Play" id="google-play" src="/img/googleplay.png" />
                        <img alt="App Store" id="app-store" src="/img/appstore.png" />
                        <h4>Poslodavci</h4>
                        <Link to="/login" id="main-button-box" >Online prijava</Link>
                    </div>
                    <img alt="JOBJOIN Landing Page" id="landing-image" src="/img/landing-main.png" />
                </main>
            </div>
            <div id="landing-user">
                <div id="image-container">
                    <img alt="JOBJOIN User Decoration" src="/img/landing-user.png" />
                </div>
                <div id="content">
                    <h4>JOBJOIN za posloprimce</h4>
                    <h2>Bogat mogućnostima</h2>
                    <h3>Sortirajte poslove prema vrsti, plaći, udaljenosti od kuće, radnom vremenu i mnogo više</h3>

                    <h2>Komunikacija unutar aplikacije</h2>
                    <h3>Komunicirajte s poslodavcem direktno unutar aplikacije s našim chat sučeljem</h3>

                    <h2>Jednostavna prijava</h2>
                    <h3>Prijavite se jednim klikom!<br />Ako je poslodavac zainteresiran za Vas, kontaktirati će vas kroz aplikaciju</h3>
                </div>
            </div>
            <div id="landing-recruiter">
                <div id="content">
                    <h4>JOBJOIN za poslodavce</h4>
                    <h2>Jednostavna selekcija</h2>
                    <h3>Istražite profil svakoga tko se prijavi za Vašu radnu poziciju te ga na temelju toga kontaktirajte, svrstajte u uži izbor, ili odbijte</h3>

                    <h2>Brza komunikacija</h2>
                    <h3>Brzo i efikasno zaključite odgovara li kandidat vašim potrebama koristeći naše chat sučelje, bez bespotrebnog trošenja vremena</h3>

                    <h2>Napredna filtracija</h2>
                    <h3>Postavite upitnik pri procesu prijave na Vaš oglas te prema tome odaberite pravog kandidata</h3>

                    <h2>Dostupno svugdje</h2>
                    <h3>Kao Poslodavac imate pristup JOBJOINu na svim uređajima, osiguravajući Vam lagan pristup u svakoj situaciji</h3>
                </div>
                <div id="image-container">
                    <img alt="JOBJOIN Recruiter Decoration" src="/img/landing-recruiter.png" />
                </div>
            </div>
        </>
    )
}

export default Landing