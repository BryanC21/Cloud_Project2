import React, { Component, Fragment } from 'react';
import { Container, Row, Button } from "react-bootstrap";
import Table from '../admin/table';
import TablePopup from '../admin/table_popup';
import { connect } from 'react-redux';

class AdminMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: [],
        };
        this.getTables();
        this.handleAdd = this.handleAdd.bind(this);
        this.getTables = this.getTables.bind(this);
    }
    handleAdd(operation, item) {
        this.setState({ item: item, modalShow: true, operation: operation });
    }
    getTables() {
        var api = process.env.REACT_APP_API || "http://192.168.56.1:4080"
        fetch(api + "/api/restaurant/table/getAll",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    restaurant_id: this.props.restaurant.id,
                    token: this.props.user.token,
                }),
            }
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.code === 200) {
                    this.setState({ tables: data.tables });
                } else {
                    alert(data.message);
                }
            });
    }
    render() {
        return (
            <>
                <>
                    {
                        this.state.modalShow ?
                            <TablePopup
                                show={this.state.modalShow}
                                onHide={() => this.setState({ modalShow: false })}
                                table={this.state.item}
                                operation={this.state.operation}
                                getTables={this.getTables}
                            />
                            :
                            <></>
                    }
                </>
                <Container>
                    {this.state.tables && this.state.tables.length ? this.state.tables.map((table, index) => (
                        <Fragment key={`${table}~${index}`}>
                            <Row>
                                <Table table={table} handleAdd={this.handleAdd} getTables={this.getTables} />
                            </Row>
                        </Fragment>
                    ))
                        : <></>
                    }
                    <Button variant="primary" className="mb-2" onClick={() => {this.handleAdd("add", null) }} >Add Table</Button><br />
                </Container>
                <br />
            </>
        );
    }
}

const mapStateToProps = store => {
    return {
        restaurant: store.restaurantState.restaurant,
        user: store.userState.user,
    };
};

export default connect(mapStateToProps)(AdminMain);
