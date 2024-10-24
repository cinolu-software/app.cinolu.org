import React from 'react';
import {Col, Form, Input, Label, Row} from "reactstrap";
import { useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {setFormValue} from "@/Redux/Reducers/userSlice/UserSlice";

const StepOne = () => {

    const dispatch = useAppDispatch();
    const {formValue} = useAppSelector((state) => state.users);

    return (
        <Row className={'g-2'}>
            <Col xs={'12'}>
                <Row className={''}>
                    <Col >
                        <Label className="col-form-label">{"Nom"}</Label>
                        <Input
                            className={formValue?.name !== "" ? "valid" : "is-invalid"}
                            type="text"
                            required
                            name="name"
                            value={formValue?.name || ""}
                            onChange={(e) => dispatch(setFormValue({name: 'name', value: e.target.value}))}
                        />
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col >
                        <Label className="col-form-label">{"Post-nom"}</Label>
                        <Input
                            className={formValue?.first_name !== "" ? "valid" : "is-invalid"}
                            type="text"
                            required
                            name="first_name"
                            value={formValue?.first_name || ""}
                            onChange={(e) => dispatch(setFormValue({name: 'first_name', value: e.target.value}))}
                        />
                    </Col>
                </Row>
                <Row className={'mt-4'}>
                    <Col >
                        <Label className="col-form-label">{"Prénom"}</Label>
                        <Input
                            className={formValue?.last_name !== "" ? "valid" : "is-invalid"}
                            type="text"
                            required
                            name="last_name"
                            value={formValue?.last_name || ""}
                            onChange={(e) => dispatch(setFormValue({name: 'last_name', value: e.target.value}))}
                        />
                    </Col>
                </Row>

            </Col>
        </Row>
    )
}
export default StepOne