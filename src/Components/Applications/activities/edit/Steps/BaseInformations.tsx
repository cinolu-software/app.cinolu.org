import React, {ChangeEvent, useEffect} from "react";
import { Col, Form, Input, Label } from "reactstrap";
import {ActivityFormTabContentPropsType} from "@/Types/ActivitiesTypes";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {setEditFormValue } from "@/Redux/Reducers/ActivitySlice";



const BaseInformations :React.FC<ActivityFormTabContentPropsType> = ({ callbackActive }) => {

    const dispatch = useAppDispatch();
    const {editFormValue, selectedActivity} = useAppSelector(state => state.activity);

    useEffect(() => {
        if(selectedActivity){
            dispatch(setEditFormValue({
                field: 'name',
                value: selectedActivity?.name
            }));
            dispatch(setEditFormValue({
                field: 'description',
                value: selectedActivity?.description
            }));
        }
    }, [ dispatch]);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setEditFormValue({ field: 'name', value: event.target.value }));
    };

    const handleDescriptionChange = (value: string) => {
        dispatch(setEditFormValue({ field: 'description', value }));
    };

    console.log("===>|",selectedActivity);

    return (
        <div className={'border ps-3 rounded'}>
            <h2 className={'ms-3 mt-3 mb-4'}>Information de base de l'activité</h2>
                <div className={'p-3 mb-2'}>
                    <Col className={'mb-3'} >
                        <Label check>{"Nom de l'activité"}<span className="txt-danger">*</span></Label>
                        <Input name="accountName" value={editFormValue.name} onChange={handleNameChange} type="text" className={'border'}/>
                    </Col>
                    <Col >
                        <Label check>{"Description de l'activité"}<span className="txt-danger">*</span></Label>
                        <ReactQuill
                            value={editFormValue.description}
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