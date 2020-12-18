import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {store} from "react-notifications-component";
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface UserFormState {
    id: number,

    email: string,
    firstName: string,
    lastName: string,
    roleId: number,
    country: string,
    about: string,
    PIN: string,
    confirmed?: boolean,

    roles: Array<any>,

    isLoaded: boolean
}

export default class UserForm extends Component<any, UserFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            id: props.location.state?.id,
            email: '',
            firstName: '',
            lastName: '',
            roleId: 0,
            country: '',
            about: '',
            PIN: '',
            confirmed: undefined,
            roles: [],
            isLoaded: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`users/user?id=${this.state.id}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    email: response.data.email,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    roleId: response.data.roleId,
                    country: response.data.country,
                    about: response.data.about,
                    PIN: response.data.pin,
                    confirmed: response.data.confirmed === true,
                    isLoaded: true
                });
                axios.get('roles').then(response => {
                    if (response.status === 200) {
                        this.setState({
                            roles: response.data,
                            isLoaded: true
                        });
                    }
                });
            }
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        axios.put('users/user/update', {
            id: this.state.id,
            email: this.state.email,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            roleId: this.state.roleId,
            country: this.state.country,
            about: this.state.about,
            pin: this.state.PIN,
            confirmed: this.state.confirmed
        }).then(response => {
            if (response.status === 200) {
                store.addNotification({
                    message: "Изменения сохранены",
                    type: "success",
                    container: "top-right",
                    dismiss: { duration: 2000, onScreen: true }
                });
                this.props.history.push({
                    pathname: '/users'
                })
            }
        });
    }

    render() {
        const {email, firstName, lastName, roleId, country, PIN, about, confirmed, roles} = this.state;
        return (
            <div className="col-10 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded ? <Preloader className='event-loader' /> : <div/>}
                    <div className="card-header">Пользователь</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit} autoComplete='false'>
                            <div className="row mb-2">
                                <label className="offset-md-2 col-md-3 col-form-label text-left">Email</label>
                                <label className="col-md-3 col-form-label text-left">Фамилия</label>
                                <label className="col-md-2 col-form-label text-left">Имя</label>

                                <div className="offset-md-2 col-md-3 mt-1">
                                    <input type="text"
                                           autoComplete="false"
                                           value={email}
                                           onChange={event => this.setState({email: event.target.value})}
                                           className="form-control"/>
                                </div>
                                <div className="col-md-3 mt-1">
                                    <input type="text"
                                           autoComplete="false"
                                           value={lastName}
                                           onChange={event => this.setState({lastName: event.target.value})}
                                           className="form-control"/>
                                </div>
                                <div className="col-md-2 mt-1">
                                    <input type="text"
                                           autoComplete="false"
                                           value={firstName}
                                           onChange={event => this.setState({firstName: event.target.value})}
                                           className="form-control"/>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <label className="offset-md-2 col-md-2 col-form-label text-left">Роль</label>
                                <label className="col-md-3 col-form-label text-left">Страна</label>
                                <label className="col-md-3 col-form-label text-left">PIN</label>

                                <div className="offset-md-2 col-md-2 mt-1">
                                    <FormControl variant="outlined" className="w-100">
                                        <Select labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={roleId}
                                                onChange={event => this.setState({roleId: parseInt(event.target.value as string)})}
                                                className="pt-1 text-left padding-bottom-1px">
                                            {roles.length !== 0 && roles.map((role, index) => {
                                                return (<MenuItem key={index} value={role.id}>{role.name}</MenuItem>)
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-md-3 mt-1">
                                    <input type="text"
                                           autoComplete="false"
                                           value={country}
                                           onChange={event => this.setState({country: event.target.value})}
                                           className="form-control"/>
                                </div>
                                <div className="col-md-3 mt-1">
                                    <input type="text"
                                           autoComplete="false"
                                           value={PIN}
                                           onChange={event => this.setState({PIN: event.target.value})}
                                           className="form-control"/>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <label className="offset-md-2 col-md-8 col-form-label text-left">Про пользователя</label>

                                <div className="offset-md-2 col-md-8 mt-1">
                                    <textarea
                                        value={about || ''}
                                        onChange={event => this.setState({about: event.target.value})}
                                        className="form-control"/>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <div className="offset-md-2 col-md-4 mt-1 d-flex align-items-center">
                                    <input type="checkbox"
                                           autoComplete="false"
                                           checked={confirmed}
                                           onChange={() => this.setState({confirmed: !confirmed})}/>
                                    <label className="col-form-label text-left py-0 pl-1"
                                           onClick={() => this.setState({confirmed: !confirmed})}>
                                        Подтвержденный пользователь
                                    </label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-7 offset-md-3 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">
                                        Сохранить
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    };
}