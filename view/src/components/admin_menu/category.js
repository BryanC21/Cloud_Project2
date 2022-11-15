import React, { Fragment } from "react";
import { Button, Form, Card, Row, Col, Container } from "react-bootstrap";
import Item from "../admin_menu/item"
import { PlusCircle, XCircle } from 'react-bootstrap-icons';

class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...props};
    }

    handleAddFields() {
        const values = [...this.state.data];
        values.push({ name: '' });
        this.setState({ data: values })
    };

    handleRemoveFields(index) {
        const values = [...this.state.data];
        values.splice(index, 1);
        this.setState({ data: values });
    };

    handleInputChange(index, value) {
        const values = [...this.state.data];
        values[index].name = value;
        this.setState({ data: values })
    };

    render() {
        return (
            <>
                <Row className="mb-2">
                    {this.state.data && this.state.data.length ? this.state.data.map((item, index) => (
                        <Fragment key={`${item}~${index}`}>
                            <Col xs="12" lg="3">
                                <Card className="mb-2 p-3 items-body">
                                    <Card.Title>{this.state.data.name}</Card.Title>
                                    <div>
                                        <Col sm="6">
                                            <Form.Label htmlFor="option">
                                                Category {index + 1} <a href="#"><XCircle color="red" size="20" onClick={() => this.handleRemoveFields(index)} /></a>
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                id={"item_" + index}
                                                name={"item_" + index}
                                                value={item.name}
                                                onChange={e => this.handleInputChange(index, e.target.value)}
                                            />
                                        </Col>
                                    </div>
                                </Card>
                            </Col>
                        </Fragment>
                    ))
                        : <></>
                    }
                </Row>
                <Button variant="primary" className="mb-2" onClick={() => this.handleAddFields()} >Add Category</Button><br />
                <Button variant="primary" onClick={() => this.handleAddFields()} >Save Changes</Button>
            </>
        )
    }
}

export default Category;
