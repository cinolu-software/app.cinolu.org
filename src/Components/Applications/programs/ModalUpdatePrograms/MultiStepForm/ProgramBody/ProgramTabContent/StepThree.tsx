import React, { useEffect } from "react";
import { Col, Form, Label, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setEditFormValue} from "@/Redux/Reducers/programsSlice/programsSlice";
import { fetchProgramsType } from "@/Redux/Reducers/programsSlice/programsTypeSlice";

const StepThree = () => {
    const dispatch = useAppDispatch();
    const { EditFormValue } = useAppSelector((state) => state.programs);
    const { transformedProgramsData, status } = useAppSelector((state) => state.programsType);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProgramsType());
        }
    }, [dispatch, status]);

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        if (!EditFormValue) return;

        const selectedTypeId = parseInt(e.target.value, 10);

        const updatedTypes = EditFormValue.types.includes(selectedTypeId)
            ? EditFormValue.types.filter(id => id !== selectedTypeId)
            : [...EditFormValue.types, selectedTypeId];

        dispatch(setEditFormValue({ field: 'types', value: JSON.stringify(updatedTypes) }));
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
                            <select
                                name="types"
                                value={EditFormValue?.types.map(String) || []}
                                onChange={handleTypeChange}
                                className={(EditFormValue?.types?.length || 0) > 0 ? "valid" : "is-invalid"}
                                multiple
                                required
                            >
                                {transformedProgramsData.map((type) => (
                                    <option key={type.id} value={type.id.toString()}>{type.name}</option>
                                ))}
                            </select>
                        </div>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default StepThree;
