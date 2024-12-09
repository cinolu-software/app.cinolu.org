import React, { useState } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {createExpertise, setModalCreateExpertise} from "@/Redux/Reducers/userSlice/ExpertiseSlice";
import { Flip, toast } from "react-toastify";
import {CreateExpertiseType} from "@/Types/Users/Coachs/ExpertiseType";


const ModalCreateExpertise = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateExpertiseType} = useAppSelector(state=>state.expertise)
    const [expertise, setExpertise] = useState<CreateExpertiseType>({ name: '', description: '' });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpertise(prevExpertise => ({ ...prevExpertise, name: e.target.value }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setExpertise(prevExpertise => ({ ...prevExpertise, description: e.target.value }));
    };

    const handleSubmit = async () => {
        await dispatch(createExpertise(expertise)).unwrap()
            .then(() => {
                dispatch(setModalCreateExpertise({ isOpen: false }));
                toast.success(
                    <p className="text-white tx-16 mb-0">{"Expertise crééé avec succès"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            })
            .catch((error) => {
                toast.error(
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création de l'expertise"}</p>,
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
            <Modal isOpen={isOpenModalCreateExpertiseType} toggle={() => dispatch(setModalCreateExpertise({ isOpen: false }))} size="lg">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Ajouter un de l'expertise"}</h1>
                    <Button close onClick={() => dispatch(setModalCreateExpertise({ isOpen: false }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="create-category">
                        <Label for="expertise" check>
                            Nom de l'expertise <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="expertise"
                            type="text"
                            value={expertise.name}
                            onChange={handleNameChange}
                            required
                        />
                        <Label for="expertiseDescription" className="mt-2" check>
                            Description de l'expertise <span className="txt-danger">*</span>
                        </Label>
                        <textarea
                            id="expertiseDescription"
                            className="form-control"
                            rows={5}
                            value={expertise.description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-outline-light'} onClick={() => dispatch(setModalCreateExpertise({ isOpen: false }))}>
                        {"Annuler"}
                    </button>
                    <button className={'btn btn-outline-primary'} onClick={handleSubmit}>
                        {"Créer"}
                    </button>
                </ModalFooter>
            </Modal>
        </Col>
    );
};

export default ModalCreateExpertise
