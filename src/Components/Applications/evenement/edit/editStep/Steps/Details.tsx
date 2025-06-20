import React, { useState, useEffect } from "react";
import { Col, InputGroup, Label, Row } from "reactstrap";
import 'react-quill/dist/quill.snow.css';
import DatePicker, { DateObject } from "react-multi-date-picker";
import { ActivityFormTabContentPropsType } from "@/Types/ActivitiesTypes";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchProgram } from "@/Redux/Reducers/programSlice/programSlice";
import {fetchEventsType} from "@/Redux/Reducers/eventSlice/EventTypeSlice";
import {fetchStaffMembers} from "@/Redux/Reducers/userSlice/UserSlice";
import { TransformedProjectTypeType } from "@/Types/Projects/ProjectTypeType";
import { ProjectCategoryType } from "@/Types/Projects/ProjectCategoryType";
import Select, { MultiValue, SingleValue } from "react-select";
import { setEditFormValue} from "@/Redux/Reducers/evenement";
import {StaffMemberType} from "@/Types/Users/UsersType";

interface OptionType {
    value: string;
    label: string;
}

const DetailInformations: React.FC<ActivityFormTabContentPropsType> = ({ callbackActive }) => {

    const dispatch = useAppDispatch();
    const { editFormValue, selectedEvenement } = useAppSelector(state => state.evenement);
    const {staffMemberData, statusStaff} = useAppSelector(state => state.users)

    const { transformedPrograms, status: programStatus } = useAppSelector(state => state.program);
    const {status: categoryStatus, dataEventType } = useAppSelector(state => state.eventType);

    const programId = editFormValue.program || '';
    const categoryIds = editFormValue.categories || [];
    // const responsibleId = editFormValue.responsible || '';

    useEffect(() => {
        if(statusStaff === 'idle'){
            dispatch(fetchStaffMembers());
        }
    }, [dispatch, statusStaff]);

    useEffect(() => {
        if (programStatus === 'idle') {
            dispatch(fetchProgram());
        }
    }, [dispatch, programStatus]);

    useEffect(() => {
        if (categoryStatus === 'idle') {
            dispatch(fetchEventsType());
        }
    }, [dispatch, categoryStatus]);

    const [dateRange, setDateRange] = useState<DateObject[]>(() => {
        if (selectedEvenement) {
            return [
                new DateObject(new Date(selectedEvenement.started_at)),
                new DateObject(new Date(selectedEvenement.ended_at))
            ];
        }
        return [new DateObject()];
    });

    const programOptions: OptionType[] = transformedPrograms.map((program: TransformedProjectTypeType) => ({
        value: program.id,
        label: program.name,
    }));

    const staffOptions: OptionType[] = staffMemberData.map((staff: StaffMemberType) => ({
        value: staff.id,
        label: staff.name,
    }))

    const categoryOptions: OptionType[] = dataEventType.map((category: ProjectCategoryType) => ({
        value: category.id,
        label: category.name,
    }));


    const selectedProgram = programOptions.find(option => option.value === programId);
    // const selectedStaff = staffOptions.find(option => option.value === responsibleId);
    const selectedCategories = categoryOptions.filter(option => categoryIds.includes(option.value));

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
                        <Label className={'mb-2'}>{"Categorie de l'évènement"}</Label>
                        <Select
                            isMulti
                            options={categoryOptions}
                            value={selectedCategories}
                            onChange={handleCategoriesChange}
                            placeholder="Choisissez une categorie"
                        />
                    </Col>
                </Row>


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
