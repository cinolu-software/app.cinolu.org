import React, { useEffect } from "react";
import { Col, Row, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFormValue } from "@/Redux/Reducers/programsSlice/programsSlice";
import { fetchProgramsType } from "@/Redux/Reducers/programsSlice/programsTypeSlice";

const StepThree = () => {

    const dispatch = useAppDispatch();
    const { formValue } = useAppSelector((state) => state.programs);
    const { transformedProgramsData, status } = useAppSelector((state) => state.programsType);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProgramsType());
        }
    }, [dispatch, status]);

    const handleTypeChange = (typeId: string) => {
        if (!formValue) return;

        const updatedTypes = formValue.types.includes(typeId)
            ? formValue.types.filter((id: string) => id !== typeId)
            : [...formValue.types, typeId];

        dispatch(setFormValue({ field: 'types', value: updatedTypes }));
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
                                checked={formValue?.types.includes(type.id)}
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
