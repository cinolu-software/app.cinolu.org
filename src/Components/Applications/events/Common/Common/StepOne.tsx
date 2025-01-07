import React, { ChangeEvent } from "react";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { StepPropsType } from "@/Types/Events";
import { setCreateFomValue } from "@/Redux/Reducers/eventSlice/eventSlice";
import { useAppDispatch } from "@/Redux/Hooks";

const StepOne: React.FC<StepPropsType> = ({ createFormValue }) => {

    const { name, description, location, online_link, event_type, attendees } = createFormValue;
    const dispatch = useAppDispatch();

    const handleChange = (field: keyof typeof createFormValue) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setCreateFomValue({ field, value: event.target.value }));
    };

    const handleSelectChange = (event: any) => {
        const value = event.target.value as "" | "physical" | "online" ;
        dispatch(setCreateFomValue({ field: "event_type", value }));
    };

    return (
        <Form className="theme-form theme-form-2 mega-form">
            <Row className="g-2 mx-5">
                <Col xs="12" className="mt-3">
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

                <Col xs="12" className="mt-3">
                    <Label className="col-form-label">{"Type d'événement"}</Label>
                    <Input
                        type="select"
                        value={event_type}
                        onChange={handleSelectChange}
                        className={event_type ? "valid" : "is-invalid"}
                    >
                        <option value="">Sélectionner un type</option>
                        <option value="physical">Physique</option>
                        <option value="online">En ligne</option>
                    </Input>
                </Col>

                <Col xs="12" className="mt-3">
                    <Label className="col-form-label">{"Localisation de l'événement"}</Label>
                    <Input
                        className={location !== "" ? "valid" : "is-invalid"}
                        type="text"
                        required
                        name="location"
                        value={location}
                        onChange={handleChange("location")}
                    />
                </Col>

                {event_type === "online" && (
                    <Col xs="12" className="mt-3">
                        <Label className="col-form-label">{"Lien en ligne de l'événement"}</Label>
                        <Input
                            className={online_link !== "" ? "valid" : "is-invalid"}
                            type="text"
                            required
                            name="online_link"
                            value={online_link || ""}
                            onChange={handleChange("online_link")}
                        />
                    </Col>
                )}

                <Col xs="12" className="mt-3">
                    <Label className="col-form-label">{"Nombre de participants attendus"}</Label>
                    <Input
                        className={attendees !== "" ? "valid" : "is-invalid"}
                        type="number"
                        required
                        name="attendees"
                        value={attendees}
                        onChange={handleChange("attendees")}
                    />
                </Col>

                <Col xs="12" className="mt-3">
                    <Label className="col-form-label">{"Description de l'événement"}</Label>
                    <Input
                        className={description !== "" ? "valid" : "is-invalid"}
                        type="textarea"
                        required
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



