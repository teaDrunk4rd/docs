import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";

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

    render() {
        return (
            <div className="m-auto">
                {!this.state.isLoaded ? <Preloader/> : <div/>}
                <div className="h3 font-weight-bold mb-3">События</div>
                <table className="table table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th>Событие</th>
                        <th>Даты</th>
                        <th>Участники</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.events.length !== 0 && this.state.events.map((event, index) => {
                        return (
                            <tr className="cursor-pointer"
                                key={index}
                                onClick={(e) => this.props.history.push({
                                    pathname: '/event',
                                    search: `?id=${event.id}`,
                                    state: { id: event.id }
                                })}>
                                <td>{event.event}</td>
                                <td>{event.dates}</td>
                                <td>{event.participantsCount}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    };
}