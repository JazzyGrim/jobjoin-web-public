import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroller'
import Loader from 'react-loading'
import { connect } from 'react-redux'
import { animated, useTransition } from 'react-spring'
import { getJobList, resetJobPage } from '../../../actions/job'
import { createLoadingSelector } from '../../../actions/selector'
import { getDateDifferenceInWords } from '../../../js/DateDifference'
import { getJobImageUrl } from '../../../js/imageManager'
import withNav from '../withNav'
import './Jobs.css'

const loadingSelector = createLoadingSelector( [ 'GET_JOB_LIST' ] );

const mapStateToProps = ( state ) => {
    return {
        jobList: state.job.jobList,
        page: state.job.page,
        hasMore: state.job.hasMore,
        token: state.user.token,
        loading: loadingSelector( state )
    }
}

const mapDispatchToProps = {
    getJobList,
    resetJobPage
}

const Jobs = React.memo( ( props ) => {

    const [ jobType, setJobType ] = useState( 0 );

    const jobList = useTransition( props.jobList, {
        from: { opacity: '0', transform: 'translateY( 10% )' },
        enter: { opacity: '1', transform: 'translateY( 0 )' },
        leave: { opacity: '0', transform: 'translateY( 10% )' }
    } );

    useEffect( ( ) => {
        props.getJobList( props.token )
        return ( ) => {
            props.resetJobPage( );
        }
    }, [ ] );

    const getActiveJobs = ( ) => {
        if ( jobType === 1 ) {
            setJobType( 0 );
            props.resetJobPage( );
            props.getJobList( props.token )

        }
    }

    const getInactiveJobs = ( ) => {
        if ( jobType === 0 ) {
            setJobType( 1 );
            props.resetJobPage( );
            props.getJobList( props.token, true )

        }
    }

    const loadMoreJobs = ( ) => {
        props.getJobList( props.token, ( jobType === 0 ) ? false : true, props.page );
    }

    return (
        <section id="jobs-section">
            <div id="titlebar">
                <div id="status-slider">
                    <div id="slider" style={ jobType ? { left: '50%', borderBottomLeftRadius: '0', borderTopLeftRadius: '0', borderBottomRightRadius: '5px', borderTopRightRadius: '5px' } : { left: 0 } }></div>
                    <div id="side" onClick={ getActiveJobs }>
                        <h3 id={ !jobType ? "active" : "" }>Aktivni oglasi</h3>
                    </div>
                    <div id="side" onClick={ getInactiveJobs } >
                        <h3 id={ jobType ? "active" : "" }>Neaktivni oglasi</h3>
                    </div>
                </div>
                <h3 id="create-job" onClick={ ( ) => props.history.push( '/job/new' ) }>Novi oglas</h3>
            </div>
            <InfiniteScroll
                pageStart={0}
                loadMore={ loadMoreJobs }
                hasMore={ props.hasMore }
                initialLoad={ false }
                id="job-list"
            >
                { jobList( ( values, item ) => {
                    return (
                            <animated.div key={ item.id } style={ values } className="job" onClick={ ( ) => props.history.push( '/job/' + item.id ) }>
                                <div className="job-image" style={ { backgroundImage: 'url(' + getJobImageUrl( item.imagePath ) +')' } }>
                                    <div className="job-image-info">
                                        <h3 className="job-application-count">{item.applicationCount} Prijava</h3>
                                        <h3 className="job-salary">{ item.salaryType ? parseFloat( item.salary ).toLocaleString( 'en' ) + ' HRK' : parseFloat( item.salary ).toLocaleString( 'en' ) + ' HRK / sat' }</h3>
                                    </div>
                                </div>
                                <div className="job-content">
                                    <h3 className="job-title">{item.title}</h3>
                                    <div className="job-icon left-icon">
                                        <FontAwesomeIcon icon={ [ 'fas', 'map-marker-alt' ] } color="#969694" size="lg" fixedWidth />
                                        <h3>{item.city}</h3>
                                    </div>
                                    <p>{item.description}</p>
                                    <h5 className="job-post-date">Objavljeno {getDateDifferenceInWords( new Date( item.created ) )}</h5>
                                </div>
                            </animated.div>
                    )
                } ) }
            </InfiniteScroll>
            { props.loading && <Loader id="job-loader" type="bubbles" color="#068CDD" height={64} width={64} /> }
        </section>
    )
} );

export default connect( mapStateToProps, mapDispatchToProps )( withNav( Jobs, '0' ) )