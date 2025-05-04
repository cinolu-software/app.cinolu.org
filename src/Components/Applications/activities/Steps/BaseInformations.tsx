import React, {ChangeEvent} from "react";
import {Button, Col, Form, Input, Label, Row} from "reactstrap";
import {ActivityFormTabContentPropsType} from "@/Types/ActivitiesTypes";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {AccountName, Continue, Email, InqMail, Previous} from "@/Constant";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


const BaseInformations :React.FC<ActivityFormTabContentPropsType> = ({ callbackActive }) => {

    const dispatch = useAppDispatch();

    const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        // dispatch(setaBusinessSettingsFormValues({...businessSettingsFormValues,[name]: value}));
    };

    const handleNextButton = () => {
        // if (accountName !== "" && email !== "" && description !== "") callbackActive(3)
        // else ShowError();
    };

    return (
        <div className={'border ps-3 rounded'}>
            <h2 className={'ms-3 mt-3 mb-4'}>Information de base de l'activité</h2>
            <Form>

                <div className={'p-3 mb-2'}>
                    <Col className={'mb-3'} >
                        <Label check>{"Nom de l'activité"}<span className="txt-danger">*</span></Label>
                        <Input name="accountName" value={''} onChange={getUserData} type="text" className={'border'}/>
                    </Col>
                    <Col >
                        <Label check>{"Description de l'activité"}<span className="txt-danger">*</span></Label>
                        <ReactQuill
                            value={''}
                            theme={'snow'}
                            placeholder="Écrivez votre article ici..."
                            className="quill-editor"
                        />

                    </Col>
                </div>

                <Col xs="12" className="text-end p-3">
                    <Button onClick={() => callbackActive(1)} color="primary">{Previous}</Button>
                    <Button className="ms-1" color="primary" onClick={handleNextButton}>{Continue}</Button>
                </Col>
            </Form>
        </div>
    )
}

export default BaseInformations;