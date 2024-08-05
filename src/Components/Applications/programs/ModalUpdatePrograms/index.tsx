import React from "react";
import { Button, Col, Modal, ModalBody} from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { RootState } from "@/Redux/Store";
import {setModalEditProgram} from "@/Redux/Reducers/programsSlice/programsSlice";
import BorderTabs from "./BorderTabs/";


const ModalUpdatePrograms = () => {

    const dispatch = useAppDispatch();
    const { isOpenModalEditProgram } = useAppSelector((state: RootState) => state.programs);

    return (
        <Col xs="12">
            <Modal isOpen={isOpenModalEditProgram} toggle={() => dispatch(setModalEditProgram({ isOpen: false, program: null }))} size="xl">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Modifier le programme"}</h1>
                    <Button close onClick={() => dispatch(setModalEditProgram({ isOpen: false, program: null }))} />
                </div>
                <ModalBody className="custom-input">
                    <BorderTabs/>
                </ModalBody>
            </Modal>
        </Col>
    );
};

export default ModalUpdatePrograms;
