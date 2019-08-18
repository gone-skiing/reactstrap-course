import React, {Component} from 'react';
import { Container, Row, Col, Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import './VehicleBrowser.css';
import CardSubtitle from "reactstrap/es/CardSubtitle";
import {NavLink} from "react-router-dom";
import Numeral from 'numeral';

class VehicleBrowser extends Component {
    render() {
        const vehicleSelections = this.props.vehicleData.map(vehicle => {
            return (
                <Col key={vehicle.detailKey + '-vb'} md={Math.ceil(12 / this.props.vehicleData.length)}>
                    <Card >
                        <CardImg top width={"100%"} src={vehicle.thumbnail} alt={vehicle.altText}/>
                        <CardBody>
                            <CardTitle>{vehicle.year} {vehicle.model}</CardTitle>
                            <CardSubtitle>{vehicle.tagline}</CardSubtitle>
                            <CardText>Starting at {Numeral(vehicle.msrp).format('$0,0')}</CardText>
                            <NavLink className="vehicle-browser-link" to={"detail/" + vehicle.detailKey}>Details</NavLink>
                            <NavLink className="vehicle-browser-link" to="/build-and-price">Build and price</NavLink>
                            <NavLink className="vehicle-browser-link" to="/find-a-dealer">Dealers Near You</NavLink>
                        </CardBody>
                    </Card>
                </Col>
            );
        });
        return (
            <div className="vehicle-browser">
                <Container>
                    <Row>
                        {vehicleSelections}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default VehicleBrowser;