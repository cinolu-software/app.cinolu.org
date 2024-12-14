import React from 'react';
import {Container, Row} from 'reactstrap';
import BackButton from "@/CommonComponent/BackButton";
import NumberingWizard from "@/Components/Applications/events/Common/NumberingWizard";
import {useAppSelector} from "@/Redux/Hooks";

const EditEventContainer = () => {

    const { selectedEvent } = useAppSelector(state=>state.event);

    console.log(selectedEvent);

    return (
        <Container fluid>
            <Row>
                <NumberingWizard  mode={'edit'} initialValues={selectedEvent} />
            </Row>
        </Container>
    );
}

export default EditEventContainer;