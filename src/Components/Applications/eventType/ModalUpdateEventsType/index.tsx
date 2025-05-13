import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {updateEventsType, setModalEditEventTypes} from "@/Redux/Reducers/eventSlice/EventTypeSlice"
import { Flip, toast } from "react-toastify";
import {UpdateEventType} from "@/Types/EventsType/eventsTypeType";


const UpdateEventsTypeModal = () => {

    const dispatch = useAppDispatch();
    const { selectedEventType, isOpenModalEditEventType} = useAppSelector(state=>state.eventType)
    const [eventType, setEventType] = useState<UpdateEventType>({ name: '', description: '', id: '' });

    const isEditingRef = useRef(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setEventType((prev) => ({ ...prev, name: newName }));
        isEditingRef.current = true;
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.target.value;
        setEventType((prev) => ({ ...prev, description: newDescription }));
        isEditingRef.current = true;
    };

    useEffect(() => {
        if (!isEditingRef.current) {
            setEventType({
                id: selectedEventType?.id || '',
                name: selectedEventType?.name || '',
                description: selectedEventType?.description || '',
            });
        } else {
            isEditingRef.current = false;
        }
    }, [selectedEventType]);

    const handleSubmit = async () => {

        try {
            await dispatch(updateEventsType(eventType)).unwrap();
            dispatch(setModalEditEventTypes({ isOpen: false, EventType: null }));
            toast.success(
                <p className="text-white tx-16 mb-0">{"Type d'événement mis à jour avec succès"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        } catch (error) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la mise à jour du type de l'événement"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
    };

    return (
        <Col xs="12">
            <Modal
                isOpen={isOpenModalEditEventType}
                toggle={() => dispatch(setModalEditEventTypes({ isOpen: false, EventType: null }))}
                size="lg"
            >
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Mettre à jour un type de programme"}</h1>
                    <Button close onClick={() => dispatch(setModalEditEventTypes({ isOpen: false, EventType: null }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="update-category">
                        <Label for="programName" check>
                            Nom du type d'événement <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="programName"
                            type="text"
                            value={eventType.name}
                            onChange={handleNameChange}
                            required
                        />
                        <Label for="programDescription" className="mt-2" check>
                            Description du type d'événement
                        </Label>
                        <textarea
                            id="programDescription"
                            className="form-control"
                            rows={5}
                            value={eventType.description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-info"
                        onClick={() => dispatch(setModalEditEventTypes({ isOpen: false, EventType: null }))}
                    >
                        {"Annuler"}
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        {"Mettre à jour"}
                    </button>
                </ModalFooter>
            </Modal>
        </Col>
    );
};

export default UpdateEventsTypeModal;
