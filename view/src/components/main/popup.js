import React from 'react';
import { Modal, Button, Form } from "react-bootstrap";

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
            ...props,
        }
    }
    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <div style={popupDivStyle} className="p-2">
                    <img className="card-img-top img-fluid" src={this.state.item.image} alt="Card image cap" style={imgStyle}></img>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{this.state.item.name}</h5>
                    <p className="card-text">${this.state.item.price}</p>
                    <p className="card-text">{this.state.item.description}</p>
                </div>
                <div className="p-3">
                    <Form.Label>Quantity</Form.Label>
                    <input type="number" className="form-control w-75" min="1" defaultValue="1"></input>
                    {this.state.item.extra && this.state.item.extra.length ? this.state.item.extra.map((pref, index) => (
                        <div className="form-group mt-2">
                            <label>{pref.name}</label>
                            <Form.Select className="w-75" id="exampleFormControlSelect1">
                                {pref.options && pref.options.length ? pref.options.map((option, index) => (
                                    <option value="option.id">{option.name}</option>
                                )) : ("")}
                            </Form.Select>
                        </div>
                    )) : ("")}
                </div>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Add To Order</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Popup;
