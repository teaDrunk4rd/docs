import {Component} from 'react';
import * as React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Router} from "./Router";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <ReactNotification/>
                <Route component={Router}/>
            </BrowserRouter>
        );
    }
}