
import React, { useState, useEffect } from 'react';
import { Button, Col, Label, Row, Table } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { setNewFormValue } from '@/Redux/Reducers/programsSlice/programsSlice';
import { RequirementType } from '@/Types/Programs/ProgramsType';
import { StepPropsType } from "@/Types/Programs/ProgramsType";

const StepSix: React.FC<StepPropsType> = ({formValue, getUserData}) => {

    const dispatch = useAppDispatch();

    const [newRequirement, setNewRequirement] = useState<RequirementType>({ name: '', description: '' });

    const [requirements, setRequirements] = useState<RequirementType[]>(
        // @ts-ignore
        Array.isArray(formValue?.requirements)
            ? formValue.requirements
            : []
    );

    useEffect(() => {
        setRequirements(
            // @ts-ignore
            Array.isArray(formValue?.requirements)
                ? formValue.requirements
                : []
        );
    }, [formValue]);

    const handleAddRequirement = () => {
        if (newRequirement.name && newRequirement.description) {
            const updatedRequirements = [...requirements, newRequirement];
            setRequirements(updatedRequirements);
            dispatch(setNewFormValue({ field: 'requirements', value: updatedRequirements }));
            setNewRequirement({ name: '', description: '' });
        }
    };

    const handleRemoveRequirement = (index: number) => {
        const updatedRequirements = requirements.filter((_, i) => i !== index);
        setRequirements(updatedRequirements);
        dispatch(setNewFormValue({ field: 'requirements', value: updatedRequirements }));
    };

    return (
        <div>
            <Row>
                <Col md="5">
                    <Label className="mb-2" check>
                        {"Nom de l'exigence"}
                    </Label>
                    <input
                        className="form-control mb-2"
                        name="requirementName"
                        type="text"
                        placeholder="Nom de l'exigence"
                        value={newRequirement.name}
                        onChange={(e) => setNewRequirement({ ...newRequirement, name: e.target.value })}
                    />
                </Col>
                <Col md="5">
                    <Label className="mb-2" check>
                        {"Description de l'exigence"}
                    </Label>
                    <input
                        className="form-control mb-2"
                        name="requirementDescription"
                        type="text"
                        placeholder="Description de l'exigence"
                        value={newRequirement.description}
                        onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
                    />
                </Col>
                <Col md="2">
                    <Button color="secondary" onClick={handleAddRequirement} className="mt-4">
                        {"Ajouter"}
                    </Button>
                </Col>
            </Row>
            <Table  className="mt-3">
                <thead>
                <tr>
                    <th>Nom de l'exigence</th>
                    <th>Description de l'exigence</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {requirements.map((req, index) => (
                    <tr key={index}>
                        <td>{req.name}</td>
                        <td>{req.description}</td>
                        <td>
                            <Button color="danger" size="sm" onClick={() => handleRemoveRequirement(index)}>
                                {"Supprimer"}
                            </Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default StepSix;