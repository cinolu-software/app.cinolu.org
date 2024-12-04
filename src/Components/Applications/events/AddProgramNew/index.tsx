import React from "react";
import {Container, Row} from "reactstrap";
import NumberingWizard from "@/Components/Applications/programs/AddProgramNew/NumberingWizard";
import BackButton from "@/CommonComponent/BackButton";



const AddProgramNewContainer = () => {

    return (
        <Container fluid>
            <BackButton link={'/programs'}/>
            <Row>
                <NumberingWizard/>
            </Row>
        </Container>
    )
}

export default AddProgramNewContainer;