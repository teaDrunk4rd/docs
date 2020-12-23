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

interface DocsState {
    docs: Array<any>,
    openDeleteDialog: boolean,
    deleteEventId?: number,
    isLoaded: boolean
}

export default class Docs extends Component<any, DocsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            docs: [],
            openDeleteDialog: false,
            deleteEventId: undefined,
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get('docs').then(response => {
            if (response.status === 200) {
                this.setState({
                    docs: response.data,
                    isLoaded: true
                })
            }
        });
    }

    delete(id: number|undefined) {
        axios.delete(`docs/doc/delete?id=${id}`).then(response => {
            if (response.status === 200) {
                store.addNotification({
                    message: "Документ удален",
                    type: "warning",
                    container: "top-right",
                    dismiss: { duration: 2000, onScreen: true }
                });

                this.state.docs.splice(this.state.docs.indexOf(this.state.docs.find(function (d) {
                    return d.id === id;
                })), 1);
                this.setState({
                    openDeleteDialog: false,
                    deleteEventId: undefined
                });
            }
        })
    }

    render() {
        return (
            <div className="col-md-7 m-auto">
                {!this.state.isLoaded ? <Preloader/> : <div/>}
                <div className="d-flex justify-content-between mb-3">
                    <div className="h3 font-weight-bold">
                        Документы
                    </div>
                    {
                        JSON.parse(localStorage["user"])["role"] === "ROLE_ADMIN" ? (
                            <button className="btn btn-outline-success"
                                    onClick={() => this.props.history.push({pathname: "docs/docForm"})}>
                                Добавить
                            </button>
                        ) : <div/>
                    }

                </div>
                <table className="table table-hover bg-white">
                    <thead className="table-dark">
                    <tr>
                        <th>Наименование</th>
                        <th>День</th>
                        <th>Роль</th>
                        <th>Подписан</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.docs.length !== 0 && this.state.docs.map((doc, index) => {
                        return (
                            <tr className="cursor-pointer"
                                key={index}
                                onClick={() => this.props.history.push({
                                    pathname: JSON.parse(localStorage["user"])["role"] === "ROLE_ADMIN" ?
                                        "docs/docForm" : "docs/doc",
                                    search: `?id=${doc.id}`,
                                    state: { id: doc.id }
                                })}>
                                <td>{doc.doc}</td>
                                <td>{doc.day}</td>
                                <td>{doc.role}</td>
                                <td>{doc.signed ? '✓' : '✘'}</td>
                                <td>
                                    <div className="trash-icon shadow-sm ml-4"
                                         onClick={(e) => {
                                             e.stopPropagation();
                                             this.setState({
                                                 openDeleteDialog: true,
                                                 deleteEventId: doc.id
                                             });
                                         }}/>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                <Dialog
                    open={this.state.openDeleteDialog}
                    onClose={() => this.setState({openDeleteDialog: false, deleteEventId: undefined})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Подтверждение удаления</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вы действительно хотите удалить документ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openDeleteDialog: false, deleteEventId: undefined})}
                                color="default">
                            Отмена
                        </Button>
                        <Button onClick={() => this.delete(this.state.deleteEventId)} color="secondary">
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    };
}