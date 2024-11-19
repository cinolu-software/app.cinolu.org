import React from 'react';
import { TabPane, UncontrolledAccordion } from 'reactstrap';
import { Tag, FileText, Calendar, User, Layers, Home } from 'react-feather';
import ProgramInfoAccordionItem from '@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramInfo/ProgramInfoAccordionItem';
import {useAppSelector} from "@/Redux/Hooks";

const ProgramInfo = () => {

    const {selectedProgram} = useAppSelector(state=>state.programs);

    console.log("selectedProgram", selectedProgram);

    return (
        <TabPane tabId="1">
            <div className="row gap-4">
                <div className="col-12">
                    <div className="basic-accordion">
                        <div className="mx-5 mt-5 accordion-border icons-accordion">
                            <UncontrolledAccordion className="me-5 mb-5" toggle={()=>{}}>
                                <ProgramInfoAccordionItem id="1" Icon={<Tag className="svg-wrapper text-success" />} title="Nom du programme">
                                    <h5 className="text-success fw-bold">
                                        {selectedProgram ? selectedProgram.name : ""}
                                    </h5>
                                </ProgramInfoAccordionItem>
                                <ProgramInfoAccordionItem id={'2'} Icon={<FileText className={'svg-wrapper text-success'}/>} title={"Description du programme"}>
                                    <h5 className="text-success ">
                                        {selectedProgram ? selectedProgram.description : ""}
                                    </h5>
                                </ProgramInfoAccordionItem>
                                <ProgramInfoAccordionItem id={'3'} Icon={<Calendar className={'svg-wrapper text-success'}/>} title={"Durée du programme"}>
                                    {

                                    }
                                </ProgramInfoAccordionItem>
                                <ProgramInfoAccordionItem id={'4'} Icon={<User className={'svg-wrapper text-success'}/>} title={"Audience ciblée"}>
                                    <p className="text-success">
                                        or "Allow this page to install an unsigned ActiveX Control? Doing so from
                                        untrusted sources may harm your computer."
                                        (Both phrased as conditions that may cause future problems.)
                                    </p>
                                </ProgramInfoAccordionItem>
                                <ProgramInfoAccordionItem id={'5'} Icon={<Layers className={'svg-wrapper text-success'}/>} title={"Type de programme"}>
                                    <p className="text-success">
                                        or "Allow this page to install an unsigned ActiveX Control? Doing so from
                                        untrusted sources may harm your computer."
                                        (Both phrased as conditions that may cause future problems.)
                                    </p>
                                </ProgramInfoAccordionItem>
                                <ProgramInfoAccordionItem id={'6'} Icon={<Home className={'svg-wrapper text-success'}/>} title={"Catégorie de programme"}>
                                    <p className="text-success">
                                        or "Allow this page to install an unsigned ActiveX Control? Doing so from
                                        untrusted sources may harm your computer."
                                        (Both phrased as conditions that may cause future problems.)
                                    </p>
                                </ProgramInfoAccordionItem>
                            </UncontrolledAccordion>
                        </div>
                    </div>
                </div>
            </div>
        </TabPane>
    );
};

export default ProgramInfo;

