import React from "react";
import {Container, Row} from "reactstrap";
import NumberingWizard from "@/Components/Applications/programs/AddProgramNew/NumberingWizard";



const AddProgramNewContainer = () => {

    return (
        <Container fluid>
            <Row>
                <NumberingWizard/>
            </Row>
        </Container>
    )
}

export default AddProgramNewContainer;