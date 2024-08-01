import React from "react";
import { Button, Col, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setModalCreateProgram} from "@/Redux/Reducers/programsSlice/programsSlice"

import AddProgramContainer from "./MultiStepForm"


const ModalCreatePrograms = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateProgram} = useAppSelector(state => state.programs)

    return (

        <Col xs="12">
            <Modal isOpen={isOpenModalCreateProgram} toggle={() => dispatch(setModalCreateProgram({ isOpen: false }))} size="xl">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Ajouter d'un programme"}</h1>
                    <Button close onClick={() => dispatch(setModalCreateProgram({ isOpen: false }))} />
                </div>
                <ModalBody className="custom-input">
                    <AddProgramContainer/>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={() => dispatch(setModalCreateProgram({ isOpen: false }))}>
                        {"Annuler"}
                    </Button>
                    <Button color="primary" onClick={() => dispatch(setModalCreateProgram({ isOpen: false }))}>
                        {"Créer"}
                    </Button>
                </ModalFooter>
            </Modal>
        </Col>
    );
};

export default ModalCreatePrograms;
