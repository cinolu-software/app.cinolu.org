import React, {ChangeEvent, useState, useEffect} from "react";
import {Button, Col, Form, Input, Label, Row, InputGroup} from "reactstrap";
import 'react-quill/dist/quill.snow.css';
import DatePicker, { DateObject } from "react-multi-date-picker";
import {Continue, Previous, RangeDatePicker} from "@/Constant";
import {ActivityFormTabContentPropsType} from "@/Types/ActivitiesTypes";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {fetchProgram} from "@/Redux/Reducers/programSlice/programSlice";
import { fetchPartner } from '@/Redux/Reducers/PartnersSlice/partnerSlice';
import {TransformedProjectTypeType} from "@/Types/Projects/ProjectTypeType";
import {PartnerType} from "@/Types/PartnerType/PartnerType";


interface OptionType{
    value:string,
    label:string,
}


const BaseInformations :React.FC<ActivityFormTabContentPropsType> = ({ callbackActive }) => {

    const [value, setValue] = useState<DateObject[]>([new DateObject()]);
    const dispatch = useAppDispatch();
    const {transformedPrograms, status: programStatus} = useAppSelector(state=>state.program);
    const { partnerData, status: partnerStatus } = useAppSelector((state) => state.partner);
    const [selectedOption, setSelectedOption] = useState<OptionType | null >(null);
    const [selectedPartners, setSelectedPartners] = useState<OptionType[] | null >(null);

    useEffect(() => {
        if (programStatus === 'idle') {
            dispatch(fetchProgram());
        }
    }, [dispatch, programStatus]);

    useEffect(() => {
        if (partnerStatus === 'idle') {
            dispatch(fetchPartner());
        }
    }, [dispatch, partnerStatus]);

    const programOptions : OptionType[] = transformedPrograms.map((program: TransformedProjectTypeType) => ({
        value: program.id,
        label: program.name,
    }));

    const partnerOptions: OptionType [] = partnerData.map((partner: PartnerType) => (
        {
            value: partner.id,
            label: partner.name,
        }
    ))


    const getUserData = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;
        // dispatch(setaBusinessSettingsFormValues({...businessSettingsFormValues,[name]: value}));
    };

    const handleNextButton = () => {
        // if (accountName !== "" && email !== "" && description !== "") callbackActive(3)
        // else ShowError();
    };

    console.log(partnerData)

    return (
        <div className={'border ps-3 rounded'}>
            <h2 className={'ms-3 mt-3 mb-4'}>Détail de l'activité</h2>
            <div>
                <Row className={'p-3 mb-2'}>
                    <Col>
                        <Label className={'mb-2'}>{"Programme associé"}</Label>
                        <Input
                            type="select"
                            value={selectedOption?.value || ""}
                            onChange={(e) => {
                                const selectedValue = e.target.value;
                                const selected = programOptions.find(option => option.value === selectedValue) || null;
                                setSelectedOption(selected);
                            }}
                        >
                            <option value="">Choisissez un programme</option>
                            {programOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Input>
                    </Col>
                </Row>
                <Row className={'p-3 mb-2'}>
                    <Col>selectedOptions
                        <Label className={'mb-2'}>{"Programme associé"}</Label>
                        <Input
                            type="select"
                            multiple
                            value={selectedPartners?.map(p => p.value)}
                            onChange={(e) => {
                                const target = e.target as any;
                                const selectedOptions = Array.from(target.selectedOptions, (opt) => opt.value);
                                const selected = partnerOptions.filter(opt => selectedOptions.includes(opt.value));
                                setSelectedPartners(selected);
                            }}
                        >
                            {partnerOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Input>

                    </Col>
                </Row>
                <Row className={'p-3 mb-2'}>
                    <Col >
                        <Label className={'mb-2'} >{"Durée de l'activité"}</Label>
                        <InputGroup className="flatpicker-calender border rounded">
                            <DatePicker
                                inputClass="form-control"
                                range
                                value={value}
                                onChange={(dates) => setValue(dates as DateObject[])}
                            />
                        </InputGroup>
                    </Col>
                </Row>

                <Col xs="12" className="text-end p-3">
                    <Button onClick={() => callbackActive(1)} color="primary">{Previous}</Button>
                    <Button className="ms-1" color="primary" onClick={handleNextButton}>{Continue}</Button>
                </Col>
            </div>
        </div>
    )
}

export default BaseInformations;