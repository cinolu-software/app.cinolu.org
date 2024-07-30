import React, { useState } from 'react';
import { Button, Col, Label, Row } from 'reactstrap';
import { updateProgram, selectProgramStatus, selectProgramError } from "@/Redux/Reducers/programsSlice/programsSlice";
import { Flip, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Redux/Store";
import { ProgramsType } from "@/Types/Programs/ProgramsType";

interface StaticFormProps {
    selectedProgram: ProgramsType | undefined;
    staticModalToggle: () => void;
}

export const StaticForm: React.FC<StaticFormProps> = ({ staticModalToggle, selectedProgram }) => {
    const dispatch = useDispatch<AppDispatch>();
    const programStatus = useSelector(selectProgramStatus);
    const programError = useSelector(selectProgramError);
    const [program, setProgram] = useState<ProgramsType>({
        id: selectedProgram?.id || 0,
        name: selectedProgram?.name || '',
        description: selectedProgram?.description || '',
        start_at: selectedProgram?.start_at || '',
        end_at: selectedProgram?.end_at || '',
        created_at: selectedProgram?.created_at || '',
        updated_at: selectedProgram?.updated_at || '',
        image: selectedProgram?.image || ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(updateProgram(program));
            if (programStatus === 'failed') {
                toast.error(
                    <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la mise à jour du programme"}</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            } else {
                staticModalToggle();
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour du programme : ', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Row className="g-3">
                    <Col md="12">
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
                    <Col md="12">
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
                    <Col md="6">
                        <Label className="mb-2" check>
                            {"Date de Début"}
                        </Label>
                        <input
                            className="form-control mb-4"
                            name="start_at"
                            type="date"
                            placeholder="Entrer la date de début"
                            value={program.start_at}
                            onChange={(e) => setProgram({ ...program, start_at: e.target.value })}
                        />
                    </Col>
                    <Col md="6">
                        <Label className="mb-2" check>
                            {"Date de Fin"}
                        </Label>
                        <input
                            className="form-control mb-4"
                            name="end_at"
                            type="date"
                            placeholder="Entrer la date de fin"
                            value={program.end_at}
                            onChange={(e) => setProgram({ ...program, end_at: e.target.value })}
                        />
                    </Col>
                    <Col xs="12">
                        <Button color="primary" type="submit">
                            {"Mettre à jour"}
                        </Button>
                    </Col>
                </Row>
            </form>
        </>
    );
};


