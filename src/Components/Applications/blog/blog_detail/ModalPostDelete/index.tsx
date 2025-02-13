import React, {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Col, CardBody} from "reactstrap";
import {useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {Flip, toast, ToastContainer} from "react-toastify";
import {setModalDeletePost, deletePost} from "@/Redux/Reducers/BlogSlice/postSlice";
import CommonModal from "@/CommonComponent/CommonModalType/CommonModal";

const ModalPostDelete = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalDeletePost, selectedPost, } = useAppSelector(state=>state.post);

    return (
        <Col xl="4">
            <CardBody className="badge-spacing">
                <CommonModal
                    centered
                    isOpen={}
                    toggle={() => dispatch(setModalDeletePost({ isOpen: false, event: null }))}
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
    )


}
export default ModalPostDelete;