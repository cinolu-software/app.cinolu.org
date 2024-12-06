import React, { useState } from 'react';
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter, Badge } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Flip, toast } from "react-toastify";
import { setModalcreateProgramPhase, createProgramPhase } from "@/Redux/Reducers/programsSlice/ProgramPhaseSlice";

const CreateNewPhase = () => {
    const dispatch = useAppDispatch();
    const { isOpenModalCreateProgramPhase, formValue } = useAppSelector(state => state.programPhase);
    const { programData } = useAppSelector(state => state.programs);

    const handleInputChange = (field: keyof typeof formValue, value: string) => {
        dispatch({
            type: 'programsPhase/setFormValue',
            payload: { field, value },
        });
    };

    const handleSubmit = async () => {
        if (!formValue.name || !formValue.description || !formValue.started_at || !formValue.ended_at) {
            toast.error("Tous les champs marqués d'une * sont obligatoires", {
                transition: Flip,
            });
            return;
        }

        if (!programData?.id) {
            toast.error("Aucun programme sélectionné", {
                transition: Flip,
            });
            return;
        }

        const newPhase = {
            ...formValue,
            program: programData.id,
        };

        try {
            await dispatch(createProgramPhase(newPhase)).unwrap();
            toast.success("Phase créée avec succès !", { transition: Flip });
            dispatch(setModalcreateProgramPhase({ isOpen: false }));
        } catch (err) {
            toast.error("Erreur lors de la création de la phase", { transition: Flip });
        }
    };

    return (
        <Col xs="12">
            <Modal
                isOpen={isOpenModalCreateProgramPhase}
                toggle={() => dispatch(setModalcreateProgramPhase({ isOpen: false }))}
                size="lg"
            >
                <div className="modal-header">
                    <h1 className="modal-title fs-5">
                        Ajouter une phase au programme{" "}
                        <Badge className="bg-brown">{programData?.name || "Programme non spécifié"}</Badge>
                    </h1>
                    <Button close onClick={() => dispatch(setModalcreateProgramPhase({ isOpen: false }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="create-phase">
                        <Label for="phaseName" check>
                            Nom de la phase <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="phaseName"
                            type="text"
                            value={formValue.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            required
                        />

                        <Label for="startDate" className="mt-2" check>
                            Date de début <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="startDate"
                            type="date"
                            value={formValue.started_at}
                            onChange={(e) => handleInputChange("started_at", e.target.value)}
                            required
                        />
                        <Label for="endDate" className="mt-2" check>
                            Date de fin <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="endDate"
                            type="date"
                            value={formValue.ended_at}
                            onChange={(e) => handleInputChange("ended_at", e.target.value)}
                            required
                        />

                        <Label for="phaseDescription" className="mt-2" check>
                            Description de la phase <span className="txt-danger">*</span>
                        </Label>
                        <textarea
                            id="phaseDescription"
                            className="form-control"
                            rows={5}
                            value={formValue.description}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            required
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-outline-light"
                        onClick={() => dispatch(setModalcreateProgramPhase({ isOpen: false }))}
                    >
                        Annuler
                    </button>
                    <button className="btn btn-outline-primary" onClick={handleSubmit}>
                        Créer
                    </button>
                </ModalFooter>
            </Modal>
        </Col>
    );
};

export default CreateNewPhase;
