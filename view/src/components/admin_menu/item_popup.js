import React, { Fragment } from 'react';
import { Form, Modal, Button, Card, Row, Col } from "react-bootstrap";
import Preference from "../admin_menu/preference"
import { connect } from 'react-redux';

const popupDivStyle = {
    width: '100%',
};
const imgStyle = {
    objectFit: 'contain',
    aspectRatio: 1.2,
    m: 'auto',
};

class ItemPopup extends React.Component {
    constructor(props) {
        super(props);
        const categories = [];
        if (props.item) {
            props.item.categories.map((category, index) => {
                categories.push({ name: category });
            });
        } else {
            categories.push({ name: "Main" });
        }
        this.state = {
            id: props.item ? props.item.id : '',
            name: props.item ? props.item.name : '',
            price: props.item ? props.item.price : '',
            description: props.item ? props.item.description : '',
            image: props.item ? props.item.image : 'https://www.in-n-out.com/Frontend-Assembly/Telerik.Sitefinity.Frontend/content/images/menu/ingredients/double-double.jpg?v=1.1&package=INNOUT',
            extra: [],
            categories: categories,
        }
    }

    handleAddFields() {
        const values = [...this.state.categories];
        values.push({ name: '' });
        this.setState({ categories: values })
    };

    handleRemoveFields(index) {
        const values = [...this.state.categories];
        values.splice(index, 1);
        this.setState({ categories: values })
    };

    handleInputChange(index, value) {
        const values = [...this.state.categories];
        values[index].name = value;
        this.setState({ categories: values })
    };

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
                    this.setState({ image: result.data.Location });
                } else {
                    alert(result.message);
                }
            })
    }
    async handleManage() {
        const categories = [];
        this.state.categories.map((item, index) => (categories.push(item.name)));
        if (categories.length === 0) {
            categories.push("Main");
        }
        var api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
        var api_path = "/api/restaurant/menu/add";
        var body = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            image: this.state.image,
            restaurant_id: this.props.restaurant.id,
            categories: categories,
            token: this.props.user.token,
        };
        if (this.props.operation === "update") {
            api_path = "/api/restaurant/menu/updateWithCategory";
            body = {
                id: this.state.id,
                name: this.state.name,
                description: this.state.description,
                price: this.state.price,
                image: this.state.image,
                restaurant_id: this.props.restaurant.id,
                categories: categories,
                token: this.props.user.token,
            };
        }
        const response = await fetch(api + api_path,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            }
        );
        const data = await response.json();
        if (data.code === 200) {
            body.id = data.menu_id
        } else {
            alert(data.message);
        }
        await this.props.onHide();
        await this.props.getMenu();
    }

    render() {
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
                        <img className="card-img-top img-fluid" src={this.state.image} alt="No Image Available" style={imgStyle} /><br />
                        <label>Image</label>
                        <Form.Control className="form-control w-75" type="file" onChange={e => this.handleImageChange(e)} />
                    </div>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" className="form-control w-75" value={this.state.name} onChange={e => this.handleNameChange(e)} />
                    <Form.Label>Price:</Form.Label>
                    <Form.Control type="number" className="form-control w-75" min="1" value={this.state.price} onChange={e => this.handlePriceChange(e)} />
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" className="form-control w-75" rows="3" value={this.state.description} onChange={e => this.handleDescriptionChange(e)} />
                    <Form.Label>Categories:</Form.Label>
                    <Form.Group>
                        {this.state.categories.map((item, index) => (
                            <Fragment key={`${item}~${index}`}>
                                <Form.Group className="mb-2">
                                    <Row className="mb-2">
                                        <Col lg="9">
                                            <Form.Label>Category Name: </Form.Label>
                                            <Form.Control type="text" className="form-control" value={item.name} onChange={e => this.handleInputChange(index, e.target.value)} />
                                        </Col>
                                        <Col className="m-auto">
                                            <Button variant="danger" onClick={() => this.handleRemoveFields(index)} >Remove</Button>
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Fragment>
                        ))}
                        <Button className="mt-3" onClick={() => this.handleAddFields()}>Add Category</Button>
                    </Form.Group>
                </Card.Body>
                {/*<Card.Body>*/}
                {/*    <h4>Preferences:</h4>*/}
                {/*    <Preference data={this.state.extra} />*/}
                {/*</Card.Body>*/}
                <Modal.Footer>
                    <Button onClick={() => { this.handleManage() }}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
        restaurant: store.restaurantState.restaurant,
    };
};

export default connect(mapStateToProps)(ItemPopup);
