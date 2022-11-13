import React from 'react';
import { Button, Form } from "react-bootstrap";
import env from "../data/static"

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    handlePhoneChange(e) {
        this.setState({ phone: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }
    handleSignin(e) {
        const sso_url = process.env.SSO_URL || "https://oyygn6heb6.execute-api.us-west-1.amazonaws.com/prod/";
        const sso_key = process.env.SSO_KEY || "U3T0Z9LBfY3S8ml1w7amnm20GIwy0kF75MjeXA2i";
        fetch(sso_url + "/login",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': sso_key,
                },
                body: JSON.stringify({
                    'mobile_number': this.state.phone,
                    'password': this.state.password,
                }),
            }
        )
            .then((response) => response.json().then(data => ({ status: response.status, body: data })))
            .then((data) => {
                if (data.status === 200) {
                    sessionStorage.setItem("token", data.body.token);
                    const user = {
                        id: data.body.user.id,
                        phone: data.body.user.mobile_number,
                        username: data.body.user.username,
                        firstName: data.body.user.first_name,
                        lastName: data.body.user.last_name,
                        level: data.body.user.level,
                    }
                    this.props.setUser(user);
                    this.props.setModalShow(false);
                } else {
                    alert(data.body.message);
                }
            });
    }

    render() {
        return (
            <Form>
                <Form.Group className="mb-3" controlId="signinPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="phone" placeholder="Enter Phone Number" value={this.state.phone || ''} onChange={e => this.handlePhoneChange(e)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signinPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.password || ''} onChange={e => this.handlePasswordChange(e)} />
                </Form.Group>
                <Button variant="primary" onClick={e => this.handleSignin(e)}>
                    Sign In
                </Button>
            </Form>
        )
    }
}

export default Signin;
