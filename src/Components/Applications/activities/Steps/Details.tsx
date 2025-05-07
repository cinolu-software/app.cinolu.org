import React, { ChangeEvent, useState, useEffect } from "react";
import { Button, Col, Form, InputGroup, Label, Row } from "reactstrap";
import 'react-quill/dist/quill.snow.css';
import DatePicker, { DateObject } from "react-multi-date-picker";
import { ActivityFormTabContentPropsType } from "@/Types/ActivitiesTypes";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProgram } from "@/Redux/Reducers/programSlice/programSlice";
import { fetchPartner } from '@/Redux/Reducers/PartnersSlice/partnerSlice';
import {fetchCategory} from "@/Redux/Reducers/projectSlice/ProjectCategory";
import { TransformedProjectTypeType } from "@/Types/Projects/ProjectTypeType";
import {ProjectCategoryType} from "@/Types/Projects/ProjectCategoryType";
import { PartnerType } from "@/Types/PartnerType/PartnerType";
import Select from "react-select";
import {setAddFormValue} from "@/Redux/Reducers/ActivitySlice";

interface OptionType {
    value: string;
    label: string;
}

const DetailInformations: React.FC<ActivityFormTabContentPropsType> = ({ callbackActive }) => {

    const [value, setValue] = useState<DateObject[]>([new DateObject()]);
    const dispatch = useAppDispatch();
    const { transformedPrograms, status: programStatus } = useAppSelector(state => state.program);
    const { partnerData, status: partnerStatus } = useAppSelector(state => state.partner);
    const {projectCategoryData, status: categoryStatus} = useAppSelector(state=>state.projectCategory);
    const [selectedProgram, setSelectedProgram] = useState<OptionType | null>(null);
    const [selectedPartners, setSelectedPartners] = useState<OptionType[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<OptionType[] | null>(null);

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

    useEffect(() => {
        if (categoryStatus === 'idle') {
            dispatch(fetchCategory());
        }
    }, [dispatch, categoryStatus]);

    const programOptions: OptionType[] = transformedPrograms.map((program: TransformedProjectTypeType) => ({
        value: program.id,
        label: program.name,
    }));

    const partnerOptions: OptionType[] = partnerData.map((partner: PartnerType) => ({
        value: partner.id,
        label: partner.name,
    }));

    const categoryOptions: OptionType[] = projectCategoryData.map((category: ProjectCategoryType) => ({
        value: category.id,
        label: category.name,
    }))

    const handleDateChange = (dates: DateObject[]) => {
        if (dates.length === 2) {
            dispatch(setAddFormValue({
                field: 'started_at',
                value: dates[0].toDate().toISOString()
            }));
            dispatch(setAddFormValue({
                field: 'ended_at',
                value: dates[1].toDate().toISOString()
            }));
        }
    };

    const handleProgramChange = (option: OptionType | null) => {
        dispatch(setAddFormValue({
            field: 'program',
            value: option?.value || ''
        }));
    };

    const handleCategoriesChange = (options: OptionType[]) => {
        dispatch(setAddFormValue({
            field: 'categories',
            value: options.map(o => o.value)
        }));
    };

    const handlePartnersChange = (options: OptionType[]) => {
        dispatch(setAddFormValue({
            field: 'partners',
            value: options.map(o => o.value)
        }));
    };

    return (
        <div className={'border ps-3 rounded'}>
            <h2 className={'ms-3 mt-3 mb-4'}>Détail de l'activité</h2>
            <div>
                <Row className={'p-3 mb-2'}>
                    <Col>
                        <Label className={'mb-2'}>{"Programme associé"}</Label>
                        <Select
                            options={programOptions}
                            value={selectedProgram}
                            onChange={handleProgramChange}
                            placeholder="Choisissez un programme"
                        />
                    </Col>
                </Row>
                <Row className={'p-3 mb-2'}>
                    <Col>
                        <Label className={'mb-2'}>{"Categorie de l'activité associée"}</Label>
                        <Select
                            isMulti
                            options={categoryOptions}
                            value={selectedCategory}
                            onChange={handleCategoriesChange}
                            placeholder="Choisissez une categorie"
                        />
                    </Col>
                </Row>
                <Row className={'p-3 mb-2'}>
                    <Col>
                        <Label className={'mb-2'}>{'Partenaires Associés'}</Label>
                        <Select
                            isMulti
                            options={partnerOptions}
                            value={selectedPartners}
                            onChange={handlePartnersChange}
                            placeholder="Sélectionnez des partenaires"
                        />
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
                                onChange={handleDateChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Col xs="12" className="text-end p-3">
                    <Button onClick={() => callbackActive(1)} color="primary">{'Précedent'}</Button>
                    <Button className="ms-1" color="primary" onClick={() => callbackActive(3)}>{'Suivant'}</Button>
                </Col>
            </div>
        </div>
    );
};

export default DetailInformations;
