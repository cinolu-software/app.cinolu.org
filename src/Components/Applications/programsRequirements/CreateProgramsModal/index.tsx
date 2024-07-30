import React from 'react';
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalCreateProgram } from "@/Redux/Reducers/programsSlice/programsSlice";
import { Button, Col } from "reactstrap";
import CommonModal from "./Common/CommonModal";
import { StaticForm } from "./StaticBackdropModal/StaticForm";

const CreateProgramModal = () => {
    const { isOpenModalCreateProgram } = useAppSelector((state) => state.programs);
    const dispatch = useAppDispatch();

    return (
        <>
            <Col xl="4" md="6" className="custom-alert text-center">
                <CommonModal
                    centered
                    modalBodyClassName="social-profile text-start"
                    isOpen={isOpenModalCreateProgram}
                    toggle={() => dispatch(setModalCreateProgram({ isOpen: false }))}
                >
                    <div className="modal-toggle-wrapper">
                        <h3 className={"mb-4"}>{"Ajouter un Programme"}</h3>
                        <StaticForm staticModalToggle={() => dispatch(setModalCreateProgram({ isOpen: false }))} />
                    </div>
                </CommonModal>
            </Col>
        </>
    );
};

export default CreateProgramModal;


