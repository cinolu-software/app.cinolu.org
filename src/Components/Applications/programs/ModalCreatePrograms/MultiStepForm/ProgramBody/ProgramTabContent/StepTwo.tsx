import { useState } from "react";
import { Col, Form, Label, Row, InputGroup, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/programsSlice/programsSlice";
import Calendar from "react-calendar";

const StepTwo = () => {
    const { formValue } = useAppSelector((state) => state.programs);
    const dispatch = useAppDispatch();

    const [startDate, setStartDate] = useState<Date>(formValue?.start_at ? new Date(formValue.start_at) : new Date());
    const [endDate, setEndDate] = useState<Date>(formValue?.end_at ? new Date(formValue.end_at) : new Date());

    const handleStartDateChange = (value: Date) => {
        setStartDate(value);
        dispatch(setFormValue({ field: 'start_at', value: value.toISOString().split("T")[0] }));
    };

    const handleEndDateChange = (value: Date) => {
        setEndDate(value);
        dispatch(setFormValue({ field: 'end_at', value: value.toISOString().split("T")[0] }));
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
