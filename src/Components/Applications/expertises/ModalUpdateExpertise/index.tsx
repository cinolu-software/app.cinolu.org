import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {updateExpertise, setModalEditExpertise} from "@/Redux/Reducers/userSlice/ExpertiseSlice";
import { Flip, toast } from "react-toastify";
import {UpdateExpertiseType} from "@/Types/Users/Coachs/ExpertiseType";


const ModalUpdateExpertise = () => {

    const dispatch = useAppDispatch();
    const {selectedExpertise, isOpenModalEditExpertiseType} = useAppSelector(state=>state.expertise);
    const [expertise, setExpertise] = useState<UpdateExpertiseType>({ name: '', description: '', id: '' });

    const isEditingRef = useRef(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setExpertise((prev) => ({ ...prev, name: newName }));
        isEditingRef.current = true;
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.target.value;
        setExpertise((prev) => ({ ...prev, description: newDescription }));
        isEditingRef.current = true;
    };

    useEffect(() => {

        if (!isEditingRef.current) {
            setExpertise({
                id: selectedExpertise?.id || '',
                name: selectedExpertise?.name || '',
                description: selectedExpertise?.description || '',
            });
        } else {
            isEditingRef.current = false;
        }
    }, [selectedExpertise]);

    const handleSubmit = async () => {
        try {
            await dispatch(updateExpertise(expertise)).unwrap();
            dispatch(setModalEditExpertise({ isOpen: false, expertise: null }));
            toast.success(
                <p className="text-white tx-16 mb-0">{"Expertise mis à jour avec succès"}</p>,
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
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la mise à jour du type de l'expertise"}</p>,
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
                isOpen={isOpenModalEditExpertiseType}
                toggle={() => dispatch(setModalEditExpertise({ isOpen: false, expertise: null }))}
                size="lg"
            >
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Mettre à jour "}</h1>
                    <Button close onClick={() => dispatch(setModalEditExpertise({ isOpen: false, expertise: null }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="update-category">
                        <Label for="programName" check>
                            Nom de l'expertise <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="programName"
                            type="text"
                            value={expertise.name}
                            onChange={handleNameChange}
                            required
                        />
                        <Label for="programDescription" className="mt-2" check>
                            Description de l'expertise
                        </Label>
                        <textarea
                            id="programDescription"
                            className="form-control"
                            rows={5}
                            value={expertise.description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-outline-light"
                        onClick={() => dispatch(setModalEditExpertise({ isOpen: false, expertise: null }))}
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

export default ModalUpdateExpertise;
