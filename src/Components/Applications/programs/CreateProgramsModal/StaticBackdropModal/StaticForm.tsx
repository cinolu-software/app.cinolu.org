import React, { useState, useEffect } from 'react';
import { Button, Col, Label, Row, Table } from 'reactstrap';
import { createProgram, selectProgramStatus, setModalCreateProgram } from "@/Redux/Reducers/programsSlice/programsSlice";
import { StaticModalToggleProp, CreateProgramType, Requirement, ProgramsType } from "@/Types/Programs/ProgramsType";
import { RootState } from '@/Redux/Store';
import { Flip, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/Redux/Store";
import { useAppSelector } from "@/Redux/Hooks";
import { selectOriginalProgramData, fetchProgramsType } from "@/Redux/Reducers/programsSlice/programsTypeSlice";

export const StaticForm: React.FC<StaticModalToggleProp> = ({ staticModalToggle }) => {

    const dispatch = useDispatch<AppDispatch>();
    const programStatus = useSelector(selectProgramStatus);
    const programTypes = useAppSelector(selectOriginalProgramData);

    const [program, setProgram] = useState<CreateProgramType>({ name: '', description: '', start_at: '', end_at: '', types: [], requirements: [] });
    const [newRequirement, setNewRequirement] = useState<Requirement>({ name: '', description: '' });

    useEffect(() => {
        dispatch(fetchProgramsType());
    }, [dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createProgram(program));
        dispatch(setModalCreateProgram({ isOpen: false }));

        if (programStatus === 'failed') {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création du programme"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
    };

    const handleAddRequirement = () => {
        if (newRequirement.name && newRequirement.description) {
            setProgram({
                ...program,
                requirements: [...program.requirements, newRequirement],
            });
            setNewRequirement({ name: '', description: '' });
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Row >
                    <Col >
                        <Label className="mb-2" check>
                            {"Nom du Programme"}
                        </Label>
                        <input
                            className="form-control mb-4"
                            name="name"
                            type="text"
                            placeholder="Entrer le nom du programme"
                            value={program.name}
                            onChange={(e) => setProgram({ ...program, name: e.target.value })}
                        />
                    </Col>
                </Row>
                <Row>

                    <Col >
                        <Label className="mb-2" check>
                            {"Description du Programme"}
                        </Label>
                        <textarea
                            className="form-control mb-4"
                            name="description"
                            placeholder="Entrer la description du programme"
                            value={program.description}
                            onChange={(e) => setProgram({ ...program, description: e.target.value })}
                        />
                    </Col>

                </Row>
                <Row>

                    <Col md="6">
                        <Label className="mb-2" check>
                            {"Date de début"}
                        </Label>
                        <input
                            className="form-control mb-4"
                            name="start_at"
                            type="date"
                            value={program.start_at}
                            onChange={(e) => setProgram({ ...program, start_at: e.target.value })}
                        />
                    </Col>

                    <Col md="6">
                        <Label className="mb-2" check>
                            {"Date de fin"}
                        </Label>
                        <input
                            className="form-control mb-4"
                            name="end_at"
                            type="date"
                            value={program.end_at}
                            onChange={(e) => setProgram({ ...program, end_at: e.target.value })}
                        />
                    </Col>

                    <Col md="12">
                        <Label className="mb-2" check>
                            {"Types"}
                        </Label>
                        <select
                            className="form-control mb-4"
                            name="types"
                            multiple
                            value={program.types}
                            onChange={(e) => setProgram({ ...program, types: Array.from(e.target.selectedOptions, option => parseInt(option.value)) })}
                        >
                            {programTypes.map((type: ProgramsType) => (
                                <option key={type.id} value={type.id}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </Col>

                    <Col md="12">
                        <Label className="mb-2" check>
                            {"Exigences"}
                        </Label>
                        <Row>
                            <Col md="5">
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
                                <Button color="secondary" onClick={handleAddRequirement}>
                                    {"Ajouter"}
                                </Button>
                            </Col>
                        </Row>
                        <Table striped className="mt-3">
                            <thead>
                            <tr>
                                <th>Nom de l'exigence</th>
                                <th>Description de l'exigence</th>
                            </tr>
                            </thead>
                            <tbody>
                            {program.requirements.map((req, index) => (
                                <tr key={index}>
                                    <td>{req.name}</td>
                                    <td>{req.description}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>

                    <Col xs="12">
                        <Button color="primary" type="submit">
                            {"Créer"}
                        </Button>
                    </Col>
                </Row>
            </form>
        </>
    );
};
