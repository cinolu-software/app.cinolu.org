import React from 'react';
import { ImagePath } from "@/Constant";
import { Button, CardBody, Col } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModalType/CommonModal";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setModalDeleteEvent, deleteEvent} from "@/Redux/Reducers/eventSlice/eventSlice";
import { toast, ToastContainer, Flip } from "react-toastify";

const DeleteEventModal = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalDeleteEvent, selectedEvent, dataEvent} = useAppSelector(state=>state.event)
    const selectedEventData = dataEvent?.find((item) => item.id === selectedEvent?.id);

    const handleDelete = async () => {
        if (selectedEventData && selectedEventData.id !== undefined) {
            try {
                await dispatch(deleteEvent(selectedEventData.id)).unwrap();
                dispatch(setModalDeleteEvent({ isOpen: false, event: null }));
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
                    isOpen={isOpenModalDeleteEvent}
                    toggle={() => dispatch(setModalDeleteEvent({ isOpen: false, event: null }))}
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
                                color="secondary"
                                className="me-2"
                                onClick={() => dispatch(setModalDeleteEvent({ isOpen: false, event: null }))}
                            >
                                {"Fermer"}
                            </Button>
                            <Button color="danger" onClick={handleDelete}>
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