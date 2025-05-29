import React, { useState, useEffect } from "react";
import { Button, Col, Form, Input, Label, Row, FormGroup, Table } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { ActivityFormTabContentPropsType } from "@/Types/ActivitiesTypes";
import { setEditFormValue } from "@/Redux/Reducers/ActivitySlice"; 
import { toast } from "react-toastify";
import 'react-quill/dist/quill.snow.css';

const FormActivity: React.FC<ActivityFormTabContentPropsType> = ({ callbackActive }) => {
    const dispatch = useAppDispatch();
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedField, setEditedField] = useState<any>(null);
    const { editFormValue } = useAppSelector((state) => state.activity); 
    const [newField, setNewField] = useState({
        label: "",
        type: "text",
        required: false,
        options: [""]
    });

    useEffect(() => {
        if (editFormValue.form && editFormValue.form.length > 0) {
            setEditedField(null);
            setEditingIndex(null);
        }
    }, [editFormValue.form]);

    const handleAddField = () => {
        const updatedFields = [...(editFormValue.form || []), { 
            ...newField, 
            id: Date.now() 
        }];
        
        dispatch(setEditFormValue({ 
            field: 'form', 
            value: updatedFields 
        }));
        
        setNewField({ 
            label: "", 
            type: "text", 
            required: false, 
            options: [""] 
        });
    };

    const handleRemoveField = (id: number) => {
        const updatedFields = (editFormValue.form || []).filter(
            (field: any) => field.id !== id
        );
        
        dispatch(setEditFormValue({ 
            field: 'form', 
            value: updatedFields 
        }));
    };

    const handleEditField = (index: number, field: any) => {
        setEditingIndex(index);
        setEditedField({ ...field });
    };

    const handleSaveField = () => {
        if (editingIndex !== null && editedField) {
            const updatedFields = [...(editFormValue.form || [])];
            updatedFields[editingIndex] = editedField;
            
            dispatch(setEditFormValue({ 
                field: 'form', 
                value: updatedFields 
            }));
            
            setEditingIndex(null);
            setEditedField(null);
            toast.success("Champ mis à jour avec succès", {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER,
            });
        }
    };

    return (
        <div className="border ps-3 rounded pb-3">
            <Form className="theme-form theme-form-2 mega-form">
                <Row className="g-3 px-3">
                    <Col xs="12">
                        <h4 className="mb-4 mt-4">Formulaire Dynamique de Candidature</h4>
                        <div className="responsive-table">
                            <Table responsive>
                                <thead className="text-center">
                                    <tr className="border-bottom border-primary mb-3">
                                        <th>Nom du champ</th>
                                        <th>Type</th>
                                        <th>Requis</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {(editFormValue.form || []).map((field: any, index: number) => (
                                        <tr key={field.id}>
                                            <td className="align-middle">
                                                {editingIndex === index ? (
                                                    <Input
                                                        className="border text-secondary"
                                                        value={editedField?.label || ""}
                                                        onChange={(e) =>
                                                            setEditedField({ ...editedField, label: e.target.value })
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
                                                        value={editedField?.type || "text"}
                                                        onChange={(e) =>
                                                            setEditedField({ ...editedField, type: e.target.value })
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
                                            <td className="align-middle text-center">
                                                {editingIndex === index ? (
                                                    <Input
                                                        type="checkbox"
                                                        checked={editedField?.required || false}
                                                        onChange={(e) =>
                                                            setEditedField({
                                                                ...editedField,
                                                                required: e.target.checked,
                                                            })
                                                        }
                                                    />
                                                ) : field.required ? (
                                                    "Oui"
                                                ) : (
                                                    "Non"
                                                )}
                                            </td>
                                            <td className="align-middle text-center">
                                                {editingIndex === index ? (
                                                    <Button
                                                        color="primary"
                                                        outline
                                                        size="sm"
                                                        onClick={handleSaveField}
                                                        className="me-2"
                                                    >
                                                        Enregistrer
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        color="primary"
                                                        outline
                                                        size="sm"
                                                        onClick={() => handleEditField(index, field)}
                                                        className="me-2"
                                                    >
                                                        Modifier
                                                    </Button>
                                                )}
                                                <Button 
                                                    color="danger"
                                                    size="sm" 
                                                    outline
                                                    onClick={() => handleRemoveField(field.id)}
                                                >
                                                    Supprimer
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Col>

                    <Col xs="12" className="mt-4">
                        <h5 className="mb-3 mt-4">Ajouter un champ</h5>
                        <FormGroup>
                            <Label for="fieldLabel">Nom du champ</Label>
                            <Input
                                id="fieldLabel"
                                className="border txt-primary"
                                value={newField.label}
                                onChange={(e) => setNewField({ ...newField, label: e.target.value })}
                            />
                        </FormGroup>

                        <FormGroup className="mt-3">
                            <Label for="fieldType">Type de champ</Label>
                            <Input
                                id="fieldType"
                                className="border txt-primary"
                                type="select"
                                value={newField.type}
                                onChange={(e) => setNewField({ ...newField, type: e.target.value })}
                            >
                                <option value="text">Texte</option>
                                <option value="number">Nombre</option>
                                <option value="textarea">Zone de texte</option>
                                <option value="file">Fichier</option>
                                <option value="date">Date</option>
                                <option value="select">Sélection</option>
                            </Input>
                        </FormGroup>

                        <FormGroup check className="mb-3">
                            <Label check for="fieldRequired">
                                <Input
                                    id="fieldRequired"
                                    type="checkbox"
                                    checked={newField.required}
                                    onChange={() =>
                                        setNewField({ ...newField, required: !newField.required })
                                    }
                                />{" "}
                                Requis
                            </Label>
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
                                                    const updatedOptions = newField.options.filter(
                                                        (_, i) => i !== index
                                                    );
                                                    setNewField({ ...newField, options: updatedOptions });
                                                }}
                                            >
                                                ×
                                            </Button>
                                        </Col>
                                    </Row>
                                ))}
                                <Button
                                    color="secondary"
                                    size="sm"
                                    onClick={() =>
                                        setNewField({ ...newField, options: [...newField.options, ""] })
                                    }
                                >
                                    Ajouter une option
                                </Button>
                            </FormGroup>
                        )}

                        <Button color="primary" className="mt-3" onClick={handleAddField}>
                            Ajouter un champ
                        </Button>
                    </Col>
                </Row>
            </Form>

            <div className="d-flex justify-content-between flex-wrap gap-2 p-3">
                <Col xs="12" className="text-end p-3 ">
                    <button className={'btn btn-outline-primary me-3'} onClick={() => callbackActive(2)}>
                        {"Précedent"}
                    </button>

                    <button className={'btn btn-outline-primary'} onClick={() => callbackActive(4)}>
                        {"Suivant"}
                    </button>
                </Col>
            </div>
        </div>
    );
};

export default FormActivity;