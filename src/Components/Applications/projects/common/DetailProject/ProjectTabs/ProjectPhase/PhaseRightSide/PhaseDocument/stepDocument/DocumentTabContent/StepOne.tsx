import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {Button, Row, Col, Label, Input} from "reactstrap";
import SVG from "@/CommonComponent/SVG";
import {setFormValue} from "@/Redux/Reducers/projectSlice/ProjectDocumentSlice";

const StepOne = () => {

    const dispatch = useAppDispatch()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleMessageChange = (value: string) => {
        setDescription(value);
    };

    const saveToRedux = () => {
        dispatch(setFormValue({ name: 'title', value: title }));
        dispatch(setFormValue({ name: 'description', value: description }));
    };

    return (
        <div className={'mt-5'}>
            <Row>
                <Col md='12'>
                    <Label className={'txt-secondary'}>Nom du document</Label>
                    <Input className='form-control mb-4'  />
                </Col>
            </Row>
            <Row>
                <Col md='12'>
                    <Label className={'txt-secondary'}>Description du document</Label>
                    <textarea rows={3} className={'form-control'}></textarea>
                </Col>
            </Row>
            <Row>
                <Col className={'mt-4'}>
                    <Button color="primary" onClick={saveToRedux} outline>{"Sauvegarder"}</Button>
                </Col>
            </Row>
        </div>
    )
}

export default StepOne