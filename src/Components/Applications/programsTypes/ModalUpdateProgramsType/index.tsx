import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import SimpleMdeReact from "react-simplemde-editor";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { updateProgramType, setModalEditProgramTypes } from "@/Redux/Reducers/programsSlice/programsTypeSlice";
import { Flip, toast } from "react-toastify";
import { ProgramsTypeType } from "@/Types/Programs/ProgramsTypeType";

const UpdateProgramTypeModal = () => {
    const dispatch = useAppDispatch();
    const { selectedProgramType, isOpenModalEditProgramType } = useAppSelector((state) => state.programsType);


    const [programType, setProgramType] = useState<ProgramsTypeType>({
        id: selectedProgramType?.id || 0,
        name: selectedProgramType?.name || '',
        description: selectedProgramType?.description || '',
        created_at: selectedProgramType?.created_at || '',
        updated_at: selectedProgramType?.updated_at || '',
        image: selectedProgramType?.image || ''
    });

    const nameRef = useRef(selectedProgramType?.name || '');
    const descriptionRef = useRef(selectedProgramType?.description || '');

    useEffect(() => {
        setProgramType({
            id: selectedProgramType?.id || 0,
            name: selectedProgramType?.name || '',
            description: selectedProgramType?.description || '',
            created_at: selectedProgramType?.created_at || '',
            updated_at: selectedProgramType?.updated_at || '',
            image: selectedProgramType?.image || ''
        });
        nameRef.current = selectedProgramType?.name || '';
        descriptionRef.current = selectedProgramType?.description || '';
    }, [selectedProgramType]);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        nameRef.current = newName;
        setProgramType({ ...programType, name: newName });
    };

    const handleDescriptionChange = (value: string) => {
        descriptionRef.current = value;
        setProgramType({ ...programType, description: value });
    };

    const handleSubmit = async () => {
        await dispatch(updateProgramType(programType)).unwrap()
            .then(() => {
                dispatch(setModalEditProgramTypes({ isOpen: false, programType: null }));
                toast.success(
                    <p className="text-white tx-16 mb-0">{"Type de programme mis à jour avec succès"}</p>,
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
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la mise à jour du type de programme"}</p>,
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
            <Modal isOpen={isOpenModalEditProgramType} toggle={() => dispatch(setModalEditProgramTypes({ isOpen: false, programType: null }))} size="lg">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Mettre à jour un type de programme"}</h1>
                    <Button close onClick={() => dispatch(setModalEditProgramTypes({ isOpen: false, programType: null }))} />
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
                            value={programType.name}
                            onChange={handleNameChange}
                            required
                        />
                        <div id="editor3" className="mt-2">
                            <SimpleMdeReact
                                id="editor_container"
                                value={programType.description}
                                onChange={handleDescriptionChange}
                                options={{ autofocus: true, spellChecker: false }}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={() => dispatch(setModalEditProgramTypes({ isOpen: false, programType: null }))}>
                        {"Annuler"}
                    </Button>
                    <Button color="primary" onClick={handleSubmit}>
                        {"Mettre à jour"}
                    </Button>
                </ModalFooter>
            </Modal>
        </Col>
    );
};


export default UpdateProgramTypeModal;
