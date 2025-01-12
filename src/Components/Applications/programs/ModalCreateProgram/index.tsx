import React, { useState } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {createProgram, setModalCreateProgram} from "@/Redux/Reducers/programSlice/programSlice";
import { Flip, toast } from "react-toastify";
import {CreateProgramType} from "@/Types/Programs/ProgramType";

const CreateProgramModal = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateProgram} = useAppSelector(state=>state.program)
    const [program, setProgram] = useState<CreateProgramType>({ name: '', description: '' });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProgram(prevProgram => ({ ...prevProgram, name: e.target.value }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProgram(prevProgram => ({ ...prevProgram, description: e.target.value }));
    };

    const handleSubmit = async () => {
        await dispatch(createProgram(program)).unwrap()
            .then(() => {
                dispatch(setModalCreateProgram({ isOpen: false }));
                toast.success(
                    <p className="text-white tx-16 mb-0">{"programme créé avec succès"}</p>,
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
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création du program"}</p>,
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
            <Modal isOpen={isOpenModalCreateProgram} toggle={() => dispatch(setModalCreateProgram({ isOpen: false }))} size="lg">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Ajouter un programme"}</h1>
                    <Button close onClick={() => dispatch(setModalCreateProgram({ isOpen: false }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="create-category">
                        <Label for="programName" check>
                            Nom du programme <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="programName"
                            type="text"
                            value={program.name}
                            onChange={handleNameChange}
                            required
                        />
                        <Label for="programDescription" className="mt-2" check>
                            Description du programme
                        </Label>
                        <textarea
                            id="programDescription"
                            className="form-control"
                            rows={5}
                            value={program.description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-outline-light'} onClick={() => dispatch(setModalCreateProgram({ isOpen: false }))}>
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

export default CreateProgramModal;