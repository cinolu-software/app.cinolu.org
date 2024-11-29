import React, {useEffect} from 'react';
import {Col, Input} from 'reactstrap';
import { useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import {setFormValue} from "@/Redux/Reducers/userSlice/UserSlice";
import {fetchRole} from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";


const StepThree = () => {

    const dispatch = useAppDispatch();
    const {formValue} = useAppSelector(state => state.users);
    const { originalRoleData, status } = useAppSelector(state => state.role);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchRole());
        }
    }, [dispatch, status]);

    const updateRoleChange = (roleId: string) => {
        if (!formValue) return;

        const updateRole = formValue.roles.includes(roleId) ? formValue.roles.filter((id: string) => id !== roleId) : [...formValue.roles, roleId];
        dispatch(setFormValue({name: 'roles', value: updateRole}));
    }

    return (
        <Col>
            <section className={'main-upgrade'}>
                <div>
                    <h5 className={'mb-2'}>{'Sélectionner'} <span className={'txt-primary'}>{'le type de programme'}</span></h5>
                    <p className={'text-muted mb-2'}> Cliquer sur le(s) rôle(s) que vous voulez attribuer à l'utilisateur</p>
                </div>
                <div className={'variation-box'}>
                    {
                        originalRoleData.map((role: any) => (
                            <div className={'selection-box'} key={role.id}>
                                <Input
                                    id={`role-${role.id}`}
                                    type={'checkbox'}
                                    checked={formValue.roles.includes(role.id)}
                                    onChange={() => updateRoleChange(role.id)}
                                />
                                <div className={'custom--mega-checkbox'}>
                                    <ul>
                                        <li>{role.name}</li>
                                    </ul>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </Col>
    )
}
export default StepThree