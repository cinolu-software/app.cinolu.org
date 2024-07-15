import React from 'react';
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalCreateCategory } from "@/Redux/Reducers/projectSlice/projectCategorySlice";
import { Button, Col } from "reactstrap";
import CommonModal from "./Common/CommonModal";
import { StaticForm } from "./StaticBackdropModal/StaticForm";

const CreateCategoryModal = () => {
    const { isOpenModalCreateCategory } = useAppSelector((state) => state.categories);
    const dispatch = useAppDispatch();

    return (
        <>
            <Col xl="4" md="6" className="custom-alert text-center">
                <CommonModal
                    centered
                    modalBodyClassName="social-profile text-start"
                    isOpen={isOpenModalCreateCategory}
                    toggle={() => dispatch(setModalCreateCategory({ isOpen: false }))}
                >
                    <div className="modal-toggle-wrapper">
                        <h3 className={"mb-4"}>{"Ajouter une Catégorie"}</h3>
                        <StaticForm staticModalToggle={() => dispatch(setModalCreateCategory({ isOpen: false }))} />
                    </div>
                </CommonModal>
            </Col>
        </>
    );
};

export default CreateCategoryModal;


