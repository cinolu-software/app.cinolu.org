import React, {useEffect, useState} from 'react';
import {Col, Row, Input} from "reactstrap";
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { setFormValue } from '@/Redux/Reducers/programsSlice/programsSlice';
import { fetchPartner } from '@/Redux/Reducers/PartnersSlice/partnerSlice';

const StepFive = () => {

    const dispatch = useAppDispatch();
    const {formValue, isOpenModalCreateProgram} = useAppSelector((state)=>state.programs);
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
            : [...formValue.partners, partnerId]

        dispatch(setFormValue({}))
    }



    return (
        <div>StepFive</div>
    )
}

export default StepFive
