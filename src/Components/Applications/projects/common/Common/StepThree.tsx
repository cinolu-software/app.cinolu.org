import React, { useEffect } from "react";
import { Col, Row, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setNewFormValue } from "@/Redux/Reducers/projectSlice/projectSlice";
import {fetchProjectType} from "@/Redux/Reducers/projectSlice/projectTypeSlice";
import {StepPropsType} from "@/Types/Projects/ProjectType";
import {ReceiveProjectType} from "@/Types/Projects/ProjectType";
import {TransformedProjectTypeType} from "@/Types/Projects/ProjectTypeType";

const StepThree: React.FC<StepPropsType> = ({ data }) => {
    const dispatch = useAppDispatch();
    const { transformedProjectData, status } = useAppSelector(state => state.projectType);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProjectType());
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
                        Sélectionner <span className="txt-primary">le type de projet</span>
                    </h5>
                    <p className="text-muted mb-2">
                        Cliquez sur les types de projet qui correspondent à vos besoins.
                    </p>
                </div>
                <div className="variation-box">
                    {transformedProjectData.map((type : TransformedProjectTypeType) => {
                        return (
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
                        );
                    })}
                </div>
            </section>
        </Col>
    );
};

export default StepThree;