import React from 'react';
import { Button, Form } from "react-bootstrap";

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
                if (data.status === 200) {
                    console.log(data.accessToken);
                    //sessionStorage.setItem("token", data.body.token);
                    //const user = {
                    //    id: data.body.user.id,
                    //    phone: data.body.user.mobile_number,
                    //    username: data.body.user.username,
                    //    firstName: data.body.user.first_name,
                    //    lastName: data.body.user.last_name,
                    //    level: data.body.user.level,
                    //}
                    //this.props.setUser(user);
                    //this.props.setModalShow(false);
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
