import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardFooter, CardHeader, Col, Container, Row } from "reactstrap";
import Body from "@/Components/Applications/programs/AddProgram/Body";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createProgram } from "@/Redux/Reducers/programsSlice/programsSlice";
import {toast, ToastContainer, Flip} from "react-toastify";

const AddProgramContainer: React.FC = () => {
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const dispatch = useAppDispatch();


    const { formValue } = useAppSelector((state) => state.programs);

    const handleCreateProgram = () => {
        if (isFormValid && formValue) {
            try {
                dispatch(createProgram(formValue));
                toast.success(
                    <p className="text-white tx-16 mb-0">{"Programme créé avec succès"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            }catch (error) {
                toast.error(
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création du programme"}</p>,
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
    };

    useEffect(() => {
        const validateForm = () => {
            const isValid =
                formValue?.name &&
                formValue?.description &&
                formValue?.start_at &&
                formValue?.end_at &&
                formValue?.types?.length > 0 &&
                formValue?.requirements?.length > 0 &&
                formValue?.partners?.length > 0;

            setIsFormValid(Boolean(isValid));
        };

        validateForm();
    }, [formValue]);

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
                            <h5>{'Ajout de Programme'}</h5>
                        </CardHeader>
                        <CardBody>
                            <Body />
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col className={'d-flex justify-content-end'}>
                                    <button
                                        className={'btn btn-primary'}
                                        onClick={handleCreateProgram}
                                        disabled={!isFormValid}
                                    >
                                        <i className="bi bi-save"></i>
                                        Créer le programme
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

export default AddProgramContainer;
