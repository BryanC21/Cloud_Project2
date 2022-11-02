import React from 'react';
import { Form, Modal, Button, Card, Row, Col } from "react-bootstrap";
import Preference from "../admin_menu/preference"

const popupDivStyle = {
    width: '100%',
};
const imgStyle = {
    objectFit: 'contain',
    aspectRatio: 1.2,
    m: 'auto',
};

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.item,
        }
    }
    addOption(i) {
        this.state.item.extra[i].options.push({ name: '' });
    }

    render() {
        const categories = this.props.categories;
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Card.Body>
                    <div style={popupDivStyle}>
                        <img className="card-img-top img-fluid" src={this.state.item.img} alt="Card image cap" style={imgStyle} />
                        <label>Image</label>
                        <Form.Control className="form-control w-75" type="file" />
                    </div>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" className="form-control w-75" defaultValue={this.state.item.name} />
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type="number" className="form-control w-75" min="1" defaultValue={this.state.item.price} />
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" className="form-control w-75" rows="3" defaultValue={this.state.item.description} />
                    <Form.Label>Categories:</Form.Label>
                    {categories && categories.length ? categories.map((item, index) => (
                        <Form.Group className="mb-3" controlId={"formBasicCheckbox_" + item.name}>
                            <Form.Check type="checkbox" label={item.name} />
                        </Form.Group>
                    ))
                        :
                        <></>
                    }
                </Card.Body>
                <Card.Body>
                    <h4>Preferences:</h4>
                    <Preference data={this.state.item.extra} />
                </Card.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Popup;
