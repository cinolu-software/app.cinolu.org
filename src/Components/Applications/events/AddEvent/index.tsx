import React from "react";
import {Container, Row} from "reactstrap";
import NumberingWizardEvent from "@/Components/Applications/events/AddEvent/NumberingWizard";
import BackButton from "@/CommonComponent/BackButton";



const AddEventNewContainer = () => {

    return (
        <Container fluid>
            <BackButton link={'/programs'}/>
            <Row>
                <NumberingWizardEvent/>
            </Row>
        </Container>
    )
}

export default AddEventNewContainer;