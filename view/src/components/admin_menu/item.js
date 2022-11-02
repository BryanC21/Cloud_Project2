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
            item: this.props.item,
        };
    }

    popup(item) {
        this.setState({ item: item, modalShow: true });
    }

    render() {
        return (
            <Card className="m-3 p-2 items-body">
                {this.state.modalShow ?
                    <PrefPopup
                        show={this.state.modalShow}
                        onHide={() => this.setState({ modalShow: false })}
                        item={this.state.item}
                        categories={this.props.categories}
                    />
                    :
                    <></>
                }
                <div style={imgDivStyle}>
                    <Image className="card-img-top img-fluid" src={this.state.item.img} alt="Card image cap" style={imgStyle} />
                </div>
                <Card.Body>
                    <h5 className="card-title">{this.state.item.name}</h5>
                    <p className="card-text">${this.state.item.price}</p>
                    <p className="card-text">{this.state.item.description}</p>

                    <Button className="mt-3" variant="primary" onClick={() => this.popup(this.state.item)}>
                        Edit
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}

export default Item;

