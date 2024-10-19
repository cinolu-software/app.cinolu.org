import React, { useCallback, useMemo } from 'react';
import { Col, Form, Input, Label, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { setFormValue } from '@/Redux/Reducers/programsSlice/programsSlice';
import SimpleMdeReact from 'react-simplemde-editor';
import { selectSelectedProgram } from '@/Redux/Reducers/programsSlice/programsSlice';

type FormEditorsProps = {
    description: string | undefined;
    onChangeDescription: (value: string) => void;
};

const FormEditors: React.FC<FormEditorsProps> = ({ description, onChangeDescription }) => {
    const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
        };
    }, []);

    return (
        <SimpleMdeReact
            id="editor_container"
            value={description}
            onChange={onChangeDescription}
            options={autofocusNoSpellcheckerOptions}
        />
    );
};

const StepOne: React.FC = () => {
    const dispatch = useAppDispatch();
    const { formValue } = useAppSelector((state) => state.programs);
    const selectedProgram = useAppSelector(selectSelectedProgram);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFormValue({ field: 'name', value: e.target.value }));
    };

    const handleDescriptionChange = useCallback((value: string) => {
        dispatch(setFormValue({ field: 'description', value }));
    }, [dispatch]);

    return (
        <Form className="theme-form theme-form-2 mega-form">
            <Row className="g-2">
                <Col xs="12">
                    <Label className="col-form-label">{"Nom du programme"}</Label>
                    <Input
                        className={formValue?.name !== "" ? "valid" : "is-invalid"}
                        type="text"
                        required
                        name="name"
                        value={formValue?.name || selectedProgram?.name || ""}
                        onChange={handleNameChange}
                    />
                </Col>
                <Col xs="12">
                    <Label className="col-form-label">{"Description du programme"}</Label>
                    <FormEditors
                        description={formValue?.description || selectedProgram?.description || ''}
                        onChangeDescription={handleDescriptionChange}
                    />
                </Col>
            </Row>
        </Form>
    );
};

export default StepOne;
