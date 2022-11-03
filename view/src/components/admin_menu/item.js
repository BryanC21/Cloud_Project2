import React from "react";
import { Image, Button, Card, Row, Col } from "react-bootstrap";
import PrefPopup from "../admin_menu/pref_popup"

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
            modalShow: false,
        };
    }

    popup(item) {
        item.extra = [];
        this.setState({ item: item, modalShow: true, operation: "update" });
    }
    handleAdd() {
        this.setState({ item: null, modalShow: true, operation: "add" });
    }
    handleDelete(id) {
        const api = process.env.API || "http://192.168.56.1:4080"
        fetch(api + "/api/restaurant/menu/delete",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'id': id,
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
        this.props.getMenu();
    }

    render() {
        return (
            <>
                <Row>
                    <>
                        {
                            this.state.modalShow ?
                                <PrefPopup
                                    show={this.state.modalShow}
                                    onHide={() => this.setState({ modalShow: false })}
                                    item={this.state.item}
                                    categories={this.props.categories}
                                    operation={this.state.operation}
                                    getMenu={this.props.getMenu}
                                    restaurant={this.props.restaurant}
                                />
                                :
                                <></>
                        }
                    </>
                    {this.props.items && this.props.items.length ? this.props.items.map((item, index) => (
                        <Col xs="12" lg="3">
                            <Card className="m-3 p-2 items-body">
                                <div style={imgDivStyle}>
                                    <Image className="card-img-top img-fluid" src={item.image} alt="Card image cap" style={imgStyle} />
                                </div>
                                <Card.Body>
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">${item.price}</p>
                                    <p className="card-text">{item.description}</p>

                                    <Button className="mt-3 me-2" variant="primary" onClick={() => this.popup(item)}>
                                        Edit
                                    </Button>
                                    <Button className="mt-3" variant="danger" onClick={() => this.handleDelete(item.id)}>
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
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

export default Item;

