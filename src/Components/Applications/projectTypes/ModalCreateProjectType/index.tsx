import React, { useState } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createProjectType, setModalCreateProjectTypes } from "@/Redux/Reducers/projectSlice/projectTypeSlice";
import { Flip, toast } from "react-toastify";
import { CreateProjectTypeType } from "@/Types/Projects/ProjectTypeType";

const CreateNewType = () => {

    const dispatch = useAppDispatch();
    const isOpenModalCreateProjectType = useAppSelector(state => state.projectType.isOpenModalCreateProjectType);
    const [project, setProject] = useState<CreateProjectTypeType>({ name: '', description: '' });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProject(prevProject => ({ ...prevProject, name: e.target.value }));
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProject(prevProject => ({ ...prevProject, description: e.target.value }));
    };

    const handleSubmit = async () => {
        await dispatch(createProjectType(project)).unwrap()
            .then(() => {
                dispatch(setModalCreateProjectTypes({ isOpen: false }));
                toast.success(
                    <p className="text-white tx-16 mb-0">{"Type de projet créé avec succès"}</p>,
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
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création du type de projet"}</p>,
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
            <Modal isOpen={isOpenModalCreateProjectType} toggle={() => dispatch(setModalCreateProjectTypes({ isOpen: false }))} size="lg">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Ajouter un type de projet"}</h1>
                    <Button close onClick={() => dispatch(setModalCreateProjectTypes({ isOpen: false }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="create-category">
                        <Label for="programName" check>
                            Nom du type de projet <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="programName"
                            type="text"
                            value={project.name}
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
                            value={project.description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-outline-light'} onClick={() => dispatch(setModalCreateProjectTypes({ isOpen: false }))}>
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

export default CreateNewType;
