import {Redirect, Route, RouteProps} from 'react-router-dom';
import React from 'react';


interface PrivateRouteProps extends RouteProps {
    component: any;
    path: any;
}


const PrivateRoute = (props: PrivateRouteProps) => {  // TODO: send request to back
    const { component: Component, path, ...rest } = props;
    return (
        <Route path={path}
            {...rest}
            render={(props) => localStorage["user"] ? (<Component {...props} />) : (<Redirect to='/login'/>)}
        />
    );
};

export default PrivateRoute;