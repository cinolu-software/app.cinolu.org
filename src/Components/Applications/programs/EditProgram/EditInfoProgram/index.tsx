import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner, Col } from 'reactstrap';
import NumberingWizard from "@/Components/Applications/programs/Common/NumberingWizard";
import { fetchProgramById } from "@/Redux/Reducers/programsSlice/programsSlice";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { useRouter } from "next/navigation";

const EditProgramContainer = () => {

    const { selectedProgram, status } = useAppSelector((state) => state.programs);
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (selectedProgram === null) {
            router.push('/programs');
        } else {
            if (selectedProgram?.id) {
                dispatch(fetchProgramById(selectedProgram?.id));
            }
        }
    }, [selectedProgram]);

    if (status === 'loading') {
        return (
            <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner color="primary" />
            </Container>
        );
    }

    console.log("===>|",selectedProgram);

    return (
        <Container fluid>
            <Row>
                <NumberingWizard mode={'edit'} initialValues={selectedProgram}  />
            </Row>
        </Container>
    );
};

export default EditProgramContainer;
