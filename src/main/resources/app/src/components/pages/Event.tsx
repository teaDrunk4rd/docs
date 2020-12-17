import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import Participants from "./EventForm/Participants";

interface EventFormState {
    id: number,

    name: string,
    startDate: String,
    cminus1Date: String,
    c1Date: String,
    c2Date: String,
    cplus1Date: String,
    finishDate: String,

    isLoaded: boolean
}

export default class Event extends Component<any, EventFormState> {
    constructor(props: any) {
        super(props);

        this.state = {
            id: props.location.state.id,
            name: '',
            startDate: '',
            cminus1Date: '',
            c1Date: '',
            c2Date: '',
            cplus1Date: '',
            finishDate: '',
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get(`events/event?id=${this.state.id}`).then(response => {
            if (response.status === 200)
                this.setState({
                    name: response.data.name,
                    startDate: this.getLocaleDate(response.data.startDate),
                    cminus1Date: this.getLocaleDate(response.data.cminus1Date),
                    c1Date: this.getLocaleDate(response.data.c1Date),
                    c2Date: this.getLocaleDate(response.data.c2Date),
                    cplus1Date: this.getLocaleDate(response.data.cplus1Date),
                    finishDate: this.getLocaleDate(response.data.finishDate),
                    isLoaded: true
                });
        });
    }

    private getLocaleDate(date: any): String {
        return date !== null ? new Date(date).toLocaleString('ru').substr(0, 10) : '';
    }

    render() {
        const {id, name, startDate, cminus1Date, c1Date, c2Date, cplus1Date, finishDate} = this.state;
        return (
            <div className="col-md-8 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded ? <Preloader className='event-loader' /> : <div/>}
                    <div className="card-header">Событие {name}</div>
                    <div className="card-body">
                        <div className="card-subtitle mb-2">
                            <div className="mt-2 mb-1">Даты:</div>
                            <table className="table table-hover mt-3">
                                <thead className="table-dark">
                                <tr>
                                    <th className="bg-primary">C-2</th>
                                    <th className="bg-primary">C-1</th>
                                    <th className="bg-success">C1</th>
                                    <th className="bg-success">C2</th>
                                    <th className="bg-warning">C+1</th>
                                    <th className="bg-warning">C+2</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td className="bg-primary">{startDate}</td>
                                    <td className="bg-primary">{cminus1Date}</td>
                                    <td className="bg-success">{c1Date}</td>
                                    <td className="bg-success">{c2Date}</td>
                                    <td className="bg-warning">{cplus1Date}</td>
                                    <td className="bg-warning">{finishDate}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-2">Участники события:</div>
                        <Participants readonly={true} eventId={id}/>
                    </div>
                </div>
            </div>
        );
    }
}
