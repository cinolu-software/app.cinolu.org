import React, {ChangeEvent} from "react";
import { Col, Input, Label } from "reactstrap";
import {ActivityFormTabContentPropsType} from "@/Types/ActivitiesTypes";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { setAddFormValue } from "@/Redux/Reducers/evenement";


const BaseInformations :React.FC<ActivityFormTabContentPropsType> = ({ callbackActive }) => {

    const dispatch = useAppDispatch();

    const {addFormValue} = useAppSelector(state => state.evenement);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setAddFormValue({ field: 'name', value: event.target.value }));
    };

    const handleLinkChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setAddFormValue({ field: 'link', value: event.target.value }));
    }

    const handleLocationChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setAddFormValue({ field: 'location', value: event.target.value }));
    }

    const handleDescriptionChange = (value: string) => {
        dispatch(setAddFormValue({ field: 'description', value }));
    };

    return (
        <div className={'border ps-3 rounded'}>
            <h2 className={'ms-3 mt-3 mb-4'}>{"Information de base de l'évènement"}</h2>
                <div className={'p-3 mb-2'}>
                    <Col className={'mb-3'} >
                        <Label check>{"Nom de l'évènement"}<span className="txt-danger">*</span></Label>
                        <Input name="accountName" value={addFormValue.name} onChange={handleNameChange} type="text" className={'border'}/>
                    </Col>
                    <Col className={'mb-3'} >
                        <Label check>{"Lieu de l'évènement"}<span className="txt-danger"></span></Label>
                        <Input name="accountName" value={addFormValue.location} onChange={handleLocationChange} type="text" className={'border'}/>
                    </Col>
                    <Col className={'mb-3'} >
                        <Label check>{"Lien de l'évènement"}<span className="txt-danger"></span></Label>
                        <Input name="accountName" value={addFormValue.link} onChange={handleLinkChange} type="text" className={'border'}/>
                    </Col>
                    <Col >
                        <Label check>{"Description de l'évènement"}<span className="txt-danger">*</span></Label>
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