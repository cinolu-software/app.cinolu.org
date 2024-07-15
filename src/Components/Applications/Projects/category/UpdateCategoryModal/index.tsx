import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalEditRole } from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";
import {setModalEditCategory} from "@/Redux/Reducers/projectSlice/projectCategorySlice"
import { Button, Col } from "reactstrap";
import CommonModal from "./Common/CommonModal";
import { StaticForm } from "./StaticBackdropModal/StaticForm";
import { CommonMofiModalTitle } from "./Common/CommonMofiModalTitle";

const UpdateCategoryModal = () => {

    const { isOpenModalEditCategory, selectedCategories, transformedCategoriesData } = useAppSelector((state) => state.categories);
    const dispatch = useAppDispatch();

    const selectedCategoryData = transformedCategoriesData.find((item) => item.id === selectedCategories?.id);

    return (
        <>
            <Col xl="4" md="6" className="custom-alert text-center">
                <CommonModal centered modalBodyClassName="social-profile text-start" isOpen={isOpenModalEditCategory} toggle={() => dispatch(setModalEditRole({ isOpen: false, role: null }))}>
                    <div className="modal-toggle-wrapper">
                        <h3 className={"mb-4"}>{"Modifier le Rôle"}</h3>
                        <StaticForm staticModalToggle={() => dispatch(setModalEditCategory({ isOpen: false, category: null }))} selectedCategory={selectedCategoryData} />
                    </div>
                </CommonModal>
            </Col>
        </>
    );
}

export default UpdateCategoryModal;


