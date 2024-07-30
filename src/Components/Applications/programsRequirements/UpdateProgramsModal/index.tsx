import React from 'react';
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalEditProgram } from "@/Redux/Reducers/programsSlice/programsSlice";
import { Col } from "reactstrap";
import CommonModal from "./Common/CommonModal";
import BorderTabs from "./BorderTabs"

const UpdateProgramsModal = () => {

    const { isOpenModalEditProgram} = useAppSelector((state) => state.programs);
    const dispatch = useAppDispatch();

    return (
        <>
            <Col xl="6" md="8" className="custom-alert text-center">
                <CommonModal
                    centered
                    modalBodyClassName="social-profile text-start"
                    isOpen={isOpenModalEditProgram}
                    toggle={() => dispatch(setModalEditProgram({ isOpen: false, program: null }))}
                >
                    <div className="modal-toggle-wrapper">
                        <h3 className={"mb-4"}>{"Modifier le Programme"}</h3>
                        <BorderTabs/>
                    </div>
                </CommonModal>
            </Col>
        </>
    );
}
export default UpdateProgramsModal;




