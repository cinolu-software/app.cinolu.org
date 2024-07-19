import { useState, useEffect } from "react";
import { Button, Col, Form, Input, Label, Row } from "reactstrap";
import { selectError, updatePassword, selectStatus } from "@/Redux/Reducers/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { Flip, toast } from "react-toastify";
import { UpdateProfilePassword } from "@/Types/AuthType";
import { AppDispatch } from "@/Redux/Store";

const UpdatePassWord = () => {

    const dispatch = useDispatch<AppDispatch>();
    const updateError = useSelector(selectError);
    const [formValues, setFormValues] = useState<UpdateProfilePassword>({
        old_password: '',
        password: '',
        password_confirm: ''
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handlePasswordUpdate = async () => {

        const { old_password, password, password_confirm } = formValues;

        if (old_password && password && password_confirm) {
            await dispatch(updatePassword(formValues)).unwrap()
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
                .catch(()=>{
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
                })
            ;
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
                        <Input
                            type="password"
                            placeholder="Ancien Mot de passe"
                            name="old_password"
                            value={formValues.old_password}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </Col>
                    <Col md="12">
                        <Label check>{"Nouveau Mot de passe"}</Label>
                        <Input
                            type="password"
                            placeholder="Nouveau Mot de passe"
                            name="password"
                            value={formValues.password}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </Col>
                    <Col md="12">
                        <Label check>{"Entrez à nouveau le Mot de passe"}</Label>
                        <Input
                            type="password"
                            placeholder="Entrez à nouveau le Mot de passe"
                            name="password_confirm"
                            value={formValues.password_confirm}
                            onChange={handleInputChange}
                            autoComplete="off"
                        />
                    </Col>
                    <Col sm="12">
                        <Button block color="primary" onClick={handlePasswordUpdate} >{"Modifier le mot de passe"}</Button>
                    </Col>
                </Row>
            </Form>
        </Col>
    );
};

export default UpdatePassWord;

