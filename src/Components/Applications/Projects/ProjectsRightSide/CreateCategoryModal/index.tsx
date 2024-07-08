
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalCreateCategory} from "@/Redux/Reducers/projectSlice/projectSlice";
import { Button, Col } from "reactstrap";
import CommonModal from "./Common/CommonModal";
import { StaticForm } from "./StaticBackdropModal/StaticForm";
import { CommonMofiModalTitle } from "./Common/CommonMofiModalTitle";


const CreateCategoryModal = () => {

    const {modalCreateCategory} = useAppSelector((state)=> state.project);
    const dispatch = useAppDispatch();


    return (
        <>
            <Col xl="4" md="6" className="custom-alert text-center">
                <CommonModal centered modalBodyClassName="social-profile text-start" isOpen={modalCreateCategory} toggle={()=>dispatch(setModalCreateCategory(false))}>
                    <div className="modal-toggle-wrapper">
                        <h3 className={"mb-4"}>{"Créer une Catégorie"}</h3>
                        <StaticForm staticModalToggle={()=>dispatch(setModalCreateCategory(false))} />
                    </div>
                </CommonModal>
            </Col>
        </>
    );
}

export default CreateCategoryModal;

