import React, {Component} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {Link} from "react-router-dom";

interface LoginState {
    email: string,
    password: string
}

export default class Login extends Component<any, LoginState> {
    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: any) {
        event.preventDefault();

        axios.post('login', {
            email: this.state.email,
            password: this.state.password
        }).then((response: any) => {
            if (+response.status === 200) {
                localStorage['user'] = JSON.stringify({
                    role: response.data.roles[0],
                    name: response.data.name,
                    id: response.data.id
                });
                Cookies.set('token', `Bearer ${response.data.accessToken}`)
                this.props.history.push('/');
            }
        });
    }

    render() {
        const {email, password} = this.state;
        return (
            <div className="col-6 m-auto">
                <div className="card">
                    <div className="card-header">Вход</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-end">E-Mail</label>
                                <div className="col-md-6">
                                    <input id="email" type="text" name="email"
                                           value={email}
                                           onChange={event => this.setState({email: event.target.value})}
                                           autoComplete="email"
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-end">Пароль</label>
                                <div className="col-md-6">
                                    <input id="password" type="password" name="password"
                                           value={password}
                                           onChange={event => this.setState({password: event.target.value})}
                                           autoComplete="current-password"
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="form-group d-flex justify-content-end col-10 pr-2">
                                <Link to="/signup">
                                    Регистрация
                                </Link>
                            </div>

                            <div className="form-group row mb-0">
                                <div className="col-md-6 offset-md-4 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">
                                        Вход
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
