import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalEditRole } from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";
import { Button, Col } from "reactstrap";
import CommonModal from "./Common/CommonModal";
import { StaticForm } from "./StaticBackdropModal/StaticForm";
import { CommonMofiModalTitle } from "./Common/CommonMofiModalTitle";

const UpdateRoleModal = () => {

    const { isOpenModalEditRole, selectedRole, transformedRoleData } = useAppSelector((state) => state.role);
    const dispatch = useAppDispatch();

    const selectedRoleData = transformedRoleData.find((item) => item.id === selectedRole?.id);


    return (
        <>
            <Col xl="4" md="6" className="custom-alert text-center">
                <CommonModal centered modalBodyClassName="social-profile text-start" isOpen={isOpenModalEditRole} toggle={() => dispatch(setModalEditRole({ isOpen: false, role: null }))}>
                    <div className="modal-toggle-wrapper">
                        <h3 className={"mb-4"}>{"Modifier le Rôle"}</h3>
                        <StaticForm staticModalToggle={() => dispatch(setModalEditRole({ isOpen: false, role: null }))} selectedRole={selectedRoleData} />
                    </div>
                </CommonModal>
            </Col>
        </>
    );
}

export default UpdateRoleModal;


