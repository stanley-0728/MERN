import React from 'react'
import {Redirect,Route} from 'react-router-dom'
const ProtectedRoute=({ component: Component, ...rest }) =>{
    return (
        <Route {...rest} render={props => {
            if (!localStorage.getItem('isAuthenicated')) {
                return <Redirect to='/login' />
            }
            return( 
            <div>
            <Component {...props} />
            </div>
            )
        }} />
    );
}
export default ProtectedRoute;
