import React, {useState, useEffect, useRef} from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter} from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {
    updateCategory,
    setModalEditCategory,
} from "@/Redux/Reducers/projectSlice/ProgramsCategory";
import {Flip, toast} from "react-toastify";
import {UpdateCategoryType} from "@/Types/Programs/ProgramsCategoryType"


const UpdateProgramCategory = () => {
    const dispatch = useAppDispatch();
    const {selectedCategory, isOpenModalEditCategory} = useAppSelector((state) => state.programCategory);
    const [programCategory, setProgramCategory] = useState<UpdateCategoryType>({name: '', id: ''});

    const isEditingRef = useRef(false);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newName = e.target.value;
        setProgramCategory((prev) => ({...prev, name: newName}));
        isEditingRef.current = true;
    }

    useEffect(() => {
        if (!isEditingRef.current) {
            setProgramCategory({
                id: selectedCategory?.id || '',
                name: selectedCategory?.name || ''
            })
        } else {
            isEditingRef.current = false
        }
    }, [selectedCategory]);


    const handleSubmit = async () => {
        try {
            await dispatch(updateCategory(programCategory)).unwrap()
            dispatch(setModalEditCategory({isOpen: false, programCategory: null}))
            toast.success(
                <p className="text-white tx-16 mb-0">{"Catégorie de programme mis à jour avec succès"}</p>,
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
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la mise à jour de la catégorie de programme"}</p>,
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

    return (
        <Col xs={'12'}>
            <Modal
                isOpen={isOpenModalEditCategory}
                toggle={() => dispatch(setModalEditCategory({isOpen: false, programCategory: null}))}
                size={'lg'}
            >
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Mettre à jour un type de programme"}</h1>
                    <Button close
                            onClick={() => dispatch(setModalEditCategory({isOpen: false, programCategory: null}))}
                    />
                </div>
                <ModalBody className="custom-input">
                    <div className="update-category">
                        <Label for="programName" check>
                            Nom du type de programme <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="programName"
                            type="text"
                            value={programCategory.name || ""}
                            onChange={handleNameChange}
                            required
                        />

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-outline-light"
                        onClick={() => dispatch(setModalEditCategory({isOpen: false, programCategory: null}))}
                    >
                        {"Annuler"}
                    </button>
                    <button className="btn btn-outline-primary" onClick={handleSubmit}>
                        {"Mettre à jour"}
                    </button>
                </ModalFooter>
            </Modal>
        </Col>
    )

}

export default UpdateProgramCategory