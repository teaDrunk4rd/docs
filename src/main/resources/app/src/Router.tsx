import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Login from "./components/pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/pages/Profile";
import SignUp from "./components/pages/SignUp";
import Events from "./components/pages/Events";
import EventForm from "./components/pages/EventForm/EventForm";


export class Router extends Component {
    render() {
        return (
            <div>
                <NavMenu/>
                <div className='row mx-5'>
                    {this.props.children}
                    <Switch>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/signup" component={SignUp}/>
                        <PrivateRoute exact path="/profile" component={Profile}/>
                        <PrivateRoute exact path="/" component={Events}/>
                        <PrivateRoute exact path="/event" component={EventForm}/>
                    </Switch>
                </div>
            </div>
        );
    }
}