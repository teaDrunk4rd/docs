import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {store} from "react-notifications-component";

interface EventsState {
    events: Array<any>,
    isLoaded: boolean
}

export default class Events extends Component<any, EventsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            events: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get('events').then(response => {
            if (response.status === 200) {
                this.setState({
                    events: response.data,
                    isLoaded: true
                })
            }
        });
    }

    delete(id: number) {
        axios.delete(`events/event/delete?id=${id}`).then(response => {
            if (response.status === 200) {
                store.addNotification({
                    message: "Событие удалено",
                    type: "warning",
                    container: "top-right",
                    dismiss: { duration: 2000, onScreen: true }
                });

                this.state.events.splice(this.state.events.indexOf(this.state.events.find(function (e) {
                    return e.id === id;
                })), 1);
                this.forceUpdate();
            }
        })
    }

    render() {
        return (
            <div className="col-md-7 m-auto">
                {!this.state.isLoaded ? <Preloader/> : <div/>}
                <div className="d-flex justify-content-between mb-3">
                    <div className="h3 font-weight-bold">
                        События
                    </div>
                    {
                        JSON.parse(localStorage["user"])["role"] === "ROLE_ADMIN" ? (
                            <button className="btn btn-outline-success" onClick={() => this.props.history.push({pathname: "/eventForm"})}>
                                Добавить
                            </button>
                        ) : <div/>
                    }

                </div>
                <table className="table table-hover bg-white">
                    <thead className="table-dark">
                    <tr>
                        <th>Событие</th>
                        <th>Даты</th>
                        <th>Участники</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.events.length !== 0 && this.state.events.map((event, index) => {
                        return (
                            <tr className="cursor-pointer"
                                key={index}
                                onClick={() => this.props.history.push({
                                    pathname: JSON.parse(localStorage["user"])["role"] === "ROLE_ADMIN" ? "/eventForm" : "/event",
                                    search: `?id=${event.id}`,
                                    state: { id: event.id }
                                })}>
                                <td>{event.event}</td>
                                <td>{event.dates}</td>
                                <td>{event.participantsCount}</td>
                                <td>
                                    <div className="trash-icon shadow-sm ml-4"
                                         onClick={(e) => {
                                             e.stopPropagation();
                                             this.delete(event.id);
                                         }}/>
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