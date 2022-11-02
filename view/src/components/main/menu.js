import React, { Fragment } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Popup from "../main/popup"
import Item from "../main/item";

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const data = this.props.data;
        return (
            <div className="col-lg-9 pt-5">
                {data.length ? data.map((categoryItem, index) => (
                    <Fragment key={`${categoryItem}~${index}`}>
                        <Row className='mb-5'>
                            <div><h1 id={"category_" + categoryItem.id}>{categoryItem.name}</h1></div>
                            {categoryItem.menu.length ? categoryItem.menu.map((item, index) => (
                                <Fragment key={`${item}~${index}`}>
                                    <Col xs={12} md={6}>
                                        <Item data={item }/>
                                    </Col>
                                </Fragment>
                            ))
                                : (
                                    <p>No items in cart</p>
                                )}
                        </Row>
                    </Fragment>
                ))
                    : (
                        <p>No items in cart</p>
                    )}
            </div>
        );
    }
}

export default Menu;
