import React, {Component} from 'react';
import {Alert, InputGroup, InputGroupAddon, Card, CardText, CardBody, CardTitle, CardSubtitle, Button, Form, FormGroup, Input} from 'reactstrap';
import axios from 'axios';
import './TestFlightForm.css';

class TestFlightForm extends Component {
    constructor(props) {
        super(props);
        this.state = {showSuccess: false, showDanger: false};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange(eventData) {
        const target = eventData.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    onSubmit (eventData) {
        eventData.preventDefault();

        axios.post("http://localhost:3001/mailingList", {
            customerName: this.state.customerName,
            phone: this.state.phone,
            email: this.state.email,
            budget: this.state.budget,
        })
            .then(() => this.setState({showSuccess: true, showDanger: false}))
            .catch(() => this.setState({showSuccess: false, showDanger: true}));
    }

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <CardTitle>Schedule a Test Flight</CardTitle>
                        <CardSubtitle>No pilot's license required!</CardSubtitle>
                        <CardText>Fill out form fields below to schedule a test flight.</CardText>
                        <Form>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="customerName"
                                    onChange={this.handleInputChange}
                                    d="customerName"
                                    placeholder="What is your name?"/>
                            </FormGroup>
                            <br/>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="phone"
                                    onChange={this.handleInputChange}
                                    id="phone"
                                    placeholder="What is your contact number?"/>
                            </FormGroup>
                            <br/>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                                <Input
                                    type="text"
                                    name="email"
                                    onChange={this.handleInputChange}
                                    id="email"
                                    placeholder="What is your email address?" />
                            </InputGroup>
                            <br/>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                <Input
                                    type="text"
                                    name="budget"
                                    onChange={this.handleInputChange}
                                    id="budget"
                                    placeholder="Do you have a budget you need to stay under?" />
                            </InputGroup>
                        </Form>
                        <br/>
                        <Button onClick={this.onSubmit}>Submit</Button>
                            <Alert color="success" isOpen={this.state.showSuccess}>
                                Your data were submitted successfully. Your flight awaits!
                            </Alert>
                            <Alert color="danger" isOpen={this.state.showDanger}>
                                Submit failed. Please try again...
                            </Alert>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default TestFlightForm;