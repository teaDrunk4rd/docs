import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {store} from "react-notifications-component";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import EventParticipants from "../EventParticipants";
import EventDocs from "../EventDocs";

interface EventFormState {
    id: number,

    name: string,
    startDate?: Date,
    c1Date?: Date,
    cplus1Date?: Date,
    finishDate?: Date,

    isLoaded: boolean
}

export default class EventForm extends Component<any, EventFormState> {
    private readonly EventParticipants: React.RefObject<EventParticipants>;
    private readonly EventDocs: React.RefObject<EventDocs>;

    constructor(props: any) {
        super(props);

        this.state = {
            id: props.location.state?.id,
            name: '',
            startDate: undefined,
            c1Date: undefined,
            cplus1Date: undefined,
            finishDate: undefined,
            isLoaded: props.location.state?.id === undefined
        };

        this.EventParticipants = React.createRef();
        this.EventDocs = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== undefined)
            axios.get(`events/event?id=${this.state.id}`).then(response => {
                if (response.status === 200)
                    this.setState({
                        name: response.data.name,
                        startDate: response.data.startDate,
                        c1Date: response.data.c1Date,
                        cplus1Date: response.data.cplus1Date,
                        finishDate: response.data.finishDate,
                        isLoaded: true
                    });
            });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if (this.state.id !== undefined)
            axios.put('events/event/update', {
                id: this.state.id,
                name: this.state.name,
                startDate: this.state.startDate,
                c1Date: this.state.c1Date,
                cplus1Date: this.state.cplus1Date,
                finishDate: this.state.finishDate,
                participantIds: this.EventParticipants.current?.state.participants.map(p => p['id']),
                docIds: this.EventDocs.current?.state.docs.map(d => d['id'])
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Изменения сохранены",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({pathname: '/'})
                }
            });
        else
            axios.put('events/event/create', {
                name: this.state.name,
                startDate: this.state.startDate,
                c1Date: this.state.c1Date,
                cplus1Date: this.state.cplus1Date,
                finishDate: this.state.finishDate,
                participantIds: this.EventParticipants.current?.state.participants.map(p => p['id']),
                docIds: this.EventDocs.current?.state.docs.map(d => d['id'])
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Событие создано",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({pathname: '/'})
                }
            });
    }

    render() {
        const {id, name, startDate, c1Date, cplus1Date, finishDate} = this.state;
        return (
            <div className="col-8 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded ? <Preloader className='event-loader' /> : <div/>}
                    <div className="card-header">Событие</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit} autoComplete='false'>
                            <div className="row mb-2">
                                <label className="offset-md-2 col-md-8 col-form-label text-left">Наименование</label>

                                <div className="offset-md-2 col-md-8">
                                    <input type="text"
                                           autoComplete="false"
                                           value={name}
                                           onChange={event => this.setState({name: event.target.value})}
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <label className="offset-md-2 col-md-4 col-form-label text-left">Дата начала</label>
                                <label className="col-md-4 col-form-label text-left">Дата С1</label>
                                <label className="col-md-2" />

                                <div className="offset-md-2 col-md-4 mt-1">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                        <DatePicker
                                            value={startDate || null}
                                            inputVariant="outlined"
                                            onChange={(date: any) => this.setState({startDate: date})}
                                            format="dd.MM.yyyy"
                                            cancelLabel="Отмена"
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="col-md-4 mt-1">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                        <DatePicker
                                            value={c1Date || null}
                                            inputVariant="outlined"
                                            onChange={(date: any) => this.setState({c1Date: date})}
                                            format="dd.MM.yyyy"
                                            cancelLabel="Отмена"
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <label className="offset-md-2 col-md-4 col-form-label text-left">Дата С+1</label>
                                <label className="col-md-4 col-form-label text-left">Дата окончания</label>
                                <label className="col-md-2" />

                                <div className="offset-md-2 col-md-4 mt-1">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                        <DatePicker
                                            value={cplus1Date || null}
                                            inputVariant="outlined"
                                            onChange={(date: any) => this.setState({cplus1Date: date})}
                                            format="dd.MM.yyyy"
                                            cancelLabel="Отмена"
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="col-md-4 mt-1">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                        <DatePicker
                                            value={finishDate || null}
                                            inputVariant="outlined"
                                            onChange={(date: any) => this.setState({finishDate: date})}
                                            format="dd.MM.yyyy"
                                            cancelLabel="Отмена"
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <div className="offset-md-2 col-md-8 text-left">Участники события</div>
                                <EventParticipants ref={this.EventParticipants} eventId={id}/>
                            </div>

                            <div className="row mb-2">
                                <div className="offset-md-2 col-md-8 text-left">Прикрепленные документы</div>
                                <EventDocs ref={this.EventDocs} eventId={id}/>
                            </div>

                            <div className="row">
                                <div className="offset-md-2 col-md-8 d-flex justify-content-end">
                                    <button type="submit" className="btn btn-success">
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