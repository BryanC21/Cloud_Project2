import React from 'react';
import { Button, Form, Container } from "react-bootstrap";

class ManageRestaurant extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.restaurant) {
            this.state = {
                word: "Update",
                id: this.props.restaurant.id,
                name: this.props.restaurant.name,
                logo: this.props.restaurant.logo,
                description: this.props.restaurant.description,
                phone: this.props.restaurant.phone,
            }
        } else {
            this.state = {
                word: "Register",
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png"
            }
        }
    }

    handleRestaurantNameChange(e) {
        this.setState({ name: e.target.value });
    }
    handleLogoChange(e) {
        this.setState({ logo: e.target.value });
    }
    handlePhoneChange(e) {
        this.setState({ phone: e.target.value });
    }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }
    handleAgreeChange() {
        if (this.state.agree === "on") {
            this.setState({ agree: "" });
        } else {
            this.setState({ agree: "on" });
        }
    }

    handleRegister(e) {
        if (this.state.word === "update") {
            const api = process.env.API || "http://192.168.56.1:4080"
            const restaurant = {
                id: this.state.id,
                name: this.state.name,
                logo: this.state.logo,
                description: this.state.description,
            };
            fetch(api + "/api/restaurant/update",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(restaurant),
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.code === 200) {
                        restaurant.id = data.restaurantId
                        this.props.setRestaurant(restaurant);
                    } else {
                        alert(data.Message);
                    }
                });
        } else {
            const api = process.env.API || "http://192.168.56.1:4080"
            const restaurant = {
                name: this.state.name,
                logo: this.state.logo,
                description: this.state.description,
                ownerId: this.props.user.id,
            };
            fetch(api + "/api/restaurant/register",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(restaurant),
                }
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.code === 200) {
                        restaurant.id = data.restaurantId
                        this.props.setRestaurant(restaurant);
                    } else {
                        alert(data.Message);
                    }
                });
        }
        
    }

    render() {
        return (
            <Container>
                <h2 className="text-center">{this.state.word} Your Restaurant</h2><br/>
                <Form>
                    <Form.Group className="my-3" controlId="restaurantName">
                        <Form.Label>Restaurant Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Restaurant Name" value={this.state.name} onChange={e => this.handleRestaurantNameChange(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="restaurantLogo">
                        <Form.Label>Restaurant Logo</Form.Label>
                        <Form.Control type="file" onChange={e => this.handleLogoChange(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="restaurantPhone">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="phone" placeholder="Enter Phone Number" value={this.state.phone} onChange={e => this.handlePhoneChange(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="restaurantDescription">
                        <Form.Label>Restaurant Description:</Form.Label>
                        <Form.Control as="textarea" className="form-control" rows="3" defaultValue={this.state.description} onChange={e => this.handleDescriptionChange(e)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="registerCheckbox">
                        <Form.Check type="checkbox" label="I have read and agree to the terms" checked={this.state.agree} onClick={e => this.handleAgreeChange()} />
                    </Form.Group>
                    <Button variant="primary" onClick={e => this.handleRegister(e)}>{this.state.word}</Button>
                </Form>
            </Container>
        )
    }
}

export default ManageRestaurant;
