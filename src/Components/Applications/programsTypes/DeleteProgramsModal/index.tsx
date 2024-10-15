import React from 'react';
import { ImagePath } from "@/Constant";
import { Button, CardBody, Col } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModalType/CommonModal";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalDeleteProgramTypes, deleteProgramType } from "@/Redux/Reducers/programsSlice/programsTypeSlice";

const DeleteProgramModal = () => {
    const dispatch = useAppDispatch();
    const { isOpenModalDeleteProgramType, selectedProgramType, originalTypeProgramsData } = useAppSelector((state) => state.programsType);
    const selectedProgramData = originalTypeProgramsData.find((item) => item.id === selectedProgramType?.id);

    const handleDelete = () => {
        if (selectedProgramData && selectedProgramData.id !== undefined) {
            dispatch(deleteProgramType(selectedProgramData.id));
            dispatch(setModalDeleteProgramTypes({ isOpen: false, programType: null }));
        }
    };

    return (
        <Col xl="4">
            <CardBody className="badge-spacing">
                <CommonModal
                    centered
                    isOpen={isOpenModalDeleteProgramType}
                    toggle={() => dispatch(setModalDeleteProgramTypes({ isOpen: false, programType: null }))}
                    title="Supprimer le Type "
                >
                    <div className="modal-toggle-wrapper">
                        <ul className="modal-img">
                            <li className="text-center">
                                <img src={`${ImagePath}/gif/danger.gif`} alt="danger" />
                            </li>
                        </ul>
                        <h4 className="text-center pb-2">
                            Êtes-vous sûr de vouloir supprimer ce type ?
                        </h4>
                        {selectedProgramData && (
                            <p className="text-center">
                                Vous êtes sur le point de supprimer ce type : <strong>{selectedProgramData.name}</strong>
                            </p>
                        )}
                        <div className="d-flex justify-content-center mt-5">
                            <Button
                                color="secondary"
                                className="me-2"
                                onClick={() => dispatch(setModalDeleteProgramTypes({ isOpen: false, programType: null }))}
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
