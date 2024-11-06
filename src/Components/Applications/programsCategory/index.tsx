import React, {useMemo, useState, useEffect} from 'react';
import {TableColumn} from "react-data-table-component";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";

const ProgramsCategoryListContainer: React.FC = () => {

    return (
        <Container fluid>

            <Row>
                <Col sm="12">
                    <Card>
                        <CardBody>
                            <div className="list-product-header">

                            </div>
                            <div className="list-program">
                                <div className="table-responsive">
                                    {/*<DataTable*/}
                                    {/*    className="theme-scrollbar"*/}
                                    {/*    data={}*/}
                                    {/*    columns={ }*/}
                                    {/*    striped*/}
                                    {/*    highlightOnHover*/}
                                    {/*    pagination*/}
                                    {/*    subHeader*/}
                                    {/*    subHeaderComponent={}*/}
                                    {/*/>*/}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ProgramsCategoryListContainer;