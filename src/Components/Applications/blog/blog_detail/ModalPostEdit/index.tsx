import React, {useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {Flip, toast} from "react-toastify";
import {setModalEditPost} from "@/Redux/Reducers/BlogSlice/postSlice";



const ModalPostEdit= () => {
    const dispatch = useAppDispatch();
    const { isOpenModalEditPost } = useAppSelector(state=>state.post);

    return (
        <Modal isOpen={isOpenModalEditPost} toggle={()=> dispatch(setModalEditPost({isOpen: false}))} size={"xl"}>
            <div className="modal-header">

            </div>
            <ModalBody></ModalBody>
            <ModalFooter></ModalFooter>
        </Modal>
    )

}

export default ModalPostEdit;