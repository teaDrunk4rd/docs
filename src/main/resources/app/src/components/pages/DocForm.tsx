import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {store} from "react-notifications-component";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DocEvents from "../DocEvents";
import Doc from "./Doc";

interface DocFormState {
    id: number,
    name: string,
    day: any,
    content: string,
    role: any,
    PIN: string,
    signed?: boolean,
    days: Array<any>,
    roles: Array<any>,
    isLoaded: boolean
}

export default class DocForm extends Component<any, DocFormState> {
    private readonly DocEvents: React.RefObject<DocEvents>;

    constructor(props: any) {
        super(props);

        this.state = {
            id: props.location.state?.id,
            name: '',
            day: null,
            content: '',
            role: null,
            PIN: '',
            signed: undefined,
            days: [],
            roles: [],
            isLoaded: false
        };
        this.DocEvents = React.createRef();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== undefined)
            axios.get(`docs/doc?id=${this.state.id}`).then(response => {
                if (response.status === 200)
                    this.setState({
                        name: response.data.name,
                        day: response.data.day,
                        content: response.data.content,
                        role: response.data.role,
                        PIN: response.data.pin,
                        signed: response.data.signed,
                    });
            });

        axios.get('roles').then(response => {
            if (response.status === 200) {
                this.setState({
                    roles: response.data
                });

                axios.get('days').then(response => {
                    if (response.status === 200) {
                        this.setState({
                            days: response.data,
                            isLoaded: true
                        });
                    }
                });
            }
        });
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if (this.state.id !== undefined)
            axios.put('docs/doc/update', {
                id: this.state.id,
                name: this.state.name,
                dayId: this.state.day.id,
                content: this.state.content,
                roleId: this.state.role.id,
                pin: this.state.PIN,
                signed: this.state.signed,
                eventIds: this.DocEvents.current?.state.events.map(e => e['id'])
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Изменения сохранены",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({pathname: '/docs'})
                }
            });
        else
            axios.post('docs/doc/create', {
                name: this.state.name,
                dayId: this.state.day.id,
                content: this.state.content,
                roleId: this.state.role.id,
                pin: this.state.PIN,
                signed: this.state.signed,
                eventIds: this.DocEvents.current?.state.events.map(e => e['id'])
            }).then(response => {
                if (response.status === 200) {
                    store.addNotification({
                        message: "Документ создан",
                        type: "success",
                        container: "top-right",
                        dismiss: { duration: 2000, onScreen: true }
                    });
                    this.props.history.push({pathname: '/docs'})
                }
            });
    }

    render() {
        const {id, name, day, content, role, PIN, signed, days, roles} = this.state;
        return (
            <div className="col-8 m-auto">
                <div className="card text-center">
                    {!this.state.isLoaded ? <Preloader className='event-loader' /> : <div/>}
                    <div className="card-header">Документ</div>
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
                                <label className="offset-md-2 col-md-3 col-form-label text-left">Роль</label>
                                <label className="col-md-2 col-form-label text-left">День</label>
                                <label className="col-md-3 col-form-label text-left">PIN</label>

                                <div className="offset-md-2 col-md-3 mt-1">
                                    <FormControl variant="outlined" className="w-100">
                                        <Select value={role?.id || 0}
                                                onChange={event => {
                                                    this.setState({
                                                        role: roles.find(function (r) {
                                                            return r.id === event.target.value;
                                                        })
                                                    })
                                                }}
                                                className="pt-1 text-left padding-bottom-1px">
                                            {roles.length !== 0 && roles.map((role, index) => {
                                                return (<MenuItem key={index} value={role.id}>{role.name}</MenuItem>)
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-md-2 mt-1">
                                    <FormControl variant="outlined" className="w-100">
                                        <Select value={day?.id || 0}
                                                onChange={event => {
                                                    this.setState({
                                                        day: days.find(function (r) {
                                                            return r.id === event.target.value;
                                                        })
                                                    })
                                                }}
                                                className="pt-1 text-left padding-bottom-1px">
                                            {days.length !== 0 && days.map((day, index) => {
                                                return (<MenuItem key={index} value={day.id}>{day.name}</MenuItem>)
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="col-md-3 mt-1">
                                    <input type="text"
                                           autoComplete="false"
                                           value={PIN}
                                           onChange={event => this.setState({PIN: event.target.value})}
                                           className="form-control"/>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <label className="offset-md-2 col-md-8 col-form-label text-left">Содержание</label>

                                <div className="offset-md-2 col-md-8 mt-1">
                                    <textarea
                                        value={content}
                                        onChange={event => this.setState({content: event.target.value})}
                                        className="form-control"/>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <div className="offset-md-2 col-md-4 mt-1 d-flex align-items-center">
                                    <input type="checkbox"
                                           autoComplete="false"
                                           checked={signed}
                                           onChange={() => this.setState({signed: !signed})}/>
                                    <label className="col-form-label text-left py-0 pl-1"
                                           onClick={() => this.setState({signed: !signed})}>
                                        Подписанный документ
                                    </label>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <div className="offset-md-2 col-md-10 text-left">События</div>
                                <DocEvents ref={this.DocEvents} docId={id}/>
                            </div>

                            <div className="row">
                                <div className="offset-md-2 col-md-8 d-flex justify-content-end">
                                    <div className="btn btn-outline-info mx-2"
                                            onClick={() => Doc.download({
                                                roleName: this.state.role.name,
                                                dayName: this.state.day.name,
                                                ...this.state
                                            })}>
                                        Скачать
                                    </div>
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