import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import DocEvents from "../DocEvents";

interface DocState {
    id: number,
    name: string,
    dayName: string,
    content: string,
    roleName: string,
    isLoaded: boolean
}

export default class Doc extends Component<any, DocState> {
    constructor(props: any) {
        super(props);

        this.state = {
            id: props.location.state?.id,
            name: '',
            dayName: '',
            content: '',
            roleName: '',
            isLoaded: false
        };
    }

    componentDidMount() {
        debugger
        axios.get(`docs/doc?id=${this.state.id}`).then(response => {
            if (response.status === 200)
                this.setState({
                    name: response.data.name,
                    dayName: response.data.day.name,
                    content: response.data.content,
                    roleName: response.data.role.name,
                    isLoaded: true
                });
        });
    }

    render() {
        const {id, name, dayName, content, roleName} = this.state;
        return (
            <div className="col-md-8 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded ? <Preloader className='event-loader' /> : <div/>}
                    <div className="card-header">Документ {name}</div>
                    <div className="card-body">
                        <h6 className="card-subtitle mb-1 text-muted">День: {dayName}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Роль: {roleName}</h6>
                        <p className="card-text">{content}</p>
                    </div>
                    <div>События:</div>
                    <DocEvents readonly={true} docId={id}/>
                </div>
            </div>
        );
    }
}
