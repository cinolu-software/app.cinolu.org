import React, { useEffect } from "react";
import { Col, Row, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setCreateFomValue} from "@/Redux/Reducers/eventSlice/eventSlice";
import {fetchProgram} from "@/Redux/Reducers/programSlice/programSlice";
import { StepPropsType} from "@/Types/Events";
import {eventProgram, eventProgramClick, eventProgramSelect} from "@/Constant";

const StepFive: React.FC<StepPropsType> = ({ createFormValue }) => {

    const dispatch = useAppDispatch();
    const {transformedPrograms, status} = useAppSelector(state=>state.program);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProgram());
        }
    }, [dispatch, status]);

    const handleProgramChange = (programId: string) => {
        dispatch(setCreateFomValue({ field: 'program', value: programId }));
    };

    return (
        <Col>
            <section className="main-upgrade">
                <div>
                    <h5 className="mb-2">
                        {eventProgramSelect} <span className="txt-primary">{eventProgram}</span>
                    </h5>
                    <p className="text-muted mb-2">
                        {eventProgramClick}
                    </p>
                </div>
                <div className="variation-box">
                    {
                        status === 'loading' ? <div>Loading...</div> : transformedPrograms.map(program => (
                            <div className="selection-box" key={program.id}>
                                <Input
                                    id={`program${program.id}`}
                                    type="checkbox"
                                    checked={createFormValue?.program === program.id}
                                    onChange={() => handleProgramChange(program.id)}
                                />
                                <div className="custom--mega-checkbox">
                                    <ul>
                                        <li>{program.name}</li>
                                    </ul>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </Col>
    );
};


export default StepFive;