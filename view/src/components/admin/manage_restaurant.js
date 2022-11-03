import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container } from "react-bootstrap";

class ManageRestaurant extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.restaurant) {
            this.state = {
                id: this.props.restaurant.id,
                name: this.props.restaurant.name,
                logo: this.props.restaurant.logo,
                description: this.props.restaurant.description,
                phone: this.props.restaurant.phone,
            }
        } else {
            this.state = {
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png"
            }
        }
        this.setState({ operation: this.props.operation });
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

    handleRegister() {
        var api = process.env.API || "http://192.168.56.1:4080"
        var api_path = "/api/restaurant/register";
        var restaurant = {
            name: this.state.name,
            logo: this.state.logo,
            description: this.state.description,
            ownerId: this.props.user.id,
        };
        if (this.props.operation === "update") {
            api_path = "/api/restaurant/update";

            restaurant = {
                id: this.state.id,
                name: this.state.name,
                logo: this.state.logo,
                description: this.state.description,
            };
        }

        fetch(api + api_path,
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
                    alert(data.message);
                }
            });
    }

    handleDelete() {
        console.log(this.state);
        const api = process.env.API || "http://192.168.56.1:4080"
        const restaurant = {
            id: this.state.id,
        };
        fetch(api + "/api/restaurant/delete",
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
                    alert(data.message);
                    window.location = '/';
                } else {
                    alert(data.message);
                }
            });
    }

    render() {
        return (
            <Container>
                <h2 className="text-center">{this.state.operation} Your Restaurant</h2><br />
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
                        <Form.Check type="checkbox" label="I have read and agree to the terms" checked={this.state.agree} onClick={() => this.handleAgreeChange()} />
                    </Form.Group>
                    {this.state.operation === "update" ?
                        <>
                            <Button variant="primary" className="me-3" onClick={() => this.handleRegister()}>Update</Button>
                            <Button variant="primary" variant="danger" onClick={() => this.handleDelete()}>Delete Restaurant</Button>
                        </>
                        :
                        <>
                            <Button variant="primary" className="me-3" onClick={() => this.handleRegister()}>Register</Button>
                        </>
                    }
                </Form>
            </Container>
        )
    }
}

export default ManageRestaurant;
