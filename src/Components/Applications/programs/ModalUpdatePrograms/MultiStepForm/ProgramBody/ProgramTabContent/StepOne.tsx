// StepOne.tsx
import React, { useCallback, useMemo } from 'react';
import { Col, Form, Input, Label, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { setFormValue } from '@/Redux/Reducers/programsSlice/programsSlice';
import SimpleMdeReact from 'react-simplemde-editor';

const FormEditors = ({ description, onChangeDescription }: { description: string; onChangeDescription: (value: string) => void }) => {
    const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
        };
    }, []);

    return (
        <SimpleMdeReact value={description} onChange={onChangeDescription} options={autofocusNoSpellcheckerOptions} />
    );
};

const StepOne = () => {
    const dispatch = useAppDispatch();
    const { formValue } = useAppSelector((state) => state.programs);

    const handleChange = useCallback(
        (field: keyof typeof formValue, value: any) => {
            dispatch(setFormValue({ field, value }));
        },
        [dispatch]
    );

    const onChangeDescription = useCallback((value: string) => {
        handleChange("description", value);
    }, [handleChange]);

    return (
        <Form className="theme-form theme-form-2 mega-form">
            <Row>
                <Col>
                    <Label className="col-form-label">{"Nom du programme"}</Label>
                    <Input
                        className="form-control"
                        type="text"
                        value={formValue.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Label className="col-form-label">{"Description du programme"}</Label>
                    <FormEditors description={formValue.description} onChangeDescription={onChangeDescription} />
                </Col>
            </Row>
        </Form>
    );
};

export default StepOne;




