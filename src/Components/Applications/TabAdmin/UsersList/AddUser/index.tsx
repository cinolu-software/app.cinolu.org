import React, {useEffect, useState} from 'react';
import {Card, CardBody, CardFooter, CardHeader, Col, Container, Row} from "reactstrap";
import Body from "@/Components/Applications/TabAdmin/UsersList/AddUser/Body";
import Link from "next/link"
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {createUser} from "@/Redux/Reducers/userSlice/UserSlice";
import {toast, ToastContainer, Flip} from "react-toastify";


const CreateUser = () => {

    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const { formValue } = useAppSelector((state) => state.users);

    const handleCreateUser = () => {
        if (isFormValid && formValue) {
            try {
                dispatch(createUser(formValue));
                toast.success(
                    <p className="text-white tx-16 mb-0">{"Utilisateur créé avec succès"}</p>,
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
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création de l'utilisateur"}</p>,
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

    useEffect(() => {
        const validateForm = () => {
            const isValid =
                formValue?.email &&
                formValue?.first_name &&
                formValue?.last_name &&
                formValue?.name &&
                formValue?.phone_number &&
                formValue?.address &&
                formValue?.roles?.length > 0;

            setIsFormValid(Boolean(isValid));
        };

        validateForm();
    }, [formValue]);

    return (

        <Container fluid>
            <Row className={'mb-4'}>
                <Col className={'d-flex justify-content-end'}>
                    <Link href={'/users/list'} className={'btn btn-outline-primary'}>
                        <i className="bi bi-arrow-left"></i>
                        Retour
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <CardBody>
                            <Body/>
                        </CardBody>
                        <CardFooter>
                            <Row>
                                <Col className={'d-flex justify-content-end'}>
                                    <button
                                        className={'btn btn-outline-primary'}
                                        onClick={handleCreateUser}
                                        disabled={!isFormValid}
                                    >
                                        <i className="bi bi-save"></i>
                                        Créer l'utilisateur
                                    </button>
                                </Col>
                            </Row>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    )
}

export default CreateUser;