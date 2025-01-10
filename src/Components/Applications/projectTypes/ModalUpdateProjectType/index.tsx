import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {updateProjectType, setModalEditProjectTypes} from "@/Redux/Reducers/projectSlice/projectTypeSlice";
import { Flip, toast } from "react-toastify";
import {UpdateTypeType} from "@/Types/Projects/ProjectTypeType";

const UpdateProjectTypeModal = () => {
    const dispatch = useAppDispatch();
    const { selectedProjectType, isOpenModalEditProjectType } = useAppSelector((state) => state.projectType);
    const [projectType, setProjectType] = useState<UpdateTypeType>({ name: '', description: '', id: '' });

    const isEditingRef = useRef(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setProjectType((prev) => ({ ...prev, name: newName }));
        isEditingRef.current = true;
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDescription = e.target.value;
        setProjectType((prev) => ({ ...prev, description: newDescription }));
        isEditingRef.current = true;
    };

    useEffect(() => {

        if (!isEditingRef.current) {
            setProjectType({
                id: selectedProjectType?.id || '',
                name: selectedProjectType?.name || '',
                description: selectedProjectType?.description || '',
            });
        } else {
            isEditingRef.current = false;
        }
    }, [selectedProjectType]);

    const handleSubmit = async () => {
        try {
            await dispatch(updateProjectType(projectType)).unwrap();
            dispatch(setModalEditProjectTypes({ isOpen: false, projectType : null }));
            toast.success(
                <p className="text-white tx-16 mb-0">{"Type de projet mis à jour avec succès"}</p>,
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
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la mise à jour du type de projet"}</p>,
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
                isOpen={isOpenModalEditProjectType}
                toggle={() => dispatch(setModalEditProjectTypes({ isOpen: false, projectType: null }))}
                size="lg"
            >
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Mettre à jour un type de programme"}</h1>
                    <Button close onClick={() => dispatch(setModalEditProjectTypes({ isOpen: false, projectType: null }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="update-category">
                        <Label for="programName" check>
                            Nom du type de programme <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="programName"
                            type="text"
                            value={projectType.name}
                            onChange={handleNameChange}
                            required
                        />
                        <Label for="programDescription" className="mt-2" check>
                            Description du type de programme
                        </Label>
                        <textarea
                            id="programDescription"
                            className="form-control"
                            rows={5}
                            value={projectType.description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-outline-light"
                        onClick={() => dispatch(setModalEditProjectTypes({ isOpen: false, projectType: null }))}
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

export default UpdateProjectTypeModal;
