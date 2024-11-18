import React from 'react';
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import Link from "next/link";
import BackButton from "@/CommonComponent/BackButton";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import Image from 'next/image';
import {imageBaseUrl} from "@/services/axios";

const DetailProgramContainer = () => {

    const {selectedProgram} = useAppSelector(state=> state.programs);

    console.log("====>", selectedProgram);

    return (
        <Container fluid>
            <BackButton link={'/programs'} />
            <Row>
                <Col xs="12">
                    <Card>
                        <CardBody>
                            <img src={selectedProgram?.image ? `${imageBaseUrl}/programs/${selectedProgram?.image}` : ''} alt={''}  className={'img-fluid'} />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default DetailProgramContainer;