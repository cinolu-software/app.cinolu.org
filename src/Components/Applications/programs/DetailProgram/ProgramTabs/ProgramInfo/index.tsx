import React from 'react';
import {TabPane, UncontrolledAccordion} from 'reactstrap';
import {Calendar, FileText, Home, Layers, Tag, User} from 'react-feather';
import ProgramInfoAccordionItem
    from '@/Components/Applications/programs/DetailProgram/ProgramTabs/ProgramInfo/ProgramInfoAccordionItem';
import {useAppSelector} from "@/Redux/Hooks";
import {calculateDuration} from "@/utils";

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
                                <ProgramInfoAccordionItem
                                    id="1"
                                    Icon={<Tag className="svg-wrapper text-success" />}
                                    title="Nom du programme"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <span className="value">
                                                {selectedProgram?.name || "Nom non spécifié"}
                                            </span>
                                        </div>
                                    </div>
                                </ProgramInfoAccordionItem>

                                <ProgramInfoAccordionItem
                                    id="2"
                                    Icon={<FileText className="svg-wrapper text-success" />}
                                    title="Description du programme"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <span className="value">
                                                {selectedProgram?.description || "Description non spécifiée"}
                                            </span>
                                        </div>
                                    </div>
                                </ProgramInfoAccordionItem>

                                <ProgramInfoAccordionItem
                                    id="3"
                                    Icon={<Calendar className="svg-wrapper text-success" />}
                                    title="Durée du programme"
                                >
                                    <div className="program-duration text-success">
                                        <div className="date-info">
                                            <span className="label">Lancement :</span>
                                            <span className="value">
                                                {selectedProgram?.started_at || "Non spécifié"}
                                            </span>
                                        </div>
                                        <div className="date-info">
                                            <span className="label">Fin :</span>
                                            <span className="value">
                                                {selectedProgram?.ended_at || "Non spécifié"}
                                            </span>
                                        </div>
                                        <div className="duration-info">
                                            <span className="label">Durée :</span>
                                            <span className="value">
                                                {selectedProgram?.started_at && selectedProgram?.ended_at
                                                    ? calculateDuration(selectedProgram.started_at, selectedProgram.ended_at)
                                                    : "Non spécifiée"}
                                            </span>
                                        </div>
                                    </div>
                                </ProgramInfoAccordionItem>

                                <ProgramInfoAccordionItem
                                    id="4"
                                    Icon={<User className="svg-wrapper text-success" />}
                                    title="Audience ciblée"
                                >
                                    <div className="program-info text-success">
                                        <div className="info-row">
                                            <span className="value">
                                                {selectedProgram?.targeted_audience || "Audience non spécifiée"}
                                            </span>
                                        </div>
                                    </div>
                                </ProgramInfoAccordionItem>

                                <ProgramInfoAccordionItem
                                    id="5"
                                    Icon={<Layers className="svg-wrapper text-success" />}
                                    title="Type de programme"
                                >
                                    <div className="program-info text-success">
                                        {selectedProgram?.types?.length > 0 ? (
                                            selectedProgram.types.map((type: any) => (
                                                <div className="info-row" key={type.id}>
                                                    <span className="value">{type.name}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="info-row">
                                                <span className="value">Type non spécifié</span>
                                            </div>
                                        )}
                                    </div>
                                </ProgramInfoAccordionItem>

                                <ProgramInfoAccordionItem
                                    id="6"
                                    Icon={<Home className="svg-wrapper text-success" />}
                                    title="Catégorie de programme"
                                >
                                    <div className="program-info text-success">
                                        {selectedProgram?.categories?.length > 0 ? (
                                            selectedProgram.categories.map((category: any) => (
                                                <div className="info-row" key={category.id}>
                                                    <span className="value">{category.name}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="info-row">
                                                <span className="value">Catégorie non spécifiée</span>
                                            </div>
                                        )}
                                    </div>
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

