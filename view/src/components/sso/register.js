import React from 'react';
import { Button, Form } from "react-bootstrap";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            phone: "",
            password: "",
            rePassword: "",
            accountType: "user",
        }
    }

    handleFirstNameChange(e) {
        this.setState({ firstName: e.target.value });
    }
    handleLastNameChange(e) {
        this.setState({ lastName: e.target.value });
    }
    handlePhoneChange(e) {
        this.setState({ phone: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }
    handleRePasswordChange(e) {
        this.setState({ rePassword: e.target.value });
    }
    handleAccountTypeChange(e) {
        this.setState({ accountType: e.target.value });
    }

    handleRegister(e) {
        const api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
        fetch(api + "/createUser",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': "",
                },
                body: JSON.stringify({
                    'first_name': this.state.firstName,
                    'last_name': this.state.lastName,
                    'phone_number': this.state.phone,
                    'password': this.state.password,
                    'reenter_password': this.state.rePassword,
                    'level': this.state.accountType,
                }),
            }
        )
            .then((data) => {
                if (data.status === 200) {
                    this.props.setK('signin');
                } else {
                    alert(data.body.message);
                }
            });
    }


    render() {
        return (
            <Form>
                <Form.Group className="mb-3" controlId="registerFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your First Name" value={this.state.firstName} onChange={e => this.handleFirstNameChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Your Last Name" value={this.state.lastName} onChange={e => this.handleLastNameChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="phone" placeholder="Enter Phone Number" value={this.state.phone} onChange={e => this.handlePhoneChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={e => this.handlePasswordChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerRePassword">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control type="password" placeholder="Repeat Password" value={this.state.rePassword} onChange={e => this.handleRePasswordChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="registerAccountType">
                    <Form.Label>Account Type</Form.Label>
                    <Form.Select id="account-type" value={this.state.accountType} onChange={e => this.handleAccountTypeChange(e)}>
                        <option value="user">Customer</option>
                        <option value="admin">Merchant</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" onClick={e => this.handleRegister(e)}>
                    Register
                </Button>
            </Form>
        )
    }
}

export default Register;
