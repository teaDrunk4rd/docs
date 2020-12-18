import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";

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

    render() {
        return (
            <div className="col-md-6 m-auto">
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
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    };
}