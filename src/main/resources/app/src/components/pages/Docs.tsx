import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";

interface DocsState {
    docs: Array<any>,
    isLoaded: boolean
}

export default class Docs extends Component<any, DocsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            docs: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        axios.get('docs').then(response => {
            if (response.status === 200) {
                this.setState({
                    docs: response.data,
                    isLoaded: true
                })
            }
        });
    }

    render() {
        return (
            <div className="col-md-6 m-auto">
                {!this.state.isLoaded ? <Preloader/> : <div/>}
                <div className="d-flex justify-content-between mb-3">
                    <div className="h3 font-weight-bold">
                        Документы
                    </div>
                    {
                        JSON.parse(localStorage["user"])["role"] === "ROLE_ADMIN" ? (
                            <button className="btn btn-outline-success"
                                    onClick={() => this.props.history.push({pathname: "docs/docForm"})}>
                                Добавить
                            </button>
                        ) : <div/>
                    }

                </div>
                <table className="table table-hover bg-white">
                    <thead className="table-dark">
                    <tr>
                        <th>Наименование</th>
                        <th>День</th>
                        <th>Роль</th>
                        <th>Подписан</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.docs.length !== 0 && this.state.docs.map((doc, index) => {
                        return (
                            <tr className="cursor-pointer"
                                key={index}
                                onClick={() => this.props.history.push({
                                    pathname: JSON.parse(localStorage["user"])["role"] === "ROLE_ADMIN" ?
                                        "docs/docForm" : "docs/doc",
                                    search: `?id=${doc.id}`,
                                    state: { id: doc.id }
                                })}>
                                <td>{doc.doc}</td>
                                <td>{doc.day}</td>
                                <td>{doc.role}</td>
                                <td>{doc.signed ? '✓' : '✘'}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        )
    };
}