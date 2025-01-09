import React, { useState } from 'react';
import { ImagePath } from "@/Constant";
import { Button, CardBody, Col, Spinner } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModalType/CommonModal";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalDeleteProgram, deleteProgram } from "@/Redux/Reducers/projectSlice/projectSlice";
import { toast, ToastContainer, Flip } from "react-toastify";

const DeleteProgramModal = () => {
    const dispatch = useAppDispatch();
    const { isOpenModalDeleteProgram, selectedProgram, originalProgramsData } = useAppSelector((state) => state.programs);
    const selectedProgramData = originalProgramsData?.find((item) => item.id === selectedProgram?.id);

    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        if (selectedProgramData && selectedProgramData.id !== undefined) {
            setIsLoading(true);
            try {
                await dispatch(deleteProgram(selectedProgramData.id)).unwrap();
                dispatch(setModalDeleteProgram({ isOpen: false, program: null }));
                toast.success(
                    <p className="text-white tx-16 mb-0">{"Suppression effectuée avec succès"}</p>,
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
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la suppression du programme"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            } finally {
                setIsLoading(false);
            }
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
                        <div className="d-flex justify-content-center mt-5">
                            <Button
                                color="secondary"
                                className="me-2"
                                onClick={() => dispatch(setModalDeleteProgram({ isOpen: false, program: null }))}
                                disabled={isLoading}
                            >
                                {"Fermer"}
                            </Button>
                            <Button color="danger" onClick={handleDelete} disabled={isLoading}>
                                {isLoading ? <> 'Suppression '<Spinner size="sm" color="light" /></> : "Supprimer"}
                            </Button>
                        </div>
                    </div>
                </CommonModal>
                <ToastContainer />
            </CardBody>
        </Col>
    );
};

export default DeleteProgramModal;




