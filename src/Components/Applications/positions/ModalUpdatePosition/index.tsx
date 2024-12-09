import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {updatePosition, setModalEditPosition} from "@/Redux/Reducers/userSlice/PositionSlice";
import { Flip, toast } from "react-toastify";
import {UpdatePositionType} from "@/Types/Users/Members/PositionsType";


const ModalUpdatePosition = () => {

    const dispatch = useAppDispatch();
    const {selectedPosition, isOpenModalEditPosition} = useAppSelector(state=>state.position)
    const [position, setPosition] = useState<UpdatePositionType>({ name: '', description: '', id: '' });

    const isEditingRef = useRef(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setPosition((prev) => ({ ...prev, name: newName }));
        isEditingRef.current = true;
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.target.value;
        setPosition((prev) => ({ ...prev, description: newDescription }));
        isEditingRef.current = true;
    };

    useEffect(() => {

        if (!isEditingRef.current) {
            setPosition({
                id: selectedPosition?.id || '',
                name: selectedPosition?.name || '',
                description: selectedPosition?.description || '',
            });
        } else {
            isEditingRef.current = false;
        }
    }, [selectedPosition]);

    const handleSubmit = async () => {
        try {
            await dispatch(updatePosition(position)).unwrap();
            dispatch(setModalEditPosition({ isOpen: false, position : null }));
            toast.success(
                <p className="text-white tx-16 mb-0">{"Job title mis à jour avec succès"}</p>,
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
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la mise à jour du job title"}</p>,
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
                isOpen={isOpenModalEditPosition}
                toggle={() => dispatch(setModalEditPosition({ isOpen: false, position : null }))}
                size="lg"
            >
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Mettre à jour un type de programme"}</h1>
                    <Button close onClick={() => dispatch(setModalEditPosition({ isOpen: false, position : null }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="update-category">
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
                    <button
                        className="btn btn-outline-light"
                        onClick={() => dispatch(setModalEditPosition({ isOpen: false, position : null }))}
                    >
                        {"Annuler"}
                    </button>
                    <button className="btn btn-outline-primary" onClick={handleSubmit}>
                        {"Mettre à jour"}
                    </button>
                </ModalFooter>
            </Modal>
        </Col>
    );
};

export default ModalUpdatePosition;
