import React, {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, Col, CardBody} from "reactstrap";
import {useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {Flip, toast, ToastContainer} from "react-toastify";
import {setModalDeletePost, deletePost} from "@/Redux/Reducers/BlogSlice/postSlice";
import CommonModal from "@/CommonComponent/CommonModalType/CommonModal";
import {ImagePath} from "@/Constant";

const ModalPostDelete = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalDeletePost, selectedPost, postData } = useAppSelector(state=>state.post);
    const selectedPostData = postData?.find((item)=>item.id === selectedPost?.id);

    const handleDelete = async () => {
        if (selectedPostData && selectedPostData.id !== undefined) {
            try {
                await dispatch(deletePost(selectedPostData.id)).unwrap();
                dispatch(setModalDeletePost({isOpen: false, post: null}));
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
            }catch(error) {
                toast.error(
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la suppression de l'article"}</p>,
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

    }


    return (
        <Col xl="4">
            <CardBody className="badge-spacing">
                <CommonModal
                    centered
                    isOpen={isOpenModalDeletePost}
                    toggle={() => dispatch(setModalDeletePost({ isOpen: false, post: null }))}
                    title="Supprimer le post"
                >
                    <div className="modal-toggle-wrapper">
                        <ul className="modal-img">
                            <li className="text-center">
                                <img src={`${ImagePath}/gif/danger.gif`} alt="danger" />
                            </li>
                        </ul>
                        <h4 className="text-center pb-2">
                            Êtes-vous sûr de vouloir supprimer ce post ?
                        </h4>
                        <div className="d-flex justify-content-center mt-5">
                            <Button
                                color="secondary"
                                className="me-2"
                                onClick={() => dispatch(setModalDeletePost({ isOpen: false, post: null }))}
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