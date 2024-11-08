import React, { useCallback, useMemo, ChangeEvent } from 'react';
import { Col, Form, Input, Label, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { setFormValue } from '@/Redux/Reducers/programsSlice/programsSlice';
import SimpleMdeReact from 'react-simplemde-editor';
import { selectSelectedProgram } from '@/Redux/Reducers/programsSlice/programsSlice';
import {StepOnePropsType} from "@/Types/Programs/ProgramsType";

type FormEditorsProps = {
    description: string | undefined;
    onChangeDescription: (value: string) => void;
};

const FormEditors: React.FC<FormEditorsProps> = ({ description, onChangeDescription }) => {
    const options = useMemo(() => ({
        autofocus: true,
        spellChecker: false,
    }), []);

    const handleEditorChange = (value: string) => {
        onChangeDescription(value);
    };

    return (
        <SimpleMdeReact
            id="editor_container"
            value={description}
            onChange={handleEditorChange}
            options={options}
        />
    );
};

const StepOne: React.FC<StepOnePropsType> = ({ formValue, getUserData }) => {
    const { name, description } = formValue;
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
                        value={name || ""}
                        onChange={getUserData}
                    />
                </Col>
                <Col xs="12">
                    <Label className="col-form-label">{"Description du programme"}</Label>
                    <FormEditors description={description || ''} onChangeDescription={(value) => getUserData({ target: { name: "description", value } } as ChangeEvent<HTMLInputElement>)} />
                </Col>
            </Row>
        </Form>
    );
};

export default StepOne;