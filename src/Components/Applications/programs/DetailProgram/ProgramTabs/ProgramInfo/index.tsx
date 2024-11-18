import React from 'react';
import {
    TabPane,
    UncontrolledAccordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
} from 'reactstrap';
import { Layers, ChevronDown, User, Tag, FileText, Calendar } from 'react-feather';

const ProgramInfo = () => {
    return (
        <TabPane tabId="1">
            <div className="row gap-4">
                <div className="col-12">
                    <div className="basic-accordion">
                        <div className="mx-5 mt-5 accordion-border icons-accordion">
                            <UncontrolledAccordion className="me-5 mb-5" toggle={()=>{}}>
                                <AccordionItem className={'bg-light'}>
                                    <AccordionHeader
                                        targetId="1"
                                        className="gap-2 bg-light-primary text-primary accordion-header"
                                    >
                                        <Tag className="svg-wrapper text-success" />
                                        <span className="text-success ms-2 fw-bold">Nom du programme</span>
                                        <ChevronDown className="svg-color text-success" />
                                    </AccordionHeader>
                                    <AccordionBody accordionId="1">
                                        <p className={'text-success'}>
                                            or "Allow this page to install an unsigned ActiveX Control? Doing so from
                                            untrusted sources may harm your computer."
                                            (Both phrased as conditions that may cause future problems.)
                                        </p>
                                    </AccordionBody>
                                </AccordionItem>

                                <AccordionItem className={'bg-light'}>
                                    <AccordionHeader
                                        targetId="2"
                                        className="gap-2 bg-light-primary text-primary accordion-header"
                                    >
                                        <FileText className="svg-wrapper text-success" />
                                        <span className="text-success ms-2 fw-bold">Description du programme</span>
                                        <ChevronDown className="svg-color text-success" />
                                    </AccordionHeader>
                                    <AccordionBody accordionId="2">
                                        <p className={'text-success'}>
                                            or "Allow this page to install an unsigned ActiveX Control? Doing so from
                                            untrusted sources may harm your computer."
                                            (Both phrased as conditions that may cause future problems.)
                                        </p>
                                    </AccordionBody>
                                </AccordionItem>

                                <AccordionItem className={'bg-light'}>
                                    <AccordionHeader
                                        targetId="3"
                                        className="gap-2 bg-light-primary text-primary accordion-header"
                                    >
                                        <Calendar className="svg-wrapper text-success" />
                                        <span className="text-success ms-2 fw-bold">Durée du programme</span>
                                        <ChevronDown className="svg-color text-success" />
                                    </AccordionHeader>
                                    <AccordionBody accordionId="3">
                                        <p className={'text-success'}>
                                            or "Allow this page to install an unsigned ActiveX Control? Doing so from
                                            untrusted sources may harm your computer."
                                            (Both phrased as conditions that may cause future problems.)
                                        </p>
                                    </AccordionBody>
                                </AccordionItem>

                                <AccordionItem className={'bg-light'}>
                                    <AccordionHeader
                                        targetId="4"
                                        className="gap-2 bg-light-primary text-primary accordion-header"
                                    >
                                        <User className="svg-wrapper text-success" />
                                        <span className="text-success ms-2 fw-bold">Audience ciblée</span>
                                        <ChevronDown className="svg-color text-success" />
                                    </AccordionHeader>
                                    <AccordionBody accordionId="4">
                                        <p className={'text-success'}>
                                            or "Allow this page to install an unsigned ActiveX Control? Doing so from
                                            untrusted sources may harm your computer."
                                            (Both phrased as conditions that may cause future problems.)
                                        </p>
                                    </AccordionBody>
                                </AccordionItem>


                                <AccordionItem className={'bg-light'}>
                                    <AccordionHeader
                                        targetId="5"
                                        className="gap-2 bg-light-primary text-primary accordion-header"
                                    >
                                        <Layers className="svg-wrapper text-success" />
                                        <span className="text-success ms-2 fw-bold">Type de programme</span>
                                        <ChevronDown className="svg-color text-success" />
                                    </AccordionHeader>
                                    <AccordionBody accordionId="5">
                                        <p className={'text-success'}>
                                            or "Allow this page to install an unsigned ActiveX Control? Doing so from
                                            untrusted sources may harm your computer."
                                            (Both phrased as conditions that may cause future problems.)
                                        </p>
                                    </AccordionBody>
                                </AccordionItem>
                            </UncontrolledAccordion>
                        </div>
                    </div>
                </div>
            </div>
        </TabPane>
    );
};

export default ProgramInfo;
