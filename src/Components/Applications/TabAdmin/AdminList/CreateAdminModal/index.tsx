import React, { useState, useEffect } from "react";
import { Button, Col, Input, Label, Modal, ModalBody, ModalFooter } from "reactstrap";
import Select from 'react-select';  // Importer react-select
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createUser } from "@/Redux/Reducers/userSlice/UserSlice";
import { fetchRole } from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";
import { Flip, toast } from "react-toastify";

const CreateNewUserModal = () => {

    const dispatch = useAppDispatch();
    const isOpenModalCreateUser = useAppSelector(state => state.users.isOpenModalCreateUser);
    const { originalRoleData, status } = useAppSelector(state => state.role);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRole());
        }
    }, [status, dispatch]);

    const [user, setUser] = useState({
        email: '',
        first_name: '',
        last_name: '',
        name: '',
        phone_number: '',
        address: '',
        roles: []
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };


    const handleRoleSelect = (selectedOptions: any) => {
        const selectedRoleIds = selectedOptions.map((option: any) => option.value);
        setUser(prevUser => ({ ...prevUser, roles: selectedRoleIds }));
    };


    const handleSubmit = async () => {
        await dispatch(createUser(user)).unwrap()
            .then(() => {
                toast.success(
                    <p className="text-white tx-16 mb-0">{"Utilisateur créé avec succès"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
                dispatch({ type: 'users/setModalCreateUser', payload: { isOpen: false } });
            })
            .catch((error) => {
                toast.error(
                    <p className="text-white tx-16 mb-0">{"Erreur lors de la création de l'utilisateur"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            });
    };


    const roleOptions = originalRoleData.map((role: any) => ({
        value: role.id,
        label: role.name,
    }));

    return (
        <Col xs="12">
            <Modal isOpen={isOpenModalCreateUser} toggle={() => dispatch({ type: 'users/setModalCreateUser', payload: { isOpen: false } })} size="lg">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">{"Ajouter un utilisateur"}</h1>
                    <Button close onClick={() => dispatch({ type: 'users/setModalCreateUser', payload: { isOpen: false } })} />
                </div>
                <ModalBody className="custom-input">
                    <div className="create-user">
                        <Label for="userEmail" check>
                            Email <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            id="userEmail"
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />

                        <Label for="userFirstName" className="mt-2" check>
                            Prénom <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            id="userFirstName"
                            type="text"
                            name="first_name"
                            value={user.first_name}
                            onChange={handleChange}
                            required
                        />

                        <Label for="userLastName" className="mt-2" check>
                            Nom <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            id="userLastName"
                            type="text"
                            name="last_name"
                            value={user.last_name}
                            onChange={handleChange}
                            required
                        />

                        <Label for="userName" className="mt-2" check>
                            Nom d'utilisateur <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            id="userName"
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />

                        <Label for="userPhoneNumber" className="mt-2" check>
                            Numéro de téléphone <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            id="userPhoneNumber"
                            type="text"
                            name="phone_number"
                            value={user.phone_number}
                            onChange={handleChange}
                            required
                        />

                        <Label for="userAddress" className="mt-2" check>
                            Adresse <span className="txt-danger">*</span>
                        </Label>
                        <Input
                            id="userAddress"
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            required
                        />


                        <Label for="userRole" className="mt-2" check>
                            Rôles <span className="txt-danger">*</span>
                        </Label>
                        <Select
                            id="userRole"
                            isMulti
                            options={roleOptions}
                            onChange={handleRoleSelect}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Sélectionnez les rôles"
                        />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="light" onClick={() => dispatch({ type: 'users/setModalCreateUser', payload: { isOpen: false } })}>
                        {"Annuler"}
                    </Button>
                    <Button color="primary" onClick={handleSubmit}>
                        {"Créer"}
                    </Button>
                </ModalFooter>
            </Modal>
        </Col>
    );
};

export default CreateNewUserModal;

