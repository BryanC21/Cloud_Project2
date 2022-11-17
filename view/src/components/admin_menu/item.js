import React, { Fragment } from "react";
import { Image, Button, Card, Row, Col } from "react-bootstrap";
import ItemPopup from "../admin_menu/item_popup"
import { connect } from 'react-redux';

const imgDivStyle = {
    width: '100%',
};
const imgStyle = {
    objectFit: 'contain',
    aspectRatio: 1.2,
    m: 'auto',
};

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            modalShow: false,
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps });
    }

    popup(item) {
        item.extra = [];
        this.setState({ item: item, modalShow: true, operation: "update" });
    }
    handleAdd() {
        this.setState({ item: null, modalShow: true, operation: "add" });
    }
    handleDelete(id) {
        const api = process.env.REACT_APP_API || "http://192.168.56.1:4080"
        fetch(api + "/api/restaurant/menu/delete",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    token: this.props.user.token,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    window.location = '/admin-menu';
                } else {
                    alert(data.message);
                }
            });
        this.state.getMenu();
    }

    render() {
        return (
            <>
                <Row>
                    <>
                        {
                            this.state.modalShow ?
                                <ItemPopup
                                    show={this.state.modalShow}
                                    onHide={() => this.setState({ modalShow: false })}
                                    item={this.state.item}
                                    operation={this.state.operation}
                                    getMenu={this.state.getMenu}
                                />
                                :
                                <></>
                        }
                    </>
                    {this.state.items && this.state.items.length ? this.state.items.map((item, index) => (
                        <Fragment key={`${item}~${index}`}>
                        <Col xs="12" lg="3">
                            <Card className="m-3 p-2 items-body">
                                <div style={imgDivStyle}>
                                    <Image className="card-img-top img-fluid" src={item.image} alt="Card image cap" style={imgStyle} />
                                </div>
                                <Card.Body>
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">${item.price}</p>
                                        <p className="card-text">{item.description}</p>
                                        <p className="card-text">Categories:<br/>{item.categories.join(", ") }</p>
                                    <Button className="mt-3 me-2" variant="primary" onClick={() => this.popup(item)}>
                                        Edit
                                    </Button>
                                    <Button className="mt-3" variant="danger" onClick={() => this.handleDelete(item.id)}>
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                            </Fragment>
                    ))
                        :
                        <></>
                    }
                </Row>
                <Button variant="primary" className="mb-2" onClick={() => this.handleAdd()} >Add Item</Button><br />
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.userState.user,
    };
};

export default connect(mapStateToProps)(Item);

