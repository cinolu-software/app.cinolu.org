import React from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import {useCallback, useState} from 'react';
import NavComponent from "@/Components/Applications/activities/NavComponent";
import ActivityFormTabContent from "@/Components/Applications/activities/ActivityFormTabContent";
import {ActivityFormpropsType} from "@/Types/ActivitiesTypes";

const ActivityForm = () => {

    const [activeTab, setActiveTab] = useState<number | undefined>(1);

    const callback = useCallback((tab: number | undefined) => {
        setActiveTab(tab);
    }, []);

    return (
        <Container fluid>
            <Col md={12}>
                <Card>
                    <CardBody>
                        <div className={'horizontal-wizard-wrapper  vertical-variations vertical-options'}>
                            <Row className="g-3">
                                <Col xs={2} className="main-horizontal-header" >
                                    <NavComponent callbackActive={callback} activeTab={activeTab} />
                                </Col>
                                <Col xs={10} className="main-horizontal-content">
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