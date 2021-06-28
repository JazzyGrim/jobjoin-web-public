import React, { useEffect, useState } from 'react';
import withNav from '../withNav';
import './PurchaseSuccess.css';

const PurchaseSuccess = ( props ) => {

    const [ id, setID ] = useState( "" );

    useEffect( ( ) => {
        if ( !props.location.state || !props.location.state.orderID ) {
            props.history.push( '/jobs' );
            return;
        }

        setID( props.location.state.orderID );
    }, [ ] );

    return (
        <section id="purchase-success-section">
            <div id="purchase-success">
                <h1 id="header">Uspjeh!</h1>
                <h3>Hvala Vam na vašoj kupovini!<br />Iznos tokena promijeniti će se odmah ili unutar nekoliko minuta.</h3>
                <h3>Broj narudžbe:<br />{ id }</h3>
            </div>
        </section>
    )
}

export default withNav( PurchaseSuccess )