import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {Modal} from "@material-ui/core";
import UnsignedUsers from "./UnsignedUsers";

interface ParticipantsProps {
    eventId: number,
    readonly?: boolean
}

interface ParticipantsState {
    participants: Array<any>,
    selectedParticipant: any,
    openDeleteDialog: boolean,
    openAddModal: boolean
}


export default class Participants extends Component<ParticipantsProps, ParticipantsState> {
    private readonly UnsignedUsers: React.RefObject<UnsignedUsers>;
    constructor(props: ParticipantsProps) {
        super(props);

        this.state = {
            participants: [],
            selectedParticipant: null,
            openDeleteDialog: false,
            openAddModal: false
        }
        this.UnsignedUsers = React.createRef();
        this.assignUsers = this.assignUsers.bind(this);
    }

    componentDidMount() {
        axios.get(`events/event/participants?id=${this.props.eventId}`).then(response => {
            if (response.status === 200)
                this.setState({
                    participants: response.data
                });
        });
    }

    assignUsers(event: any) {
        this.UnsignedUsers.current?.state.markedUsers.forEach(user => this.state.participants.push(user));
        this.setState({openAddModal: false})
    }

    render() {
        const {participants, selectedParticipant} = this.state;
        return (
            <div className="offset-md-2 col-md-7 d-flex">
                <table className="table table-hover mt-3">
                    <thead className="table-dark">
                    <tr>
                        <th>Пользователь</th>
                        <th>Роль</th>
                    </tr>
                    </thead>
                    <tbody>
                    {participants && participants.map((participant, index) => {
                        return (
                            <tr className={
                                !this.props.readonly && participant === selectedParticipant ? 'cursor-pointer table-primary' :
                                !this.props.readonly ? 'cursor-pointer' : ''}
                                onClick={() => this.setState({selectedParticipant: participant})}
                                key={index}>
                                <td>{participant.user}</td>
                                <td>{participant.role}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                {
                    !this.props.readonly ? (
                        <div className='ml-4 mt-3'>
                            <div className="add-icon shadow mb-3" onClick={() => this.setState({openAddModal: true})} />
                            <div className={`remove-icon shadow ${selectedParticipant == null ? 'disable' : ''}`}
                                 onClick={() => this.setState({openDeleteDialog: true})} />
                        </div>
                    ) : <div/>
                }

                <Dialog
                    open={this.state.openDeleteDialog}
                    onClose={() => this.setState({openDeleteDialog: false})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Подтверждение удаления</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вы действительно хотите удалить участника события
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openDeleteDialog: false})} color="default">
                            Отмена
                        </Button>
                        <Button onClick={() => {
                            participants.splice(participants.indexOf(selectedParticipant), 1);
                            this.forceUpdate();
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
                            <i>Отметьте пользователей, которых Вы хотите записать</i>
                        </div>
                        <UnsignedUsers ref={this.UnsignedUsers} eventId={this.props.eventId}
                                       participants={participants} />
                        <div className="d-flex justify-content-end mb-3">
                            <button className="btn btn-primary" onClick={this.assignUsers}>
                                Записать
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
