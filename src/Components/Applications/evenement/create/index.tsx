import React from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import {useCallback, useState} from 'react';
import NavComponent from "@/Components/Applications/evenement/create/NavComponent";
import EvenementVerticalWizardTabContent from "@/Components/Applications/evenement/create/EvenementFormTabContent";
import BackButton from "@/CommonComponent/BackButton";
import ActivityFormTabContent from "@/Components/Applications/activities/create/ActivityFormTabContent";


const ActivityForm = () => {

    const [activeTab, setActiveTab] = useState<number | undefined>(1);

    const callback = useCallback((tab: number | undefined) => {
        setActiveTab(tab);
    }, []);

    return (
        <Container fluid>
            <BackButton link={'/evenement/list'}/>
            <Col md={12}>
                <Card>
                    <CardBody>
                        <div className={'horizontal-wizard-wrapper  vertical-variations vertical-options'}>
                            <Row className="g-3 d-flex flex-column flex-md-row flex-wrap">
                                <Col xs="12" md="4" lg="3" className="main-horizontal-header mb-3 mb-md-0">
                                    <NavComponent callbackActive={callback} activeTab={activeTab} />
                                </Col>
                                <Col xs="12" md="8" lg="9" className="main-horizontal-content">
                                    <EvenementVerticalWizardTabContent activeTab={activeTab} callbackActive={callback}/>
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