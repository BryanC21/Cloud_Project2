import React, { Fragment } from 'react';
import { Form, Modal, Button, Card, Row, Col } from "react-bootstrap";
import { connect } from 'react-redux';

class TablePopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.table ? props.table.id : '',
            name: props.table ? props.table.name : '',
            capacity: props.table ? props.table.capacity : 1,
            description: props.table ? props.table.description : '',
        }
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }
    handleCapacityChange(e) {
        this.setState({ capacity: e.target.value });
    }
    handleDescriptionChange(e) {
        this.setState({ description: e.target.value });
    }

    handleManage() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
        var api_path = "/api/restaurant/table/add";
        var body = {
            table_name: this.state.name,
            description: this.state.description,
            capacity: this.state.capacity,
            restaurant_id: this.props.restaurant.id,
            table_status: "Empty",
            token: this.props.user.token,
        };
        if (this.props.operation === "update") {
            api_path = "/api/restaurant/table/update";
            body = {
                table_id: this.state.id,
                table_name: this.state.name,
                description: this.state.description,
                capacity: this.state.capacity,
                table_status: this.props.table.status,
                restaurant_id: this.props.table.restaurant_id,
                token: this.props.user.token,
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
            .then(response => response.json())
            .then(data => {
                if (data.code === 200) {
                    body.id = data.table.id;
                } else {
                    alert(data.message);
                }
            })
        this.props.onHide();
        this.props.getTables();
    }
    handleDelete() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:4080";
        fetch(api + "/api/restaurant/table/delete",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    table_id: this.state.id,
                    token: this.props.user.token,
                }),
            }
        )
            .then(response => response.json())
            .then(data => {
                if (data.code !== 200) {
                    alert(data.message);
                }
            })
        this.props.onHide();
        this.props.getTables();
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
                    <Form.Label>Table Name:</Form.Label>
                    <Form.Control type="text" className="form-control w-75" value={this.state.name} onChange={e => this.handleNameChange(e)} />
                    <Form.Label>Capacity:</Form.Label>
                    <Form.Control type="number" className="form-control w-75" min="1" value={this.state.capacity} onChange={e => this.handleCapacityChange(e)} />
                    <Form.Label>Description:</Form.Label>
                    <Form.Control as="textarea" className="form-control w-75" rows="3" value={this.state.description} onChange={e => this.handleDescriptionChange(e)} />
                </Card.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => { this.handleDelete() }}>Delete Table</Button>
                    <Button onClick={() => { this.handleManage() }}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = store => {
    return {
        restaurant: store.restaurantState.restaurant,
        user: store.userState.user,
    };
};

export default connect(mapStateToProps)(TablePopup);
