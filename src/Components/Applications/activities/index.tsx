import React from 'react';
import {Card, CardBody, Col, Row} from 'reactstrap';
import {useCallback, useState} from 'react';
import NavComponent from "@/Components/Applications/activities/NavComponent";
import ActivityFormTabContent from "@/Components/Applications/activities/ActivityFormTabContent";

const ActivityForm = () => {

    const [activeTab, setActiveTab] = useState<number | undefined>(1);
    const callback = useCallback((tab: number | undefined) => {
        setActiveTab(tab);
    }, []);

    return (
        <Col md={12}>
            <Card>
                <CardBody>
                    <Row className={'shipping-form g-5'}>
                        <Col xs={'12'}>
                            <Row className={'shipping-border'}>
                                <NavComponent callbackActive={callback} activeTab={activeTab}/>
                                <ActivityFormTabContent activeTab={activeTab} callbackActive={callback}/>
                            </Row>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    )
}

export default ActivityForm;