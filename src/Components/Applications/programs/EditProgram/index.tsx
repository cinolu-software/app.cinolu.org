import React from 'react';
import { Card, CardBody, CardHeader,CardFooter, Col, Container, Row } from "reactstrap";
import Body from "@/Components/Applications/programs/AddProgram/Body";
import Link from "next/link";
import {toast, ToastContainer, Flip} from "react-toastify";
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {updateProgram} from "@/Redux/Reducers/programsSlice/programsSlice";


const EditProgramContainer = () => {

    const {status, EditFormValue, selectedProgram } = useAppSelector(state => state.programs);
    const dispatch = useAppDispatch();

    const handleSubmit = async () => {

        if(selectedProgram) {
            try{
                await dispatch(updateProgram({programId: selectedProgram.id, updatedProgram: EditFormValue})).unwrap();
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
            }catch(error) {
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
        }

    }

    return (
        <Container fluid>
            <Row className={'mb-4'}>
                <Col className={'d-flex justify-content-end'}>
                    <Link href={'/programs'} className={'btn btn-outline-primary'}>
                        <i className="bi bi-arrow-left"></i>
                        Retour
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
                                    <button className={'btn btn-primary'}>
                                        <i className="bi bi-save"></i>
                                        Enregistrer
                                    </button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <ToastContainer/>
        </Container>
    );
}

export default EditProgramContainer;