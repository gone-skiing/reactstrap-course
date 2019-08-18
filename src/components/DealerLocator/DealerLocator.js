import React, {Component} from 'react';
import axios from 'axios';
import {
    Badge,
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    ListGroupItem,
    Row,
    Table
} from 'reactstrap';

import './Dealership.css';
import ListGroup from "reactstrap/es/ListGroup";

class DealerLocator extends Component {
    constructor(props) {
        super(props);

        this.state = {searchTerm: "", dealerships: null, stateCounter: {}};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.onClearClick = this.onClearClick.bind(this);
        this.onListClick = this.onListClick.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3001/dealerships')
            .then(res => {
                const stateCounter = res.data.reduce(
                    function(dealerStateCount, dealer) {
                        dealerStateCount[dealer.state] = (dealerStateCount[dealer.state] || 0) + 1;
                        return dealerStateCount;
                    }, this
                );
                this.setState({dealerships: res.data, stateCounter: stateCounter})
            })
            .catch(error => console.log(error));
    }

    handleInputChange(eventData) {
        this.setState({searchTerm: eventData.target.value});
    }

    onClearClick(eventData) {
        eventData.preventDefault();
        this.setState({searchTerm: ""});
    }

    onListClick(eventData) {
        eventData.preventDefault();
        const stateClicked = eventData.target.text.split(" ")[0];
        this.setState({searchTerm: stateClicked});
    }

    render() {
        if (!this.state.dealerships) {
            return null;
        }

        const filteredStubData = this.state.dealerships.filter(dealer => {
            return dealer.state.includes(this.state.searchTerm);
        });

        const searchBar = (
          <div>
              <h1>Over {this.state.dealerships.length} Authorized Dealers Nationwide</h1>

              <Row className="dealer-state-input">
                  <Col sm={12} md={{size: 6, offset: 3}}>
                      <Form>
                          <FormGroup>
                              <InputGroup>
                                  <Input
                                      name="user_address"
                                      onChange={this.handleInputChange}
                                      type="text"
                                      value={this.state.searchTerm}
                                      placeholder="We are probably nearby. What state are you in?"/>
                                  <InputGroupAddon addonType="append">
                                      <Button onClick={this.onClearClick}>X</Button>
                                  </InputGroupAddon>
                              </InputGroup>
                          </FormGroup>
                      </Form>
                  </Col>
              </Row>
          </div>
        );

        const tableBody = filteredStubData.map((dealer, i) => {
            return (
                <tr key={dealer.phone}>
                    <th scope="row">{String(i)}</th>
                    <td>{dealer.dealershipName}</td>
                    <td>{dealer.address}</td>
                    <td>{dealer.city}</td>
                    <td>{dealer.state}</td>
                    <td>{dealer.zip}</td>
                    <td>{dealer.phone}</td>
                </tr>
            );
        });

        if (this.state.searchTerm.length < 4) {
            let stateCounterMarkup = null;
            if (this.state.stateCounter) {
                stateCounterMarkup = <Row>
                    <Col sm={12} md={{size: 10, offset: 1}}>
                        <ListGroup>
                            {Object.keys(this.state.stateCounter).sort().map((stateName, i) => {
                                if (typeof this.state.stateCounter[stateName] === 'number') {
                                    return (
                                        <ListGroupItem
                                            tag="a"
                                            href="#"
                                            key={stateName + i}
                                            onClick={this.onListClick}
                                            className="justify-content-between">
                                            {stateName} <Badge pill>{this.state.stateCounter[stateName]}</Badge>
                                        </ListGroupItem>
                                    );
                                }
                                else {
                                    return null;
                                }
                            }, this)}
                        </ListGroup>
                    </Col>
                </Row>;

                return (
                  <div>
                      {searchBar}
                      {stateCounterMarkup}
                  </div>
                );
            }
        } else {
            return (
                <div>
                    {searchBar}
                    <Row>
                        <Col sm={12} md={{size: 10, offset: 1}}>
                            <Table>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Dealership</th>
                                    <th>Address</th>
                                    <th>City</th>
                                    <th>State</th>
                                    <th>Zip</th>
                                    <th>Phone</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tableBody}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

export default DealerLocator;