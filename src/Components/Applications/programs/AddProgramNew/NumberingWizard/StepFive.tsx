import React, {useEffect, useState} from 'react';
import {Col, Row, Input} from "reactstrap";
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { setNewFormValue } from '@/Redux/Reducers/programsSlice/programsSlice';
import { fetchPartner } from '@/Redux/Reducers/PartnersSlice/partnerSlice';
import { StepPropsType } from "@/Types/Programs/ProgramsType";



const StepFive : React.FC<StepPropsType> = ({ formValue }) => {

    const dispatch = useAppDispatch();
    const {partnerData, status} = useAppSelector((state)=>state.partner);

    useEffect(() => {
        if(status === 'idle'){
            dispatch(fetchPartner());
        }
    }, [dispatch, status]);


    const handlePartnerChange = (partnerId: string) => {
        if(!formValue) return;
        const updatedPatner = formValue.partners.includes(partnerId)
            ? formValue.partners.filter(id => id !== partnerId)
            : [...formValue.partners, partnerId];
        dispatch(setNewFormValue({field: 'partners', value: updatedPatner}))
    }


    return (
        <Col>
            <section className={'main-upgrade'}>
                <div>
                    <h5 className={'mb-2'}>
                        {'Sélectionner'} <span className="txt-primary">{'les partenaires du programme'}</span>
                    </h5>
                    <p className={'text-muted mb-2'}>Cliquer sur les partenaires du programme </p>
                </div>

                <div className={'variation-box'}>
                    {
                        partnerData.map((partner) => (
                            <div className={'selection-box'} key={partner.id}>
                                <Input
                                    id={`partner${partner.id}`}
                                    type={'checkbox'}
                                    checked={formValue?.partners.includes(partner.id)}
                                    onChange={()=>handlePartnerChange(partner.id)}
                                />
                                <div className={'custom--mega-checkbox'}>
                                    <ul>
                                        <li>{partner.name}</li>
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

export default StepFive