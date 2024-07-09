import React, { useState } from 'react';
import { Button, Col, Label, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { createCategory } from '@/Redux/Reducers/projectSlice/projectCategorySlice';
import { StaticModalToggleProp, CreateCategory } from '@/Types/Projects/ProjectsType';
import { RootState } from '@/Redux/Store';
import {Flip, toast} from "react-toastify";



export const StaticForm: React.FC<StaticModalToggleProp> = ({ staticModalToggle }) => {

    const dispatch = useAppDispatch();
    const categoryStatus = useAppSelector((state: RootState) => state.projectCategory.status);
    const categoryError = useAppSelector((state: RootState) => state.projectCategory.error);
    const [category, setCategory] = useState<CreateCategory>({ name: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await dispatch(createCategory(category));

        if (categoryStatus === 'succeeded') {
            toast.success(
                <p className="text-white tx-16 mb-0">{"Catégorie créée avec succès"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
            staticModalToggle();
        }

        if(categoryStatus === 'failed'){
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la création de la catégorie"}</p>,
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

            </form>
        </>
    );
};



