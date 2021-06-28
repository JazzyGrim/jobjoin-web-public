import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Loader from 'react-loading'
import { connect } from 'react-redux'
import { useTransition } from 'react-spring'
import { createLoadingSelector } from '../../../actions/selector'
import { getCandidates, resetCandidatesPage } from '../../../actions/user'
import jobTypes from '../../../js/jobTypes'
import User from '../Jobs/UserCard'
import withNav from '../withNav'
import './Candidates.css'

const loadingSelector = createLoadingSelector( [ 'GET_CANDIDATES' ] );

const mapStateToProps = ( state ) => {
    return {
        candidates: state.user.candidates,
        hasMoreCandidates: state.user.hasMoreCandidates,
        token: state.user.token,
        page: state.user.page,
        loading: loadingSelector( state )
    }
}

const mapDispatchToProps = {
    resetCandidatesPage,
    getCandidates
}

const Candidates = ( props ) => {

    const [ jobType, setJobType ] = useState( "hzp9Ns0xhuB" );
    const [ jobLocation, setJobLocation ] = useState( "" );

    const candidates = useTransition( props.candidates, {
        from: { opacity: '0', transform: 'translateY( 10% )' },
        enter: { opacity: '1', transform: 'translateY( 0 )' },
        leave: { opacity: '0', transform: 'translateY( 10% )' }
    } );

    useEffect( ( ) => {
        return ( ) => {
            props.resetCandidatesPage( );
        }
    }, [ ] );

    const handleSubmit = ( ) => {
        props.resetCandidatesPage( );
        props.getCandidates( jobLocation, jobType, props.token )
    }

    const loadCandidates = ( ) => {
        props.getCandidates( jobLocation, jobType, props.token, props.page )
    }

    return (
        <section id="candidates-section">
            <div id="candidates-nav-container">
                <div className="input-container">
                    <FontAwesomeIcon color="#111111" icon={ [ 'fas', 'clipboard-list' ] } size="lg" fixedWidth />
                    <select placeholder="Vrsta posla" onChange={ e => setJobType( e.target.value ) } value={ jobType } name="jobType" >
                        { Object.keys( jobTypes ).map( key => {
                            return <option value={ key }>{ jobTypes[ key ] }</option>
                        } ) }
                    </select>
                </div>
                <div className="input-container">
                <FontAwesomeIcon color="#111111" icon={ [ 'fas', 'search-location' ] } size="lg" fixedWidth />
                    <input type="text" placeholder="Grad posloprimca" onChange={ e => setJobLocation( e.target.value ) } value={ jobLocation } name="jobLocation" />
                </div>
                <h3 id="search-button" onClick={ handleSubmit }>Traži kandidate</h3>
            </div>
            <InfiniteScroll
                pageStart={0}
                loadMore={ loadCandidates }
                hasMore={ props.hasMoreCandidates }
                initialLoad={ false }
                id="candidates-container"
            >
                { candidates( ( values, item ) => {
                    return (
                        <User key={ item.id } transition={ values } {...item} userID={ item.id } />
                    )
                } ) }
            </InfiniteScroll>
            { props.loading && <Loader id="user-loader" type="bubbles" color="#068CDD" height={64} width={64} /> }
        </section>
    )
}

export default connect( mapStateToProps, mapDispatchToProps )( withNav( Candidates, '1' ) )