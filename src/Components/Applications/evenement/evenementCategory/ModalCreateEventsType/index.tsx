import React, { useState } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter, Spinner } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createEventType, setModalCreateEventType } from "@/Redux/Reducers/eventSlice/EventTypeSlice";
import { Flip, toast } from "react-toastify";
import { CreateEventType } from "@/Types/EventsType/eventsTypeType";

const CreateNewEventType = () => {
    const dispatch = useAppDispatch();
    const { isOpenModalCreateEventType } = useAppSelector((state) => state.eventType);
    const [event, setEvent] = useState<CreateEventType>({ name: '', description: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEvent((prevEvent) => ({ ...prevEvent, name: e.target.value }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEvent((prevEvent) => ({ ...prevEvent, description: e.target.value }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        await dispatch(createEventType(event))
            .unwrap()
            .then(() => {
                setEvent({ name: '', description: '' });
                dispatch(setModalCreateEventType({ isOpen: false }));
                toast.success(
                    <p className="text-white tx-16 mb-0">{"catégorie de programme créé avec succès"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            })
            .catch(() => {
                toast.error(
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création du catégorie de programme"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Col xs="12">
            <Modal isOpen={isOpenModalCreateEventType} toggle={() => dispatch(setModalCreateEventType({ isOpen: false }))} size="lg">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Ajouter une catégorie d'événement"}</h1>
                    <Button close onClick={() => dispatch(setModalCreateEventType({ isOpen: false }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="create-category">
                        <Label for="programName" check>
                            Nom de la catégorie d'événement <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="programName"
                            type="text"
                            value={event.name}
                            onChange={handleNameChange}
                            required
                        />
                        {/*<Label for="programDescription" className="mt-2" check>*/}
                        {/*    Description du type d'événement*/}
                        {/*</Label>*/}
                        {/*<textarea*/}
                        {/*    id="programDescription"*/}
                        {/*    className="form-control"*/}
                        {/*    rows={5}*/}
                        {/*    value={event.description}*/}
                        {/*    onChange={handleDescriptionChange}*/}
                        {/*/>*/}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-outline-light'} onClick={() => dispatch(setModalCreateEventType({ isOpen: false }))} disabled={isLoading}>
                        {"Annuler"}
                    </button>
                    <button className={'btn btn-outline-primary'} onClick={handleSubmit} disabled={isLoading}>
                        {isLoading ? <Spinner size="sm" color="light" /> : "Créer"}
                    </button>
                </ModalFooter>
            </Modal>
        </Col>
    );
};

export default CreateNewEventType;
