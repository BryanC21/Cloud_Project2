import React from "react";
import { Image, Button, Card, Row, Col } from "react-bootstrap";
import Popup from "../main/popup"

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
            item: { name: 'Error' },
        };
    }

    popup(item) {
        this.setState({ item: item, modalShow: true });
    }

    render() {
        const data = this.props.data;
        return (
            <Card className="m-3 p-2">
                <Popup
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                    item={this.state.item}
                />
                <div style={imgDivStyle}>
                    <Image className="card-img-top img-fluid" src={data.image} alt="Card image cap" style={imgStyle} />
                </div>
                <Card.Body>
                    <Card.Title as="h5">{data.name}</Card.Title>
                    <Card.Text>${data.price}</Card.Text>
                    <Card.Text>{data.description}</Card.Text>
                    <Button variant="primary" onClick={() => this.popup(data)}>
                        Add To Order
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}

export default Item;



