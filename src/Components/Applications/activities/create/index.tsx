import React from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import {useCallback, useState} from 'react';
import NavComponent from "@/Components/Applications/activities/create/NavComponent";
import ActivityFormTabContent from "@/Components/Applications/activities/create/ActivityFormTabContent";
import BackButton from "@/CommonComponent/BackButton";


const ActivityForm = () => {

    const [activeTab, setActiveTab] = useState<number | undefined>(1);

    const callback = useCallback((tab: number | undefined) => {
        setActiveTab(tab);
    }, []);

    return (
        <Container fluid>
            <BackButton link={'/project'}/>
            <Col md={12}>
                <Card>
                    <CardBody>
                        <div className={'horizontal-wizard-wrapper  vertical-variations vertical-options'}>
                            <Row className="g-3 flex-column flex-md-row">
                                <Col xs="12" md="3" lg="2" className="main-horizontal-header mb-3 mb-md-0">
                                    <NavComponent callbackActive={callback} activeTab={activeTab} />
                                </Col>
                                <Col xs="12" md="9" lg="10" className="main-horizontal-content">
                                    <ActivityFormTabContent activeTab={activeTab} callbackActive={callback}/>
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