import React, { Component, Fragment } from 'react';
import { Container, Row } from "react-bootstrap";
import Table from '../admin/table';
import tables from "../data/tables";

class AdminMain extends Component {
    render() {
        return (
            <>
                <Container>
                    {tables && tables.length ? tables.map((table, index) => (
                        <Fragment key={`${table}~${index}`}>
                            <Row>
                                <Table table={table} />
                            </Row>
                        </Fragment>
                    ))
                        : {}
                    }
                </Container>
                <br />
            </>
        );
    }
}

export default AdminMain;
