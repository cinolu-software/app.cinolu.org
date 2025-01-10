import React, { useState, useEffect } from "react";
import { Col, Form, Label, Row, InputGroup, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setNewFormValue } from "@/Redux/Reducers/projectSlice/projectSlice";
import Calendar from "react-calendar";
// @ts-ignore
import { Value } from 'react-calendar/dist/cjs/shared/types';
import { StepPropsType } from "@/Types/Project/ProgramsType";


const StepTwo: React.FC<StepPropsType> = ({ data }) => {

    const dispatch = useAppDispatch();

    const [startDate, setStartDate] = useState<Date | null>(data?.started_at ? new Date(data.started_at) : null);
    const [endDate, setEndDate] = useState<Date | null>(data?.ended_at ? new Date(data.ended_at) : null);

    const handleStartDateChange = (value: Value) => {
        if (value instanceof Date) {
            setStartDate(value);
            dispatch(setNewFormValue({ field: 'started_at', value: value.toISOString().split("T")[0] }));
        }
    };

    const handleEndDateChange = (value: Value) => {
        if (value instanceof Date) {
            setEndDate(value);
            dispatch(setNewFormValue({ field: 'ended_at', value: value.toISOString().split("T")[0] }));
        }
    };

    return (
        <div className="sidebar-body">
            <Form>
                <Row className="g-2">
                    <Col xs="12">
                        <Label className="m-0" check>Date de début <span className="txt-danger"> *</span></Label>
                    </Col>
                    <Col xs="12">
                        <Card>
                            <CardBody className="card-wrapper">
                                <InputGroup className="main-inline-calender">
                                    <Calendar
                                        onChange={handleStartDateChange}
                                        value={startDate}
                                        className="w-100"
                                    />
                                </InputGroup>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12">
                        <Label className="m-0" check>Date de fin <span className="txt-danger"> *</span></Label>
                    </Col>
                    <Col xs="12">
                        <Card>
                            <CardBody className="card-wrapper">
                                <InputGroup className="main-inline-calender">
                                    <Calendar
                                        onChange={handleEndDateChange}
                                        value={endDate}
                                        className="w-100"
                                    />
                                </InputGroup>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default StepTwo;