import React, { useEffect, useState } from 'react';
import { Button, Col, Label, Row } from 'reactstrap';
import { createRole, updateRole, selectRoleStatus, selectErreur } from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";
import {StaticModalToggleProp, RoleType, CreateRole} from "@/Types/AdminOptions/Roles/RoleType";
import { RootState } from '@/Redux/Store';
import { Flip, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/Redux/Store";
import {useAppSelector} from "@/Redux/Hooks";
import { setModalEditRole } from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";

interface StaticFormProps extends StaticModalToggleProp {
    staticModalToggle: any;
    selectedRole: RoleType ;
}

export const StaticForm: React.FC<StaticFormProps> = ({ staticModalToggle, selectedRole }) => {

    const dispatch = useDispatch<AppDispatch>();
    const roleStatus = useSelector(selectRoleStatus);
    const roleError = useSelector(selectErreur);
    const [roleName, setRoleName] = useState<string>(selectedRole?.name);
    const { isOpenModalEditRole,  } = useAppSelector((state) => state.role);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(updateRole({id: selectedRole?.id, name: roleName}));

        if (roleStatus === 'failed') {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création du rôle"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
        dispatch(setModalEditRole({ isOpen: false, role: null }))
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Row className="g-3">
                    <Col md="12">
                        <Label className="mb-2" check>
                            {"Nom du Rôle"}
                        </Label>
                        <input
                            className="form-control mb-4"
                            name="category"
                            type="text"
                            placeholder="Entrer le nom du rôle"
                            value={roleName}
                            onChange={(e)=>setRoleName(e.target.value)}
                        />
                    </Col>

                    <Col xs="12">
                        <Button color="primary" type="submit">
                            {"Mettre à jour"}
                        </Button>
                    </Col>
                </Row>
            </form>
        </>
    );
};



