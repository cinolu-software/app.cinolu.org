import React from 'react';
import { ImagePath } from "@/Constant";
import { Button, CardBody, Col } from "reactstrap";
import CommonModal from "./Common/CommonModal";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalDeleteProgram, deleteProgram } from "@/Redux/Reducers/programsSlice/programsSlice";

const DeleteProgramModal = () => {
    const dispatch = useAppDispatch();
    const { isOpenModalDeleteProgram, selectedProgram, originalProgramsData } = useAppSelector((state) => state.programs);

    const selectedProgramData = originalProgramsData.find((item) => item.id === selectedProgram?.id);

    const handleDelete = () => {
        if (selectedProgramData && selectedProgramData.id !== undefined) {
            dispatch(deleteProgram(selectedProgramData.id));
            dispatch(setModalDeleteProgram({ isOpen: false, program: null }));
        }
    };

    return (
        <Col xl="4">
            <CardBody className="badge-spacing">
                <CommonModal
                    centered
                    isOpen={isOpenModalDeleteProgram}
                    toggle={() => dispatch(setModalDeleteProgram({ isOpen: false, program: null }))}
                    title="Supprimer le programme"
                >
                    <div className="modal-toggle-wrapper">
                        <ul className="modal-img">
                            <li className="text-center">
                                <img src={`${ImagePath}/gif/danger.gif`} alt="danger" />
                            </li>
                        </ul>
                        <h4 className="text-center pb-2">
                            Êtes-vous sûr de vouloir supprimer ce programme ?
                        </h4>
                        {selectedProgramData && (
                            <p className="text-center">
                                Vous êtes sur le point de supprimer ce programme : <strong>{selectedProgramData.name}</strong>
                            </p>
                        )}
                        <div className="d-flex justify-content-center mt-5">
                            <Button
                                color="secondary"
                                className="me-2"
                                onClick={() => dispatch(setModalDeleteProgram({ isOpen: false, program: null }))}
                            >
                                {"Fermer"}
                            </Button>
                            <Button color="danger" onClick={handleDelete}>
                                {"Supprimer"}
                            </Button>
                        </div>
                    </div>
                </CommonModal>
            </CardBody>
        </Col>
    );
};

export default DeleteProgramModal;


