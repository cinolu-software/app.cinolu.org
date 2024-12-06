import React, { ChangeEvent } from "react";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { StepPropsType} from "@/Types/Events";
import {setCreateFomValue} from "@/Redux/Reducers/eventSlice/eventSlice";
import { useAppDispatch } from "@/Redux/Hooks";

const StepOne: React.FC<StepPropsType> = ({ createFormValue }) => {

    const { name, description, location, online_link, event_type, attendees } = createFormValue;

    const dispatch = useAppDispatch();

    const handleChange = (field: keyof typeof createFormValue) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setCreateFomValue({ field, value: event.target.value }));
    };

    return (
        <Form className="theme-form theme-form-2 mega-form">
            <Row className="g-2 mx-5">
                <Col xs="12">
                    <Label className="col-form-label">{"Nom de l'événement"}</Label>
                    <Input
                        className={name !== "" ? "valid" : "is-invalid"}
                        type="text"
                        required
                        name="name"
                        value={name}
                        onChange={handleChange("name")}
                    />
                </Col>
                <Col xs="12">
                    <Label className="col-form-label">{"Localisation de l'événement"}</Label>
                    <Input
                        className={location !== "" ? "valid" : "is-invalid"}
                        type="text"
                        required
                        name="town"
                        value={location}
                        onChange={handleChange("location")}
                    />
                </Col>

                <Col xs="12">
                    <Label className="col-form-label">{"Nombre de participants"}</Label>
                    <Input
                        className={attendees !== "" ? "valid" : "is-invalid"}
                        type="number"
                        required
                        name="attendees"
                        value={attendees}
                        onChange={handleChange("attendees")}
                    />
                </Col>

                <Col xs="12">
                    <Label className="col-form-label">{"Lien de l'événement"}</Label>
                    <textarea
                        rows={5}
                        className="form-control"
                        name="online_link"
                        value={online_link ?? ""}
                        onChange={handleChange("online_link")}
                    />
                </Col>


                <Col xs="12">
                    <Label className="col-form-label">{"Type de l'événement"}</Label>
                    <textarea
                        rows={5}
                        className="form-control"
                        name="event_type"
                        value={event_type}
                        onChange={handleChange("event_type")}
                    />
                </Col>

                <Col xs="12">
                    <Label className="col-form-label">{"Description du programme"}</Label>
                    <textarea
                        rows={10}
                        className="form-control"
                        name="description"
                        value={description}
                        onChange={handleChange("description")}
                    />
                </Col>
            </Row>
        </Form>
    );
};

export default StepOne;
