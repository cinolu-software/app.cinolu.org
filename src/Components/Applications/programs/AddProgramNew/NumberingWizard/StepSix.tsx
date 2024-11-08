import React, { useEffect } from "react";
import { Col, Row, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setNewFormValue } from "@/Redux/Reducers/programsSlice/programsSlice";
import {fetchCategory} from "@/Redux/Reducers/programsSlice/ProgramsCategory";

const StepSix = () => {

    const dispatch = useAppDispatch();
    const { formValue } = useAppSelector((state) => state.programs);
    const { status, programsCategoryData } = useAppSelector((state) => state.programCategory);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategory());
        }
    }, [dispatch, status]);

    const handleTypeChange = (typeId: string) => {
        if (!formValue) return;

        const updatedTypes = formValue.types.includes(typeId)
            ? formValue.types.filter((id: string) => id !== typeId)
            : [...formValue.types, typeId];

        dispatch(setNewFormValue({ field: 'types', value: updatedTypes }));
    };

    return (
        <Col>
            <section className="main-upgrade">
                <div>
                    <h5 className="mb-2">
                        {'Sélectionner'} <span className="txt-primary">{'la categorie'}</span>
                    </h5>
                    <p className="text-muted mb-2">Cliquer sur la catégorie de programme qui correspond.</p>
                </div>
                <div className="variation-box">
                    {programsCategoryData.map((category) => (
                        <div className="selection-box" key={category.id}>
                            <Input
                                id={`type${category.id}`}
                                type="checkbox"
                                checked={formValue?.types.includes(category.id)}
                                onChange={() => handleTypeChange(category.id)}
                            />
                            <div className="custom--mega-checkbox">
                                <ul>
                                    <li>{category.name}</li>
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </Col>
    );
};

export default StepSix;
