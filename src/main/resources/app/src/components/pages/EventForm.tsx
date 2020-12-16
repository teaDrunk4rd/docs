import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {store} from "react-notifications-component";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";

interface DisciplinesState {
    id: number,
    name: string,
    startDate?: Date,
    c1Date?: Date,
    cplus1Date?: Date,
    finishDate?: Date,
    participants: Array<any>,
    isLoaded: boolean
}

export default class EventForm extends Component<any, DisciplinesState> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: props.location.state.id,
            name: '',
            startDate: undefined,
            c1Date: undefined,
            cplus1Date: undefined,
            finishDate: undefined,
            participants: [],
            isLoaded: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`events/event?id=${this.state.id}`).then(response => {
            if (response.status === 200) {
                this.setState({
                    name: response.data.name,
                    startDate: response.data.startDate,
                    c1Date: response.data.c1Date,
                    cplus1Date: response.data.cplus1Date,
                    finishDate: response.data.finishDate,
                    participants: response.data.participants,
                    isLoaded: true
                })
            }
        });
    }
    handleSubmit(event: any) {
        event.preventDefault();

        if (this.state.id !== undefined)
            axios.put('events/update', {
                id: this.state.id,
                name: this.state.name,
                startDate: this.state.startDate,
                c1Date: this.state.c1Date,
                cplus1Date: this.state.cplus1Date,
                finishDate: this.state.finishDate,
                participants: this.state.participants
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Изменения сохранены",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({
                        pathname: '/events'
                    })
                }
            });
        else
            axios.put('events/create', {
                name: this.state.name,
                startDate: this.state.startDate,
                c1Date: this.state.c1Date,
                cplus1Date: this.state.cplus1Date,
                finishDate: this.state.finishDate,
                participants: this.state.participants
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Событие создано",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({
                        pathname: '/logs/log'
                    })
                }
            });
    }

    render() {
        const {name, startDate, c1Date, cplus1Date, finishDate, participants} = this.state;
        return (
            <div className="col-10 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded ? <Preloader className='event-loader' /> : <div/>}
                    <div className="card-header">Событие</div>
                    <div className="card-body">
                        <form onSubmit={this.handleSubmit} autoComplete='false'>
                            <div className="row mb-2">
                                <label className="offset-md-2 col-md-4 col-form-label text-left">Наименование</label>

                                <div className="offset-md-2 col-md-7">
                                    <input type="text"
                                           autoComplete="false"
                                           value={name}
                                           onChange={event => this.setState({name: event.target.value})}
                                           className="form-control "/>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <label className="offset-md-2 col-md-3 col-form-label text-left">Дата начала</label>
                                <label className="offset-md-1 col-md-3 col-form-label text-left">Дата С1</label>
                                <label className="col-md-3" />

                                <div className="offset-md-2 col-md-3 mt-1">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                        <DatePicker
                                            value={startDate}
                                            inputVariant="outlined"
                                            onChange={(date: any) => this.setState({startDate: date})}
                                            format="dd.MM.yyyy"
                                            cancelLabel="Отмена"
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="offset-md-1 col-md-3 mt-1">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                        <DatePicker
                                            value={c1Date}
                                            inputVariant="outlined"
                                            onChange={(date: any) => this.setState({c1Date: date})}
                                            format="dd.MM.yyyy"
                                            cancelLabel="Отмена"
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <label className="offset-md-2 col-md-3 col-form-label text-left">Дата С+1</label>
                                <label className="offset-md-1 col-md-3 col-form-label text-left">Дата окончания</label>
                                <label className="col-md-3" />

                                <div className="offset-md-2 col-md-3 mt-1">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                        <DatePicker
                                            value={cplus1Date}
                                            inputVariant="outlined"
                                            onChange={(date: any) => this.setState({cplus1Date: date})}
                                            format="dd.MM.yyyy"
                                            cancelLabel="Отмена"
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="offset-md-1 col-md-3 mt-1">
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                                        <DatePicker
                                            value={finishDate}
                                            inputVariant="outlined"
                                            onChange={(date: any) => this.setState({finishDate: date})}
                                            format="dd.MM.yyyy"
                                            cancelLabel="Отмена"
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>

                            <div className="offset-md-2 col-md-7 px-1">
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
                                            <tr className="cursor-pointer"
                                                key={index}>
                                                <td>{participant.user}</td>
                                                <td>{participant.role}</td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="row">
                                <div className="col-md-7 offset-md-2 d-flex justify-content-end">
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