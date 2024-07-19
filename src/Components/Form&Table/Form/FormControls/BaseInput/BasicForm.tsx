import { useState, useEffect } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import {  updatePassword } from "@/Redux/Reducers/AuthSlice";
import { useDispatch,  } from "react-redux";
import { Flip, toast } from "react-toastify";
import { UpdateProfilePassword } from "@/Types/AuthType";
import { AppDispatch } from "@/Redux/Store";

const BasicForm = () => {
    const dispatch = useDispatch<AppDispatch>();



    const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const payload = Object.fromEntries(formData.entries()) as unknown as UpdateProfilePassword;
        await dispatch(updatePassword(payload)).unwrap()
            .then(()=>{
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
            .catch(err=>{
                toast.error(
                    <p className="text-white tx-16 mb-0">{err}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            })
        ;
    };

    return (
        <Col md="12">
            <Form className="mt-3" onSubmit={handlePasswordUpdate}>
                <Row className="g-3 ms-2">
                    <Col md="12">
                        <Label check>{"Ancien Mot de passe"}</Label>
                        <Input type="password" placeholder="Ancien Mot de passe" name={"old_password"} autoComplete="off" />
                    </Col>
                    <Col md="12">
                        <Label check>{"Nouveau Mot de passe"}</Label>
                        <Input type="password" placeholder="Nouveau Mot de passe" name={"password"} autoComplete="off" />
                    </Col>
                    <Col md="12">
                        <Label check>{"Entrez à nouveau le Mot de passe"}</Label>
                        <Input type="password" placeholder="Entrez à nouveau le Mot de passe" name={"password_confirm"} autoComplete="off" />
                    </Col>
                    <Col sm="12">
                        <Button color="primary">{"Modifier le mot de passe"}</Button>
                    </Col>
                </Row>
            </Form>
        </Col>
    );
};

export default BasicForm;
