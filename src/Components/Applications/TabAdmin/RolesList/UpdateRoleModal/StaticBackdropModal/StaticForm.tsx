import React, { useState, useEffect } from 'react';
import { Button, Col, Label, Row } from 'reactstrap';
import { updateRole, selectRoleStatus, selectErreur, setModalEditRole } from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";
import { StaticModalToggleProp, RoleType } from "@/Types/AdminOptions/Roles/RoleType";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Flip, toast } from "react-toastify";

interface StaticFormProps extends StaticModalToggleProp {
    selectedRole: RoleType | undefined;
}


export const StaticForm: React.FC<StaticFormProps> = ({ staticModalToggle, selectedRole }) => {
    const dispatch = useAppDispatch();
    const roleStatus = useAppSelector(selectRoleStatus);
    const roleError = useAppSelector(selectErreur);
    const [roleName, setRoleName] = useState<string>(selectedRole?.name || '');

    useEffect(() => {
        if (roleStatus === 'failed' && roleError) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la mise à jour du rôle"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
    }, [roleStatus, roleError]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedRole) {
            await dispatch(updateRole({ id: selectedRole.id, name: roleName }));
            if (roleStatus !== 'failed') {
                dispatch(setModalEditRole({ isOpen: false, role: null }));
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Row className="g-3">
                <Col md="12">
                    <Label className="mb-2" check>
                        {"Nom du Rôle"}
                    </Label>
                    <input
                        className="form-control mb-4"
                        name="roleName"
                        type="text"
                        placeholder="Entrer le nom du rôle"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                    />
                </Col>

                <Col xs="12">
                    <Button color="primary" type="submit">
                        {"Mettre à jour"}
                    </Button>
                </Col>
            </Row>
        </form>
    );
};


