import {useEffect, useState} from "react";
import { Col, Form, Label, Row, InputGroup, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setEditFormValue } from "@/Redux/Reducers/programsSlice/programsSlice";
import Calendar from "react-calendar";
// @ts-ignore
import { Value } from 'react-calendar/dist/cjs/shared/types';

const StepTwo = () => {

    const { EditFormValue, selectedProgram } = useAppSelector((state) => state.programs);
    const dispatch = useAppDispatch();

    const [startDate, setStartDate] = useState<Date | null>(EditFormValue?.started_at ? new Date(EditFormValue.started_at) : null);
    const [endDate, setEndDate] = useState<Date | null>(EditFormValue?.ended_at ? new Date(EditFormValue.ended_at) : null);

    useEffect(() => {
        if(selectedProgram){
            if(selectedProgram.started_at){
                setStartDate(new Date(selectedProgram.started_at));
            }
            if(selectedProgram.ended_at){
                setEndDate(new Date(selectedProgram.ended_at))
            }
        }
    }, [selectedProgram]);

    const handleStartDateChange = (value: Value) => {
        if (value instanceof Date) {
            setStartDate(value);
            dispatch(setEditFormValue({ field: 'started_at', value: value.toISOString().split("T")[0] }));
        }
    };

    const handleEndDateChange = (value: Value) => {
        if (value instanceof Date) {
            setEndDate(value);
            dispatch(setEditFormValue({ field: 'ended_at', value: value.toISOString().split("T")[0] }));
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
