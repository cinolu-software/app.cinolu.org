import React, {ChangeEvent} from "react";
import {Button, Card, CardBody, Col, Form} from "reactstrap";
import FinishForm from "@/CommonComponent/FinishForm";
import StepperHorizontal from "@/Components/Applications/Partners/AddPartner/NumberingWizard/StepperHorizontal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import {Back} from '@/Constant'
import {createPartner, setFormValue} from "@/Redux/Reducers/PartnersSlice/partnerSlice";

const NumberingWizard = () => {

    const {numberLevel, formValue, showFinish} = useAppSelector(state => state.partner);
    const dispatch = useAppDispatch();

    const getPartnerData = (event: ChangeEvent<HTMLInputElement> | string) => {
        if(typeof event === 'string') {
            if()
        }
    }

}

export default NumberingWizard