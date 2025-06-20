import React, {ChangeEvent} from "react";
import { Col, Input, Label } from "reactstrap";
import {ActivityFormTabContentPropsType} from "@/Types/ActivitiesTypes";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {setAddFormValue} from "@/Redux/Reducers/ActivitySlice";


const BaseInformations :React.FC<ActivityFormTabContentPropsType> = ({ callbackActive }) => {

    const dispatch = useAppDispatch();

    const {addFormValue} = useAppSelector(state => state.activity)

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setAddFormValue({ field: 'name', value: event.target.value }));
    };

    const handleDescriptionChange = (value: string) => {
        dispatch(setAddFormValue({ field: 'description', value }));
    };

    const handleFormLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setAddFormValue({ field: 'form_link', value: event.target.value }));
    }

    return (
        <div className={'border ps-3 rounded'}>
            <h2 className={'ms-3 mt-3 mb-4'}>Information de base du projet</h2>
                <div className={'p-3 mb-2'}>
                    <Col className={'mb-3'} >
                        <Label check>{"Nom du projet"}<span className="txt-danger">*</span></Label>
                        <Input name="accountName" value={addFormValue.name} onChange={handleNameChange} type="text" className={'border'}/>
                    </Col>
                    <Col className={'mb-3'} >
                        <Label check>{"Lien"}</Label>
                        <Input name="accountName" value={addFormValue.form_link} onChange={handleFormLinkChange} type="text" className={'border'}/>
                    </Col>
                    <Col >
                        <Label check>{"Description du projet"}</Label>
                        <ReactQuill
                            value={addFormValue.description}
                            onChange={handleDescriptionChange}
                            theme={'snow'}
                            placeholder="Entrez la description ici..."
                            className="quill-editor"
                        />
                    </Col>
                </div>

                <Col xs="12" className="text-end p-3">
                    <button className={'btn btn-outline-primary'} onClick={() => callbackActive(2)}>
                        {"Suivant"}
                    </button>
                </Col>
        </div>
    )
}

export default BaseInformations;