import React, { useState } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Flip, toast } from "react-toastify";
import {createCategory, setModalCreateCategory} from "@/Redux/Reducers/projectSlice/ProgramsCategory";
import { CreateCategoryType } from '@/Types/Programs/ProgramsCategoryType'

const CreateNewProgramCategory = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateCategory} = useAppSelector(state => state.programCategory);
    const [category, setCategory] = useState<CreateCategoryType>({name: ''});

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {setCategory({name: e.target.value})}

    const handleCreateCategory = async () => {
        await dispatch(createCategory(category)).unwrap()
        .then(() => {
            dispatch(setModalCreateCategory({ isOpen: false }));
            toast.success(
                <p className="text-white tx-16 mb-0">{"Type de programme créé avec succès"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        })
        .catch(() => {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création du type de programme"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        })
    }

    return (
        <Col xs="12">
            <Modal isOpen={isOpenModalCreateCategory} toggle={() => dispatch(setModalCreateCategory({ isOpen: false }))} size="lg">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Ajouter une catégorie de programme"}</h1>
                    <Button close onClick={() => dispatch(setModalCreateCategory({ isOpen: false }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="create-category">
                        <Label for="programName" check>
                            Nom de la catégorie de programme <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="programName"
                            type="text"
                            value={category.name}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-outline-light'} onClick={() => dispatch(setModalCreateCategory({ isOpen: false }))}>
                        {"Annuler"}
                    </button>
                    <button className={'btn btn-outline-primary'} onClick={handleCreateCategory}>
                        {"Créer"}
                    </button>
                </ModalFooter>
            </Modal>
        </Col>
    );
}

export default CreateNewProgramCategory