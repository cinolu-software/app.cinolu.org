import { Col, Form, Input, Label, Row } from "reactstrap";

import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/AddProductSlice";
import SimpleMdeReact from "react-simplemde-editor";

const FormEditors = () => {

    const mdeEditorText = `Entrer la description du programme...`;

    return (
        <Col xs="12">
            <div id="editor2">
                <SimpleMdeReact id="editor_container" value={mdeEditorText} options={{ autofocus: false, spellChecker: true }}/>
            </div>
            <p className="mt-1 f-light detail-note">{"Improve product visibility by adding a compelling description."}</p>
        </Col>
    );
};

const StepOne = () => {

    const {formValue} = useAppSelector((state) => state.addProduct);
    const dispatch = useAppDispatch();

    return (
        <div className="sidebar-body">
            <Form>
                <Row className="g-2">
                    <Col xs="12">
                        <Label className="m-0" check>{"Nom du programme"} <span className="txt-danger"> *</span></Label>
                    </Col>
                    <Col xs="12">
                        <div className="custom-input">
                            <Input className={formValue.userName !== "" ? "valid" : "is-invalid"} type="text" required name="userName" onChange={(e)=>dispatch(setFormValue({name:"userName",value:e.target.value}))}/>
                        </div>
                    </Col>
                    <FormEditors />
                </Row>
            </Form>
        </div>
    );
};


export default StepOne;


