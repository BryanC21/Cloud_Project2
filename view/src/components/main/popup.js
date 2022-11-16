import React from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from 'react-redux';
import { setOrder } from '../../actions/orderActions';
import store from '../../store';

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
            quantity: 1,
        }
    }

    handleAdd() {
        const order = [...this.props.order, { ...this.props.item, item_id: this.props.item.id, quantity: this.state.quantity, status: "Waiting" }]
        store.dispatch(setOrder(order));
        this.props.onHide();
    }
    handleQuantityChange(e) {
        this.setState({ quantity: e.target.value });
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
                    <img className="card-img-top img-fluid" src={this.props.item.image} alt="Card image cap" style={imgStyle}></img>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{this.props.item.name}</h5>
                    <p className="card-text">${this.props.item.price}</p>
                    <p className="card-text">{this.props.item.description}</p>
                </div>
                <div className="p-3">
                    <Form.Label>Quantity</Form.Label>
                    <input type="number" className="form-control w-75" min="1" value={this.state.quantity} onChange={(e) => this.handleQuantityChange(e)} />
                    {this.props.item.extra && this.props.item.extra.length ? this.props.item.extra.map((pref, index) => (
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
                    <Button onClick={() => this.handleAdd()}>Add To Order</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const mapStateToProps = store => {
    return {
        order: store.orderState.order,
    }
}

export default connect(mapStateToProps)(Popup);
