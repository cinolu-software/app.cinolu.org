import React, { useEffect } from "react";
import { Col, Form, Label, Row, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/programsSlice/programsSlice";
import {fetchProgramsType} from "@/Redux/Reducers/programsSlice/programsTypeSlice"


const StepThree = () => {

    const dispatch = useAppDispatch();
    const { formValue } = useAppSelector((state) => state.programs);
    const { transformedProgramsData, status } = useAppSelector((state) => state.programsType);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProgramsType());
        }
    }, [dispatch, status]);

    const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFormValue({ field: 'type', value: e.target.value }));
    };

    return (
        <div className="sidebar-body">
            <Form>
                <Row className="g-2">
                    <Col xs="12">
                        <Label className="m-0" check>{"Type de programme"} <span className="txt-danger"> *</span></Label>
                    </Col>
                    <Col xs="12">
                        <div className="custom-input">
                            <Input
                                type="select"
                                name="type"
                                value={formValue?.type || ""}
                                onChange={handleTypeChange}
                                className={formValue?.type !== "" ? "valid" : "is-invalid"}
                                required
                            >
                                <option value="" disabled>Choisir un type</option>
                                {transformedProgramsData.map((type: { id: string, name: string }) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}

                            </Input>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default StepThree;
