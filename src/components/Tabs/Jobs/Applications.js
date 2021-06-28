import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Loader from 'react-loading'
import { connect } from 'react-redux'
import { useTransition } from 'react-spring'
import { getApplications, getApplicationTypeCount, getJob, resetAppPage } from '../../../actions/job'
import { createLoadingSelector } from '../../../actions/selector'
import withNav from '../withNav'
import './Applications.css'
import User from './UserCard'

const loadingSelector = createLoadingSelector( [ 'GET_APPLICATIONS' ] );

const mapStateToProps = ( state ) => {
    return {
        applications: state.job.applications,
        applicationPage: state.job.applicationPage,
        hasMoreApps: state.job.hasMoreApps,
        applicationCounts: state.job.applicationCounts,
        job: state.job.job,
        token: state.user.token,
        loading: loadingSelector( state )
    }
}

const mapDispatchToProps = {
    getJob,
    getApplications,
    getApplicationTypeCount,
    resetAppPage
}

const Applications = ( props ) => {

    const [ status, setStatus ] = useState( 0 );

    const applications = useTransition( props.applications, {
        from: { opacity: '0', transform: 'translateY( 10% )' },
        enter: { opacity: '1', transform: 'translateY( 0 )' },
        leave: { opacity: '0', transform: 'translateY( 10% )' }
    } );

    useEffect( ( ) => {
        if ( props.job === null ) props.getJob( props.match.params.id, props.token ); // If the job hasn't been loaded yet, load it
        props.getApplicationTypeCount( props.match.params.id, props.token ); // Get total application for each type
        props.getApplications( status, false, props.match.params.id, 0, props.token ); // Get all the applications
    }, [ ] );

    useEffect( ( ) => {
        props.resetAppPage( );
        let expired = ( status === 3 ) ? true : false;

        props.getApplications( status.toString( ), expired, props.match.params.id, 0, props.token );
    }, [ status ] );

    const loadApps = ( ) => {
        let expired = ( status === 3 ) ? true : false;

        props.getApplications( status.toString( ), expired, props.match.params.id, props.applicationPage, props.token );
    }

    return (
        <section id="applications-section">
            <div id="sidebar">
                <h1 id="sidebar-title">{ props.job ? props.job.title : 'Ucitavanje...' }</h1>
                <div className="sidebar-icon">
                    <FontAwesomeIcon icon={ [ 'fas', 'map-marker-alt' ] } color="#969694" size="lg" fixedWidth />
                    <h3>{ props.job ? props.job.city : 'Ucitavanje...' }</h3>
                </div>
                <div id="sidebar-menu">
                    <div className={ status === 0 ? "sidebar-menu-item active" : "sidebar-menu-item" } id="active-applications" onClick={ ( ) => setStatus( 0 ) }>
                        <h3>Aktivne prijave</h3>
                        <h4>{ props.applicationCounts.pending || 0 }</h4>
                    </div>
                    <div className={ status === 1 ? "sidebar-menu-item active" : "sidebar-menu-item" } id="shortlisted-applications" onClick={ ( ) => setStatus( 1 ) }>
                        <h3>Uži odabir</h3>
                        <h4>{ props.applicationCounts.shortlisted || 0 }</h4>
                    </div>
                    <div className={ status === 2 ? "sidebar-menu-item active" : "sidebar-menu-item" } id="denied-applications" onClick={ ( ) => setStatus( 2 ) }>
                        <h3>Odbijene prijave</h3>
                        <h4>{ props.applicationCounts.denied || 0 }</h4>
                    </div>
                    <div className={ status === 3 ? "sidebar-menu-item active" : "sidebar-menu-item" } id="expired-applications" onClick={ ( ) => setStatus( 3 ) }>
                        <h3>Istekle prijave</h3>
                        <h4>{ props.applicationCounts.expired || 0 }</h4>
                    </div>
                </div>
            </div>
            <InfiniteScroll
                pageStart={0}
                loadMore={ loadApps }
                hasMore={ props.hasMoreApps }
                initialLoad={ false }
                id="user-container"
            >
                { applications( ( values, item ) => {
                    return (
                        <User key={ item.id } transition={ values } className="applications-transition" { ...item } appID={ item.id } jobTypeID={ props.job ? props.job.typeID : '' } />
                    )
                } ) }
                { props.loading && <Loader id="user-loader" type="bubbles" color="#068CDD" height={64} width={64} /> }
            </InfiniteScroll>
        </section>
    )
}

export default connect( mapStateToProps, mapDispatchToProps )( withNav( Applications, '0' ) )