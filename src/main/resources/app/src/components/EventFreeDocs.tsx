import React, {Component} from "react";
import axios from "axios";

interface EventFreeDocsProps {
    eventDocs: Array<any>
}

interface EventFreeDocsState {
    freeDocs: Array<any>,
    markedDocs: Array<any>
}


export default class EventFreeDocs extends Component<EventFreeDocsProps, EventFreeDocsState> {  // TODO: сменить название
    constructor(props: EventFreeDocsProps) {
        super(props);

        this.state = {
            freeDocs: [],
            markedDocs: []
        }
    }

    componentDidMount() {
        axios.post('events/event/freeDocs', {
            docIds: this.props.eventDocs.map(p => p['id'])
        }).then(response => {
            if (response.status === 200)
                this.setState({
                    freeDocs: response.data
                });
        });
    }

    render() {
        const {freeDocs, markedDocs} = this.state;
        return (
            <table className="table table-hover mt-3">
                <thead className="table-dark">
                <tr>
                    <th>Документ</th>
                    <th>День</th>
                    <th>Роль</th>
                    <th>Подписан</th>
                </tr>
                </thead>
                <tbody>
                {freeDocs && freeDocs.map((doc, index) => {
                    return (
                        <tr className={`cursor-pointer ${markedDocs.indexOf(doc) !== -1 ? 'table-primary' : ''}`}
                            onClick={() => {
                                if (markedDocs.indexOf(doc) === -1)
                                    markedDocs.push(doc);
                                else
                                    markedDocs.splice(markedDocs.indexOf(doc), 1);

                                this.forceUpdate();
                            }}
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
        );
    }
}
