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
            id: this.props.item ? this.props.item.id : '',
            name: this.props.item ? this.props.item.name : '',
            price: this.props.item ? this.props.item.price : '',
            description: this.props.item ? this.props.item.description : '',
            image: this.props.item ? this.props.item.image : '',
            extra: []
        }
    }
    addOption(i) {
        this.state.item.extra[i].options.push({ name: '' });
    }
    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }
    handlePriceChange(e) {
        this.setState({ price: e.target.value });
    }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }
    handleImageChange(e) {
        this.setState({ image: e.target.value });
    }
    handleManage() {
        var api = process.env.API || "http://192.168.56.1:4080"
        var api_path = "/api/restaurant/menu/add"
        var body = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            image: this.state.image,
            restaurant_id: this.props.restaurant.id,
        };
        if (this.props.operation === "update") {
            api_path = "/api/restaurant/menu/update"
            body = {
                id: this.state.id,
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                image: this.state.image,
            };
        }
        fetch(api + api_path,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    body.id = data.menu_id
                    this.props.getMenu();
                } else {
                    alert(data.message);
                }
            });
        this.props.onHide();
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
                        <img className="card-img-top img-fluid" src={this.state.image} alt="No Image Available" style={imgStyle} onChange={e => this.handleImageChange(e)}  /><br />
                        <label>Image</label>
                        <Form.Control className="form-control w-75" type="file" />
                    </div>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" className="form-control w-75" value={this.state.name} onChange={e => this.handleNameChange(e)} />
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type="number" className="form-control w-75" min="1" value={this.state.price} onChange={e => this.handlePriceChange(e)} />
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" className="form-control w-75" rows="3" value={this.state.description} onChange={e => this.handleDescriptionChange(e)} />
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
                    <Preference data={this.state.extra} />
                </Card.Body>
                <Modal.Footer>
                    <Button onClick={() => { this.handleManage() }}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Popup;
