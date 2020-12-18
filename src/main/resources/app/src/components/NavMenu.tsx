import React, {Component} from 'react';
import {Collapse, Container, Navbar, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

function checkRole(roles: string): boolean {
    return localStorage["user"] && roles.split(',').includes(JSON.parse(localStorage["user"])["role"]);
}

interface NavMenuProps {
    collapsed?: boolean
}

export default class NavMenu extends Component<any, NavMenuProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            collapsed: true
        };
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 bg-white">
                    <Container>
                        <NavbarToggler onClick={() => this.setState({collapsed: !this.state.collapsed})} className="mr-2"/>
                        <Collapse className="d-sm-inline-flex" isOpen={!this.state.collapsed} navbar>
                            <ul className="navbar-nav flex-grow w-100 d-flex justify-content-between">
                                <div className="d-flex justify-content-around align-items-center">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark h5 font-weight-normal m-0" to="/">
                                            События
                                        </NavLink>
                                    </NavItem>
                                    { checkRole("ROLE_ADMIN") &&
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/users">Пользователи</NavLink>
                                    </NavItem> }
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/docs">
                                            Документы
                                        </NavLink>
                                    </NavItem>
                                </div>
                                <NavItem>
                                    {localStorage["user"] ? (
                                        <NavLink tag={Link} className="text-dark" to="/profile">
                                            {JSON.parse(localStorage["user"]).name}
                                        </NavLink>) : (
                                        <NavLink tag={Link} className="text-dark" to="/login">
                                            Вход
                                        </NavLink>)
                                    }
                                </NavItem>
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
