import React from 'react';
import { Card, CardBody, CardHeader, CardFooter, Col, Container, Row } from "reactstrap";
import Body from "@/Components/Applications/programs/EditProgram/Body";
import Link from "next/link";
import { toast, ToastContainer, Flip } from "react-toastify";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { updateProgram } from "@/Redux/Reducers/programsSlice/programsSlice";

const EditProgramContainer = () => {

    const { EditFormValue, selectedProgram } = useAppSelector(state => state.programs);
    const dispatch = useAppDispatch();


    const cleanFormData = (formData: any, originalData: any) => {
        const cleanedData: any = {};
        for (const key in formData) {
            if (Array.isArray(formData[key])) {

                if (formData[key].length > 0) {
                    cleanedData[key] = formData[key];
                } else {

                    cleanedData[key] = originalData[key];
                }
            } else if (formData[key] !== "" && formData[key] !== null && formData[key] !== undefined) {

                cleanedData[key] = formData[key];
            } else {

                cleanedData[key] = originalData[key];
            }
        }
        return cleanedData;
    };

    const handleEdit = async () => {
        if (selectedProgram) {

            const cleanedEditFormValue = cleanFormData(EditFormValue, selectedProgram);

            try {

                await dispatch(updateProgram({ programId: selectedProgram.id, updatedProgram: cleanedEditFormValue })).unwrap();
                toast.success(
                    <p className="text-white tx-16 mb-0">{"Modification apportée avec succès"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            } catch (error) {
                toast.error(
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la modification du programme"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            }
        } else {
            toast.warn(
                <p className="text-white tx-16 mb-0">{"Aucun programme sélectionné pour la modification."}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
    };

    return (
        <Container fluid>
            <Row className={'mb-4'}>
                <Col className={'d-flex justify-content-end'}>
                    <Link href={'/programs'} className={'btn btn-outline-primary'}>
                        <i className="bi bi-arrow-left"></i> Retour
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col xs="12">
                    <Card>
                        <CardHeader>
                            <h5>{'Modification du Programme'}</h5>
                        </CardHeader>
                        <CardBody>
                            <Body />
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col className={'d-flex justify-content-end'}>
                                    <button className={'btn btn-primary'} onClick={handleEdit}>
                                        <i className="bi bi-save"></i> Enregistrer
                                    </button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
}

export default EditProgramContainer;
