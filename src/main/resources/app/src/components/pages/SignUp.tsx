import React, {Component} from 'react';
import axios from 'axios';
import Cookies from "js-cookie";


interface RegistrationState {
    email: string,
    firstName: string,
    lastName: string,
    country: string,
    password: string,
    passwordConfirmation: string
}

export default class SignUp extends Component<any, RegistrationState> {
    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            country: '',
            password: '',
            passwordConfirmation: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event: any) {
        event.preventDefault();

        axios.post('signup', {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            country: this.state.country,
            password: this.state.password,
            passwordConfirmation: this.state.passwordConfirmation
        }).then(response => {
            if (response.status === 200) {
                localStorage['user'] = JSON.stringify({
                    role: response.data.roles[0],
                    name: response.data.name,
                    id: response.data.id
                });

                Cookies.set('token', `Bearer ${response.data.accessToken}`);

                this.props.history.push("/");
            }
        });
    }

    render() {
        const {email, firstName, lastName, country, password, passwordConfirmation} = this.state;
        return (
            <div className="col-6 m-auto">
                <div className="card">
                    <div className="card-header">Регистрация</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit} autoComplete='false'>
                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-end">E-Mail</label>
                                <div className="col-md-6">
                                    <input type="text"
                                           autoComplete="false"
                                           value={email}
                                           onChange={event => this.setState({email: event.target.value})}
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-end">
                                    Фамилия
                                </label>
                                <div className="col-md-6">
                                    <input type="text"
                                           autoComplete="false"
                                           value={lastName}
                                           onChange={event => this.setState({lastName: event.target.value})}
                                           className="form-control"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-end">
                                    Имя
                                </label>
                                <div className="col-md-6">
                                    <input type="text"
                                           autoComplete="false"
                                           value={firstName}
                                           onChange={event => this.setState({firstName: event.target.value})}
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-end">
                                    Страна
                                </label>
                                <div className="col-md-6">
                                    <input type="text"
                                           autoComplete="false"
                                           value={country}
                                           onChange={event => this.setState({country: event.target.value})}
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-end">Пароль</label>
                                <div className="col-md-6">
                                    <input type="password"
                                           autoComplete="new-password"
                                           value={password}
                                           onChange={event => this.setState({password: event.target.value})}
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-end">
                                    Подтверждение пароля
                                </label>
                                <div className="col-md-6">
                                    <input type="password"
                                           autoComplete="new-password"
                                           value={passwordConfirmation}
                                           onChange={event => this.setState({passwordConfirmation: event.target.value})}
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="form-group row mb-0">
                                <div className="col-md-6 offset-md-4 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">
                                        Регистрация
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