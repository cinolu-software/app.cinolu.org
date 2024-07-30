import React, { useState } from 'react';
import { Button, Col, Label, Row } from 'reactstrap';
import { createProgramType, selectProgramTypeStatus, selectProgramError, setModalCreateProgramTypes } from "@/Redux/Reducers/programsSlice/programsTypeSlice";
import {  CreateProgramTypeType, StaticModalToggleProp } from "@/Types/Programs/ProgramsTypeType";
import { RootState } from '@/Redux/Store';
import { Flip, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/Redux/Store";

export const StaticForm: React.FC<StaticModalToggleProp> = () => {

    const dispatch = useDispatch<AppDispatch>();
    const programStatus = useSelector(selectProgramTypeStatus);
    const programError = useSelector(selectProgramError);
    const [program, setProgram] = useState<CreateProgramTypeType>({ name: '', description: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createProgramType(program));
        dispatch(setModalCreateProgramTypes({ isOpen: false }));

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



