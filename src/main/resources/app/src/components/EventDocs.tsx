import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import axios from "axios";
import {Modal} from "@material-ui/core";
import EventFreeDocs from "./EventFreeDocs";

interface EventDocsProps {
    eventId: number,
    readonly?: boolean
}

interface EventDocsState {
    docs: Array<any>,
    selectedDoc: any,
    openDeleteDialog: boolean,
    openAddModal: boolean
}


export default class EventDocs extends Component<EventDocsProps, EventDocsState> {
    private readonly EventFreeDocs: React.RefObject<EventFreeDocs>;

    constructor(props: EventDocsProps) {
        super(props);

        this.state = {
            docs: [],
            selectedDoc: null,
            openDeleteDialog: false,
            openAddModal: false
        }
        this.EventFreeDocs = React.createRef();
        this.attachDocs = this.attachDocs.bind(this);
    }

    componentDidMount() {
        if (this.props.eventId !== undefined)
            axios.get(`events/event/docs?id=${this.props.eventId}`).then(response => {
                if (response.status === 200)
                    this.setState({
                        docs: response.data
                    });
            });
    }

    attachDocs(event: any) {
        this.EventFreeDocs.current?.state.markedDocs.forEach(doc => this.state.docs.push(doc));
        this.setState({openAddModal: false})
    }

    render() {
        const {docs, selectedDoc} = this.state;
        return (
            <div className="offset-md-2 col-md-8 d-flex">
                <table className="table table-hover mt-2">
                    <thead className="table-dark">
                    <tr>
                        <th>Документ</th>
                        <th>День</th>
                        <th>Роль</th>
                        <th>Подписан</th>
                    </tr>
                    </thead>
                    <tbody>
                    {docs && docs.map((doc, index) => {
                        return (
                            <tr className={
                                !this.props.readonly && doc === selectedDoc ? 'cursor-pointer table-primary' :
                                    !this.props.readonly ? 'cursor-pointer' : ''}
                                onClick={() => this.setState({selectedDoc: doc})}
                                key={index}>
                                <td>{doc.doc}</td>
                                <td>{doc.day}</td>
                                <td>{doc.role}</td>
                                <td>{doc.signed ? '✓' : '✘'}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>

                {
                    !this.props.readonly ? (
                        <div className='ms-4 mt-2'>
                            <div className="add-icon shadow mb-3" onClick={() => this.setState({openAddModal: true})} />
                            <div className={`remove-icon shadow ${selectedDoc == null ? 'disable' : ''}`}
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
                            Вы действительно хотите открепить документ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({openDeleteDialog: false})} color="default">
                            Отмена
                        </Button>
                        <Button onClick={() => {
                            docs.splice(docs.indexOf(selectedDoc), 1);
                            this.setState({selectedDoc: null, openDeleteDialog: false});
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
                    <div className="col-md-6 bg-white my-5 px-3">
                        <div className="mt-2">
                            <i>Отметьте документы, которые Вы хотите прикрепить к событию</i>
                        </div>
                        <EventFreeDocs ref={this.EventFreeDocs} eventDocs={docs} />
                        <div className="d-flex justify-content-end mb-3">
                            <button className="btn btn-primary" onClick={this.attachDocs}>
                                Прикрепить
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
