import React from 'react';
import { Card, CardBody, Col, Row} from "reactstrap";
import {imageBaseUrl} from "@/services/axios";


const ProgramImage : React.FC<{image: string | undefined}> = ({image}) => {

    return (
        <>
            <Row className={'program-detail'}>
                <Col xs="12">
                    <Card>
                        <CardBody>
                            <img src={image ? `${imageBaseUrl}/programs/${image}` : ''} alt={''}  className={'cover-image'} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProgramImage