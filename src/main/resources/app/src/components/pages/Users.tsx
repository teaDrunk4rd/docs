import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {store} from "react-notifications-component";

interface UsersState {
    users: Array<any>,
    isLoaded: boolean
}

export default class Users extends Component<any, UsersState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get('users').then(response => {
            if (response.status === 200) {
                this.setState({
                    users: response.data,
                    isLoaded: true
                })
            }
        });
    }

    delete(id: number) {
        axios.delete(`users/user/delete?id=${id}`).then(response => {
            if (response.status === 200) {
                store.addNotification({
                    message: "Пользователь удален",
                    type: "warning",
                    container: "top-right",
                    dismiss: { duration: 2000, onScreen: true }
                });

                this.state.users.splice(this.state.users.indexOf(this.state.users.find(function (u) {
                    return u.id === id;
                })), 1);
                this.forceUpdate();
            }
        })
    }

    render() {
        return (
            <div className="col-md-7 m-auto">
                {!this.state.isLoaded ? <Preloader/> : <div/>}
                <div className="d-flex justify-content-start mb-3">
                    <div className="h3 font-weight-bold">
                        Пользователи
                    </div>
                </div>
                <table className="table table-hover bg-white">
                    <thead className="table-dark">
                    <tr>
                        <th>Email</th>
                        <th>Имя</th>
                        <th>Роль</th>
                        <th>Страна</th>
                        <th>Подтверждён</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.length !== 0 && this.state.users.map((user, index) => {
                        return (
                            <tr className="cursor-pointer"
                                key={index}
                                onClick={() => this.props.history.push({
                                    pathname: "/users/user",
                                    search: `?id=${user.id}`,
                                    state: { id: user.id }
                                })}>
                                <td>{user.email}</td>
                                <td>{user.fullName}</td>
                                <td>{user.role}</td>
                                <td>{user.country}</td>
                                <td>{user.confirmed ? '✓' : '✘'}</td>
                                <td>
                                    {
                                        JSON.parse(localStorage["user"])["id"] !== user.id ? (
                                            <div className="trash-icon shadow-sm ml-4"
                                                 onClick={(e) => {
                                                     e.stopPropagation();
                                                     this.delete(user.id);
                                                 }}/>
                                        ) : <div/>
                                    }
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    };
}