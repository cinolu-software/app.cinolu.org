import { useAppSelector } from "@/Redux/Hooks";
import { TabPane, Button, Form, FormGroup, Input, Label, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import React, { useState } from "react";

const PhaseForm: React.FC<{ navId: string }> = ({ navId }) => {
    const { programData } = useAppSelector((state) => state.programs);

    const phase = programData.phases.find((phase: { id: string }) => phase.id === navId);

    const [formFields, setFormFields] = useState(phase?.form?.iputs || []);

    const [newField, setNewField] = useState({
        label: "",
        name: "",
        required: false,
        type: "text",
    });

    const handleAddField = () => {
        if (newField.label && newField.name) {
            setFormFields([...formFields, newField]);
            setNewField({ label: "", name: "", required: false, type: "text" });
        }
    };

    const handleFieldChange = (index: number, key: string, value: any) => {
        const updatedFields = [...formFields];
        updatedFields[index] = { ...updatedFields[index], [key]: value };
        setFormFields(updatedFields);
    };

    if (!phase) {
        return (
            <TabPane tabId="form-tab">
                <h1>Aucune phase trouvée</h1>
            </TabPane>
        );
    }

    return (
        <TabPane tabId="form-tab">
            <div className="p-3 my-5 bg-white pt-3 text-success">
                <div>
                    <h4 className={'ms-4 pb-3 border-bottom'}>Générateur de formulaire pour la phase : {phase.name}</h4>
                </div>
                <div>
                    <Form>
                        <div className="mb-4 ms-4 mt-3">
                            <h4>Champs existants</h4>
                            {formFields.length > 0 ? (
                                formFields.map((field, index) => (
                                    <Row key={index} className="mb-3 align-items-center">
                                        <Col md="3">
                                            <Input
                                                type="text"
                                                value={field.label}
                                                onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                                                placeholder="Label"
                                                className="form-control-lg"
                                            />
                                        </Col>
                                        <Col md="3">
                                            <Input
                                                type="text"
                                                value={field.name}
                                                onChange={(e) => handleFieldChange(index, "name", e.target.value)}
                                                placeholder="Nom"
                                                className="form-control-lg"
                                            />
                                        </Col>
                                        <Col md="2">
                                            <Input
                                                type="select"
                                                value={field.type}
                                                onChange={(e) => handleFieldChange(index, "type", e.target.value)}
                                                className="form-control-lg"
                                            >
                                                <option value="text">Texte</option>
                                                <option value="textarea">Textarea</option>
                                                <option value="number">Nombre</option>
                                                <option value="email">Email</option>
                                            </Input>
                                        </Col>
                                        <Col md="2">
                                            <FormGroup check>
                                                <Label check>
                                                    <Input
                                                        type="checkbox"
                                                        checked={field.required}
                                                        onChange={(e) => handleFieldChange(index, "required", e.target.checked)}
                                                    />{" "}
                                                    Requis
                                                </Label>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                ))
                            ) : (
                                <p className={'mt-3'}>Aucun champ existant pour cette phase.</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <div className={'border-bottom mb-4 p-3'}>
                                <h4>Ajouter un nouveau champ</h4>
                            </div>
                            <Row className="mb-3 align-items-center">
                                <Col md="3">
                                    <Input
                                        type="text"
                                        value={newField.label}
                                        onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                                        placeholder="Label"
                                        className="form-control-lg"
                                    />
                                </Col>
                                <Col md="3">
                                    <Input
                                        type="text"
                                        value={newField.name}
                                        onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                                        placeholder="Nom"
                                        className="form-control-lg"
                                    />
                                </Col>
                                <Col md="2">
                                    <Input
                                        type="select"
                                        value={newField.type}
                                        onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                                        className="form-control-lg"
                                    >
                                        <option value="text">Texte</option>
                                        <option value="textarea">Textarea</option>
                                        <option value="number">Nombre</option>
                                        <option value="email">Email</option>
                                    </Input>
                                </Col>
                                <Col md="2">
                                    <FormGroup check>
                                        <Label check>
                                            <Input
                                                type="checkbox"
                                                checked={newField.required}
                                                onChange={(e) => setNewField({ ...newField, required: e.target.checked })}
                                            />{" "}
                                            Requis
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md="2">
                                    <Button color="success" onClick={handleAddField} className="btn-lg">
                                        Ajouter
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </Form>
                </div>
            </div>
        </TabPane>
    );
};

export default PhaseForm;

