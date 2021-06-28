import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import Loader from 'react-loading';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { purchase, resetOrderNumber } from '../../../actions/recruiter';
import { createErrorMessageSelector, createLoadingSelector } from '../../../actions/selector';
import InputContainer from '../utils/InputContainer/fullBorder';
import Select from '../utils/InputContainer/fullBorderSelect';
import './Form.css';
import { useHistory } from 'react-router-dom';

const errorSelector = createErrorMessageSelector( [ 'PURCHASE' ] );
const loadingSelector = createLoadingSelector( [ 'PURCHASE' ] );

const mapStateToProps = ( state ) => {
    return {
        token: state.user.token,
        errorMessage: errorSelector( state ),
        loading: loadingSelector( state ),
        orderID: state.user.orderID
    }
}

const mapDispatchToProps = {
    purchase,
    resetOrderNumber
}

const Form = ( props ) => {
    
    const history = useHistory( );

    const [ step, setStep ] = useState( 0 );

    const [ name, setName ] = useState( 'Mateo Sindicic' );
    const [ address, setAddress ] = useState( 'Tim Ujevic 5' );
    const [ city, setCity ] = useState( 'Rijeka' );
    const [ state, setState ] = useState( 'Primorsko-Goranska Županija' );
    const [ zip, setZip ] = useState( '51000' );
    const [ country, setCountry ] = useState( 'HR' );
    const [ email, setEmail ] = useState( 'mateo.sindicic@gmail.com' );
    const [ phone, setPhone ] = useState( '091 373 4442' );
    
    const [ card, setCard ] = useState( '4111 1111 1111 1111' );
    const [ cvv, setCvv ] = useState( '123' );
    const [ expMonth, setExpMonth ] = useState( '03' );
    const [ expYear, setExpYear ] = useState( '2022' );
    const [ focused, setFocused ] = useState( '' );

    const [ formError, setFormError ] = useState( '' );
    
    const [ loading, setLoading ] = useState( false );

    const success = ( data ) => {
        const { token } = data.response.token;
        
        props.purchase( token, name, address, city, state, zip, country, email, phone, props.product, props.token );
        setLoading( false );
    }

    const error = ( data ) => {
        setLoading( false );
        console.error( data.errorCode );

        if ( data.errorCode == 300 ) {
            setFormError( 'Došlo je do pogreške s naše strane. Vaša kartica nije terećena.' );
        } else if ( data.errorCode == 400 ) {
            setFormError( 'Molimo ispunite sva polja.' );
            setStep( 0 );
        } else if ( data.errorCode == 401 ) {
            setFormError( 'Molimo ispunite sva polja.' );
            setStep( 1 );
        } else if ( data.errorCode == 200 ) {
            setFormError( 'Server je preopterećen, molimo pokušajte ponovno ubrzo. Vaša kartica nije terećena.' );
        } else if ( data.errorCode == 500 ) {
            setFormError( 'Došlo je do poteškoća prilikom kupovine. Vaša kartica nije terećena.' );
        }
    }

    const onSubmit = ( e ) => {

        e.preventDefault( );
        setFormError( '' );
        setLoading( true );

        const args = {
            sellerId: '901419159',
            publishableKey: '878E2EBA-513A-4307-BEB8-F1E89D52DD30',
            ccNo: card,
            cvv: cvv,
            expMonth: expMonth,
            expYear: expYear
        };

        window.TCO.loadPubKey( 'sandbox', ( ) => {

            window.TCO.requestToken( success, error, args );

        } );
    
    }

    const onAddressSubmit = ( e ) => {
        e.preventDefault( );
        setStep( 1 );
    }
    
    const onCardSubmit = ( e ) => {
        e.preventDefault( );
        setStep( 2 );
    }

    const onClose = ( ) => {
        props.closeModal( );
        setStep( 0 );
    }

    useEffect( ( ) => {
        if ( props.errorMessage ) onClose( );
    }, [ props.errorMessage ] );

    useEffect( ( ) => {
        if ( props.orderID ) {
            history.push( '/credits/success', { orderID: props.orderID } );
            props.resetOrderNumber( );
        }
    }, [ props.orderID ] );

    return (
        <Modal
            isOpen={ props.visible }
            onRequestClose={ onClose }
            contentLabel="Potvrdite izradu oglasa"
            className="purchase-modal"
            overlayClassName={ {
                base: 'purchase-modal-overlay',
                afterOpen: 'purchase-modal-overlay-after-open',
                beforeClose: 'purchase-modal-overlay-before-close'
            } }
        >
            <div id="modal-wrapper">
                <div id="close-bar">
                    <FontAwesomeIcon color="#111111" icon={ [ 'fas', 'times' ] } size="lg" fixedWidth onClick={ props.closeModal } />
                </div>
                <div id="step-bar">
                    <div id={ step == 0 ? "active-step" : "" } onClick={ ( ) => setStep( 0 ) }><span>1</span><h3>Adresa</h3></div>
                    <div id={ step == 1 ? "active-step" : "" } onClick={ ( ) => setStep( 1 ) }><span>2</span><h3>Kartica</h3></div>
                    <div id={ step == 2 ? "active-step" : "" } onClick={ ( ) => setStep( 2 ) }><span>3</span><h3>Potvrda</h3></div>
                </div>
                { step == 0 && <div id="payment-form">
                    { formError && <p id="form-error">{ formError }</p> }
                    <form onSubmit={ onAddressSubmit } id="address-form">
                        <input name="token" type="hidden" value="" />
                        <InputContainer id="name-input" placeholder="John Doe" label="Ime i prezime" value={ name } handleChange={ ( e ) => setName( e.target.value ) } />
                        <InputContainer id="name-input" placeholder="Ulica 123" label="Adresa" value={ address } handleChange={ ( e ) => setAddress( e.target.value ) } />
                        <InputContainer id="name-input" placeholder="Rijeka" label="Grad" value={ city } handleChange={ ( e ) => setCity( e.target.value ) } />
                        <div className="full-input-container">
                            <label>Županija</label>
                            <RegionDropdown
                                country={ country }
                                countryValueType="short"
                                value={ state }
                                onChange={ ( value ) => setState( value ) }
                                defaultOptionLabel="Odaberite županiju" />
                        </div>
                        <div id="row">
                            <InputContainer id="name-input" placeholder="51000" label="Poštanski broj" value={ zip } handleChange={ ( e ) => setZip( e.target.value ) } />
                            <div className="full-input-container">
                                <label>Država</label>
                                <CountryDropdown
                                    value={ country }
                                    valueType="short"
                                    onChange={ ( value ) => setCountry( value ) }
                                    defaultOptionLabel="Odaberite državu" />
                            </div>
                        </div>
                        <InputContainer id="name-input" placeholder="john.doe@gmail.com" label="E-mail" value={ email } handleChange={ ( e ) => setEmail( e.target.value ) } />
                        <InputContainer id="name-input" placeholder="+385 00 000 0000" label="Broj telefona" value={ phone } handleChange={ ( e ) => setPhone( e.target.value ) } />
                        <input type="submit" value="Nastavi" />
                    </form>
                </div> }
                { step == 1 && <div id="payment-form">
                    { formError && <p id="form-error">{ formError }</p> }
                    <Cards
                    cvc={cvv}
                    expiry={expMonth + expYear}
                    focused={focused}
                    name={name}
                    number={card}
                    locale={ { valid: "Vrijedi do" } }
                    />
                    <form onSubmit={ onCardSubmit } id="card-form">
                        <input name="token" type="hidden" value="" />
                        <InputContainer id="name-input" placeholder="0000 0000 0000 0000" label="Broj kartice" value={ card } onFocus={ ( ) => setFocused( 'number' ) } handleChange={ ( e ) => setCard( e.target.value ) } />
                        <div id="row">
                            <Select options={ months } placeholder="0" label="Mjesec isteka" value={ expMonth } onFocus={ ( ) => setFocused( 'expiry' ) } handleChange={ ( e ) => setExpMonth( e.target.value ) } />
                            <span>/</span>
                            <Select options={ years } placeholder="0000" label="Godina isteka" value={ expYear } onFocus={ ( ) => setFocused( 'expiry' ) } handleChange={ ( e ) => setExpYear( e.target.value ) } />
                        </div>
                        <InputContainer id="name-input" placeholder="123" label="CVV" value={ cvv } onFocus={ ( ) => setFocused( 'cvc' ) } handleChange={ ( e ) => setCvv( e.target.value ) } />
                        <input type="submit" value="Nastavi" />
                    </form>
                </div> }
                { step == 2 && <div id="confirm-form">
                    { formError && <p id="form-error">{ formError }</p> }
                    <h1>Potvrdite kupovinu</h1>
                    <h2>Molimo da pregledate i potvrdite Vašu kupovinu</h2>
                    { props.product == 0 && <div id="product">
                        <h3>5 Tokena</h3>
                        <h3>20 HRK</h3>
                    </div> }
                    { props.product == 1 && <div id="product">
                        <h3>20 Tokena</h3>
                        <h3>60 HRK</h3>
                    </div> }
                    { props.product == 2 && <div id="product">
                        <h3>30 Tokena</h3>
                        <h3>80 HRK</h3>
                    </div> }
                    { ( !props.loading && !loading ) ? <input type="submit" onClick={ onSubmit } value="Potvrdi kupovinu" /> : <Loader type="bubbles" color="#068CDD" height={64} width={64} /> }
                </div> }
            </div>
        </Modal>
    )
}

export default connect( mapStateToProps, mapDispatchToProps )( Form );

const currentYear = new Date( ).getFullYear( );
let years = [ ];
for (let i = 0; i < 15; i++) {
    const element = currentYear + i;
    years.push( { value: element, text: element } );
}

const months = [
    {
        value: '01',
        text: '1'
    },
    {
        value: '02',
        text: '2'
    },
    {
        value: '03',
        text: '3'
    },
    {
        value: '04',
        text: '4'
    },
    {
        value: '05',
        text: '5'
    },
    {
        value: '06',
        text: '6'
    },
    {
        value: '07',
        text: '7'
    },
    {
        value: '08',
        text: '8'
    },
    {
        value: '09',
        text: '9'
    },
    {
        value: '10',
        text: '10'
    },
    {
        value: '11',
        text: '11'
    },
    {
        value: '12',
        text: '12'
    }
]