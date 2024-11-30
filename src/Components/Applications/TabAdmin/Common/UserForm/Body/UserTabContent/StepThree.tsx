import React, { useEffect, useState } from 'react';
import { Col, Input } from 'reactstrap';
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/userSlice/UserSlice";
import { fetchRole } from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";
import { TransformedRoleType } from "@/Types/AdminOptions/Roles/RoleType";

const StepThree = () => {

    const dispatch = useAppDispatch();

    const { formValue, selectedUser } = useAppSelector(state => state.users);
    const { originalRoleData, status } = useAppSelector(state => state.role);
    const [selectedRoles, setSelectedRoles] = useState<string[]>(
        selectedUser?.roles.map((role: TransformedRoleType) => role.id) || []
    );

    console.log('stepFree===>', formValue);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRole());
        }
    }, [dispatch, status]);


    useEffect(() => {
        if (formValue?.roles) {
            setSelectedRoles(formValue.roles);
        }
    }, [formValue?.roles]);


    const updateRoleChange = (roleId: string) => {
        const updatedRoles = selectedRoles.includes(roleId)
            ? selectedRoles.filter((id) => id !== roleId)
            : [...selectedRoles, roleId];

        setSelectedRoles(updatedRoles);
        dispatch(setFormValue({ name: 'roles', value: updatedRoles }));
    };

    if (!originalRoleData || originalRoleData.length === 0) {
        return <p>Chargement des rôles...</p>;
    }

    return (
        <Col>
            <section className="main-upgrade">
                <div>
                    <h5 className="mb-2">
                        {'Sélectionner'} <span className="txt-primary">{'le rôle de l’utilisateur'}</span>
                    </h5>
                    <p className="text-muted mb-2">
                        Cliquez sur le(s) rôle(s) que vous voulez attribuer à l'utilisateur
                    </p>
                </div>
                <div className="variation-box">
                    {originalRoleData.map((role: TransformedRoleType) => (
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
        </Col>
    );
};

export default StepThree;
