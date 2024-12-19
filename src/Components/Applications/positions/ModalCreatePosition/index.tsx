import React, { useState } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter, Spinner } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {createPosition, setModalCreatePosition} from "@/Redux/Reducers/userSlice/PositionSlice";
import { Flip, toast } from "react-toastify";
import {CreatePositionType} from "@/Types/Users/Members/PositionsType";

const ModalCreatePosition = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreatePosition, status} = useAppSelector(state=>state.position)
    const [position, setPosition] = useState<CreatePositionType>({ name: '', description: '' });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPosition(prevPosition => ({ ...prevPosition, name: e.target.value }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPosition(prevPosition => ({ ...prevPosition, description: e.target.value }));
    };

    const handleSubmit = async () => {
        await dispatch(createPosition(position)).unwrap()
            .then(() => {
                dispatch(setModalCreatePosition({ isOpen: false }));
                toast.success(
                    <p className="text-white tx-16 mb-0">{"Job title créé avec succès"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
                setPosition(
                    {
                        name: '',
                        description: ''
                    }
                )
            })
            .catch((error) => {
                toast.error(
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création du job title"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            });
    };

    return (
        <Col xs="12">
            <Modal isOpen={isOpenModalCreatePosition} toggle={() => dispatch(setModalCreatePosition({ isOpen: false }))} size="lg">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Ajouter un job title"}</h1>
                    <Button close onClick={() => dispatch(setModalCreatePosition({ isOpen: false }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="create-category">
                        <Label for="programName" check>
                            Nom du job title <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="programName"
                            type="text"
                            value={position.name}
                            onChange={handleNameChange}
                            required
                        />
                        <Label for="programDescription" className="mt-2" check>
                            Description du job title
                        </Label>
                        <textarea
                            id="programDescription"
                            className="form-control"
                            rows={5}
                            value={position.description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-outline-light'} onClick={() => dispatch(setModalCreatePosition({ isOpen: false }))}>
                        {"Annuler"}
                    </button>
                    <button className={'btn btn-outline-primary'} onClick={handleSubmit} disabled={
                        position.name === "" || position.description === "" || status === "loading"
                    }>
                        {
                            status === "loading" ? <Spinner size="sm" color="light" /> : "Ajouter"
                        }
                    </button>
                </ModalFooter>
            </Modal>
        </Col>
    );
};

export default ModalCreatePosition;
