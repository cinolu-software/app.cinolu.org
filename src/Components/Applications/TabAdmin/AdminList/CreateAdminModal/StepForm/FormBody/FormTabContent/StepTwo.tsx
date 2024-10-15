import React from 'react';
import {Col, Form, Input, Label, Row} from "reactstrap";
import { useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {setFormValue} from "@/Redux/Reducers/userSlice/UserSlice";

const StepTwo = () => {

    const dispatch = useAppDispatch();
    const {formValue} = useAppSelector((state) => state.users);


    return (
        <Row className={'g-2'}>
            <Col xs={'12'}>
                    <Row className=''>
                        <Col >
                            <Label className="col-form-label">{"Email"}</Label>
                            <Input
                                className={formValue?.email !== "" ? "valid" : "is-invalid"}
                                type="email"
                                required
                                name="email"
                                value={formValue?.email || ""}
                                onChange={(e) => dispatch(setFormValue({name: 'email', value: e.target.value}))}
                            />
                        </Col>
                    </Row>

                    <Row className='mt-4'>
                        <Col >
                            <Label className="col-form-label">{"Numero de Téléphone"}</Label>
                            <Input
                                className={formValue?.phone_number !== "" ? "valid" : "is-invalid"}
                                type="text"
                                required
                                name="phone_number"
                                value={formValue?.phone_number || ""}
                                onChange={(e) => dispatch(setFormValue({name: 'phone_number', value: e.target.value}))}
                            />
                        </Col>
                    </Row>

                    <Row className='mt-4'>
                        <Col >
                            <Label className="col-form-label">{"Adresse"}</Label>
                            <Input
                                className={formValue?.address !== "" ? "valid" : "is-invalid"}
                                type="text"
                                required
                                name="address"
                                value={formValue?.address || ""}
                                onChange={(e) => dispatch(setFormValue({name: 'address', value: e.target.value}))}
                            />
                        </Col>
                    </Row>
            </Col>
        </Row>
    )
}
export default StepTwo
