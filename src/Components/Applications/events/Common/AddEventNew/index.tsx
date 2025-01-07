import React from 'react';
import {Container, Row} from 'reactstrap';
import BackButton from "@/CommonComponent/BackButton";
import NumberingWizard from "@/Components/Applications/events/Common/Common/NumberingWizard";
const AddNewEventContainer = () => {


    return (
        <Container fluid>
            <BackButton link={'/events'}/>
            <Row>
                <NumberingWizard  mode={'add'}  />
            </Row>
        </Container>
    )
}

export default AddNewEventContainer;