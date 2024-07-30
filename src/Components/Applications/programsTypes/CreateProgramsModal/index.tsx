import React from 'react';
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setModalCreateProgramTypes} from "@/Redux/Reducers/programsSlice/programsTypeSlice"
import { Col } from "reactstrap";
import CommonModal from "./Common/CommonModal";
import { StaticForm } from "./StaticBackdropModal/StaticForm";

const CreateProgramTypesModal = () => {

    const { isOpenModalCreateProgramType } = useAppSelector((state) => state.programsType);
    const dispatch = useAppDispatch();

    return (
        <>
            <Col xl="4" md="6" className="custom-alert text-center">
                <CommonModal
                    centered
                    modalBodyClassName="social-profile text-start"
                    isOpen={isOpenModalCreateProgramType}
                    toggle={() => dispatch(setModalCreateProgramTypes({ isOpen: false }))}
                >
                    <div className="modal-toggle-wrapper">
                        <h3 className={"mb-4"}>{"Ajouter un Type de Program"}</h3>
                        <StaticForm staticModalToggle={() => dispatch(setModalCreateProgramTypes({ isOpen: false }))} />
                    </div>
                </CommonModal>
            </Col>
        </>
    );
};

export default CreateProgramTypesModal;


