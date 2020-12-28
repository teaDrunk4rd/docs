import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {store} from "react-notifications-component";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

interface UsersState {
    users: Array<any>,
    openDeleteDialog: boolean,
    selectedUserId?: number,
    isLoaded: boolean
}

export default class Users extends Component<any, UsersState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            openDeleteDialog: false,
            selectedUserId: undefined,
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

    edit(id: number) {
        this.props.history.push({
            pathname: "/users/user",
            search: `?id=${id}`,
            state: { id: id }
        });
    }

    delete(id: number|undefined) {
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
                this.setState({
                    openDeleteDialog: false,
                    selectedUserId: undefined
                });
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
                        <th/>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.length !== 0 && this.state.users.map((user, index) => {
                        return (
                            <tr className="cursor-pointer"
                                key={index}
                                onClick={() => this.edit(user.id)}>
                                <td>{user.email}</td>
                                <td>{user.fullName}</td>
                                <td>{user.role}</td>
                                <td>{user.country}</td>
                                <td>{user.confirmed ? '✓' : '✘'}</td>
                                <td onClick={(e) => e.stopPropagation()}>
                                    <div className="dropdown">
                                        <div className="dots-icon"
                                             id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" />
                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                            <li>
                                                <div className="dropdown-item"
                                                     onClick={() => this.edit(user.id)}>
                                                    Редактировать
                                                </div>
                                            </li>
                                            <li>
                                                <div className="dropdown-item"
                                                     onClick={() => this.setState({
                                                         openDeleteDialog: true,
                                                         selectedUserId: user.id
                                                     })}>
                                                    Удалить
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                <Dialog
                    open={this.state.openDeleteDialog}
                    onClose={() => this.setState({openDeleteDialog: false, selectedUserId: undefined})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Подтверждение удаления</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вы действительно хотите удалить пользователя?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openDeleteDialog: false, selectedUserId: undefined})}
                                color="default">
                            Отмена
                        </Button>
                        <Button onClick={() => this.delete(this.state.selectedUserId)} color="secondary">
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    };
}