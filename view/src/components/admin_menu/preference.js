import React, { Fragment } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import Options from "../admin_menu/options"


class Preference extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...props };
    }

    handleAddFields() {
        const values = [...this.state.data];
        values.push({ name: '', options: [{ name: '' }] });
        this.setState({ data: values })
    };

    handleRemoveFields(index) {
        const values = [...this.state.data];
        values.splice(index, 1);
        this.setState({ data: values })
    };

    handleInputChange(index, value) {
        const values = [...this.state.data];
        values[index].name = value;
        this.setState({ data: values })
    };

    handleSubmit(e) {
        e.preventDefault();
        // handle form submission here
        alert(JSON.stringify(this.state.data, null, 2))
    };

    resetForm() {
        this.setState({ data: [...this.props.data] });
    }

    render() {
        return (
            <div className="mb-3">
                {this.state.data.map((item, index) => (
                    <Fragment key={`${item}~${index}`}>
                        <Form.Group className="mb-2">
                            <Row className="mb-2">
                                <Col lg="9">
                                    <Form.Label>Preference Name: </Form.Label>
                                    <Form.Control type="text" className="form-control" defaultValue={item.name} onChange={e => this.handleInputChange(index, e.target.value)}/>
                                </Col>
                                <Col className="m-auto">
                                    <Button variant="danger" onClick={() => this.handleRemoveFields(index)} >Remove</Button>
                                </Col>
                            </Row>
                            <Form.Label>Preference Options: </Form.Label>
                            <Options data={item.options} />
                        </Form.Group>
                    </Fragment>
                ))}
                <Button className="mt-3" onClick={() => this.handleAddFields()}>Add Preference</Button>
            </div>
        );
    }
};

export default Preference;
