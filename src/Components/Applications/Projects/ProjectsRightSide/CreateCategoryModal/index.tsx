import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalCreateCategory} from "@/Redux/Reducers/projectSlice/projectSlice";

const CreateCategoryModal = () => {

    const {modalCreateCategory} = useAppSelector((state)=> state.project);
    const dispatch = useAppDispatch();
}

export default CreateCategoryModal;