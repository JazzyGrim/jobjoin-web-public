import React, { useState } from 'react';
import withNav from '../withNav';
import './Credits.css';
import Form from './Form';

const Credits = ( props ) => {

    const [ product, setProduct ] = useState( -1 );
    const [ modalVisible, setModalVisible ] = useState( false );

    const changeProduct = ( value ) => {
        setProduct( value );
        setModalVisible( true );
    }

    const closeModal = ( ) => {
        setModalVisible( false );
        setProduct( -1 );
    }

    return (
        <section id="credits-section">
            <div id="credits">
                <div id="product-select">
                    <h1 id="title">Nadoplati račun s tokenima!</h1>
                    <h3 id="subtitle">Iskoristi svoje tokene za<br />otključavanje razgovora s korisnicima!</h3>
                    <div className="option" id={ product === 0 ? "active" : "" } onClick={ ( ) => changeProduct( 0 ) }>
                        <h3>5 Tokena</h3>
                        <h4>20 HRK</h4>
                    </div>
                    <div className="option" id={ product === 1 ? "active" : "" } onClick={ ( ) => changeProduct( 1 ) }>
                        <h3>20 Tokena</h3>
                        <h4>60 HRK</h4>
                    </div>
                    <div className="option" id={ product === 2 ? "active" : "" } onClick={ ( ) => changeProduct( 2 ) }>
                        <h3>30 Tokena</h3>
                        <h4>80 HRK</h4>
                    </div>
                </div>
                <Form visible={ modalVisible } closeModal={ closeModal } product={ product } />
            </div>
        </section>
    )
}

export default withNav( Credits )