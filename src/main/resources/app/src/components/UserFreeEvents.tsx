import React, {Component} from "react";
import axios from "axios";

interface UserFreeEventsProps {
    userEvents: Array<any>
}

interface UserFreeEventsState {
    freeEvents: Array<any>,
    markedEvents: Array<any>
}


export default class UserFreeEvents extends Component<UserFreeEventsProps, UserFreeEventsState> {  // TODO: сменить название
    constructor(props: UserFreeEventsProps) {
        super(props);

        this.state = {
            freeEvents: [],
            markedEvents: []
        }
    }

    componentDidMount() {
        axios.post('users/user/freeEvents', {
            ids: this.props.userEvents.map(p => p['id'])
        }).then(response => {
            if (response.status === 200)
                this.setState({
                    freeEvents: response.data
                });
        });
    }

    render() {
        const {freeEvents, markedEvents} = this.state;
        return (
            <table className="table table-hover mt-3">
                <thead className="table-dark">
                <tr>
                    <th>Событие</th>
                    <th>Даты</th>
                </tr>
                </thead>
                <tbody>
                {freeEvents && freeEvents.map((event, index) => {
                    return (
                        <tr className={`cursor-pointer ${markedEvents.indexOf(event) !== -1 ? 'table-primary' : ''}`}
                            onClick={() => {
                                if (markedEvents.indexOf(event) === -1)
                                    markedEvents.push(event);
                                else
                                    markedEvents.splice(markedEvents.indexOf(event), 1);

                                this.forceUpdate();
                            }}
                            key={index}>
                            <td>{event.event}</td>
                            <td>{event.dates}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        );
    }
}
