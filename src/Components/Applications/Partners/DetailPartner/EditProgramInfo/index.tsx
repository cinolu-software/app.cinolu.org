import React from "react";
import { TabPane, UncontrolledAccordion } from "reactstrap";
import {Calendar, FileText, Tag, Users, Link,} from "react-feather";
import PartnerAccordionItem from "@/Components/Applications/Partners/DetailPartner/EditProgramInfo/PartnerAccordion";
import { useAppSelector } from "@/Redux/Hooks";

const ProgramInfo = () => {

    const { selectedPartner } = useAppSelector((state) => state.partner);

    return (
        <TabPane tabId="1">
            <div className="row gap-4">
                <div className="col-12">
                    <div className="basic-accordion">
                        <div className="mt-5 accordion-border icons-accordion">
                            <UncontrolledAccordion className="me-5 mb-5" toggle={() => {}}>
                                <PartnerAccordionItem
                                    id="1"
                                    Icon={<Tag className="svg-wrapper text-success" />}
                                    title="Nom du Partenaire"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                          <span className="value">
                                            {selectedPartner?.name || "Nom non spécifié"}
                                          </span>
                                        </div>
                                    </div>
                                </PartnerAccordionItem>
                    
                    
                                <PartnerAccordionItem
                                    id="2"
                                    Icon={<FileText className="svg-wrapper text-success" />}
                                    title="Description"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                          <span className="value">
                                            {selectedPartner?.description || "Description indisponible"}
                                          </span>
                                        </div>
                                    </div>
                                </PartnerAccordionItem>
                    
                    
                                <PartnerAccordionItem
                                    id="3"
                                    Icon={<Link className="svg-wrapper text-success" />}
                                    title="Site Web"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <a
                                                href={selectedPartner?.website_link || "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="value"
                                            >
                                                {selectedPartner?.website_link || "Lien non disponible"}
                                            </a>
                                        </div>
                                    </div>
                                </PartnerAccordionItem>
                    
                                <PartnerAccordionItem
                                    id="4"
                                    Icon={<Users className="svg-wrapper text-success" />}
                                    title="Partenariats"
                                >
                                    <div className="program-info text-success">
                                        {selectedPartner && selectedPartner.partnerships.length > 0 ? (
                                            <ul>
                                                {selectedPartner?.partnerships.map((partnership) => (
                                                    <li key={partnership.id}>
                                                        <strong>{partnership.name}</strong>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <span>Aucun partenariat spécifié</span>
                                        )}
                                    </div>
                                </PartnerAccordionItem>
                    
                            </UncontrolledAccordion>
                        </div>
                    </div>
                </div>
            </div>
        </TabPane>
    );
};

export default ProgramInfo;
