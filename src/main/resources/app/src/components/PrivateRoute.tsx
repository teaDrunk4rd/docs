import {Redirect, Route, RouteProps} from 'react-router-dom';
import React from 'react';


interface PrivateRouteProps extends RouteProps {
    component: any,
    path: any,
    roles?: any
}


const PrivateRoute = (props: PrivateRouteProps) => {  // TODO: send request to back
    const { component: Component, path, roles, ...rest } = props;
    return (
        <Route path={path}
               {...rest}
               render={
                   (props) => localStorage["user"] &&
                   (roles === undefined || roles.split(',').includes(JSON.parse(localStorage["user"])["role"]))
                       ? <Component {...props} />
                       : <Redirect to='/login'/>
               }
        />
    );
};

export default PrivateRoute;