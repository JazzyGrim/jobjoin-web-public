import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const mapStateToProps = ( state ) => {
    return {
        token: state.user.token
    }
}

const ProtectedRoute = ( { component: Component, ...rest } ) => {
    return ( <Route {...rest} render={ ( props ) => {
        return ( rest.token ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login',
            state: { from: props.location }
        }} /> )
    } } /> )
}

const ProtectedRouteComponent = connect( mapStateToProps, null )( ProtectedRoute )

export default ProtectedRouteComponent