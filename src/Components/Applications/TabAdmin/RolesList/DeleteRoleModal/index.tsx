import { useState } from "react";
import CommonCardHeader from "./CommonCardHeader";
import { CenteredModals, Close, ImagePath, SomethingWentWrong, VerticallyCentered } from "@/Constant";
import { CenteredModalList } from "@/Data/Uikits/modal";
import { Button, Card, CardBody, Col } from "reactstrap";
import CommonModal from "./Common/CommonModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalDeleteRole} from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";


const CenteredModal = () => {


    const dispatch = useAppDispatch();
    const {isOpenModalDeleteRole} = useAppSelector((state)=> state.role);

    return (
        <Col xl="4">
            <CardBody className="badge-spacing">
                <CommonModal centered isOpen={isOpenModalDeleteRole} toggle={()=> dispatch(setModalDeleteRole({ isOpen: false, role: null }))}>
                    <div className="modal-toggle-wrapper">
                        <ul className="modal-img">
                            <li className="text-center"><img src={`${ImagePath}/gif/danger.gif`} alt="error" /></li>
                        </ul>
                        <h4 className="text-center pb-2">{SomethingWentWrong}</h4>
                        <p className="text-center">Attackers on malicious activity may trick you into doing something dangerous like installing software or revealing your personal informations.</p>
                        <Button color="secondary" className="d-flex m-auto" onClick={()=> dispatch(setModalDeleteRole({ isOpen: false, role: null }))}>{Close}</Button>
                    </div>
                </CommonModal>
            </CardBody>
        </Col>
    );

};

export default CenteredModal;