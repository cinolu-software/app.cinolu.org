import React, { useState, useEffect } from "react";
import { Card, CardBody, Button, Form, FormGroup, Label, Input, Row, Col, Spinner, TabPane } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { updateProgramPhase } from "@/Redux/Reducers/programsSlice/ProgramPhaseSlice";
import { Flip, toast } from "react-toastify";

interface Requirement {
    id: string;
    name: string;
    description: string;
}

const PhaseRequirements: React.FC<{ navId: string }> = ({ navId }) => {
    const dispatch = useAppDispatch();
    const { programData } = useAppSelector((state) => state.programs);

    const [requirements, setRequirements] = useState<Requirement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);


    const phase = programData.phases.find((phase: { id: string }) => phase.id === navId);

    useEffect(() => {
        setIsLoading(true);
        if (phase?.requirements) {
            setRequirements(phase.requirements);
        } else {
            setRequirements([]);
        }
        setIsLoading(false);
    }, [phase]);

    const handleAddRequirement = () => {
        const newRequirement: Requirement = {
            id: Date.now().toString(),
            name: "",
            description: "",
        };
        setRequirements([...requirements, newRequirement]);
    };

    const handleEditRequirement = (id: string, key: keyof Requirement, value: string) => {
        setRequirements((prev) =>
            prev.map((req) => (req.id === id ? { ...req, [key]: value } : req))
        );
    };

    const handleDeleteRequirement = (id: string) => {
        setRequirements((prev) => prev.filter((req) => req.id !== id));
    };

    const handleSave = async () => {
        if (!phase) return;

        setIsSaving(true);
        try {
            const updatedPhase = {
                ...phase,
                requirements,
            };

            await dispatch(updateProgramPhase(updatedPhase));
            toast.success(
                <p className="text-white tx-16 mb-0">{"Exigences mises à jour avec succès !"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        } catch (error) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Une erreur est survenue lors de la mise à jour."}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        } finally {
            setIsSaving(false);
        }
    };

    if (!phase) {
        return (
            <TabPane tabId="requirement-tab">
                <h5>Aucune phase active trouvée.</h5>
            </TabPane>
        );
    }

    return (
        <TabPane tabId={'requirement-tab'}>
            <Card className="shadow-sm">
                <CardBody>
                    <h5 className="mb-4">Exigences pour la phase : {phase.name}</h5>
                    {isLoading ? (
                        <div className="text-center">
                            <Spinner color="success" />
                            <p>Chargement des données...</p>
                        </div>
                    ) : (
                        <Form>
                            {requirements.map((requirement, index) => (
                                <Row key={requirement.id} className="mb-3">
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for={`name-${requirement.id}`}>Nom</Label>
                                            <Input
                                                type="text"
                                                id={`name-${requirement.id}`}
                                                value={requirement.name}
                                                placeholder="Nom de l'exigence"
                                                onChange={(e) =>
                                                    handleEditRequirement(requirement.id, "name", e.target.value)
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for={`description-${requirement.id}`}>Description</Label>
                                            <Input
                                                type="textarea"
                                                id={`description-${requirement.id}`}
                                                value={requirement.description}
                                                placeholder="Description de l'exigence"
                                                onChange={(e) =>
                                                    handleEditRequirement(requirement.id, "description", e.target.value)
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2} className="d-flex align-items-center">
                                        <Button
                                            color="danger"
                                            outline
                                            onClick={() => handleDeleteRequirement(requirement.id)}
                                        >
                                            Supprimer
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                            <Button color="primary" outline onClick={handleAddRequirement}>
                                Ajouter une Exigence
                            </Button>
                        </Form>
                    )}
                    <div className="d-flex justify-content-end mt-4">
                        <Button color="success" onClick={handleSave} disabled={isSaving}>
                            {isSaving ? "Sauvegarde..." : "Sauvegarder les Changements"}
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </TabPane>
    );
};

export default PhaseRequirements;

