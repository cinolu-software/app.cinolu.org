import React from "react";
import {Container, Row} from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import NumberingWizard from "@/Components/Applications/Partners/AddPartner/NumberingWizard";



const AddPartnerContainer = () => {

    return (
        <Container fluid>
            <BackButton link={'/programs'}/>
            <Row>
                <NumberingWizard/>
            </Row>
        </Container>
    )
}

export default AddPartnerContainer;