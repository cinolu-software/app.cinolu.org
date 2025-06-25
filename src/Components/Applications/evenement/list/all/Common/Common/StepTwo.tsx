import React, { useState } from "react";
import { Col, Form, Label, Row, InputGroup, Card, CardBody } from "reactstrap";
import { useAppDispatch } from "@/Redux/Hooks";
import {setCreateFomValue} from "@/Redux/Reducers/eventSlice/eventSlice";
import Calendar from "react-calendar";
// @ts-ignore
import { Value } from 'react-calendar/dist/cjs/shared/types';
import { StepPropsType} from "@/Types/Events";
import {eventStartDate, eventEndDate} from "@/Constant";

const StepTwo: React.FC<StepPropsType> = ({ createFormValue }) => {

    const dispatch = useAppDispatch();

    const [startDate, setStartDate] = useState<Date | null>(createFormValue?.started_at ? new Date(createFormValue.started_at) : null);
    const [endDate, setEndDate] = useState<Date | null>(createFormValue?.ended_at ? new Date(createFormValue.ended_at) : null);

    const handleStartDateChange = (value: Value) => {
        if (value instanceof Date) {
            setStartDate(value);
            dispatch(setCreateFomValue({ field: 'started_at', value: value.toISOString().split("T")[0] }));
        }
    };

    const handleEndDateChange = (value: Value) => {
        if (value instanceof Date) {
            setEndDate(value);
            dispatch(setCreateFomValue({ field: 'ended_at', value: value.toISOString().split("T")[0] }));
        }
    };

    return (
        <div className="sidebar-body">
            <Form>
                <Row className="g-2">
                    <Col xs="12">
                        <Label className="m-0" check>{eventStartDate} <span className="txt-danger"> *</span></Label>
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
                        <Label className="m-0" check>{eventEndDate} <span className="txt-danger"> *</span></Label>
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
