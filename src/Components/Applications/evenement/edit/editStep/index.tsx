import React, {useEffect} from 'react';
import {Card, CardBody, Col, Container, Row} from 'reactstrap';
import {useCallback, useState} from 'react';
import NavComponent from "@/Components/Applications/evenement/edit/editStep/NavComponent";
import EvenementVerticalWizardTabContent from "@/Components/Applications/evenement/edit/editStep/EvenementFormTabContent";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {fetchEvenementById, setEditFormValue} from "@/Redux/Reducers/evenement";
import {useRouter} from "next/navigation";
import BackButton from "@/CommonComponent/BackButton";


const EditEvenementForm = () => {

    const [activeTab, setActiveTab] = useState<number | undefined>(1);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { selectedEvenement, statusFetchEvenementById} = useAppSelector(state => state.evenement);

    useEffect(() => {
        if (selectedEvenement) {
            dispatch(fetchEvenementById(selectedEvenement.id));
        }else {
            router.push("/evenement/list");
        }
    }
    , [dispatch]);

    useEffect(() => {
        if(statusFetchEvenementById === "success") {
            dispatch(setE)
        }
    }, [dispatch, statusFetchEvenementById]);


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

export default EditEvenementForm;