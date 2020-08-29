import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'
import ReactLoading from 'react-loading';

import { AuthContext } from '../context/AuthContext'
//import Navigation from '../components/Navigation'

function PrivateRoute({ component: Component, ...otherProps }) {

    const { isAuthenticated, isLoading } = useContext(AuthContext)

    return (
        <>
                <Route
                    {...otherProps}
                    render={props => (
                        !isLoading
                            ?
                            (
                                isAuthenticated
                                    ?
                                    <Component {...props} />
                                    :
                                    <Redirect to={'/login'} />
                            )
                            :
                            <ReactLoading type={'spinningBubbles'} color={'black'} height={667} width={375}/>
                    )}
                />
        </>
    )
}
export default PrivateRoute;