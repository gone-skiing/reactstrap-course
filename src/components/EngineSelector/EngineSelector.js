import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class EngineSelector extends React.Component{
    constructor(props){
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    render(){
        const selectedVehicleData = this.props.vehicleData.filter(vehicle => vehicle.detailKey === this.props.selectedVehicle)[0];

        if (selectedVehicleData) {
            return (
                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        Select a Powerplant
                    </DropdownToggle>
                    <DropdownMenu>
                        {selectedVehicleData.options.engines.map((engine, i) => {
                            return (
                                <DropdownItem
                                    key={"engine-selector-" + engine.name}
                                    data-engine={i}
                                    data-enginecost={engine.cost}
                                    data-enginename={engine.name}
                                    onClick={this.props.selectEngine}>{engine.name}</DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>
            );
        } else {
            return null;
        }
    }
}

export default EngineSelector;
