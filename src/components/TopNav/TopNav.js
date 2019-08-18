import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';
import {Link} from 'react-router-dom';

import './TopNav.css';

class TopNav extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const vehicleSelections = this.props.vehicleData.map(vehicle => {
            return (
                <DropdownItem key={vehicle.detailKey}>
                    <Link to={{pathname: "/detail/" + vehicle.detailKey}}>
                        {vehicle.model}
                    </Link>
                </DropdownItem>);
        }, this);

        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Flying Car Dealership</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/"><i className='fas fa-home'/> Home</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <i className='fas fa-space-shuttle'/> Flying Cars
                                </DropdownToggle>
                                <DropdownMenu right>
                                    {vehicleSelections}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink href="/find-a-dealer"><i className='fas fa-map-marker-alt'/> Find A Dealer</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/build-and-price"><i className='fas fa-cog'/> Build And Price</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default TopNav;