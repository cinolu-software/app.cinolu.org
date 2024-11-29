import React, { useEffect, useState } from 'react';
import { Button, CardBody, Col, Input } from "reactstrap";
import CommonModal from "@/CommonComponent/CommonModalType/CommonModal";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setModalUpdateCoach, updateUser } from "@/Redux/Reducers/userSlice/UserSlice";
import { toast, ToastContainer, Flip } from "react-toastify";
import { fetchRole } from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";
import {TransformedRoleType} from "@/Types/AdminOptions/Roles/RoleType";

const UpdateCoachModal = () => {

    const dispatch = useAppDispatch();
    const { isOpenModalUpdateCoach, selectedCoach } = useAppSelector(state => state.users);
    const { originalRoleData, status } = useAppSelector(state => state.role);

    const [selectedRoles, setSelectedRoles] = useState<string[]>(selectedCoach?.roles.map((role: TransformedRoleType) => role.id) || []);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRole());
        }
    }, [dispatch, status]);

    const updateRoleChange = (roleId: string) => {
        setSelectedRoles((prevRoles) =>
            prevRoles.includes(roleId) ? prevRoles.filter((id) => id !== roleId) : [...prevRoles, roleId]
        );
    };

    const handleSubmit = async () => {
        if (!selectedCoach) return;
        try {
            await dispatch(updateUser({ id: selectedCoach.id, roles: selectedRoles })).unwrap();
            toast.success("Rôle(s) mis à jour avec succès !", { transition: Flip });
            dispatch(setModalUpdateCoach({ isOpen: false, user: null }));
        } catch (error) {
            toast.error("Une erreur est survenue lors de la mise à jour.");
        }
    };

    return (
        <Col xl="4">
            <CardBody className="badge-spacing">
                <CommonModal
                    centered
                    isOpen={isOpenModalUpdateCoach}
                    toggle={() => dispatch(setModalUpdateCoach({ isOpen: false, user: null }))}
                    title="Modifier"
                >
                    <section className="main-upgrade">
                        <div>
                            <h5 className="mb-2">Sélectionner <span className="txt-primary">le rôle</span></h5>
                            <p className="text-muted mb-2">Cliquez sur le(s) rôle(s) que vous voulez attribuer à l'utilisateur</p>
                        </div>
                        <div className="variation-box">
                            {originalRoleData.map((role) => (
                                <div className="selection-box" key={role.id}>
                                    <Input
                                        id={`role-${role.id}`}
                                        type="checkbox"
                                        checked={selectedRoles.includes(role.id)}
                                        onChange={() => updateRoleChange(role.id)}
                                    />
                                    <div className="custom--mega-checkbox">
                                        <ul>
                                            <li>{role.name}</li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <Button color="primary" className="w-100 mt-4" onClick={handleSubmit}>Mettre à jour</Button>
                </CommonModal>
                <ToastContainer />
            </CardBody>
        </Col>
    );
};

export default UpdateCoachModal;
