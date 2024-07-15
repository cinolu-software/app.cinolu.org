import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalCreateRole} from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";
import { Button, Col } from "reactstrap";
import CommonModal from "./Common/CommonModal";
import { StaticForm } from "./StaticBackdropModal/StaticForm";
import { CommonMofiModalTitle } from "./Common/CommonMofiModalTitle";


const CreateCategoryModal = () => {

    const {isOpenModalCreateRole} = useAppSelector((state)=> state.role)
    const dispatch = useAppDispatch();


    return (
        <>
            <Col xl="4" md="6" className="custom-alert text-center">
                <CommonModal centered modalBodyClassName="social-profile text-start" isOpen={isOpenModalCreateRole} toggle={()=>dispatch(setModalCreateRole(false))}>
                    <div className="modal-toggle-wrapper">
                        <h3 className={"mb-4"}>{"Ajouter un Rôle"}</h3>
                        <StaticForm staticModalToggle={()=>dispatch(setModalCreateRole(false))} />
                    </div>
                </CommonModal>
            </Col>
        </>
    );
}

export default CreateCategoryModal;

