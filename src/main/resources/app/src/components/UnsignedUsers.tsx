import React, {Component} from "react";
import axios from "axios";

interface UnsignedUsersProps {
    participants: Array<any>
}

interface UnsignedUsersState {
    unsignedUsers: Array<any>,
    markedUsers: Array<any>
}


export default class UnsignedUsers extends Component<UnsignedUsersProps, UnsignedUsersState> {
    constructor(props: UnsignedUsersProps) {
        super(props);

        this.state = {
            unsignedUsers: [],
            markedUsers: []
        }
    }

    componentDidMount() {
        axios.post('events/event/users', {
            participantIds: this.props.participants.map(p => p['id'])
        }).then(response => {
            if (response.status === 200)
                this.setState({
                    unsignedUsers: response.data
                });
        });
    }

    render() {
        const {unsignedUsers, markedUsers} = this.state;
        return (
            <table className="table table-hover mt-3">
                <thead className="table-dark">
                <tr>
                    <th>Пользователь</th>
                    <th>Роль</th>
                </tr>
                </thead>
                <tbody>
                {unsignedUsers && unsignedUsers.map((user, index) => {
                    return (
                        <tr className={`cursor-pointer ${markedUsers.indexOf(user) !== -1 ? 'table-primary' : ''}`}
                            onClick={() => {
                                if (markedUsers.indexOf(user) === -1)
                                    markedUsers.push(user);
                                else
                                    markedUsers.splice(markedUsers.indexOf(user), 1);

                                this.forceUpdate();
                            }}
                            key={index}>
                            <td>{user.user}</td>
                            <td>{user.role}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        );
    }
}
