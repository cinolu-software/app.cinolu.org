import React, { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Container, Input, InputGroup, InputGroupText, Label, FormFeedback, Col, Form, Row, } from "reactstrap";
import { Flip, toast } from "react-toastify";
import { updatePassword, selectError, selectStatus } from "@/Redux/Reducers/AuthSlice";
import { AppDispatch } from "@/Redux/Store";
import {UpdateProfilePassword} from "@/Types/AuthType";


const UserPassword = () => {

    const dispatch = useDispatch<AppDispatch>();
    const updateError = useSelector(selectError);
    const [formValues, setFormValues] = useState<UpdateProfilePassword>({
        old_password: '',
        password: '',
        password_confirm: ''
    });

    const [showPassword, setShowPassword] = useState({
        old_password: false,
        password: false,
        password_confirm: false,
    });

    const togglePasswordVisibility = (field: keyof typeof showPassword) => {
        setShowPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handlePasswordUpdate = async () => {
        const { old_password, password, password_confirm } = formValues;

        if (old_password && password && password_confirm) {
            await dispatch(updatePassword(formValues)).unwrap()
                .then(() => {
                    toast.success(
                        <p className="text-white tx-16 mb-0">{"Mise à jour du mot de passe effectuée avec succès"}</p>,
                        {
                            autoClose: 5000,
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: false,
                            transition: Flip,
                            theme: "colored",
                        }
                    );
                })
                .catch(() => {
                    toast.error(
                        <p className="text-white tx-16 mb-0">{updateError}</p>,
                        {
                            autoClose: 5000,
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: false,
                            transition: Flip,
                            theme: "colored",
                        }
                    );
                });
        } else {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Please fill in all fields."}</p>,
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
        <Col md="12">
            <Form className="mt-3">
                <Row className="g-3 ms-2">
                    <Col md="12">
                        <Label check>{"Ancien Mot de passe"}</Label>
                        <div className="position-relative">
                            <Input
                                type={showPassword.old_password ? "text" : "password"}
                                placeholder="Ancien Mot de passe"
                                name="old_password"
                                value={formValues.old_password}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            <i
                                className={`fa ${showPassword.old_password ? "fa-eye-slash" : "fa-eye"} position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer`}
                                onClick={() => togglePasswordVisibility("old_password")}
                            />
                        </div>
                    </Col>
                    <Col md="12">
                        <Label check>{"Nouveau Mot de passe"}</Label>
                        <div className="position-relative">
                            <Input
                                type={showPassword.password ? "text" : "password"}
                                placeholder="Nouveau Mot de passe"
                                name="password"
                                value={formValues.password}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            <i
                                className={`fa ${showPassword.password ? "fa-eye-slash" : "fa-eye"} position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer`}
                                onClick={() => togglePasswordVisibility("password")}
                            />
                        </div>
                    </Col>
                    <Col md="12">
                        <Label check>{"Entrez à nouveau le Mot de passe"}</Label>
                        <div className="position-relative">
                            <Input
                                type={showPassword.password_confirm ? "text" : "password"}
                                placeholder="Entrez à nouveau le Mot de passe"
                                name="password_confirm"
                                value={formValues.password_confirm}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                            <i
                                className={`fa ${showPassword.password_confirm ? "fa-eye-slash" : "fa-eye"} position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer`}
                                onClick={() => togglePasswordVisibility("password_confirm")}
                            />
                        </div>
                    </Col>
                    <Col sm="12">
                        <button className={'btn btn-outline-primary'} onClick={handlePasswordUpdate}>{"Modifier le mot de passe"}</button>
                    </Col>
                </Row>
            </Form>
        </Col>
    );
};

export default UserPassword;


