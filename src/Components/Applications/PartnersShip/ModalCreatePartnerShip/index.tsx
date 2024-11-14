import React, {useState} from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Flip, toast } from "react-toastify";
import { createPartnerShip, setModalCreatePartnerShip } from "@/Redux/Reducers/PartnerShipSlice/partnerShipSlice";


const ModalCreatePartnerShip = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreatePartnerShip} = useAppSelector(state => state.partnerShip);
    const [namePartnerShip, setNamePartnerShip] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNamePartnerShip(e.target.value);
    }

    const handleCreateCreatePartnerShip = async () => {
        await dispatch(createPartnerShip({name: namePartnerShip})).unwrap()
            .then(()=> {
                toast.success(
                    <p className="text-white tx-16 mb-0">{"Type de partenariat créé avec succès"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            }).catch(() => {
                toast.error(
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création du type de partenariat"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            })
        dispatch(createPartnerShip({name: namePartnerShip}));
    }

    return (
        <Col xs="12">
            <Modal isOpen={isOpenModalCreatePartnerShip} toggle={() => dispatch(setModalCreatePartnerShip({ isOpen: false }))} size="lg">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Ajouter un type de partenariat"}</h1>
                    <Button close onClick={() => dispatch(setModalCreatePartnerShip({ isOpen: false }))} />
                </div>
                <ModalBody className="custom-input">
                    <div className="create-category">
                        <Label for="programName" check>
                            Nom du type de partenariat <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            className="m-0"
                            id="programName"
                            type="text"
                            value={namePartnerShip}
                            onChange={handleNameChange}
                            required
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className={'btn btn-outline-light'} onClick={() => dispatch(setModalCreatePartnerShip({ isOpen: false }))}>
                        {"Annuler"}
                    </button>
                    <button className={'btn btn-outline-primary'} onClick={handleCreateCreatePartnerShip}>
                        {"Créer"}
                    </button>
                </ModalFooter>
            </Modal>
        </Col>
    )
}

export default ModalCreatePartnerShip;