import React from "react";
import { TabPane, Card, CardBody, CardHeader, Badge, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { useAppSelector } from "@/Redux/Hooks";

const PhaseDetails: React.FC<{ navId: string }> = ({ navId }) => {
    const { programData } = useAppSelector((state) => state.programs);

    // Récupérer la phase correspondante
    const phase = programData.phases.find((phase) => phase.id === navId);

    if (!phase) {
        return (
            <TabPane tabId="details-tab">
                <div className="text-center my-4 bg-white">
                    <div className={'pb-5 pt-2'}>
                        <h1>Aucune phase trouvée</h1>
                        <p>Veuillez sélectionner une phase valide pour afficher ses détails.</p>
                    </div>
                </div>
            </TabPane>
        );
    }

    return (
        <TabPane tabId="details-tab">
            <div className="mb-4 bg-white mt-5 ps-5">
                <div className=" text-light-primary pt-4 pb-2 border-bottom">
                    <h4 className="mb-0">{phase.name}</h4>
                </div>
                <div className={'pt-3 pb-4'}>
                    <Row>
                        <Col md="6">
                            <p><strong>Description :</strong> {phase.description}</p>
                        </Col>
                        <Col md="3">
                            <p><strong>Date de début :</strong></p>
                            <Badge color="success">{new Date(phase.started_at).toLocaleDateString()}</Badge>
                        </Col>
                        <Col md="3">
                            <p><strong>Date de fin :</strong></p>
                            <Badge color="danger">{new Date(phase.ended_at).toLocaleDateString()}</Badge>
                        </Col>
                    </Row>
                </div>
            </div>

            {phase.form?.iputs?.length > 0 && (
                <Card className="mb-4">
                    <CardHeader className="bg-secondary text-white">
                        <h4>Formulaire</h4>
                    </CardHeader>
                    <CardBody>
                        <ListGroup>
                            {phase.form.iputs.map((input, index) => (
                                <ListGroupItem key={index} className="d-flex justify-content-between align-items-start">
                                    <div>
                                        <strong>{input.label}</strong>
                                        <p className="mb-1 text-muted">
                                            Type : {input.type}, Nom : {input.name}
                                        </p>
                                    </div>
                                    <Badge color={input.required ? "success" : "warning"} pill>
                                        {input.required ? "Requis" : "Optionnel"}
                                    </Badge>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </CardBody>
                </Card>
            )}

            {phase.requirements?.length > 0 && (
                <Card>
                    <CardHeader className="bg-info text-white">
                        <h4>Exigences</h4>
                    </CardHeader>
                    <CardBody>
                        <ListGroup>
                            {phase.requirements.map((requirement) => (
                                <ListGroupItem key={requirement.id}>
                                    <h5>{requirement.name}</h5>
                                    <p className="mb-0 text-muted">{requirement.description}</p>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </CardBody>
                </Card>
            )}
        </TabPane>
    );
};

export default PhaseDetails;
