import React, {useEffect, useState} from "react";
import {Button, Col, Modal, ModalBody, ModalFooter} from "reactstrap";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {setModalCreateUser, createUser} from "@/Redux/Reducers/userSlice/UserSlice";
import CreateUser from "@/Components/Applications/TabAdmin/AdminList/CreateAdminModal/StepForm";
import { toast, Flip} from 'react-toastify';
import {RootState} from "@/Redux/Store";

const ModalCreateUser = () => {

    const dispatch = useAppDispatch();
    const {isOpenModalCreateUser, formValue} = useAppSelector((state: RootState) => state.users);

    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const validateForm = () : boolean => {
            return formValue.email !== "" && formValue.first_name !== "" && formValue.last_name !== "" && formValue.phone_number !== "" && formValue.address !== "" && formValue.roles.length > 0;
        }
        setIsFormValid(validateForm());
    }, []);

    const handleSubmit = async () => {

        if(isFormValid && formValue) {

            try{
                await dispatch(createUser(formValue)).unwrap();
                dispatch(setModalCreateUser({isOpen: false}));
            }catch(error:any){
                toast.error(
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création de l'utilisateur"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            }
        }else {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Veuillez remplir tous les champs obligatoires"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            )
        }
    }

    return (
        <Col xs="12">
            <Modal isOpen={isOpenModalCreateUser} toggle={() => dispatch(setModalCreateUser({ isOpen: false }))} size="xl">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Création d'un utilisateur"}</h1>
                    <Button close onClick={() => dispatch(setModalCreateUser({ isOpen: false }))} />
                </div>
                <ModalBody className="custom-input">
                    <CreateUser />
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={() => dispatch(setModalCreateUser({ isOpen: false }))}>
                        {"Annuler"}
                    </Button>
                    <Button color="primary" onClick={handleSubmit}>
                        {"Créer"}
                    </Button>
                </ModalFooter>
            </Modal>
        </Col>
    );
}

export default ModalCreateUser;