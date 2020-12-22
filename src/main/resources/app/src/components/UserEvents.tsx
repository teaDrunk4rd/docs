import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {Modal} from "@material-ui/core";
import UserFreeEvents from "./UserFreeEvents";

interface UserEventsProps {
    userId: number
}

interface UserEventsState {
    events: Array<any>,
    selectedEvent: any,
    openDeleteDialog: boolean,
    openAddModal: boolean
}


export default class UserEvents extends Component<UserEventsProps, UserEventsState> {
    private readonly UserFreeEvents: React.RefObject<UserFreeEvents>;

    constructor(props: UserEventsProps) {
        super(props);

        this.state = {
            events: [],
            selectedEvent: null,
            openDeleteDialog: false,
            openAddModal: false
        }
        this.UserFreeEvents = React.createRef();
        this.assignUser = this.assignUser.bind(this);
    }

    componentDidMount() {
        if (this.props.userId !== undefined)
            axios.get(`users/user/events?id=${this.props.userId}`).then(response => {
                if (response.status === 200)
                    this.setState({
                        events: response.data
                    });
            });
    }

    assignUser(event: any) {
        this.UserFreeEvents.current?.state.markedEvents.forEach(event => this.state.events.push(event));
        this.setState({openAddModal: false})
    }

    render() {
        const {events, selectedEvent} = this.state;
        return (
            <div className="offset-md-1 col-md-10 d-flex">
                <table className="table table-hover mt-2">
                    <thead className="table-dark">
                    <tr>
                        <th>Событие</th>
                        <th>Даты</th>
                    </tr>
                    </thead>
                    <tbody>
                    {events && events.map((event, index) => {
                        return (
                            <tr className={`cursor-pointer ${event === selectedEvent ? 'table-primary' : ''}`}
                                onClick={() => this.setState({selectedEvent: event})}
                                key={index}>
                                <td>{event.event}</td>
                                <td>{event.dates}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                <div className='ml-4 mt-2'>
                    <div className="add-icon shadow mb-3" onClick={() => this.setState({openAddModal: true})} />
                    <div className={`remove-icon shadow ${selectedEvent == null ? 'disable' : ''}`}
                         onClick={() => this.setState({openDeleteDialog: true})} />
                </div>

                <Dialog
                    open={this.state.openDeleteDialog}
                    onClose={() => this.setState({openDeleteDialog: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Подтверждение удаления</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вы действительно хотите отписать пользователя от события?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openDeleteDialog: false})} color="default">
                            Отмена
                        </Button>
                        <Button onClick={() => {
                            events.splice(events.indexOf(selectedEvent), 1);
                            this.setState({openDeleteDialog: false});
                        }} color="secondary">
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>

                <Modal
                    open={this.state.openAddModal}
                    onClose={() => this.setState({openAddModal: false})}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className="d-flex justify-content-center align-items-center">
                    <div className="col-md-6 bg-white my-5">
                        <div className="mt-2">
                            <i>Отметьте документы, которые Вы хотите прикрепить к событию</i>
                        </div>
                        <UserFreeEvents ref={this.UserFreeEvents} userEvents={events} />
                        <div className="d-flex justify-content-end mb-3">
                            <button className="btn btn-primary" onClick={this.assignUser}>
                                Прикрепить
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
