
import { ImagePath} from "@/Constant";
import {Button, Card, CardBody, Col, ModalFooter} from "reactstrap";
import CommonModal from "./Common/CommonModal";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setModalDeleteCategory, deleteCategory} from "@/Redux/Reducers/projectSlice/projectCategorySlice"


const CenteredModal = () => {

    const dispatch = useAppDispatch();

    const { isOpenModalDeleteCategory, selectedCategories, originalCategoriesData } = useAppSelector((state) => state.categories);

    const selectedCategoryData = originalCategoriesData.find((item) => item.id == selectedCategories?.id);

    const handleDelete = () => {
        if (selectedCategoryData) {
            dispatch(deleteCategory(selectedCategoryData.id));
            dispatch(setModalDeleteCategory({ isOpen: false, category: null }));
        }
    };

    return (
        <Col xl="4">
            <CardBody className="badge-spacing">
                <CommonModal centered isOpen={isOpenModalDeleteCategory} toggle={() => dispatch(setModalDeleteCategory({ isOpen: false, category: null }))} title="Supprimer le rôle">
                    <div className="modal-toggle-wrapper">
                        <ul className="modal-img">
                            <li className="text-center"><img src={`${ImagePath}/gif/danger.gif`} alt="danger" /></li>
                        </ul>
                        <h4 className="text-center pb-2">Êtes-vous sûr de vouloir supprimer cette catégorie ?</h4>
                        {selectedCategoryData && (
                            <p className="text-center">Vous êtes sur le point de supprimer cette catégorie : <strong>{selectedCategoryData.name}</strong></p>
                        )}
                        <div className="d-flex justify-content-center mt-5">
                            <Button color="secondary" className="me-2" onClick={() => dispatch(setModalDeleteCategory({ isOpen: false, category: null }))}>{"Fermer"}</Button>
                            <Button color="danger" onClick={handleDelete}>{"Supprimer"}</Button>
                        </div>
                    </div>
                </CommonModal>
            </CardBody>
        </Col>
    );
};

export default CenteredModal;
