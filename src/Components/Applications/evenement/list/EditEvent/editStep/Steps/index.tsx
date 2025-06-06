import React, {useEffect} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import {useCallback, useState} from 'react';
import NavComponent from "@/Components/Applications/evenement/edit/editStep/NavComponent";
import EvenementTabContent from "@/Components/Applications/evenement/list/EditEvent/editStep/Steps/EvenementTabContent";
import BackButton from "@/CommonComponent/BackButton";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {fetchEvenementById, setEditFormValue} from "@/Redux/Reducers/evenement";
import {useRouter} from "next/navigation";


const EditEvenementForm = () => {

    const [activeTab, setActiveTab] = useState<number | undefined>(1);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { selectedEvenement, statusFetchEvenementById } = useAppSelector(state => state.evenement);

    useEffect(() => {
        if(selectedEvenement){
            dispatch(fetchEvenementById(selectedEvenement.id));
        }else {
            router.push('/evenement/list');
        }
    }, [dispatch]);

    useEffect(
        ()=>{
            dispatch(setEditFormValue({
                field: 'name',
                value: selectedEvenement?.name
            }));
            dispatch(setEditFormValue({
                field: 'description',
                value: selectedEvenement?.description
            }));
            dispatch(setEditFormValue({
                field: 'place',
                value: selectedEvenement?.place
            }));
            dispatch(setEditFormValue({
                field: 'link',
                value: selectedEvenement?.link
            }));
            dispatch(setEditFormValue({
                field: 'started_at',
                value: selectedEvenement?.started_at
            }));
            dispatch(setEditFormValue({
                field: 'ended_at',
                value: selectedEvenement?.ended_at
            }));
            dispatch(setEditFormValue({
                field: 'responsible',
                value: selectedEvenement?.responsible
            }));
            dispatch(setEditFormValue({
                field: 'categories',
                value: selectedEvenement?.categories?.map(c => c.id) || []
            }));
        }, [dispatch, statusFetchEvenementById]
    )

    const callback = useCallback((tab: number | undefined) => {
        setActiveTab(tab);
    }, [dispatch, router]);

    return (
        <Container fluid>
            <BackButton link={'/evenement/list'}/>
            <Col md={12}>
                <Card>
                    <CardBody>
                        <div className={'horizontal-wizard-wrapper  vertical-variations vertical-options'}>
                            <Row className="g-3 flex-column flex-md-row">
                                <Col xs="12" md="3" lg="2" className="main-horizontal-header mb-3 mb-md-0">
                                    <NavComponent callbackActive={callback} activeTab={activeTab} />
                                </Col>
                                <Col xs="12" md="9" lg="10" className="main-horizontal-content">
                                    <EvenementTabContent activeTab={activeTab} callbackActive={callback}/>
                                </Col>
                            </Row>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Container>
    )
}

export default EditEvenementForm;