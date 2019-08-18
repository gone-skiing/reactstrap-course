import React, {Component} from 'react';
import './Home.css';
import SiteCarousel from "../SiteCarousel";
import VehicleBrowser from "../VehicleBrowser";

class Home extends Component {
    render() {
        if (! this.props.vehicleData) {
            return null;
        }

        return (
            <div>
                <SiteCarousel vehicleData={this.props.vehicleData}/>
                <VehicleBrowser vehicleData={this.props.vehicleData}/>
            </div>
        );
    }
}

export default Home;