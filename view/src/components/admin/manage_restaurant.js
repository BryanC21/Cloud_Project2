import React from 'react';
import { Button, Form, Container } from "react-bootstrap";
import { connect } from 'react-redux';
import { isEmpty } from '../utils';
import store from '../../store';
import { setRestaurant, delRestaurant } from '../../actions/restaurantActions';

class ManageRestaurant extends React.Component {
    constructor(props) {
        super(props);
        if (!isEmpty(props.restaurant)) {
            this.state = {
                id: props.restaurant.id,
                name: props.restaurant.name,
                logo: props.restaurant.logo,
                description: props.restaurant.description,
                phone: props.restaurant.phone,
            };
        } else {
            this.state = {
                logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/1200px-KFC_logo.svg.png",
            };
        }
    }

    handleRestaurantNameChange(e) {
        this.setState({ name: e.target.value });
    }
    handleLogoChange(e) {
        const formData = new FormData();
        const file = e.target.files[0];
        var api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
        var api_path = "/api/uploadImage";
        formData.append('file', file);
        formData.append('file_name', file.name);
        fetch(api + api_path, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.code == 200) {
                    this.setState({ logo: result.data.Location });
                } else {
                    alert(result.message);
                }
            })
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
        var api = process.env.REACT_APP_API || "http://192.168.56.1:4080"
        var api_path = "/api/restaurant/register";
        var restaurant = {
            name: this.state.name,
            logo: this.state.logo,
            description: this.state.description,
            owner_id: this.props.user.id,
            token: this.props.user.token,
        };
        if (this.props.operation === "update") {
            api_path = "/api/restaurant/update";

            restaurant = {
                id: this.state.id,
                name: this.state.name,
                logo: this.state.logo,
                description: this.state.description,
                token: this.props.user.token,
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
                    store.dispatch(setRestaurant(restaurant));
                } else {
                    alert(data.message);
                }
            });
    }

    handleDelete() {
        const api = process.env.REACT_APP_API || "http://192.168.56.1:4080"
        var restaurant = {
            id: this.state.id,
        };
        fetch(api + "/api/restaurant/delete",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    restaurant: restaurant,
                    token: this.props.user.token,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    store.dispatch(delRestaurant());
                    window.location = '/';
                } else {
                    alert(data.message);
                }
            });
    }

    render() {
        return (
            <Container>
                {this.props.operation === "add" ?
                    <h2 className="text-center">Register Your Restaurant</h2>
                    :
                    <h2 className="text-center">Update Your Restaurant</h2>
                }<br />
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
                    {this.props.operation === "update" ?
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

const mapStateToProps = store => {
    return {
        restaurant: store.restaurantState.restaurant,
        user: store.userState.user,
    };
};

export default connect(mapStateToProps)(ManageRestaurant);
