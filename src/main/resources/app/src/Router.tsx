import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import NavMenu from "./components/NavMenu";
import Login from "./components/pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./components/pages/Profile";
import SignUp from "./components/pages/SignUp";
import Events from "./components/pages/Events";
import EventForm from "./components/pages/EventForm";
import Event from "./components/pages/Event";
import Users from "./components/pages/Users";
import UserForm from "./components/pages/UserForm";
import Docs from "./components/pages/Docs";
import DocForm from "./components/pages/DocForm";
import Doc from "./components/pages/Doc";


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
                        <PrivateRoute exact path="/eventForm" component={EventForm} roles="ROLE_ADMIN"/>
                        <PrivateRoute exact path="/event" component={Event}/>

                        <PrivateRoute exact path="/users" component={Users} roles="ROLE_ADMIN"/>
                        <PrivateRoute exact path="/users/user" component={UserForm} roles="ROLE_ADMIN"/>

                        <PrivateRoute exact path="/docs" component={Docs}/>
                        <PrivateRoute exact path="/docs/docForm" component={DocForm} roles="ROLE_ADMIN"/>
                        <PrivateRoute exact path="/docs/doc" component={Doc}/>
                    </Switch>
                </div>
            </div>
        );
    }
}