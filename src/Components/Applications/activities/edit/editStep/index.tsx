import React, {useEffect} from 'react';
import { Col, Container, Row} from 'reactstrap';
import {useCallback, useState} from 'react';
import NavComponent from "@/Components/Applications/activities/edit/editStep/NavComponent";
import ActivityFormTabContent from "@/Components/Applications/activities/edit/editStep/ActivityFormTabContent";
import {useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {fetchActivityById, setEditFormValue} from "@/Redux/Reducers/ActivitySlice";
import {useRouter} from "next/navigation";


const EditActivityForm = () => {

    const [activeTab, setActiveTab] = useState<number | undefined>(1);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {selectedActivity, fetchActivityByIdStatus} = useAppSelector(state => state.activity);

    useEffect(
        () => {
            if(selectedActivity){
                dispatch(fetchActivityById(selectedActivity.id));
            } else {
                router.push('/act/list');
            }
        }
    , [dispatch]);

    useEffect(() => {
        if(fetchActivityByIdStatus === 'succeeded') {
        
            dispatch(setEditFormValue({
                field: 'name',
                value: selectedActivity?.name
            }));
            dispatch(setEditFormValue({
                field: 'form_link',
                value: selectedActivity?.form_link
            }));
            dispatch(setEditFormValue({
                field: 'description',
                value: selectedActivity?.description
            }));
            dispatch(setEditFormValue({
                field: 'started_at',
                value: selectedActivity?.started_at
            }));
            dispatch(setEditFormValue({
                field: 'ended_at',
                value: selectedActivity?.ended_at
            }));
            dispatch(setEditFormValue({
                field: 'program',
                value: selectedActivity?.program?.id || ''
            }));
            dispatch(setEditFormValue({
                field: 'categories',
                //@ts-ignore
                value: selectedActivity?.categories?.map(c => c.id) || []
            }));
            // dispatch(setEditFormValue({
            //     field: 'partners',
            //     //@ts-ignore
            //     value: selectedActivity?.partners?.map(p => p.id) || []
            // }));
        }
    }, [dispatch, fetchActivityByIdStatus]);

    const callback = useCallback((tab: number | undefined) => {
        setActiveTab(tab);
    }, []);

    return (
        <Container fluid>
            <Col md={12} className={'mt-4 mb-4'}>
                <div className={'horizontal-wizard-wrapper  vertical-variations vertical-options'}>
                    <Row className="g-3 d-flex flex-column flex-md-row flex-wrap">
                        <Col xs="12" md="4" lg="3" className="main-horizontal-header mb-3 mb-md-0">
                            <NavComponent callbackActive={callback} activeTab={activeTab} />
                        </Col>
                        <Col xs="12" md="8" lg="9" className="main-horizontal-content">
                            <ActivityFormTabContent activeTab={activeTab} callbackActive={callback} />
                        </Col>
                    </Row>
                </div>
            </Col>
        </Container>
    )
}

export default EditActivityForm;