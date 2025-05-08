import React, { useState } from "react";
import { Button, Col, Form, Input, Label, Row, FormGroup } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormField } from "@/Redux/Reducers/ActivitySlice";
import { toast } from "react-toastify";
import { ReviewFormType, FormFieldType } from "@/Types/ActivitiesTypes";
import { ActivityFormTabContentPropsType } from "@/Types/ActivitiesTypes";

const ReviewForm: React.FC<ActivityFormTabContentPropsType> = ({ callbackActive }) => {

    const dispatch = useAppDispatch();
    const { addFormValue } = useAppSelector((state) => state.activity);

    const [phases, setPhases] = useState<ReviewFormType[]>(() =>
        addFormValue.review_form ? [...addFormValue.review_form] : []
    );

    const [newPhaseName, setNewPhaseName] = useState("");
    //@ts-ignore
    const [newField, setNewField] = useState<Omit<FormFieldType, 'id'>>({
        label: "",
        type: "number",
        required: true
    });

    const handleAddPhase = () => {
        if (newPhaseName.trim()) {
            const updatedPhases = [
                ...phases,
                {
                    phase: newPhaseName,
                    fields: []
                }
            ];
            setPhases(updatedPhases);
            dispatch(setFormField({ curationForm: updatedPhases }));
            setNewPhaseName("");
            toast.success("Phase ajoutée avec succès");
        }
    };


    const handleRemovePhase = (phaseIndex: number) => {
        const updatedPhases = phases.filter((_, index) => index !== phaseIndex);
        setPhases(updatedPhases);
        dispatch(setFormField({ curationForm: updatedPhases }));
        toast.success("Phase supprimée avec succès");
    };


    const handleAddCriteria = (phaseIndex: number) => {
        const updatedPhases = phases.map((phase, index) =>
            index === phaseIndex ? {
                ...phase,
                fields: [
                    ...phase.fields,
                    {
                        ...newField,
                        id: `field_${Date.now()}`,
                        options: newField.type === 'select' ? newField.options || [] : []
                    }
                ]
            } : phase
        );

        setPhases(updatedPhases);
        dispatch(setFormField({ curationForm: updatedPhases }));
        //@ts-ignore
        setNewField({
            label: "",
            type: "number",
            required: true
        });
    };

    const handleRemoveCriteria = (phaseIndex: number, fieldId: string) => {
        const updatedPhases = phases.map((phase, index) =>
            index === phaseIndex ? {
                ...phase,
                fields: phase.fields.filter(f => f.id !== fieldId)
            } : phase
        );

        setPhases(updatedPhases);
        dispatch(setFormField({ curationForm: updatedPhases }));
    };

    return (
        <div className="border ps-3 rounded-3">
            <Form className="theme-form theme-form-2 mega-form">
                <Row className="g-2 mx-5">
                    <Col xs="12">
                        <h4 className="mb-3 mt-5">Configuration des Phases et Critères d'Évaluation</h4>

                        <div className="mb-4 p-3 border rounded">
                                <Row className={'justify-content-center align-items-center mb-4'}>
                                <Col md={8}>
                                    <FormGroup>
                                        <Label>Nom de la phase</Label>
                                        <Input
                                            className={'border txt-primary'}
                                            value={newPhaseName}
                                            onChange={(e) => setNewPhaseName(e.target.value)}
                                            placeholder="Ex: Qualification, Finale, etc."
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4} className="d-flex align-items-end">
                                    <Button
                                        color="success"
                                        onClick={handleAddPhase}
                                        disabled={!newPhaseName.trim()}
                                    >
                                        Ajouter une Phase
                                    </Button>
                                </Col>
                            </Row>
                        </div>

                        {phases.map((phase, phaseIndex) => (
                            <div key={phaseIndex} className="mb-5 p-3 border rounded">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h5>{phase.phase}</h5>
                                    <Button onClick={() => handleRemovePhase(phaseIndex)}>
                                        Supprimer cette Phase
                                    </Button>
                                </div>


                                {phase.fields.map((field) => (
                                    <div key={field.id} className="mb-3 p-2 border-bottom">
                                        <Row>
                                            <Col md={4}>
                                                <strong>{field.label}</strong>
                                            </Col>
                                            <Col md={3}>
                                                Type: {field.type}
                                            </Col>
                                            <Col md={3}>
                                                Requis: {field.required ? 'Oui' : 'Non'}
                                            </Col>
                                            <Col md={2}>
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleRemoveCriteria(phaseIndex, field.id)}
                                                >
                                                    Supprimer
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}

                                <div className="mt-4 p-3 bg-light rounded">
                                    <h6 className={'txt-primary mb-4'}>Ajouter un nouveau critère à cette phase</h6>
                                    <Row className={"d-flex justify-content-between align-items-center mb-4"}>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label className={'txt-primary'}>Intitulé du critère</Label>
                                                <Input
                                                    className={'border txt-primary'}
                                                    value={newField.label}
                                                    onChange={(e) => setNewField({...newField, label: e.target.value})}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label className={'txt-primary'}>Type</Label>
                                                <Input
                                                    type="select"
                                                    value={newField.type}
                                                    onChange={(e) => setNewField({...newField, type: e.target.value as any})}
                                                >
                                                    <option value="number">Note numérique</option>
                                                    <option value="textarea">Commentaire</option>
                                                    <option value="select">Liste de choix</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>

                                        <Col md={2}>
                                            <FormGroup check>
                                                <Label check className={'txt-primary'}>
                                                    <Input

                                                        type="checkbox"
                                                        checked={newField.required}
                                                        onChange={(e) => setNewField({...newField, required: e.target.checked})}
                                                    />
                                                    Requis
                                                </Label>
                                            </FormGroup>
                                        </Col>

                                        <Col md={3} className="d-flex align-items-end">
                                            <Button
                                                color="primary"
                                                size="sm"
                                                onClick={() => handleAddCriteria(phaseIndex)}
                                                disabled={!newField.label.trim()}
                                            >
                                                Ajouter le Critère
                                            </Button>
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Form>

            <Col xs="12" className="text-end p-3">
                <Button onClick={() => callbackActive(3)} color="primary">
                    Précédent
                </Button>
                <Button className="ms-1" color="primary" onClick={() => callbackActive(5)}>
                    Terminer
                </Button>
            </Col>
        </div>
    );
};

export default ReviewForm;