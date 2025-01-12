import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {updateProgram, setModalEditProgram} from "@/Redux/Reducers/programSlice/programSlice";
import { Flip, toast } from "react-toastify";
import {UpdateProgramType} from "@/Types/Programs/ProgramType";

const UpdateProgramModal = () => {
    const dispatch = useAppDispatch();
    const { selectedProgram, isOpenModalEditProgram } = useAppSelector(state=>state.program);
    const [program, setProgram] = useState<UpdateProgramType>({ name: '', description: '', id: '' });

    const isEditingRef = useRef(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setProgram((prev) => ({ ...prev, name: newName }));
        isEditingRef.current = true;
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.target.value;
        setProgram((prev) => ({ ...prev, description: newDescription }));
        isEditingRef.current = true;
    };

    useEffect(() => {

        if (!isEditingRef.current) {
            setProgram({
                id: selectedProgram?.id || '',
                name: selectedProgram?.name || '',
                description: selectedProgram?.description || '',
            });
        } else {
            isEditingRef.current = false;
        }
    }, [selectedProgram]);

    const handleSubmit = async () => {
        try {
            await dispatch(updateProgram(program)).unwrap();
            dispatch(setModalEditProgram({ isOpen: false, program : null }));
            toast.success(
                <p className="text-white tx-16 mb-0">{"program mis à jour avec succès"}</p>,
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
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la mise à jour du program"}</p>,
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
                isOpen={isOpenModalEditProgram}
                toggle={() => dispatch(setModalEditProgram({ isOpen: false, program: null }))}
                size="lg"
            >
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Mettre à jour un programme"}</h1>
                    <Button close onClick={() => dispatch(setModalEditProgram({ isOpen: false, program: null }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="update-category">
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
                    <button
                        className="btn btn-outline-light"
                        onClick={() => dispatch(setModalEditProgram({ isOpen: false, program: null }))}
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

export default UpdateProgramModal;