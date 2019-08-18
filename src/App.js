import React, {Component} from 'react';
import axios from 'axios';

import DealerLocator from "./components/DealerLocator";
import Home from "./components/Home";
import TopNav from "./components/TopNav";

import './App.css';
import Footer from "./components/Footer";
import {BrowserRouter as Router, Route} from "react-router-dom";
import TestFlightForm from "./components/TestFlightForm";
import VehicleDetail from "./components/VehicleDetail";
import BuildAndPrice from "./components/BuildAndPrice";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {vehicleData: null};
  }
  componentDidMount() {
    axios.get('http://localhost:3001/vehicles')
        .then(res => {
      setTimeout(() => this.setState({vehicleData: res.data}), 2000);
    })
        .catch(error => console.log(error));
  }

  render() {
    if (! this.state.vehicleData) {
      return (<h4><i className='fas fa-spinner fa-spin'/></h4>);
    }

    return (
        <Router>
          <div className="App">
            <TopNav vehicleData={this.state.vehicleData}/>
              <div className='content-area'>
                <Route exact path='/' render={(props) => <Home {...props} vehicleData={this.state.vehicleData}/>} />
                <Route path='/find-a-dealer' component={DealerLocator}/>
                <Route path='/schedule-test-flight' component={TestFlightForm}/>
                <Route path='/detail/:selectedVehicle' render={(props) => <VehicleDetail {...props} vehicleData={this.state.vehicleData}/>}/>
                <Route path='/build-and-price' render={(props) => <BuildAndPrice {...props} vehicleData={this.state.vehicleData}/>}/>
              </div>
            <Footer/>
          </div>
        </Router>
    );
  }
}

export default App;
