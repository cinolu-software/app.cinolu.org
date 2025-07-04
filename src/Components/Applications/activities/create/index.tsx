import React, {useEffect} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import {useCallback, useState} from 'react';
import NavComponent from "@/Components/Applications/activities/create/NavComponent";
import ActivityFormTabContent from "@/Components/Applications/activities/create/ActivityFormTabContent";
import BackButton from "@/CommonComponent/BackButton";
import { resetForm } from '@/Redux/Reducers/ActivitySlice';
import { useAppDispatch } from '@/Redux/Hooks';


const ActivityForm = () => {

    const [activeTab, setActiveTab] = useState<number | undefined>(1);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetForm());
    }, [dispatch]);

    const callback = useCallback((tab: number | undefined) => {
        setActiveTab(tab);
    }, []);

    return (
        <Container fluid>
            <BackButton link={'/projects/list'}/>
            <Col md={12}>
                <Card>
                    <CardBody>
                        <h3 className="mb-0">{"Création du projet"}</h3>
                        <p className="text-muted mb-0">{"Vous pouvez créer le projet avec les détail ici."}</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
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
                    </CardBody>
                </Card>
            </Col>
        </Container>
    )
}

export default ActivityForm;