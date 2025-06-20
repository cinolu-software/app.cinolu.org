import React, { useState, useEffect } from "react";
import { Col, InputGroup, Label, Row } from "reactstrap";
import 'react-quill/dist/quill.snow.css';
import DatePicker, { DateObject } from "react-multi-date-picker";
import { ActivityFormTabContentPropsType } from "@/Types/ActivitiesTypes";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProgram } from "@/Redux/Reducers/programSlice/programSlice";
import { fetchPartner } from '@/Redux/Reducers/PartnersSlice/partnerSlice';
import { fetchCategory } from "@/Redux/Reducers/projectSlice/ProjectCategory";
import { TransformedProjectTypeType } from "@/Types/Projects/ProjectTypeType";
import { ProjectCategoryType } from "@/Types/Projects/ProjectCategoryType";
import { PartnerType } from "@/Types/PartnerType/PartnerType";
import Select, { MultiValue, SingleValue } from "react-select";
import { setEditFormValue } from "@/Redux/Reducers/ActivitySlice";

interface OptionType {
    value: string;
    label: string;
}

const DetailInformations: React.FC<ActivityFormTabContentPropsType> = ({ callbackActive }) => {

    const dispatch = useAppDispatch();
    const { selectedActivity, editFormValue } = useAppSelector(state => state.activity);
    const { transformedPrograms, status: programStatus } = useAppSelector(state => state.program);
    const { partnerData, status: partnerStatus } = useAppSelector(state => state.partner);
    const {projectCategoryData, status: categoryStatus} = useAppSelector(state=>state.projectCategory);

    const programId = editFormValue.program || '';
    const categoryIds = editFormValue.categories || [];
    // const partnerIds = editFormValue.partners || [];

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

    const [dateRange, setDateRange] = useState<DateObject[]>(() => {
        if (selectedActivity) {
            return [
                new DateObject(new Date(selectedActivity.started_at)),
                new DateObject(new Date(selectedActivity.ended_at))
            ];
        }
        return [new DateObject()];
    });

    useEffect(() => {
        if (selectedActivity) {
            setDateRange([
                new DateObject(new Date(selectedActivity.started_at)),
                new DateObject(new Date(selectedActivity.ended_at))
            ]);
        }
    }, [selectedActivity]);

    const programOptions: OptionType[] = transformedPrograms.map((program: TransformedProjectTypeType) => ({
        value: program.id,
        label: program.name,
    }));

    // const partnerOptions: OptionType[] = partnerData.map((partner: PartnerType) => ({
    //     value: partner.id,
    //     label: partner.name,
    // }));

    const categoryOptions: OptionType[] = projectCategoryData.map((category: ProjectCategoryType) => ({
        value: category.id,
        label: category.name,
    }));



    const selectedProgram = programOptions.find(option => option.value === programId);
    const selectedCategories = categoryOptions.filter(option => categoryIds.includes(option.value));
    // const selectedPartners = partnerOptions.filter(option => partnerIds.includes(option.value));

    const handleDateChange = (dates: DateObject[]) => {
        setDateRange(dates);
        if (dates.length === 2) {
            dispatch(setEditFormValue({
                field: 'started_at',
                value: dates[0].toDate().toISOString().split('T')[0]
            }));
            dispatch(setEditFormValue({
                field: 'ended_at',
                value: dates[1].toDate().toISOString().split('T')[0]
            }));
        }
    };

    const handleProgramChange = (option: SingleValue<OptionType>) => {
        dispatch(setEditFormValue({
            field: 'program',
            value: option?.value || ''
        }));
    };

    const handleCategoriesChange = (options: MultiValue<OptionType>) => {
        dispatch(setEditFormValue({
            field: 'categories',
            value: options.map(o => o.value)
        }));
    };

    // const handlePartnersChange = (options: MultiValue<OptionType>) => {
    //     dispatch(setEditFormValue({
    //         field: 'partners',
    //         value: options.map(o => o.value)
    //     }));
    // };

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
                            value={selectedCategories}
                            onChange={handleCategoriesChange}
                            placeholder="Choisissez une categorie"
                        />
                    </Col>
                </Row>
                {/*<Row className={'p-3 mb-2'}>*/}
                {/*    <Col>*/}
                {/*        <Label className={'mb-2'}>{'Partenaires Associés'}</Label>*/}
                {/*        <Select*/}
                {/*            isMulti*/}
                {/*            options={partnerOptions}*/}
                {/*            value={selectedPartners}*/}
                {/*            onChange={handlePartnersChange}*/}
                {/*            placeholder="Sélectionnez des partenaires"*/}
                {/*        />*/}
                {/*    </Col>*/}
                {/*</Row>*/}
                <Row className={'p-3 mb-2'}>
                    <Col>
                        <Label className={'mb-2'} >{"Durée de l'activité"}</Label>
                        <InputGroup className="flatpicker-calender border rounded">
                            <DatePicker
                                inputClass="form-control"
                                range
                                value={dateRange}
                                onChange={handleDateChange}
                            />
                        </InputGroup>
                    </Col>
                </Row>
                <Col xs="12" className="text-end p-3 ">
                    <button className={'btn btn-outline-primary me-3'} onClick={() => callbackActive(1)}>
                        {"Précedent"}
                    </button>

                    <button className={'btn btn-outline-primary'} onClick={() => callbackActive(3)}>
                        {"Suivant"}
                    </button>
                </Col>
            </div>
        </div>
    );
};

export default DetailInformations;