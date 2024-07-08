import React, { useState } from 'react';
import { Button, Col, Label, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { createCategory } from '@/Redux/Reducers/projectSlice/projectCategorySlice';
import { StaticModalToggleProp, CreateCategory } from '@/Types/Projects/ProjectsType';
import { RootState } from '@/Redux/Store';

export const StaticForm: React.FC<StaticModalToggleProp> = ({ staticModalToggle }) => {

    const dispatch = useAppDispatch();
    const categoryStatus = useAppSelector((state: RootState) => state.projectCategory.status);
    const categoryError = useAppSelector((state: RootState) => state.projectCategory.error);
    const [category, setCategory] = useState<CreateCategory>({ name: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(createCategory(category));
        if (categoryStatus === 'succeeded') {
            staticModalToggle();
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Row className="g-3">
                    <Col md="12">
                        <Label className="mb-2" check>
                            {"Nom de la Catégorie"}
                        </Label>
                        <input
                            className="form-control mb-4"
                            name="category"
                            type="text"
                            placeholder="Entrer le nom de la catégorie"
                            value={category.name}
                            onChange={(e) => setCategory({ name: e.target.value })}
                        />
                    </Col>

                    <Col xs="12">
                        <Button color="primary" type="submit">
                            {"Créer"}
                        </Button>
                    </Col>
                </Row>

                {categoryStatus === 'failed' && categoryError && (
                    <div className="text-danger">{categoryError}</div>
                )}
            </form>
        </>
    );
};



