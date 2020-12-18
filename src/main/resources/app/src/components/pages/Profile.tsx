import React, {Component} from 'react';
import {store} from 'react-notifications-component';
import Preloader from "../Preloader";
import axios from 'axios';
import Cookies from "js-cookie";


interface ProfileState {
    email: string,
    firstName: string,
    lastName: string,
    country: string,
    about: string,
    changePasswordFlag: boolean,
    oldPassword: string,
    newPassword: string,
    passwordConfirmation: string,
    isLoaded: boolean
}

export default class Profile extends Component<any, ProfileState> {
    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            country: '',
            about: '',
            changePasswordFlag: false,
            oldPassword: '',
            newPassword: '',
            passwordConfirmation: '',
            isLoaded: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        axios.get('profiles').then(response => {
            if (response.status === 200) {
                this.setState({
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    country: response.data.country,
                    about: response.data.about,
                    isLoaded: true
                })
            }
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        axios.put('profiles/update', {
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            country: this.state.country,
            about: this.state.about,
            changePasswordFlag: this.state.changePasswordFlag,
            oldPassword: this.state.oldPassword,
            password: this.state.newPassword,
            passwordConfirmation: this.state.passwordConfirmation
        }).then(response => {
            if (response.status === 200) {
                localStorage['user'] = JSON.stringify({
                    role: JSON.parse(localStorage['user']).role,
                    name: response.data.name
                });

                store.addNotification({
                    message: "Профиль успешно изменен",
                    type: "success",
                    container: "top-right",
                    dismiss: { duration: 2000, onScreen: true }
                });

                Cookies.set('token', `Bearer ${response.data.accessToken}`)

                if (this.state.passwordConfirmation)
                    this.setState({
                        changePasswordFlag: false,
                        oldPassword: '',
                        newPassword: '',
                        passwordConfirmation: ''
                    })
            }
        });
    }

    logout(event: any) {
        event.preventDefault();
        localStorage.clear();
        Cookies.remove('token')
        this.props.history.push('/login');
    }

    render() {
        const {email, firstName, lastName, country, about, changePasswordFlag, oldPassword, newPassword, passwordConfirmation} =
            this.state;
        return (
            <div className="col-6 m-auto">
                <div className="card">
                    {!this.state.isLoaded ? <Preloader/> : <div/>}
                    <div className="card-header">Профиль</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit} autoComplete='false'>
                            <div className="form-group d-flex justify-content-end col-10 pr-2">
                                <a href='#' onClick={this.logout}>
                                    Выйти
                                </a>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">E-Mail</label>
                                <div className="col-md-6">
                                    <input type="email"
                                           autoComplete="false"
                                           value={email}
                                           onChange={event => this.setState({email: event.target.value})}
                                           className="form-control"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">
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
                                <label className="col-md-4 col-form-label text-md-right">
                                    Имя
                                </label>
                                <div className="col-md-6">
                                    <input type="text"
                                           autoComplete="false"
                                           value={firstName}
                                           onChange={event => this.setState({firstName: event.target.value})}
                                           className="form-control"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">
                                    Страна
                                </label>
                                <div className="col-md-6">
                                    <input type="text"
                                           autoComplete="false"
                                           value={country}
                                           onChange={event => this.setState({country: event.target.value})}
                                           className="form-control"/>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-md-4 col-form-label text-md-right">
                                    Про себя
                                </label>
                                <div className="col-md-6">
                                    <textarea
                                        value={about || ''}
                                        onChange={event => this.setState({about: event.target.value})}
                                        className="form-control"/>
                                </div>
                            </div>

                            {
                                changePasswordFlag ? (
                                    <div>
                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Старый
                                                пароль</label>
                                            <div className="col-md-6">
                                                <input type="password"
                                                       autoComplete="new-password"
                                                       value={oldPassword}
                                                       onChange={event => this.setState({oldPassword: event.target.value})}
                                                       className="form-control"/>
                                            </div>
                                        </div>

                                        < div className="form-group row">
                                            < label className="col-md-4 col-form-label text-md-right">Новый
                                                пароль</label>
                                            <div className="col-md-6">
                                                <input type="password"
                                                       autoComplete="new-password"
                                                       value={newPassword}
                                                       onChange={event => this.setState({newPassword: event.target.value})}
                                                       className="form-control"/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-md-4 col-form-label text-md-right">Подтверждение
                                                пароля</label>
                                            <div className="col-md-6">
                                                <input type="password"
                                                       autoComplete="new-password"
                                                       value={passwordConfirmation}
                                                       onChange={event => this.setState({passwordConfirmation: event.target.value})}
                                                       className="form-control"/>
                                            </div>
                                        </div>
                                    </div>
                                ) : (

                                    <div className="form-group row">
                                        <div className="col-md-6 offset-md-4">
                                            <a href='#'
                                               onClick={() => this.setState({changePasswordFlag: !changePasswordFlag})}>
                                                Сменить пароль
                                            </a>
                                        </div>
                                    </div>
                                )
                            }

                            <div className="form-group row mb-0">
                                <div className="col-md-8 offset-md-4">
                                    <button type="submit" className="btn btn-primary">
                                        Изменить
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