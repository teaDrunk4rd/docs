import React, {Component} from "react";
import axios from "axios";
import Preloader from "../Preloader";
import {store} from "react-notifications-component";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DocEvents from "../DocEvents";

interface DocFormState {
    id: number,
    name: string,
    dayId: number,
    content: string,
    roleId: number,
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
            dayId: 0,
            content: '',
            roleId: 0,
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
                        dayId: response.data.day.id,
                        content: response.data.content,
                        roleId: response.data.role.id,
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
                dayId: this.state.dayId,
                content: this.state.content,
                roleId: this.state.roleId,
                eventIds: this.DocEvents.current?.state.events.map(p => p['id'])
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
            axios.put('docs/doc/create', {
                name: this.state.name,
                dayId: this.state.dayId,
                content: this.state.content,
                roleId: this.state.roleId,
                eventIds: this.DocEvents.current?.state.events.map(p => p['id'])
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
        const {id, name, dayId, content, roleId, days, roles} = this.state;
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
                                <label className="offset-md-2 col-md-3 col-form-label text-left">День</label>

                                <div className="offset-md-2 col-md-3 mt-1">
                                    <FormControl variant="outlined" className="w-100">
                                        <Select labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={roleId}
                                                onChange={event => this.setState({roleId: parseInt(event.target.value as string)})}
                                                className="pt-1 text-left padding-bottom-1px">
                                            {roles.length !== 0 && roles.map((role, index) => {
                                                return (<MenuItem key={index} value={role.id}>{role.name}</MenuItem>)
                                            })}
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="offset-md-2 col-md-3 mt-1">
                                    <FormControl variant="outlined" className="w-100">
                                        <Select labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value={dayId}
                                                onChange={event => this.setState({dayId: parseInt(event.target.value as string)})}
                                                className="pt-1 text-left padding-bottom-1px">
                                            {days.length !== 0 && days.map((day, index) => {
                                                return (<MenuItem key={index} value={day.id}>{day.name}</MenuItem>)
                                            })}
                                        </Select>
                                    </FormControl>
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
                                <div className="offset-md-2 col-md-10 text-left">События</div>
                                <DocEvents ref={this.DocEvents} docId={id}/>
                            </div>

                            <div className="row">
                                <div className="offset-md-2 col-md-8 d-flex justify-content-end">
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