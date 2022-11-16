import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";

const imgDivStyle = {
    width: '100%',
};
const imgStyle = {
    objectFit: 'contain',
    aspectRatio: 1.2,
    m: 'auto',
};

class Restaurant extends React.Component {
    render() {
        const data = this.props.data;
        return (
            <Card className="mb-5 items-body">
                <a href={"/restaurant?restaurant_id=" + data.id} className="text-decoration-none text-reset">
                <Row>
                    <Col xs="12" lg="2">
                        <div style={imgDivStyle}>
                            <Image className="card-img-top img-fluid" src={data.logo} alt="Card image cap" style={imgStyle} />
                        </div>
                    </Col>
                    <Col>
                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <p className="card-text">Description: {data.description}</p>
                        </Card.Body>
                        </Col>
                    </Row>
                    </a>
            </Card>
        );
    }
}

export default Restaurant;
