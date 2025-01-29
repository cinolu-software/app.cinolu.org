import React, { useEffect, useState } from "react";
import { TabPane, Row, Col, Input, Button, FormGroup, Label, Spinner, Card, CardBody } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { updateProject } from "@/Redux/Reducers/projectSlice/projectSlice";
import { Flip, toast } from "react-toastify";
import { INDICATOR_CATEGORIES, INPUT_TYPES } from "@/Data/Application/ProjectIndicator";

const ProjectIndicator = () => {
    const dispatch = useAppDispatch();
    const { selectedProject } = useAppSelector((state) => state.project);

    const [selectedIndicators, setSelectedIndicators] = useState<string[]>([]);
    const [indicatorValues, setIndicatorValues] = useState<{ [key: string]: string | number }>({});
    const [customIndicator, setCustomIndicator] = useState<string>("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (selectedProject?.indicators) {
            setSelectedIndicators(Object.keys(selectedProject.indicators));
            setIndicatorValues(selectedProject.indicators);
        }
    }, [selectedProject]);


    const handleToggleIndicator = (indicator: string) => {
        if (selectedIndicators.includes(indicator)) {
            setSelectedIndicators(selectedIndicators.filter((i) => i !== indicator));
            setIndicatorValues((prev) => {
                const newValues = { ...prev };
                delete newValues[indicator];
                return newValues;
            });
        } else {
            setSelectedIndicators([...selectedIndicators, indicator]);
            setIndicatorValues((prev) => ({ ...prev, [indicator]: "" }));
        }
    };

    // Mettre à jour la valeur d'un indicateur
    const handleIndicatorValueChange = (indicator: string, value: string | number) => {
        setIndicatorValues({ ...indicatorValues, [indicator]: value });
    };

    // Ajouter un indicateur personnalisé
    const handleAddCustomIndicator = () => {
        if (customIndicator.trim() !== "" && !selectedIndicators.includes(customIndicator)) {
            setSelectedIndicators([...selectedIndicators, customIndicator]);
            setIndicatorValues({ ...indicatorValues, [customIndicator]: "" });
            setCustomIndicator("");
        }
    };

    // Sauvegarder les indicateurs
    const handleSaveIndicators = async () => {
        if (!selectedProject) return;
        setIsSaving(true);

        try {
            await dispatch(updateProject({ ...selectedProject, indicators: indicatorValues }));
            toast.success("Indicateurs mis à jour avec succès !", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
                transition: Flip,
                theme: "colored",
            });
        } catch (error) {
            toast.error("Erreur lors de la mise à jour des indicateurs.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
                transition: Flip,
                theme: "colored",
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <TabPane tabId="3">
            <div className="p-4 bg-white">
                <h4 className="pb-3 border-bottom">Indicateurs du projet</h4>

                {Object.entries(INDICATOR_CATEGORIES).map(([category, indicators]) => (
                    <Card key={category} className="mb-3">
                        <CardBody>
                            <h5 className="text-primary">{category}</h5>
                            <Row>
                                {indicators.map((indicator) => (
                                    <Col md="6" key={indicator} className="mb-2">
                                        <FormGroup check>
                                            <Label check>
                                                <Input
                                                    type="checkbox"
                                                    checked={selectedIndicators.includes(indicator)}
                                                    onChange={() => handleToggleIndicator(indicator)}
                                                />
                                                {indicator}
                                            </Label>
                                        </FormGroup>
                                        {selectedIndicators.includes(indicator) && (
                                            <Input
                                                type={INPUT_TYPES[indicator] || "text"}
                                                value={indicatorValues[indicator] || ""}
                                                onChange={(e) => handleIndicatorValueChange(indicator, e.target.value)}
                                                placeholder="Entrer une valeur"
                                                bsSize="sm"
                                            />
                                        )}
                                    </Col>
                                ))}
                            </Row>
                        </CardBody>
                    </Card>
                ))}

                {/* Ajouter un indicateur personnalisé */}
                <h5 className="mt-4 pb-2 border-bottom">Ajouter un indicateur personnalisé</h5>
                <Row className="mb-3">
                    <Col md="9">
                        <Input
                            type="text"
                            value={customIndicator}
                            onChange={(e) => setCustomIndicator(e.target.value)}
                            placeholder="Ex: Nombre de participants internationaux"
                            bsSize="sm"
                        />
                    </Col>
                    <Col md="3">
                        <Button color="primary" size="sm" onClick={handleAddCustomIndicator}>
                            Ajouter
                        </Button>
                    </Col>
                </Row>

                {/* Indicateurs sélectionnés */}
                <h5 className="mt-4 pb-2 border-bottom">Indicateurs sélectionnés</h5>
                {selectedIndicators.length === 0 ? (
                    <p>Aucun indicateur sélectionné.</p>
                ) : (
                    <ul className="list-group">
                        {selectedIndicators.map((indicator, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                {indicator}
                                <Button color="danger" size="sm" onClick={() => handleToggleIndicator(indicator)}>
                                    Supprimer
                                </Button>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Bouton de sauvegarde */}
                <div className="mt-4">
                    <Button color="success" onClick={handleSaveIndicators} disabled={isSaving}>
                        {isSaving ? <Spinner size="sm" /> : "Sauvegarder les indicateurs"}
                    </Button>
                </div>
            </div>
        </TabPane>
    );
};

export default ProjectIndicator;

