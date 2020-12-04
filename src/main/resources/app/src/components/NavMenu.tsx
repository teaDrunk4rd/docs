import React, {Component} from 'react';
import {Collapse, Container, Navbar, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

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
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/">События</NavLink>
                                </NavItem>
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
