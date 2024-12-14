import React from "react";
import {Container, Row} from "reactstrap";
import BackButton from "@/CommonComponent/BackButton";
import NumberingWizard from "@/Components/Applications/programs/Common/NumberingWizard";



const AddProgramNewContainer = () => {

    return (
        <Container fluid>
            <BackButton link={'/programs'}/>
            <Row>
                <NumberingWizard mode={'add'}/>
            </Row>
        </Container>
    )
}

export default AddProgramNewContainer;