import React, { useState } from "react";
import { Button, Col, Form, Input, Label, Row, FormGroup, Table } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormField } from "@/Redux/Reducers/ActivitySlice";
import { toast } from "react-toastify";
import { FormFieldType } from "@/Types/ActivitiesTypes";
import { ActivityFormTabContentPropsType } from "@/Types/ActivitiesTypes";

const ReviewForm: React.FC<ActivityFormTabContentPropsType> = ({ callbackActive }) => {
    const dispatch = useAppDispatch();
    const { addFormValue: AddFormValue } = useAppSelector((state) => state.activity);

    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedField, setEditedField] = useState<FormFieldType | null>(null);

    const [fields, setFields] = useState<FormFieldType[]>(
        //@ts-ignore
        AddFormValue.review_form || []
    );

    const [newField, setNewField] = useState<FormFieldType>({
        id: "0",
        label: "",
        type: "text",
        required: false,
        options: [""]
    });

    const handleAddField = () => {
        const updatedField = { ...newField, id: Date.now() };
        const updatedFields = [...fields, updatedField];
        //@ts-ignore
        setFields(updatedFields);
        dispatch(setFormField({ curationForm: updatedFields }));

        setNewField({
            id: "0",
            label: "",
            type: "text",
            required: false,
            options: [""]
        });
    };

    const handleRemoveField = (fieldId: number | string) => {
        const updatedFields = fields.filter((f) => f.id !== fieldId);
        setFields(updatedFields);
        dispatch(setFormField({ curationForm: updatedFields }));
    };

    const handleEditField = (index: number, field: FormFieldType) => {
        setEditingIndex(index);
        setEditedField({ ...field });
    };

    const handleSaveField = () => {
        if (editingIndex !== null && editedField) {
            const updatedFields = fields.map((f, i) =>
                i === editingIndex ? editedField : f
            );

            setFields(updatedFields);
            dispatch(setFormField({ curationForm: updatedFields }));

            setEditingIndex(null);
            setEditedField(null);
            toast.success("Champ mis à jour avec succès");
        }
    };

    return (
        <div className="border ps-3 rounded-3">
            <Form className="theme-form theme-form-2 mega-form">
                <Row className="g-2 mx-5">
                    <Col xs="12">
                        <h4 className="mb-3 mt-5">Formulaire Dynamique de Sélection</h4>
                        <Table striped>
                            <thead className="text-center">
                            <tr className={'border-bottom border-primary mb-3'}>
                                <th>Nom du champ</th>
                                <th>Type</th>
                                <th>Requis</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody className="text-center">
                            {fields.map((field, index) => (
                                <tr key={field.id}>
                                    <td className="">
                                        {editingIndex === index ? (
                                            <Input
                                                className="border text-secondary"
                                                value={editedField?.label || ""}
                                                onChange={(e) =>
                                                    setEditedField({ ...editedField!, label: e.target.value })
                                                }
                                            />
                                        ) : (
                                            field.label
                                        )}
                                    </td>
                                    <td className="align-middle">
                                        {editingIndex === index ? (
                                            <Input
                                                type="select"
                                                className={'border border-primary'}
                                                value={editedField?.type || "text"}
                                                onChange={(e) =>
                                                    setEditedField({
                                                        ...editedField!,
                                                        type: e.target.value as FormFieldType["type"]
                                                    })
                                                }
                                            >
                                                <option value="text">Texte</option>
                                                <option value="number">Nombre</option>
                                                <option value="textarea">Zone de texte</option>
                                                <option value="file">Fichier</option>
                                                <option value="date">Date</option>
                                                <option value="select">Sélection</option>
                                            </Input>
                                        ) : (
                                            field.type
                                        )}
                                    </td>
                                    <td className="align-middle">
                                        {editingIndex === index ? (
                                            <Input
                                                type="checkbox"
                                                checked={editedField?.required || false}
                                                onChange={(e) =>
                                                    setEditedField({ ...editedField!, required: e.target.checked })
                                                }
                                            />
                                        ) : field.required ? (
                                            "Oui"
                                        ) : (
                                            "Non"
                                        )}
                                    </td>
                                    <td className="align-middle">
                                        {editingIndex === index ? (
                                            <Button color="primary" size="sm" onClick={handleSaveField} className="me-2">
                                                Enregistrer
                                            </Button>
                                        ) : (
                                            <Button
                                                color="primary"
                                                size="sm"
                                                onClick={() => handleEditField(index, field)}
                                                className="me-2"
                                            >
                                                Modifier
                                            </Button>
                                        )}
                                        <Button  size="sm" onClick={() => handleRemoveField(field.id)}>
                                            Supprimer
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>

                    <Col xs="12" className="mt-4">
                        <h4 className="mb-3">Ajouter un nouveau champ</h4>

                        <FormGroup>
                            <Label for="fieldLabel">Nom du champ</Label>
                            <Input
                                className={'border txt-primary'}
                                id="fieldLabel"
                                placeholder="Nom du champ"
                                value={newField.label}
                                onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="fieldType">Type de champ</Label>
                            <Input
                                id="fieldType"
                                className={'border txt-primary'}
                                type="select"
                                value={newField.type}
                                onChange={(e) =>
                                    setNewField({
                                        ...newField,
                                        type: e.target.value as FormFieldType["type"]
                                    })
                                }
                            >
                                <option value="text">Texte</option>
                                <option value="number">Nombre</option>
                                <option value="textarea">Zone de texte</option>
                                <option value="file">Fichier</option>
                                <option value="date">Date</option>
                                <option value="select">Sélection</option>
                            </Input>
                        </FormGroup>

                        <FormGroup check>
                            <Label for="fieldRequired">Requis</Label>
                            <Input
                                id="fieldRequired"
                                type="checkbox"
                                checked={newField.required}
                                onChange={() => setNewField({ ...newField, required: !newField.required })}
                            />
                        </FormGroup>

                        {newField.type === "select" && (
                            <FormGroup>
                                <Label>Options du Select</Label>
                                {newField.options.map((option, index) => (
                                    <Row key={index} className="align-items-center mb-2">
                                        <Col xs="10">
                                            <Input
                                                placeholder={`Option ${index + 1}`}
                                                value={option}
                                                onChange={(e) => {
                                                    const updatedOptions = [...newField.options];
                                                    updatedOptions[index] = e.target.value;
                                                    setNewField({ ...newField, options: updatedOptions });
                                                }}
                                            />
                                        </Col>
                                        <Col xs="2">
                                            <Button
                                                color="danger"
                                                size="sm"
                                                onClick={() => {
                                                    const updatedOptions = newField.options.filter((_, i) => i !== index);
                                                    setNewField({ ...newField, options: updatedOptions });
                                                }}
                                            >
                                                Supprimer
                                            </Button>
                                        </Col>
                                    </Row>
                                ))}
                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={() => setNewField({ ...newField, options: [...newField.options, ""] })}
                                >
                                    Ajouter une option
                                </Button>
                            </FormGroup>
                        )}

                        <Button color="primary" className="mt-3" onClick={handleAddField}>
                            Ajouter le champ
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Col xs="12" className="text-end p-3">
                <Button onClick={() => callbackActive(3)} color="primary">
                    Précedent
                </Button>
                <Button className="ms-1" color="primary" onClick={() => callbackActive(5)}>{'Suivant'}</Button>
            </Col>
        </div>
    );
};

export default ReviewForm;
