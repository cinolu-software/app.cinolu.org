import React, { useEffect } from "react";
import { Col, Input } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setNewFormValue } from "@/Redux/Reducers/programsSlice/programsSlice";
import { fetchCategory } from "@/Redux/Reducers/programsSlice/ProgramsCategory";
import { StepPropsType } from "@/Types/Programs/ProgramsType";

const StepFour: React.FC<StepPropsType> = ({ data }) => {
    const dispatch = useAppDispatch();
    const { status, programsCategoryData } = useAppSelector((state) => state.programCategory);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCategory());
        }
    }, [dispatch, status]);

    const handleCategoryChange = (categoryId: string) => {
        if (!data || !Array.isArray(data.categories)) return;

        const updatedCategories = data.categories.includes(categoryId)
            ? data.categories.filter((id: string) => id !== categoryId)
            : [...data.categories, categoryId];

        dispatch(setNewFormValue({ field: "categories", value: updatedCategories }));
    };

    return (
        <Col>
            <section className="main-upgrade">
                <div>
                    <h5 className="mb-2">
                        Sélectionner <span className="txt-primary">la catégorie</span>
                    </h5>
                    <p className="text-muted mb-2">
                        Cliquez sur la catégorie de programme qui correspond.
                    </p>
                </div>
                <div className="variation-box">
                    {programsCategoryData?.map((category) => (
                        <div className="selection-box" key={category.id}>
                            <Input
                                id={`category${category.id}`}
                                type="checkbox"
                                checked={data?.categories.includes(category.id)}
                                onChange={() => handleCategoryChange(category.id)}
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

export default StepFour;