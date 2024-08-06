import React, { useState, useMemo, useCallback } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import SimpleMdeReact from "react-simplemde-editor";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createProgramType, setModalCreateProgramTypes } from "@/Redux/Reducers/programsSlice/programsTypeSlice";
import { Flip, toast } from "react-toastify";
import { CreateProgramTypeType } from "@/Types/Programs/ProgramsTypeType";

const CreateNewType = () => {
    const dispatch = useAppDispatch();
    const isOpenModalCreateProgramType = useAppSelector(state => state.programsType.isOpenModalCreateProgramType);
    const [program, setProgram] = useState<CreateProgramTypeType>({ name: '', description: '' });

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProgram(prevProgram => ({ ...prevProgram, name: e.target.value }));
    };

    const handleDescriptionChange = useCallback((value: string) => {
        setProgram(prevProgram => ({ ...prevProgram, description: value }));
    }, []);

    const autofocusNoSpellcheckerOptions = useMemo(() => ({
        autofocus: true,
        spellChecker: false,
    }), []);

    const handleSubmit = async () => {
        await dispatch(createProgramType(program)).unwrap()
            .then(() => {
                dispatch(setModalCreateProgramTypes({ isOpen: false }));
                toast.success(
                    <p className="text-white tx-16 mb-0">{"Type de programme créé avec succès"}</p>,
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
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création du type de programme"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            })
    };

    return (
        <Col xs="12">
            <Modal isOpen={isOpenModalCreateProgramType} toggle={() => dispatch(setModalCreateProgramTypes({ isOpen: false }))} size="lg">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Ajouter un type de programme"}</h1>
                    <Button close onClick={() => dispatch(setModalCreateProgramTypes({ isOpen: false }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="create-category">
                        <Label for="programName" check>
                            Nom du type de programme <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="programName"
                            type="text"
                            value={program.name}
                            onChange={handleNameChange}
                            required
                        />
                        <div id="editor3" className="mt-2">
                            <SimpleMdeReact
                                id="editor_container"
                                value={program.description}
                                onChange={handleDescriptionChange}
                                options={autofocusNoSpellcheckerOptions}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={() => dispatch(setModalCreateProgramTypes({ isOpen: false }))}>
                        {"Annuler"}
                    </Button>
                    <Button color="primary" onClick={handleSubmit}>
                        {"Créer"}
                    </Button>
                </ModalFooter>
            </Modal>
        </Col>
    );
};

export default CreateNewType;
