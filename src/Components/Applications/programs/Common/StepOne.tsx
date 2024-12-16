import React, { ChangeEvent } from "react";
import { Col, Form, Input, Label, Row } from "reactstrap";
import { StepPropsType } from "@/Types/Programs/ProgramsType";
import { setNewFormValue } from "@/Redux/Reducers/programsSlice/programsSlice";
import { useAppDispatch } from "@/Redux/Hooks";

const StepOne: React.FC<StepPropsType> = ({ data }) => {

    const { name, description, targeted_audience, aim, prize, town } = data;

    const dispatch = useAppDispatch();

    const handleChange = (field: keyof typeof data) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setNewFormValue({ field, value: event.target.value }));
    };

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
                        onChange={handleChange("name")}
                    />
                </Col>
                <Col xs="12">
                    <Label className="col-form-label">{"Ville cible"}</Label>
                    <Input
                        className={town !== "" ? "valid" : "is-invalid"}
                        type="text"
                        required
                        name="town"
                        value={town}
                        onChange={handleChange("town")}
                    />
                </Col>

                <Col xs="12">
                    <Label className="col-form-label">{"Audience ciblée"}</Label>
                    <textarea
                        rows={5}
                        className="form-control"
                        name="targeted_audience"
                        value={targeted_audience}
                        onChange={handleChange("targeted_audience")}
                    />
                </Col>


                <Col xs="12">
                    <Label className="col-form-label">{"A la clé"}</Label>
                    <textarea
                        rows={5}
                        className="form-control"
                        name="prize"
                        value={prize}
                        onChange={handleChange("prize")}
                    />
                </Col>

                <Col xs="12">
                    <Label className="col-form-label">{"Objectif du programme"}</Label>
                    <textarea
                        rows={10}
                        className="form-control"
                        name="aim"
                        value={aim}
                        onChange={handleChange("aim")}
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
