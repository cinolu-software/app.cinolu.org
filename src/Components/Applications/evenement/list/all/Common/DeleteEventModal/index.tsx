import React from 'react';
import { ImagePath } from "@/Constant";
import { Button, CardBody, Col } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModalType/CommonModal";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setModalDeleteEvenement, deleteEvenement} from "@/Redux/Reducers/evenement";
import { toast, ToastContainer, Flip } from "react-toastify";


const DeleteEventModal = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalDeleteEvenement, selectedEvenement, originalProjectData} = useAppSelector(state => state.evenement);
    const selectedEventData = originalProjectData?.find((item) => item.id === selectedEvenement?.id);

    const handleDelete = async () => {
        if (selectedEvenement && selectedEventData?.id !== undefined) {
            try {
                await dispatch(deleteEvenement(selectedEventData.id)).unwrap();
                dispatch(setModalDeleteEvenement({ isOpen: false, evenement: null }));
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
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la suppression de l'événement"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            }
        }
    };

    return (
        <Col xl="4">
            <CardBody className="badge-spacing">
                <CommonModal
                    centered
                    isOpen={isOpenModalDeleteEvenement}
                    toggle={() => dispatch(setModalDeleteEvenement({ isOpen: false, evenement: null }))}
                    title="Supprimer le programme"
                >
                    <div className="modal-toggle-wrapper">
                        <ul className="modal-img">
                            <li className="text-center">
                                <img src={`${ImagePath}/gif/danger.gif`} alt="danger" />
                            </li>
                        </ul>
                        <h4 className="text-center pb-2">
                            Êtes-vous sûr de vouloir supprimer cet événement ?
                        </h4>
                        <div className="d-flex justify-content-center mt-5">
                            <Button
                                color="primary"
                                className="me-2"
                                outline={true}
                                onClick={() => dispatch(setModalDeleteEvenement({ isOpen: false, evenement: null }))}
                            >
                                {"Fermer"}
                            </Button>
                            <Button  onClick={handleDelete} outline={true} color={'danger'}>
                                {"Supprimer"}
                            </Button>
                        </div>
                    </div>
                </CommonModal>
                <ToastContainer />
            </CardBody>
        </Col>
    );
};

export default DeleteEventModal;