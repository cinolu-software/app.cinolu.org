import { Col, Form, Input, Label, Row } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/programsSlice/programsSlice";
import SimpleMdeReact from "react-simplemde-editor";

const FormEditors = ({ onChangeDescription }: { onChangeDescription: (value: string) => void }) => {
    const mdeEditorText = `Entrer la description du programme...`;

    return (
        <Col xs="12">
            <div id="editor2">
                <SimpleMdeReact id="editor_container" value={mdeEditorText} onChange={onChangeDescription} options={{ autofocus: false, spellChecker: true }} />
            </div>

        </Col>
    );
};

const StepOne = () => {
    const { formValue } = useAppSelector((state) => state.programs);
    const dispatch = useAppDispatch();

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFormValue({ field: 'name', value: e.target.value }));
    };

    const handleDescriptionChange = (value: string) => {
        dispatch(setFormValue({ field: 'description', value }));
    };

    return (
        <div className="sidebar-body">
            <Form>
                <Row className="g-2">
                    <Col xs="12">
                        <Label className="m-0" check>{"Nom du programme"} <span className="txt-danger"> *</span></Label>
                    </Col>
                    <Col xs="12">
                        <div className="custom-input">
                            <Input
                                className={formValue?.name !== "" ? "valid" : "is-invalid"}
                                type="text"
                                required
                                name="name"
                                value={formValue?.name || ""}
                                onChange={handleNameChange}
                            />
                        </div>
                    </Col>
                    <FormEditors onChangeDescription={handleDescriptionChange} />
                </Row>
            </Form>
        </div>
    );
};

export default StepOne;



