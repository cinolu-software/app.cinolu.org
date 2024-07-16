import React from 'react';
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalEditProgram } from "@/Redux/Reducers/programsSlice/programsSlice";
import { Col } from "reactstrap";
import CommonModal from "./Common/CommonModal";
import { StaticForm } from "./StaticBackdropModal/StaticForm";

const UpdateProgramsModal = () => {
    const { isOpenModalEditProgram, selectedProgram, transformedProgramsData } = useAppSelector((state) => state.programs);
    const dispatch = useAppDispatch();

    const selectedProgramData = transformedProgramsData.find((item) => item.id === selectedProgram?.id);

    return (
        <>
            <Col xl="4" md="6" className="custom-alert text-center">
                <CommonModal
                    centered
                    modalBodyClassName="social-profile text-start"
                    isOpen={isOpenModalEditProgram}
                    toggle={() => dispatch(setModalEditProgram({ isOpen: false, program: null }))}
                >
                    <div className="modal-toggle-wrapper">
                        <h3 className={"mb-4"}>{"Modifier le Programme"}</h3>
                        <StaticForm staticModalToggle={() => dispatch(setModalEditProgram({ isOpen: false, program: null }))} selectedProgram={selectedProgramData} />
                    </div>
                </CommonModal>
            </Col>
        </>
    );
}

export default UpdateProgramsModal;




