import React from 'react';
import { Modal, Tab, Tabs, Container } from "react-bootstrap";
import Signin from '../sso/signin'
import Register from '../sso/register'

class SSO extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: "signin",
        }
        this.setK = this.setK.bind(this);
    }
    setK(k) {
        this.setState({ activeKey: k });
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="pb-5">
                    <Container >
                        <Tabs id="sso-tab" className="mb-3 justify-content-md-center" activeKey={this.state.activeKey} onSelect={(k) => this.setK(k)}>
                            <Tab eventKey="signin" title="Sign In">
                                <Signin setUser={this.props.setUser} setModalShow={this.props.setModalShow} />
                            </Tab>
                            <Tab eventKey="register" title="Register" >
                                <Register setK={this.setK} />
                            </Tab>
                        </Tabs>
                    </Container>
                </Modal.Body>
            </Modal>
        )
    }
}

export default SSO;
