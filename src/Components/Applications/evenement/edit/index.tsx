import {Card, CardBody, Nav, NavItem, NavLink, Container, Row} from "reactstrap";
import React, {useState} from 'react';
import BackButton from "@/CommonComponent/BackButton";
import EvenementEditTabContent from "@/Components/Applications/evenement/edit/EvenementEditTabContent";


const EditEvenementTabs = () => {

    const [activeTab, setActiveTab] = useState('1');


    return (
        <Container fluid>
            <BackButton link={'/evenement/list'}/>
            <Row>
                <Card>
                    <CardBody>
                        <h3 className="mb-0">{"Modifier l'événement"}</h3>
                        <p className="text-muted mb-0">{"Vous pouvez modifier les détails de l'événement ici."}</p>
                    </CardBody>
                </Card>
                <Card>
                    <CardBody>
                        <Nav tabs>
                            <NavItem>
                                <NavItem>
                                    <NavLink className={`txt-secondary ${activeTab === "1" ? "active" : ""}`} onClick={() => setActiveTab("1")}>
                                        <i className="icofont icofont-files"></i>
                                        <span>{"Détail de l'événement"}</span>
                                    </NavLink>
                                </NavItem>
                            </NavItem>

                            <NavItem>
                                <NavItem>
                                    <NavLink className={`txt-secondary ${activeTab === "2" ? "active" : ""}`}
                                             onClick={() => setActiveTab("2")}>
                                        <i className="fa fa-file-image-o"></i>
                                        <span>{"Image de couverture"}</span>
                                    </NavLink>
                                </NavItem>
                            </NavItem>
                        </Nav>
                        <EvenementEditTabContent activeTab={activeTab}/>
                    </CardBody>
                </Card>
            </Row>
        </Container>
    )
}

export default EditEvenementTabs;