import {Card, CardBody, Col, Nav, NavLink, NavItem, Container, Row} from 'reactstrap';
import React, {useState} from "react";
import BackButton from "@/CommonComponent/BackButton";
import PartnerEditTabContent from "@/Components/Applications/Partners/DetailPartner/PartnerEditTabContent";
import PartnerProfile from "@/Components/Applications/Partners/DetailPartner/PartnerProfil";

const EditPartenaire = () => {

    const [activeTab, setActiveTab] = useState('1');

    return (
        <Container fluid>
            <BackButton link={'/partners'}/>
            <Row>
                <PartnerProfile/>
            </Row>
            <Row>
                <Card>
                    <CardBody>
                        <Nav tabs>
                            <NavItem>
                                <NavItem>
                                    <NavLink href='#' className={`txt-secondary ${activeTab === "1" ? "active" : ""}`} onClick={() => setActiveTab("1")}>
                                        <i className="icofont icofont-files"></i>
                                        <span>Détail du Partenaire</span>
                                    </NavLink>
                                </NavItem>
                            </NavItem>

                            <NavItem>
                                <NavItem>
                                    <NavLink href='#' className={`txt-secondary ${activeTab === "2" ? "active" : ""}`}
                                             onClick={() => setActiveTab("2")}>
                                        <i className="fa fa-file-image-o"></i>
                                        <span>Logo</span>
                                    </NavLink>
                                </NavItem>
                            </NavItem>
                        </Nav>

                        <PartnerEditTabContent activeTab={activeTab}/>

                    </CardBody>
                </Card>
            </Row>
        </Container>
    )
}

export default EditPartenaire;