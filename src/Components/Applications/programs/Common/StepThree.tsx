import React, { useEffect } from "react";
import { Col, Row, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setNewFormValue } from "@/Redux/Reducers/programsSlice/programsSlice";
import { fetchProgramsType } from "@/Redux/Reducers/programsSlice/programsTypeSlice";
import { StepPropsType } from "@/Types/Programs/ProgramsType";

const StepThree: React.FC<StepPropsType> = ({ data }) => {
    const dispatch = useAppDispatch();
    const { transformedProgramsData, status } = useAppSelector(state => state.programsType);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProgramsType());
        }
    }, [dispatch, status]);

    const handleTypeChange = (typeId: string) => {

        if (!data) return;

        const updatedTypes = data.types.includes(typeId)
            ? data.types.filter((id: string) => id !== typeId)
            : [...data.types, typeId];

        dispatch(setNewFormValue({ field: 'types', value: updatedTypes }));
    };


    return (
        <Col>
            <section className="main-upgrade">
                <div>
                    <h5 className="mb-2">
                        Sélectionner <span className="txt-primary">le type de programme</span>
                    </h5>
                    <p className="text-muted mb-2">
                        Cliquez sur les types de programme qui correspondent à vos besoins.
                    </p>
                </div>
                <div className="variation-box">
                    {transformedProgramsData.map(type => (
                        <div className="selection-box" key={type.id}>
                            <Input
                                id={`type${type.id}`}
                                type="checkbox"
                                checked={data?.types.includes(type.id)}
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