import {Button, Col, Input, Label, Row} from "reactstrap";
import {Formik, Form, Field} from "formik";
import {StaticModalToggleProp} from "@/Types/Projects/ProjectsType";

export const StaticForm: React.FC<StaticModalToggleProp> = ({staticModalToggle}) => {

    return (

        <Formik initialValues={{category: ""}} onSubmit={(value) => console.log(value)}>
            {() => (
                <Form>
                    <Row className="g-3">
                        <Col md="12">
                            <Label className={"mb-2"} check>{"Nom de la Catégorie"}</Label>
                            <Field className="form-control mb-4" name="category" type="text"
                                   placeholder="Entrer le nom de la catégorie"/>
                        </Col>

                        <Col xs="12">
                            <Button color="primary" onClick={staticModalToggle}>{"Créer"}</Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};
