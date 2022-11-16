import React from 'react';
import { Button, Form } from "react-bootstrap";
import store from '../../store';
import { setUser } from '../../actions/userActions';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handlePhoneChange(e) {
        this.setState({ phone: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }
    handleSignin() {
        const api = process.env.REACT_APP_API || "http://192.168.56.1:4080"
        fetch(api + "/login",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'phone_number': this.state.phone,
                    'password': this.state.password,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    sessionStorage.setItem("token", data.accessToken);
                    const user = {
                        id: data.userinfo[0].id,
                        phone: data.userinfo[0].phone_number,
                        firstName: data.userinfo[0].first_name,
                        lastName: data.userinfo[0].last_name,
                        level: data.userinfo[0].level,
                        token: data.accessToken,
                    }
                    store.dispatch(setUser(user));
                    if (user.level === "admin") {
                        window.location.href = "/";
                    }
                } else {
                    alert(data.message);
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
                <Button variant="primary" onClick={() => this.handleSignin()}>
                    Sign In
                </Button>
            </Form>
        )
    }
}

export default Signin;
