import React, { useState } from 'react';
import { Button, Col, Label, Row } from 'reactstrap';
import {createRole, selectRoleStatus, selectErreur} from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";
import {CreateRole, StaticModalToggleProp} from "@/Types/AdminOptions/Roles/RoleType";
import { RootState } from '@/Redux/Store';
import {Flip, toast} from "react-toastify";
import {useSelector, useDispatch} from "react-redux";
import {AppDispatch} from "@/Redux/Store";


export const StaticForm: React.FC<StaticModalToggleProp> = ({ staticModalToggle }) => {

    const dispatch = useDispatch<AppDispatch>();
    const categoryStatus = useSelector(selectRoleStatus);
    const categoryError = useSelector(selectErreur);

    const [role, setRole] = useState<CreateRole>({ name: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createRole(role));

        if(categoryStatus === 'failed'){
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création de la catégorie"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
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
                            value={role.name}
                            onChange={(e) => setRole({ name: e.target.value })}
                        />
                    </Col>

                    <Col xs="12">
                        <Button color="primary" type="submit">
                            {"Créer"}
                        </Button>
                    </Col>
                </Row>

            </form>
        </>
    );
};



