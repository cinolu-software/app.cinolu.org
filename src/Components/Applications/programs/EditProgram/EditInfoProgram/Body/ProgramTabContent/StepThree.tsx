import React, { useEffect } from "react";
import { Col, Row, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setEditFormValue } from "@/Redux/Reducers/programsSlice/programsSlice";
import { fetchProgramsType } from "@/Redux/Reducers/programsSlice/programsTypeSlice";



const StepThree = () => {

    const dispatch = useAppDispatch();
    const { EditFormValue, selectedProgram } = useAppSelector((state) => state.programs);
    const { transformedProgramsData, status } = useAppSelector((state) => state.programsType);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProgramsType());
        }
    }, [dispatch, status]);

    useEffect(() => {
        // @ts-ignore
        if(selectedProgram && selectedProgram.types.length > 0){
            // @ts-ignore
            const selectedTypesIds = selectedProgram.types.map(type => type.id);
            dispatch(setEditFormValue({ field: 'types', value: selectedTypesIds }));
        }
    }, [selectedProgram, dispatch]);

    const handleTypeChange = (typeId: string) => {
        if (!EditFormValue) return;

        const updatedTypes = EditFormValue.types.includes(typeId)
            ? EditFormValue.types.filter((id: string) => id !== typeId)
            : [...EditFormValue.types, typeId];

        dispatch(setEditFormValue({ field: 'types', value: updatedTypes }));
    };


    return (
        <Col>
            <section className="main-upgrade">
                <div>
                    <h5 className="mb-2">
                        {'Sélectionner'} <span className="txt-primary">{'le type de programme'}</span>
                    </h5>
                    <p className="text-muted mb-2">Cliquer sur les types de programme qui correspondent à vos besoins.</p>
                </div>
                <div className="variation-box">
                    {transformedProgramsData.map((type) => (
                        <div className="selection-box" key={type.id}>
                            <Input
                                id={`type${type.id}`}
                                type="checkbox"
                                checked={EditFormValue?.types.includes(type.id)}
                                onChange={() => handleTypeChange(type.id)}
                            />
                            <div className="custom--mega-checkbox">
                                <ul>
                                    <li>{type.name}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Col>
    );
};

export default StepThree;

