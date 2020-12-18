import React, {Component} from "react";
import axios from "axios";

interface DocFreeEventsProps {
    docEvents: Array<any>
}

interface DocFreeEventsState {
    freeEvents: Array<any>,
    markedEvents: Array<any>
}


export default class DocFreeEvents extends Component<DocFreeEventsProps, DocFreeEventsState> {  // TODO: сменить название
    constructor(props: DocFreeEventsProps) {
        super(props);

        this.state = {
            freeEvents: [],
            markedEvents: []
        }
    }

    componentDidMount() {
        axios.post('docs/doc/freeEvents', {
            eventIds: this.props.docEvents.map(p => p['id'])
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
                    <th>Участники</th>
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
                            <td>{event.participantsCount}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        );
    }
}
