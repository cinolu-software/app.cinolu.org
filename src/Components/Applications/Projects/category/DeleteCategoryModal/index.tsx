import { useState } from "react";
import CommonCardHeader from "./CommonCardHeader";
import {CenteredModals, Close, ImagePath, SaveChanges, SomethingWentWrong, VerticallyCentered} from "@/Constant";
import { CenteredModalList } from "@/Data/Uikits/modal";
import {Button, Card, CardBody, Col, ModalFooter} from "reactstrap";
import CommonModal from "./Common/CommonModal";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalDeleteRole, deleteRole } from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";


const CenteredModal = () => {
    const dispatch = useAppDispatch();
    const { isOpenModalDeleteRole, selectedRole, originalRoleData } = useAppSelector((state) => state.role);

    const selectedRoleData = originalRoleData.find((item) => item.id == selectedRole);

    const handleDelete = () => {

        if (selectedRoleData) {
            dispatch(deleteRole(selectedRoleData.id));
            dispatch(setModalDeleteRole({ isOpen: false, role: null }));
        }
    };

    return (
        <Col xl="4">
            <CardBody className="badge-spacing">
                <CommonModal centered isOpen={isOpenModalDeleteRole} toggle={() => dispatch(setModalDeleteRole({ isOpen: false, role: null }))} title="Supprimer le rôle">
                    <div className="modal-toggle-wrapper">
                        <ul className="modal-img">
                            <li className="text-center"><img src={`${ImagePath}/gif/danger.gif`} alt="danger" /></li>
                        </ul>
                        <h4 className="text-center pb-2">Êtes-vous sûr de vouloir supprimer ce rôle ?</h4>
                        {selectedRoleData && (
                            <p className="text-center">Vous êtes sur le point de supprimer le rôle : <strong>{selectedRoleData.name}</strong></p>
                        )}
                        <div className="d-flex justify-content-center mt-5">
                            <Button color="secondary" className="me-2" onClick={() => dispatch(setModalDeleteRole({ isOpen: false, role: null }))}>{"Fermer"}</Button>
                            <Button color="danger" onClick={handleDelete}>{"Supprimer"}</Button>
                        </div>
                    </div>


                </CommonModal>
            </CardBody>
        </Col>
    );
};

export default CenteredModal;
