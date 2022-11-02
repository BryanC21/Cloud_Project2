import React from 'react';
import { Button, Form } from "react-bootstrap";
import env from "../data/static"

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handlePhoneChange(e) {
        this.setState({ phone: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }
    handleSignin(e) {
        fetch(env.sso_url + "/login",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': env.sso_key,
                },
                body: JSON.stringify({
                    'username': this.state.phone,
                    'password': this.state.password,
                }),
            }
        )
            .then((response) => response.json().then(data => ({ status: response.status, body: data })))
            .then((data) => {
                if (data.status === 200) {
                    sessionStorage.setItem("token", data.body.token);
                    this.props.setUser(data.body.user);
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
