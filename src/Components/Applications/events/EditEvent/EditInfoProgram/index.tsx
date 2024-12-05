import React from 'react';
import {Container, Row} from 'reactstrap';
import BackButton from "@/CommonComponent/BackButton";
import NumberingWizard from "@/Components/Applications/programs/Common/NumberingWizard";
import {useAppSelector} from "@/Redux/Hooks";

const EditProgramContainer = () => {

    const { selectedProgram } = useAppSelector(state=>state.programs);

    return (
        <Container fluid>
            <Row>
                <NumberingWizard  mode={'edit'} initialValues={selectedProgram} />
            </Row>
        </Container>
    )

}

export default EditProgramContainer;