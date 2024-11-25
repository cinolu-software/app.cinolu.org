import React, { ChangeEvent } from 'react';
import { Col, Form, Input, Label, Row } from 'reactstrap';
import {StepPropsType} from "@/Types/Programs/ProgramsType";
import { setNewFormValue } from "@/Redux/Reducers/programsSlice/programsSlice";
import {useAppDispatch} from "@/Redux/Hooks";

const StepOne: React.FC<StepPropsType> = ({ formValue }) => {

    const { name, description, targeted_audience } = formValue;
    const dispatch = useAppDispatch();

    return (
        <Form className="theme-form theme-form-2 mega-form">
            <Row className="g-2 mx-5">
                <Col xs="12">
                    <Label className="col-form-label">{"Nom du programme"}</Label>
                    <Input
                        className={name !== "" ? "valid" : "is-invalid"}
                        type="text"
                        required
                        name="name"
                        value={name}
                        onChange={() => dispatch(setNewFormValue({ field: "name", value: name }))}
                    />
                </Col>
                <Col xs="12">
                    <Label className="col-form-label">{"Audience ciblée"}</Label>
                    <Input
                        className={targeted_audience !== "" ? "valid" : "is-invalid"}
                        type="text"
                        required
                        name="targeted_audience"
                        value={targeted_audience}
                        onChange={()=> dispatch(setNewFormValue({ field: "targeted_audience", value: targeted_audience }))}
                    />
                </Col>
                <Col xs="12">
                    <Label className="col-form-label">{"Description du programme"}</Label>
                    <textarea
                        rows={10}
                        className="form-control"
                        name="description"
                        value={description}
                        onChange={()=> dispatch(setNewFormValue({ field: "description", value: description }))}
                    >
                    </textarea>
                </Col>
            </Row>
        </Form>
    );
};

export default StepOne;